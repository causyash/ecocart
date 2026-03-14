const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const verifyDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecocart');
        console.log('--- MongoDB Verification ---');
        
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        
        console.log(`Users: ${userCount}`);
        console.log(`Products: ${productCount}`);
        console.log(`Categories: ${categoryCount}`);
        
        const sampleProduct = await Product.findOne();
        console.log('\nSample Product:');
        console.log(`Title: ${sampleProduct.title}`);
        console.log(`Price: ₹${sampleProduct.price}`);
        console.log(`Category: ${sampleProduct.category}`);
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyDB();
