const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// Get user orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all orders
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post('/', protect, async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // 1. Check stock availability for all items first
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
      }
    }

    // 2. Reduce stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // 3. Create the order
    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount,
      address
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update order status
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const oldStatus = order.status;
    const newStatus = req.body.status;

    // If order is cancelled, return items to stock
    if (newStatus === 'Cancelled' && oldStatus !== 'Cancelled') {
      for (const item of order.products) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        });
      }
    } 
    // If order was cancelled but is now being re-activated (Processing etc), reduce stock
    else if (oldStatus === 'Cancelled' && newStatus !== 'Cancelled') {
      // Check stock first
      for (const item of order.products) {
        const product = await Product.findById(item.product);
        if (!product || product.stock < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${product?.title || 'product'}` });
        }
      }
      // Reduce stock
      for (const item of order.products) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    order.status = newStatus || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete order
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      // If order wasn't already cancelled, return items to stock before deleting
      if (order.status !== 'Cancelled') {
        for (const item of order.products) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity }
          });
        }
      }
      await order.deleteOne();
      res.json({ message: 'Order removed and stock returned' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
