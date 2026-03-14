const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecocart');
    console.log('Connected to DB for gallery update');

    const imageMap = {
      "Organic Cotton Tote": [
        "http://localhost:5001/static/organic_cotton_bag.png",
        "http://localhost:5001/static/canvas_tote_2.png"
      ],
      "Bamboo Bath Towel Set": [
        "http://localhost:5001/static/bamboo_towel.png",
        "http://localhost:5001/static/bamboo_towel_2.png"
      ],
      "Insulated Steel Flask": [
        "http://localhost:5001/static/stainless_bottle.png",
        "http://localhost:5001/static/stainless_bottle_2.png"
      ],
      "Zero Waste Dental Kit": [
        "http://localhost:5001/static/bamboo_toothbrush.png",
        "http://localhost:5001/static/bamboo_toothbrush_2.png"
      ],
      "Recycled Paper Journal": [
        "http://localhost:5001/static/recycled_notebook.png"
      ],
      "Soy Wax Scented Candle": [
        "http://localhost:5001/static/soy_candle.png"
      ],
      "Coconut Husk Scrubber": [
        "http://localhost:5001/static/coconut_scrubber.png"
      ],
      "Solar Power Bank": [
        "https://images.unsplash.com/photo-1617788138017-80ad42243c79?auto=format&fit=crop&q=80&w=800"
      ],
      "Eco-Warrior Starter Bundle": [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
      ]
    };

    const products = await Product.find({});
    
    for (let product of products) {
      if (imageMap[product.title]) {
        product.images = imageMap[product.title];
        await product.save();
        console.log(`Updated gallery for: ${product.title}`);
      }
    }

    console.log('✅ All product galleries updated successfully!');
    process.exit();
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
};

updateImages();
