const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

// Force DNS to use Google's servers if local DNS is unreliable for SRV records
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.log('Using default DNS settings');
}

const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecocart');
    console.log('✅ MongoDB Connected to Seed');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ecocart.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created');

    // Create Sample Categories
    const categories = [
      { name: 'Bags', description: 'Eco-friendly and sustainable bags for daily use.' },
      { name: 'Towels', description: 'Soft and absorbent eco-conscious towels.' },
      { name: 'Bottles', description: 'Reusable and durable drinkware.' },
      { name: 'Personal Care', description: 'Natural and sustainable grooming essentials.' },
      { name: 'Stationery', description: 'Recycled paper and eco-friendly desk supplies.' },
      { name: 'Home Decor', description: 'Sustainable home styling items.' },
      { name: 'Kitchen', description: 'Plastic-free kitchen tools.' },
      { name: 'Accessories', description: 'Eco-friendly lifestyle accessories.' },
      { name: 'Bundles', description: 'Curated value sets of sustainable products.' }
    ];

    await Category.insertMany(categories);
    console.log('Sample categories created');

    // Create Sample Products
    const products = [
      {
        title: 'Canvas Tote Bag',
        description: 'Sustainable cotton canvas tote bag for your daily needs. Durable and stylish.',
        price: 499.00,
        images: [
          'http://localhost:5001/static/organic_cotton_bag.png',
          'http://localhost:5001/static/canvas_tote_2.png'
        ],
        category: 'Bags',
        stock: 50
      },
      {
        title: 'Bamboo Fiber Towel',
        description: 'Ultra-soft bamboo fiber towels, highly absorbent and eco-friendly. Perfect for spa-like experience.',
        price: 799.50,
        images: [
          'http://localhost:5001/static/bamboo_towel.png',
          'http://localhost:5001/static/bamboo_towel_2.png'
        ],
        category: 'Towels',
        stock: 100
      },
      {
        title: 'Stainless Steel Flask',
        description: 'Durable and reusable bottle to keep your drinks hot or cold for hours.',
        price: 1299.00,
        images: [
          'http://localhost:5001/static/stainless_bottle.png',
          'http://localhost:5001/static/stainless_bottle_2.png'
        ],
        category: 'Bottles',
        stock: 75
      },
      {
        title: 'Bamboo Toothbrush Set',
        description: 'Sustainable bamboo toothbrushes with soft charcoal bristles. Biodegradable and eco-friendly.',
        price: 299.99,
        images: [
          'http://localhost:5001/static/bamboo_toothbrush.png',
          'http://localhost:5001/static/bamboo_toothbrush_2.png'
        ],
        category: 'Personal Care',
        stock: 150
      },
      {
        title: 'Recycled Paper Notebook',
        description: 'Eco-friendly notebook made from 100% recycled paper. Perfect for journaling or sketching.',
        price: 349.00,
        images: ['http://localhost:5001/static/recycled_notebook.png'],
        category: 'Stationery',
        stock: 60
      },
      {
        title: 'Natural Soy Candle',
        description: 'Hand-poured soy wax candle in a reusable glass jar. Clean burning and scented with natural oils.',
        price: 850.00,
        images: ['http://localhost:5001/static/soy_candle.png'],
        category: 'Home Decor',
        stock: 45
      },
      {
        title: 'Coconut Husk Scrubber',
        description: 'Biodegradable kitchen scrubbers made from natural coconut husk. Plastic-free cleaning.',
        price: 199.00,
        images: ['http://localhost:5001/static/coconut_scrubber.png'],
        category: 'Kitchen',
        stock: 120
      },
      {
        title: 'Glass Infuser Bottle',
        description: 'Elegant glass water bottle with a protective silicone sleeve and bamboo lid.',
        price: 1499.00,
        images: ['http://localhost:5001/static/glass_water_bottle.png'],
        category: 'Accessories',
        stock: 80
      },
      {
        title: 'Eco-Friendly Essential Kit',
        description: 'A curated collection of our best-selling sustainable products. Includes a bag, bottle, and toothbrush.',
        price: 2199.00,
        images: [
          'http://localhost:5001/static/organic_cotton_bag.png',
          'http://localhost:5001/static/stainless_bottle.png',
          'http://localhost:5001/static/bamboo_toothbrush.png'
        ],
        category: 'Bundles',
        stock: 20
      }
    ];


    await Product.insertMany(products);
    console.log('Sample products created');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
