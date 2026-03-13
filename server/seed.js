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

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecocart');
    console.log('✅ MongoDB Connected to Seed');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ecocart.com',
      password: 'adminpassword',
      role: 'admin'
    });
    console.log('Admin user created');

    // Create Sample Products
    const products = [
      {
        title: 'Canvas Tote Bag',
        description: 'Sustainable cotton canvas tote bag for your daily needs.',
        price: 25.00,
        imageUrl: 'http://localhost:5000/static/bag.jpg',
        category: 'Bags',
        stock: 50
      },
      {
        title: 'Bamboo Towel',
        description: 'Ultra-soft bamboo fiber towels, highly absorbent and eco-friendly.',
        price: 15.50,
        imageUrl: 'http://localhost:5000/static/towel.jpg',
        category: 'Towels',
        stock: 100
      },
      {
        title: 'Sainless Steel Bottle',
        description: 'Durable and reusable bottle to keep your drinks hot or cold.',
        price: 30.00,
        imageUrl: 'http://localhost:5000/static/bottle.jpg',
        category: 'Bottles',
        stock: 75
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
