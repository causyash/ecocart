const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

try { dns.setServers(['8.8.8.8', '8.8.4.4']); } catch (e) {}

const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecocart');
    console.log('✅ MongoDB Connected to Seed');

    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    await User.create({ name: 'Admin User', email: 'admin@ecocart.com', password: 'admin123', role: 'admin' });
    console.log('Admin user created');

    // 5 clean categories
    const categories = [
      { name: 'Bags & Accessories',    description: 'Eco-friendly bags, wallets, and lifestyle accessories.' },
      { name: 'Home & Kitchen',        description: 'Sustainable home decor and plastic-free kitchenware.' },
      { name: 'Personal Care',         description: 'Natural, plastic-free grooming and skincare.' },
      { name: 'Drinkware',             description: 'Reusable bottles, flasks, and coffee mugs.' },
      { name: 'Stationery & Bundles',  description: 'Recycled stationery and curated zero-waste bundles.' }
    ];
    await Category.insertMany(categories);
    console.log('5 categories created');

    const products = [

      // ═══════════════════════════════════════════════
      // 1. BAGS & ACCESSORIES (9 products)
      // ═══════════════════════════════════════════════
      {
        title: 'Organic Cotton Tote',
        description: 'Durable tote bag made from 100% organic cotton. The perfect eco-conscious shopping companion.',
        price: 499, category: 'Bags & Accessories', stock: 100,
        images: ['/images/products/tote.jpg']
      },
      {
        title: 'Canvas Market Bag',
        description: 'Lightweight canvas bag ideal for the farmer\'s market or grocery run. Machine washable.',
        price: 399, category: 'Bags & Accessories', stock: 80,
        images: ['/images/products/market-bag.jpg']
      },
      {
        title: 'Mesh Produce Bag Set',
        description: 'Set of 6 washable mesh bags for fruits, vegetables and bulk-bin shopping. No plastic needed.',
        price: 349, category: 'Bags & Accessories', stock: 120,
        images: ['/images/products/mesh-bag.jpg']
      },
      {
        title: 'Recycled Nylon Backpack',
        description: 'Lightweight backpack crafted from post-consumer recycled bottles. Water-resistant and durable.',
        price: 1499, category: 'Bags & Accessories', stock: 40,
        images: ['/images/products/nylon-backpack.jpg']
      },
      {
        title: 'Cork Slim Wallet',
        description: 'Ultra-slim cork wallet — vegan, water-resistant and holds up to 6 cards comfortably.',
        price: 699, category: 'Bags & Accessories', stock: 55,
        images: ['/images/products/cork-wallet.jpg']
      },
      {
        title: 'Bamboo Wood Watch',
        description: 'Handcrafted bamboo wristwatch with Japanese quartz movement. Lightweight and eco-beautiful.',
        price: 2999, category: 'Bags & Accessories', stock: 25,
        images: ['/images/products/bamboo-watch.jpg']
      },
      {
        title: 'Recycled Sunglasses',
        description: 'Fashion sunglasses with frames made from recycled plastic ocean waste. UV400 protection.',
        price: 1299, category: 'Bags & Accessories', stock: 40,
        images: ['/images/products/sunglasses.jpg']
      },
      {
        title: 'Bamboo Laptop Stand',
        description: 'Ergonomic bamboo laptop stand with adjustable height. Improves posture, sustainably made.',
        price: 1799, category: 'Bags & Accessories', stock: 35,
        images: ['/images/products/bamboo-stand.jpg']
      },
      {
        title: 'Hemp Rope Keychain',
        description: 'Handmade hemp rope keychain with wooden bead accent. Small planet-friendly everyday detail.',
        price: 149, category: 'Bags & Accessories', stock: 200,
        images: ['/images/products/hemp-keychain.jpg']
      },

      // ═══════════════════════════════════════════════
      // 2. HOME & KITCHEN (9 products)
      // ═══════════════════════════════════════════════
      {
        title: 'Soy Wax Scented Candle',
        description: 'Hand-poured soy wax candle with essential oils — clean-burning and sustainably sourced.',
        price: 750, category: 'Home & Kitchen', stock: 45,
        images: ['/images/products/candle.jpg']
      },
      {
        title: 'Bamboo Cutting Board',
        description: 'Premium bamboo cutting board — harder than maple, gentler on knives, naturally antibacterial.',
        price: 799, category: 'Home & Kitchen', stock: 65,
        images: ['/images/products/cutting-board.jpg']
      },
      {
        title: 'Beeswax Food Wraps',
        description: 'Pack of 3 beeswax wraps in S/M/L. Reusable alternative to cling film for good.',
        price: 499, category: 'Home & Kitchen', stock: 100,
        images: ['/images/products/beeswax-wrap.jpg']
      },
      {
        title: 'Glass Food Container Set',
        description: 'Set of 4 borosilicate glass containers with bamboo lids. Oven, microwave and freezer safe.',
        price: 1299, category: 'Home & Kitchen', stock: 45,
        images: ['/images/products/glass-container.jpg']
      },
      {
        title: 'Bamboo Utensil Set',
        description: 'Set of 5 kitchen utensils in carbonised bamboo — heat-resistant, non-scratch, beautiful.',
        price: 699, category: 'Home & Kitchen', stock: 70,
        images: ['/images/products/utensil-set.jpg']
      },
      {
        title: 'Macramé Wall Hanging',
        description: 'Hand-knotted macramé wall art from organic cotton rope. Bohemian chic for any room.',
        price: 999, category: 'Home & Kitchen', stock: 25,
        images: ['/images/products/macrame.jpg']
      },
      {
        title: 'Reclaimed Wood Photo Frame',
        description: 'Handcrafted photo frame from reclaimed wood. Rustic, unique and entirely upcycled.',
        price: 849, category: 'Home & Kitchen', stock: 35,
        images: ['/images/products/photo-frame.jpg']
      },
      {
        title: 'Seagrass Storage Basket',
        description: 'Woven seagrass basket — naturally strong, biodegradable and perfect for stylish storage.',
        price: 799, category: 'Home & Kitchen', stock: 40,
        images: ['/images/products/seagrass-basket.jpg']
      },
      {
        title: 'Coconut Husk Scrubber',
        description: 'Natural compostable kitchen scrubber from coconut fiber. Long-lasting, planet-friendly.',
        price: 249, category: 'Home & Kitchen', stock: 120,
        images: ['/images/products/scrubber.jpg']
      },

      // ═══════════════════════════════════════════════
      // 3. PERSONAL CARE (9 products)
      // ═══════════════════════════════════════════════
      {
        title: 'Zero Waste Dental Kit',
        description: 'Complete plastic-free dental routine — bamboo toothbrush, charcoal paste and floss.',
        price: 349, category: 'Personal Care', stock: 200,
        images: ['/images/products/dental.jpg']
      },
      {
        title: 'Solid Shampoo Bar',
        description: 'One bar replaces 2–3 bottles of liquid shampoo. Sulphate-free, vegan, travel-friendly.',
        price: 299, category: 'Personal Care', stock: 150,
        images: ['/images/products/shampoo-bar.jpg']
      },
      {
        title: 'Bamboo Cotton Swabs',
        description: 'Pack of 200 biodegradable bamboo cotton swabs. Replace plastic buds for good.',
        price: 149, category: 'Personal Care', stock: 300,
        images: ['/images/products/cotton-swabs.jpg']
      },
      {
        title: 'Reusable Cotton Pads',
        description: '16 washable organic cotton rounds for makeup removal. Comes with mesh laundry bag.',
        price: 399, category: 'Personal Care', stock: 180,
        images: ['/images/products/cotton-pads.jpg']
      },
      {
        title: 'Natural Deodorant Stick',
        description: 'Aluminium-free deodorant that genuinely works. Baking soda, coconut oil and essential oils.',
        price: 449, category: 'Personal Care', stock: 90,
        images: ['/images/products/deodorant.jpg']
      },
      {
        title: 'Natural Lip Balm',
        description: 'Beeswax and vitamin E lip balm in a biodegradable cardboard push-up tube.',
        price: 199, category: 'Personal Care', stock: 250,
        images: ['/images/products/lip-balm.jpg']
      },
      {
        title: 'Safety Razor',
        description: 'Stainless steel safety razor with lifetime guarantee. Zero plastic, refillable blades only.',
        price: 999, category: 'Personal Care', stock: 60,
        images: ['/images/products/safety-razor.jpg']
      },
      {
        title: 'Solid Face Wash Bar',
        description: 'Gentle cleansing bar with honey and calendula — suitable for all skin types.',
        price: 349, category: 'Personal Care', stock: 120,
        images: ['/images/products/face-wash-bar.jpg']
      },
      {
        title: 'Bamboo Bath Towel Set',
        description: 'Luxury bamboo fiber towels — ultra-soft, highly absorbent, naturally antibacterial.',
        price: 899, category: 'Personal Care', stock: 50,
        images: ['/images/products/towels.jpg']
      },

      // ═══════════════════════════════════════════════
      // 4. DRINKWARE (9 products)
      // ═══════════════════════════════════════════════
      {
        title: 'Insulated Steel Flask',
        description: 'Double-walled stainless steel flask — cold 24h, hot 12h. BPA-free, leak-proof.',
        price: 1299, category: 'Drinkware', stock: 75,
        images: ['/images/products/flask.jpg']
      },
      {
        title: 'Glass Water Bottle',
        description: 'Borosilicate glass bottle with protective silicone sleeve and elegant bamboo cap.',
        price: 899, category: 'Drinkware', stock: 60,
        images: ['/images/products/glass-bottle.jpg']
      },
      {
        title: 'Bamboo Lid Water Bottle',
        description: 'Stainless steel bottle with natural bamboo lid — timeless, minimal and functional.',
        price: 1099, category: 'Drinkware', stock: 55,
        images: ['/images/products/bamboo-bottle.jpg']
      },
      {
        title: 'Wide Mouth Thermos',
        description: 'Wide-mouth vacuum thermos — fits ice cubes, soups and smoothies. Truly leak-proof.',
        price: 1499, category: 'Drinkware', stock: 45,
        images: ['/images/products/thermos.jpg']
      },
      {
        title: 'Copper Water Bottle',
        description: 'Traditional hammered copper bottle — naturally antimicrobial and mineral-infusing.',
        price: 999, category: 'Drinkware', stock: 50,
        images: ['/images/products/copper-bottle.jpg']
      },
      {
        title: 'Kids Water Bottle',
        description: 'Colourful BPA-free stainless steel bottle for kids — spill-proof flip lid.',
        price: 699, category: 'Drinkware', stock: 80,
        images: ['/images/products/kids-bottle.jpg']
      },
      {
        title: 'Coffee Travel Tumbler',
        description: 'Sleek insulated tumbler for your daily coffee. Fits most car cup holders perfectly.',
        price: 849, category: 'Drinkware', stock: 65,
        images: ['/images/products/tumbler.jpg']
      },
      {
        title: 'Handmade Ceramic Mug',
        description: 'Artisan-crafted ceramic travel mug with silicone lid. Every piece is uniquely beautiful.',
        price: 1199, category: 'Drinkware', stock: 30,
        images: ['/images/products/ceramic-mug.jpg']
      },
      {
        title: 'Cork Yoga Mat',
        description: 'Natural cork yoga mat with rubber base — non-slip, antimicrobial and fully biodegradable.',
        price: 3499, category: 'Drinkware', stock: 20,
        images: ['/images/products/cork-mat.jpg']
      },

      // ═══════════════════════════════════════════════
      // 5. STATIONERY & BUNDLES (9 products)
      // ═══════════════════════════════════════════════
      {
        title: 'Recycled Paper Journal',
        description: 'Hardcover journal from 100% post-consumer recycled paper. A5 size, 200 pages.',
        price: 599, category: 'Stationery & Bundles', stock: 60,
        images: ['/images/products/journal.jpg']
      },
      {
        title: 'Seed Paper Notecards',
        description: 'Set of 12 plantable notecards embedded with wildflower seeds. Write, send, then grow!',
        price: 349, category: 'Stationery & Bundles', stock: 100,
        images: ['/images/products/seed-cards.jpg']
      },
      {
        title: 'Cork Cover Notebook',
        description: 'Natural cork-covered notebook with recycled inner pages. Each cover is unique.',
        price: 449, category: 'Stationery & Bundles', stock: 70,
        images: ['/images/products/cork-notebook.jpg']
      },
      {
        title: 'Bamboo Pen Set',
        description: 'Set of 4 smooth-writing bamboo pens with refillable cartridges. Biodegradable.',
        price: 299, category: 'Stationery & Bundles', stock: 90,
        images: ['/images/products/bamboo-pen.jpg']
      },
      {
        title: 'Recycled Pencil Set',
        description: 'Set of 12 HB pencils made from 100% recycled newspaper. Smooth and sustainable.',
        price: 199, category: 'Stationery & Bundles', stock: 120,
        images: ['/images/products/pencil-set.jpg']
      },
      {
        title: 'Eco-Warrior Starter Bundle',
        description: 'The ultimate zero-waste starter kit — tote, bottle, dental kit and daily essentials.',
        price: 1999, category: 'Stationery & Bundles', stock: 25,
        images: ['/images/products/bundle.jpg']
      },
      {
        title: 'Zero Waste Kitchen Bundle',
        description: 'Everything to go plastic-free in the kitchen — wraps, scrubbers, utensils and more.',
        price: 2499, category: 'Stationery & Bundles', stock: 20,
        images: ['/images/products/kitchen-bundle.jpg']
      },
      {
        title: 'Sustainable Bathroom Bundle',
        description: 'Bamboo toothbrush, shampoo bar, cotton pads and safety razor in one complete set.',
        price: 1799, category: 'Stationery & Bundles', stock: 20,
        images: ['/images/products/bathroom-bundle.jpg']
      },
      {
        title: 'Plastic-Free Starter Bundle',
        description: '8 essential plastic-free swaps to kickstart your zero-waste journey starting today.',
        price: 1299, category: 'Stationery & Bundles', stock: 30,
        images: ['/images/products/plastic-free-bundle.jpg']
      }
    ];

    await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${products.length} products across 5 categories`);

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
