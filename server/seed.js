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

    // Create 81 Sample Products (9 per category)
    const baseImages = {
      'Bags': [
        'http://localhost:5001/static/organic_cotton_bag.png',
        'http://localhost:5001/static/canvas_tote_2.png',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1594913785162-e6786b42dea3?auto=format&fit=crop&q=80&w=600'
      ],
      'Towels': [
        'http://localhost:5001/static/bamboo_towel.png',
        'http://localhost:5001/static/bamboo_towel_2.png',
        'https://images.unsplash.com/photo-1560362614-890272986883?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1621253018898-333f2008779b?auto=format&fit=crop&q=80&w=600'
      ],
      'Bottles': [
        'http://localhost:5001/static/stainless_bottle.png',
        'http://localhost:5001/static/stainless_bottle_2.png',
        'http://localhost:5001/static/glass_water_bottle.png',
        'https://images.unsplash.com/photo-1602143307185-84487493376e?auto=format&fit=crop&q=80&w=600'
      ],
      'Personal Care': [
        'http://localhost:5001/static/bamboo_toothbrush.png',
        'http://localhost:5001/static/bamboo_toothbrush_2.png',
        'https://images.unsplash.com/photo-1600857062241-98e5dba7f212?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1596755094514-f87034a2612d?auto=format&fit=crop&q=80&w=600'
      ],
      'Stationery': [
        'http://localhost:5001/static/recycled_notebook.png',
        'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1586075010633-2442dc3d6307?auto=format&fit=crop&q=80&w=600'
      ],
      'Home Decor': [
        'http://localhost:5001/static/soy_candle.png',
        'https://images.unsplash.com/photo-1603006373967-0097f480ad2b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1594913785202-58ef18867a1b?auto=format&fit=crop&q=80&w=600'
      ],
      'Kitchen': [
        'http://localhost:5001/static/coconut_scrubber.png',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=600'
      ],
      'Accessories': [
        'http://localhost:5001/static/glass_water_bottle.png',
        'https://images.unsplash.com/photo-1511499767390-90342fdec220?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
      ],
      'Bundles': [
        'http://localhost:5001/static/organic_cotton_bag.png',
        'https://images.unsplash.com/photo-1544200175-90518d184766?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&q=80&w=600'
      ]
    };

    const productsData = [
      // Bags
      { title: 'Canvas Tote Bag', category: 'Bags', price: 499, stock: 50, description: 'Sustainable cotton canvas tote bag for your daily needs. Durable and stylish.', images: [baseImages['Bags'][0], baseImages['Bags'][1]] },
      { title: 'Jute Grocery Bag', category: 'Bags', price: 299, stock: 120, description: 'Natural woven golden jute bag with sturdy cotton handles. Perfect for grocery runs.', images: [baseImages['Bags'][2]] },
      { title: 'Hemp Backpack', category: 'Bags', price: 2499, stock: 25, description: 'Earthy tones, minimalist design hemp fabric backpack. Durable and eco-friendly luxury.', images: [baseImages['Bags'][3]] },
      { title: 'Organic Cotton Sling', category: 'Bags', price: 899, stock: 40, description: 'Natural off-white organic cotton sling bag. Elegant and simple.', images: [baseImages['Bags'][0]] },
      { title: 'Recycled PET Laptop Bag', category: 'Bags', price: 3499, stock: 15, description: 'Sleek laptop bag made from recycled PET plastic. Professional and sustainable.', images: [baseImages['Bags'][3]] },
      { title: 'Bamboo Straw Clutch', category: 'Bags', price: 1599, stock: 20, description: 'Woven bamboo straw clutch. Unique, beachy, and sustainable fashion.', images: [baseImages['Bags'][2]] },
      { title: 'Cork Fabric Wallet', category: 'Bags', price: 799, stock: 60, description: 'Eco-friendly wallet made from natural cork fabric. Slim and durable.', images: [baseImages['Bags'][1]] },
      { title: 'Upcycled Denim Messenger', category: 'Bags', price: 1299, stock: 30, description: 'Messenger bag made from upcycled denim. Trendy and planet-conscious.', images: [baseImages['Bags'][0]] },
      { title: 'Mesh Veggie Bags', category: 'Bags', price: 199, stock: 200, description: 'Biodegradable mesh bags for produce. Say no to plastic bags.', images: [baseImages['Bags'][2]] },

      // Towels
      { title: 'Bamboo Fiber Towel', category: 'Towels', price: 799, stock: 100, description: 'Ultra-soft bamboo fiber towels, highly absorbent. Perfect for a spa-like experience.', images: [baseImages['Towels'][0], baseImages['Towels'][1]] },
      { title: 'Organic Cotton Bath Mat', category: 'Towels', price: 599, stock: 45, description: 'Thick, absorbent organic cotton bath mat. Soft underfoot and eco-friendly.', images: [baseImages['Towels'][2]] },
      { title: 'Hemp Hand Towel', category: 'Towels', price: 399, stock: 80, description: 'Natural hemp hand towel. Antimicrobial and extremely durable.', images: [baseImages['Towels'][3]] },
      { title: 'Recycled Microfiber Sports Towel', category: 'Towels', price: 649, stock: 110, description: 'Quick-dry towel made from recycled microfiber. Lightweight for travel.', images: [baseImages['Towels'][2]] },
      { title: 'Linen Kitchen Towel Set', category: 'Towels', price: 899, stock: 35, description: 'Natural flax linen kitchen towels. Elegant and highly absorbent.', images: [baseImages['Towels'][3]] },
      { title: 'Bamboo Baby Towel', category: 'Towels', price: 999, stock: 25, description: 'Ultra-soft hooded bamboo towel for babies. Gentle on sensitive skin.', images: [baseImages['Towels'][0]] },
      { title: 'Turkish Peshtemal', category: 'Towels', price: 1499, stock: 30, description: 'Traditional Turkish towel made from organic cotton. Versatile and stylish.', images: [baseImages['Towels'][1]] },
      { title: 'Eucalyptus Fiber Face Cloths', category: 'Towels', price: 449, stock: 150, description: 'Silky smooth eucalyptus fiber cloths. Eco-friendly alternative to disposables.', images: [baseImages['Towels'][2]] },
      { title: 'Sisal Exfoliating Towel', category: 'Towels', price: 249, stock: 90, description: 'Natural sisal fiber towel for body exfoliation. Compostable after use.', images: [baseImages['Towels'][3]] },

      // Bottles
      { title: 'Stainless Steel Flask', category: 'Bottles', price: 1299, stock: 75, description: 'Durable and reusable flask. Keeps drinks hot or cold for hours.', images: [baseImages['Bottles'][0], baseImages['Bottles'][1]] },
      { title: 'Glass Infuser Bottle', category: 'Bottles', price: 1499, stock: 80, description: 'Elegant glass bottle with bamboo lid and fruit infuser cage.', images: [baseImages['Bottles'][2]] },
      { title: 'Copper Water Pitcher', category: 'Bottles', price: 2999, stock: 15, description: 'Handcrafted pure copper pitcher. Natural antimicrobial properties.', images: [baseImages['Bottles'][3]] },
      { title: 'Collapsible Silicone Bottle', category: 'Bottles', price: 899, stock: 60, description: 'Space-saving collapsible bottle. Perfect for travelers and gym-goers.', images: [baseImages['Bottles'][0]] },
      { title: 'Ceramic Tea Tumbler', category: 'Bottles', price: 1199, stock: 40, description: 'Sleek ceramic tumbler with wooden sleeve. Retains heat effectively.', images: [baseImages['Bottles'][2]] },
      { title: 'Bamboo Insulated Mug', category: 'Bottles', price: 1399, stock: 30, description: 'Insulated travel mug with a sustainable bamboo exterior shell.', images: [baseImages['Bottles'][1]] },
      { title: 'Borosilicate Glass Carafe', category: 'Bottles', price: 1799, stock: 20, description: 'High-quality borosilicate glass carafe. Elegant table service.', images: [baseImages['Bottles'][2]] },
      { title: 'Recycled Plastic Sport Bottle', category: 'Bottles', price: 499, stock: 100, description: 'Sport bottle made from 100% recycled BPA-free ocean plastic.', images: [baseImages['Bottles'][3]] },
      { title: 'Titanium Ultralight Bottle', category: 'Bottles', price: 4499, stock: 10, description: 'Premium ultralight titanium bottle for professional hikers.', images: [baseImages['Bottles'][0]] },

      // Personal Care
      { title: 'Bamboo Toothbrush Set', category: 'Personal Care', price: 299, stock: 150, description: 'Biodegradable bamboo toothbrushes with soft charcoal bristles.', images: [baseImages['Personal Care'][0], baseImages['Personal Care'][1]] },
      { title: 'Natural Deodorant Stick', category: 'Personal Care', price: 499, stock: 85, description: 'Plastic-free natural deodorant. Scents derived from essential oils.', images: [baseImages['Personal Care'][2]] },
      { title: 'Organic Lip Balm Tin', category: 'Personal Care', price: 149, stock: 200, description: 'Zero-waste lip balm in a reusable tin. Organic shea butter base.', images: [baseImages['Personal Care'][3]] },
      { title: 'Shampoo Bar (Argan)', category: 'Personal Care', price: 599, stock: 70, description: 'Plastic-free shampoo bar. Equivalent to 3 bottles of liquid shampoo.', images: [baseImages['Personal Care'][0]] },
      { title: 'Reusable Menstrual Cup', category: 'Personal Care', price: 999, stock: 40, description: 'Medical-grade silicone menstrual cup. Sustainable period care.', images: [baseImages['Personal Care'][2]] },
      { title: 'Wooden Hair Brush', category: 'Personal Care', price: 699, stock: 55, description: 'Wooden brush with natural bristles. Static-free hair care.', images: [baseImages['Personal Care'][3]] },
      { title: 'Cotton Rounds (Reusable)', category: 'Personal Care', price: 349, stock: 120, description: 'Set of 10 reusable organic cotton rounds for makeup removal.', images: [baseImages['Personal Care'][0]] },
      { title: 'Charcoal Face Soap', category: 'Personal Care', price: 399, stock: 100, description: 'Handmade charcoal detox soap bar. 100% natural ingredients.', images: [baseImages['Personal Care'][2]] },
      { title: 'Epsom Salt Soak', category: 'Personal Care', price: 549, stock: 65, description: 'Relaxing bath soak in biodegradable kraft packaging.', images: [baseImages['Personal Care'][3]] },

      // Stationery
      { title: 'Recycled Paper Notebook', category: 'Stationery', price: 349, stock: 60, description: 'Eco-friendly notebook made from 100% post-consumer waste.', images: [baseImages['Stationery'][0]] },
      { title: 'Bamboo Pen Set', category: 'Stationery', price: 499, stock: 95, description: 'Sleek pens made from sustainable bamboo. refillable ink.', images: [baseImages['Stationery'][1]] },
      { title: 'Seed Paper Gift Tags', category: 'Stationery', price: 199, stock: 150, description: 'Plantable gift tags. Grow wildflowers after use.', images: [baseImages['Stationery'][2]] },
      { title: 'Kraft Paper Journal', category: 'Stationery', price: 249, stock: 70, description: 'Minimalist journal with a durable recycled kraft paper cover.', images: [baseImages['Stationery'][0]] },
      { title: 'Sugarcane Copy Paper', category: 'Stationery', price: 899, stock: 40, description: 'Printer paper made from sugarcane residue (bagasse).', images: [baseImages['Stationery'][1]] },
      { title: 'Eco Highlighter Pencils', category: 'Stationery', price: 299, stock: 85, description: 'Wood-based neon pencils instead of plastic highlighters.', images: [baseImages['Stationery'][2]] },
      { title: 'Natural Rubber Eraser', category: 'Stationery', price: 99, stock: 200, description: 'Plastic-free eraser made from sustainable natural rubber.', images: [baseImages['Stationery'][1]] },
      { title: 'Cardboard Desk Organizer', category: 'Stationery', price: 699, stock: 35, description: 'Modular desk organizer made from reinforced recycled board.', images: [baseImages['Stationery'][0]] },
      { title: 'Cork Mouse Pad', category: 'Stationery', price: 449, stock: 110, description: 'Antimicrobial and silky smooth natural cork mouse pad.', images: [baseImages['Stationery'][2]] },

      // Home Decor
      { title: 'Natural Soy Candle', category: 'Home Decor', price: 850, stock: 45, description: 'Clean-burning soy wax candle in an upcycled glass jar.', images: [baseImages['Home Decor'][0]] },
      { title: 'Bamboo Picture Frame', category: 'Home Decor', price: 599, stock: 50, description: 'Minimalist picture frame made from fast-growing bamboo.', images: [baseImages['Home Decor'][1]] },
      { title: 'Recycled Glass Vase', category: 'Home Decor', price: 1299, stock: 25, description: 'Artisanal vase hand-blown from 100% recycled glass.', images: [baseImages['Home Decor'][2]] },
      { title: 'Organic Cotton Throw', category: 'Home Decor', price: 2499, stock: 30, description: 'Large, cozy throw blanket made from organic cotton yarns.', images: [baseImages['Home Decor'][1]] },
      { title: 'Hemp Wall Hanging', category: 'Home Decor', price: 1899, stock: 15, description: 'Handcrafted macrame wall decor made from natural hemp.', images: [baseImages['Home Decor'][2]] },
      { title: 'Reclaimed Wood Coasters', category: 'Home Decor', price: 499, stock: 65, description: 'Set of 4 coasters made from salvaged furniture wood.', images: [baseImages['Home Decor'][1]] },
      { title: 'Salt Lamp (Himalayan)', category: 'Home Decor', price: 1599, stock: 40, description: 'Natural salt crystal lamp on a sustainable wooden base.', images: [baseImages['Home Decor'][0]] },
      { title: 'Dried Flower Bouquet', category: 'Home Decor', price: 999, stock: 20, description: 'Everlasting bouquet of naturally dried local wildflowers.', images: [baseImages['Home Decor'][2]] },
      { title: 'Coconut Shell Bowl Set', category: 'Home Decor', price: 749, stock: 55, description: 'Set of 2 polished bowls made from discarded coconut shells.', images: [baseImages['Home Decor'][0]] },

      // Kitchen
      { title: 'Coconut Husk Scrubber', category: 'Kitchen', price: 199, stock: 120, description: 'Compostable kitchen scrubber made from coconut husks.', images: [baseImages['Kitchen'][0]] },
      { title: 'Beeswax Food Wraps', category: 'Kitchen', price: 599, stock: 150, description: 'Washable and reusable organic cotton food wraps.', images: [baseImages['Kitchen'][1]] },
      { title: 'Bamboo Cutting Board', category: 'Kitchen', price: 899, stock: 65, description: 'Durable and antimicrobial solid bamboo cutting board.', images: [baseImages['Kitchen'][2]] },
      { title: 'Stainless Straw Set', category: 'Kitchen', price: 249, stock: 300, description: 'Pack of 4 stainless steel straws with a cleaning brush.', images: [baseImages['Kitchen'][1]] },
      { title: 'Compostable Plate Set', category: 'Kitchen', price: 699, stock: 50, description: 'Set of 4 reusable plates made from wheat straw fiber.', images: [baseImages['Kitchen'][2]] },
      { title: 'Cast Iron Skillet', category: 'Kitchen', price: 2999, stock: 20, description: 'Buy-it-for-life cast iron skillet. Naturally non-stick.', images: [baseImages['Kitchen'][0]] },
      { title: 'Organic Cotton Apron', category: 'Kitchen', price: 1199, stock: 40, description: 'Durable chef apron made from heavy organic cotton canvas.', images: [baseImages['Kitchen'][1]] },
      { title: 'Silicone Storage Bags', category: 'Kitchen', price: 799, stock: 90, description: 'Leak-proof reusable silicone bags for food storage.', images: [baseImages['Kitchen'][2]] },
      { title: 'Bamboo Utensil Set', category: 'Kitchen', price: 349, stock: 180, description: 'Portable set of bamboo fork, spoon, knife, and case.', images: [baseImages['Kitchen'][0]] },

      // Accessories
      { title: 'Solar Power Bank', category: 'Accessories', price: 2999, stock: 35, description: 'Eco-friendly power bank charged by the sun. Durable build.', images: [baseImages['Accessories'][1]] },
      { title: 'Bamboo Sunglasses', category: 'Accessories', price: 1999, stock: 45, description: 'Handcrafted Wayfarer sunglasses with bamboo arms.', images: [baseImages['Accessories'][2]] },
      { title: 'Recycled Plastic Watch', category: 'Accessories', price: 3499, stock: 20, description: 'Minimalist watch with a strap made from ocean plastic.', images: [baseImages['Accessories'][1]] },
      { title: 'Hemp Phone Case', category: 'Accessories', price: 699, stock: 75, description: 'Compostable phone case made from hemp and plant fibers.', images: [baseImages['Accessories'][2]] },
      { title: 'Organic Cotton Yoga Mat', category: 'Accessories', price: 2499, stock: 30, description: 'Non-slip yoga mat made from organic cotton and natural rubber.', images: [baseImages['Accessories'][1]] },
      { title: 'Eco-Friendly Umbrella', category: 'Accessories', price: 1599, stock: 25, description: 'Umbrella with a canopy made from 100% recycled PET.', images: [baseImages['Accessories'][2]] },
      { title: 'Bio-Acetate Glasses', category: 'Accessories', price: 4499, stock: 15, description: 'Blue light glasses made from biodegradable bio-acetate.', images: [baseImages['Accessories'][1]] },
      { title: 'Tree Plantation Card', category: 'Accessories', price: 500, stock: 1000, description: 'Gift a tree! We will plant a tree in your name.', images: [baseImages['Accessories'][2]] },
      { title: 'Ocean Plastic Keychain', category: 'Accessories', price: 149, stock: 200, description: 'Small keychain made from recycled ocean waste material.', images: [baseImages['Accessories'][0]] },

      // Bundles
      { title: 'Eco Essential Kit', category: 'Bundles', price: 2199, stock: 20, description: 'Our best-sellers: bag, bottle, and bamboo toothbrush.', images: [baseImages['Bundles'][0], baseImages['Bundles'][1]] },
      { title: 'Zero Waste Starter', category: 'Bundles', price: 1599, stock: 35, description: 'Everything you need to start your plastic-free journey.', images: [baseImages['Bundles'][2]] },
      { title: 'Home Styling Box', category: 'Bundles', price: 3999, stock: 15, description: 'A curated selection of eco-decor for your living space.', images: [baseImages['Bundles'][1]] },
      { title: 'Kitchen Bundle', category: 'Bundles', price: 1899, stock: 25, description: 'Scrubbers, wraps, and straws for a green kitchen.', images: [baseImages['Bundles'][2]] },
      { title: 'Organic Spa Set', category: 'Bundles', price: 2499, stock: 30, description: 'Bath mat, towels, and soap for the ultimate retreat.', images: [baseImages['Bundles'][0]] },
      { title: 'Green Commuter Kit', category: 'Bundles', price: 3499, stock: 10, description: 'Backpack and insulated mug for the busy eco-traveler.', images: [baseImages['Bundles'][1]] },
      { title: 'Student Station Pack', category: 'Bundles', price: 999, stock: 50, description: 'Notebooks, pens, and erasers for the conscious student.', images: [baseImages['Bundles'][2]] },
      { title: 'Baby Eco-Bundle', category: 'Bundles', price: 2999, stock: 12, description: 'Hooded towel, organic rounds, and soft accessories.', images: [baseImages['Bundles'][0]] },
      { title: 'Planet Saver Box', category: 'Bundles', price: 7999, stock: 5, description: 'The ultimate collection of all our sustainable essentials.', images: [baseImages['Bundles'][1]] }
    ];

    await Product.insertMany(productsData);
    console.log('Successfully created 81 products (9 per category)');


    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
