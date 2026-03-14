const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true, default: [] },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);
