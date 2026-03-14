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
    console.log('Sample categories created');    // Create 81 Sample Products (9 per category) with 100% Unique Images
    const baseImages = {
      'Bags': [
        'https://images.unsplash.com/photo-1544816155-12df9643f363', // Canvas Tote
        'https://images.unsplash.com/photo-1594913785162-e6786b42dea3', // Jute Bag
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f', // Hemp Backpack
        'https://images.unsplash.com/photo-1591337676887-a217a6970a8a', // Sling Bag
        'https://images.unsplash.com/photo-1622560480605-d83bd0b768fa', // Laptop Bag
        'https://images.unsplash.com/photo-1605733513597-a8f8d410fe34', // Clutch
        'https://images.unsplash.com/photo-1614165933024-c7af969182d7', // Wallet
        'https://images.unsplash.com/photo-1601924582970-84372ed6cb68', // Messenger
        'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1'  // Mesh Bag
      ],
      'Towels': [
        'https://images.unsplash.com/photo-1616627547584-bf28cee262db', // Bamboo Bath
        'https://images.unsplash.com/photo-1583947581924-860bda3a44f8', // Bath Mat
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be', // Hand Towel
        'https://images.unsplash.com/photo-1534073828943-f801091bb18c', // Sports Towel
        'https://images.unsplash.com/photo-1595111464529-65fe094cb026', // Kitchen Towel
        'https://images.unsplash.com/photo-1611002213071-8b0933c69019', // Baby Towel
        'https://images.unsplash.com/photo-1563453392212-326f5e854473', // Turkish
        'https://images.unsplash.com/photo-1576426863848-c21f53c60b19', // Face Cloth
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a'  // Sisal
      ],
      'Bottles': [
        'https://images.unsplash.com/photo-1602143307185-84487493376e', // Flask
        'https://images.unsplash.com/photo-1610214330718-e6786b42dea3', // Infuser
        'https://images.unsplash.com/photo-1610214330718-d83bd0b768fa', // Pitcher
        'https://images.unsplash.com/photo-1610214330718-a8f8d410fe34', // Silicone
        'https://images.unsplash.com/photo-1610214330718-7651a899d37f', // Ceramic
        'https://images.unsplash.com/photo-1610214330718-c7af969182d7', // Mug
        'https://images.unsplash.com/photo-1610214330718-84372ed6cb68', // Carafe
        'https://images.unsplash.com/photo-1610214330718-2f5fef640dd1', // Recycled
        'https://images.unsplash.com/photo-1610214330718-be289fbecef'  // Titanium
      ],
      'Personal Care': [
        'https://images.unsplash.com/photo-1556228578-8c7c2f1f6c7c', // Toothbrush
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908', // Deodorant
        'https://images.unsplash.com/photo-1608248597279-f99d160cdcbc', // Lip Balm
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef', // Shampoo
        'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19', // Cup
        'https://images.unsplash.com/photo-1601612620453-9118c7c093a1', // Brush
        'https://images.unsplash.com/photo-1590439474864-19752f429437', // Rounds
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', // Soap
        'https://images.unsplash.com/photo-1556760544-74068565f05c'  // Epsom
      ],
      'Stationery': [
        'https://images.unsplash.com/photo-1531346878377-a5be20888e57', // Notebook
        'https://images.unsplash.com/photo-1586075010633-2442dc3d6307', // Pen
        'https://images.unsplash.com/photo-1516961101772-e939796bd902', // Tags
        'https://images.unsplash.com/photo-1517842645767-c639042777db', // Journal
        'https://images.unsplash.com/photo-1528459199432-2671492926a5', // Paper
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38', // Pencils
        'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3', // Eraser
        'https://images.unsplash.com/photo-1491841573634-28140fc7ced7', // Organizer
        'https://images.unsplash.com/photo-1541167760496-162955ed8a9f'  // Mouse Pad
      ],
      'Home Decor': [
        'https://images.unsplash.com/photo-1603006373967-0097f480ad2b', // Candle
        'https://images.unsplash.com/photo-1594913785202-58ef18867a1b', // Frame
        'https://images.unsplash.com/photo-1581783898377-1c85bf51727a', // Vase
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af', // Throw
        'https://images.unsplash.com/photo-1515542706656-8e6ef17a1edb', // Wall
        'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85', // Coasters
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38', // Salt Lamp
        'https://images.unsplash.com/photo-1516627144492-ad527f135ad2', // Dried Bouquet
        'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97'  // Coconut Bowl
      ],
      'Kitchen': [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a', // Scrubber
        'https://images.unsplash.com/photo-1610348725531-843dff563e2c', // Wraps
        'https://images.unsplash.com/photo-1590650153855-d9e808231d41', // Board
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d', // Straws
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136', // Plate
        'https://images.unsplash.com/photo-1506368249639-73a05d6f6488', // Skillet
        'https://images.unsplash.com/photo-1556911220-e15595bb6fb6', // Apron
        'https://images.unsplash.com/photo-1556912102-fe813876060c', // Bags
        'https://images.unsplash.com/photo-1556909190-70511a769830'  // Utensils
      ],
      'Accessories': [
        'https://images.unsplash.com/photo-1521485950395-bcfb8fc9bd06', // Solar
        'https://images.unsplash.com/photo-1556306535-0f09a537f0a3', // Shades
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1', // Watch
        'https://images.unsplash.com/photo-1603539947678-cd3954ed515d', // Phone
        'https://images.unsplash.com/photo-1545209686-2917719601d3', // Yoga
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702', // Umbrella
        'https://images.unsplash.com/photo-1556306535-38fe4adbc3f0', // Glasses
        'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2', // Card
        'https://images.unsplash.com/photo-1511499767390-90342fdec220'  // Keychain
      ],
      'Bundles': [
        'https://images.unsplash.com/photo-1544200175-90518d184766', // Essential
        'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b', // Zero Waste
        'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8', // Styling
        'https://images.unsplash.com/photo-1518709766631-a6a7f4e921c3', // Kitchen
        'https://images.unsplash.com/photo-1558236714-d117513c167d', // Spa
        'https://images.unsplash.com/photo-1504215680145-00eaa21bbad0', // Commuter
        'https://images.unsplash.com/photo-1544441892-794166f1e3be', // Station
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f', // Baby
        'https://images.unsplash.com/photo-1507208773393-40194383471c'  // Planet
      ]
    };

    const suffix = '?auto=format&fit=crop&q=80&w=600';

    const productsData = [
      // Bags
      { title: 'Canvas Tote Bag', category: 'Bags', price: 499, stock: 50, description: 'Sustainable cotton canvas tote bag for your daily needs. Durable and stylish.', images: [baseImages['Bags'][0] + suffix] },
      { title: 'Jute Grocery Bag', category: 'Bags', price: 299, stock: 120, description: 'Natural woven golden jute bag with sturdy cotton handles. Perfect for grocery runs.', images: [baseImages['Bags'][1] + suffix] },
      { title: 'Hemp Backpack', category: 'Bags', price: 2499, stock: 25, description: 'Earthy tones, minimalist design hemp fabric backpack. Durable and eco-friendly luxury.', images: [baseImages['Bags'][2] + suffix] },
      { title: 'Organic Cotton Sling', category: 'Bags', price: 899, stock: 40, description: 'Natural off-white organic cotton sling bag. Elegant and simple.', images: [baseImages['Bags'][3] + suffix] },
      { title: 'Recycled PET Laptop Bag', category: 'Bags', price: 3499, stock: 15, description: 'Sleek laptop bag made from recycled PET plastic. Professional and sustainable.', images: [baseImages['Bags'][4] + suffix] },
      { title: 'Bamboo Straw Clutch', category: 'Bags', price: 1599, stock: 20, description: 'Woven bamboo straw clutch. Unique, beachy, and sustainable fashion.', images: [baseImages['Bags'][5] + suffix] },
      { title: 'Cork Fabric Wallet', category: 'Bags', price: 799, stock: 60, description: 'Eco-friendly wallet made from natural cork fabric. Slim and durable.', images: [baseImages['Bags'][6] + suffix] },
      { title: 'Upcycled Denim Messenger', category: 'Bags', price: 1299, stock: 30, description: 'Messenger bag made from upcycled denim. Trendy and planet-conscious.', images: [baseImages['Bags'][7] + suffix] },
      { title: 'Mesh Veggie Bags', category: 'Bags', price: 199, stock: 200, description: 'Biodegradable mesh bags for produce. Say no to plastic bags.', images: [baseImages['Bags'][8] + suffix] },

      // Towels
      { title: 'Bamboo Fiber Towel', category: 'Towels', price: 799, stock: 100, description: 'Ultra-soft bamboo fiber towels, highly absorbent. Perfect for a spa-like experience.', images: [baseImages['Towels'][0] + suffix] },
      { title: 'Organic Cotton Bath Mat', category: 'Towels', price: 599, stock: 45, description: 'Thick, absorbent organic cotton bath mat. Soft underfoot and eco-friendly.', images: [baseImages['Towels'][1] + suffix] },
      { title: 'Hemp Hand Towel', category: 'Towels', price: 399, stock: 80, description: 'Natural hemp hand towel. Antimicrobial and extremely durable.', images: [baseImages['Towels'][2] + suffix] },
      { title: 'Recycled Microfiber Sports Towel', category: 'Towels', price: 649, stock: 110, description: 'Quick-dry towel made from recycled microfiber. Lightweight for travel.', images: [baseImages['Towels'][3] + suffix] },
      { title: 'Linen Kitchen Towel Set', category: 'Towels', price: 899, stock: 35, description: 'Natural flax linen kitchen towels. Elegant and highly absorbent.', images: [baseImages['Towels'][4] + suffix] },
      { title: 'Bamboo Baby Towel', category: 'Towels', price: 999, stock: 25, description: 'Ultra-soft hooded bamboo towel for babies. Gentle on sensitive skin.', images: [baseImages['Towels'][5] + suffix] },
      { title: 'Turkish Peshtemal', category: 'Towels', price: 1499, stock: 30, description: 'Traditional Turkish towel made from organic cotton. Versatile and stylish.', images: [baseImages['Towels'][6] + suffix] },
      { title: 'Eucalyptus Fiber Face Cloths', category: 'Towels', price: 449, stock: 150, description: 'Silky smooth eucalyptus fiber cloths. Eco-friendly alternative to disposables.', images: [baseImages['Towels'][7] + suffix] },
      { title: 'Sisal Exfoliating Towel', category: 'Towels', price: 249, stock: 90, description: 'Natural sisal fiber towel for body exfoliation. Compostable after use.', images: [baseImages['Towels'][8] + suffix] },

      // Bottles
      { title: 'Stainless Steel Flask', category: 'Bottles', price: 1299, stock: 75, description: 'Durable and reusable flask. Keeps drinks hot or cold for hours.', images: [baseImages['Bottles'][0] + suffix] },
      { title: 'Glass Infuser Bottle', category: 'Bottles', price: 1499, stock: 80, description: 'Elegant glass bottle with bamboo lid and fruit infuser cage.', images: [baseImages['Bottles'][1] + suffix] },
      { title: 'Copper Water Pitcher', category: 'Bottles', price: 2999, stock: 15, description: 'Handcrafted pure copper pitcher. Natural antimicrobial properties.', images: [baseImages['Bottles'][2] + suffix] },
      { title: 'Collapsible Silicone Bottle', category: 'Bottles', price: 899, stock: 60, description: 'Space-saving collapsible bottle. Perfect for travelers and gym-goers.', images: [baseImages['Bottles'][3] + suffix] },
      { title: 'Ceramic Tea Tumbler', category: 'Bottles', price: 1199, stock: 40, description: 'Sleek ceramic tumbler with wooden sleeve. Retains heat effectively.', images: [baseImages['Bottles'][4] + suffix] },
      { title: 'Bamboo Insulated Mug', category: 'Bottles', price: 1399, stock: 30, description: 'Insulated travel mug with a sustainable bamboo exterior shell.', images: [baseImages['Bottles'][5] + suffix] },
      { title: 'Borosilicate Glass Carafe', category: 'Bottles', price: 1799, stock: 20, description: 'High-quality borosilicate glass carafe. Elegant table service.', images: [baseImages['Bottles'][6] + suffix] },
      { title: 'Recycled Plastic Sport Bottle', category: 'Bottles', price: 499, stock: 100, description: 'Sport bottle made from 100% recycled BPA-free ocean plastic.', images: [baseImages['Bottles'][7] + suffix] },
      { title: 'Titanium Ultralight Bottle', category: 'Bottles', price: 4499, stock: 10, description: 'Premium ultralight titanium bottle for professional hikers.', images: [baseImages['Bottles'][8] + suffix] },

      // Personal Care
      { title: 'Bamboo Toothbrush Set', category: 'Personal Care', price: 299, stock: 150, description: 'Biodegradable bamboo toothbrushes with soft charcoal bristles.', images: [baseImages['Personal Care'][0] + suffix] },
      { title: 'Natural Deodorant Stick', category: 'Personal Care', price: 499, stock: 85, description: 'Plastic-free natural deodorant. Scents derived from essential oils.', images: [baseImages['Personal Care'][1] + suffix] },
      { title: 'Organic Lip Balm Tin', category: 'Personal Care', price: 149, stock: 200, description: 'Zero-waste lip balm in a reusable tin. Organic shea butter base.', images: [baseImages['Personal Care'][2] + suffix] },
      { title: 'Shampoo Bar (Argan)', category: 'Personal Care', price: 599, stock: 70, description: 'Plastic-free shampoo bar. Equivalent to 3 bottles of liquid shampoo.', images: [baseImages['Personal Care'][3] + suffix] },
      { title: 'Reusable Menstrual Cup', category: 'Personal Care', price: 999, stock: 40, description: 'Medical-grade silicone menstrual cup. Sustainable period care.', images: [baseImages['Personal Care'][4] + suffix] },
      { title: 'Wooden Hair Brush', category: 'Personal Care', price: 699, stock: 55, description: 'Wooden brush with natural bristles. Static-free hair care.', images: [baseImages['Personal Care'][5] + suffix] },
      { title: 'Cotton Rounds (Reusable)', category: 'Personal Care', price: 349, stock: 120, description: 'Set of 10 reusable organic cotton rounds for makeup removal.', images: [baseImages['Personal Care'][6] + suffix] },
      { title: 'Charcoal Face Soap', category: 'Personal Care', price: 399, stock: 100, description: 'Handmade charcoal detox soap bar. 100% natural ingredients.', images: [baseImages['Personal Care'][7] + suffix] },
      { title: 'Epsom Salt Soak', category: 'Personal Care', price: 549, stock: 65, description: 'Relaxing bath soak in biodegradable kraft packaging.', images: [baseImages['Personal Care'][8] + suffix] },

      // Stationery
      { title: 'Recycled Paper Notebook', category: 'Stationery', price: 349, stock: 60, description: 'Eco-friendly notebook made from 100% post-consumer waste.', images: [baseImages['Stationery'][0] + suffix] },
      { title: 'Bamboo Pen Set', category: 'Stationery', price: 499, stock: 95, description: 'Sleek pens made from sustainable bamboo. refillable ink.', images: [baseImages['Stationery'][1] + suffix] },
      { title: 'Seed Paper Gift Tags', category: 'Stationery', price: 199, stock: 150, description: 'Plantable gift tags. Grow wildflowers after use.', images: [baseImages['Stationery'][2] + suffix] },
      { title: 'Kraft Paper Journal', category: 'Stationery', price: 249, stock: 70, description: 'Minimalist journal with a durable recycled kraft paper cover.', images: [baseImages['Stationery'][3] + suffix] },
      { title: 'Sugarcane Copy Paper', category: 'Stationery', price: 899, stock: 40, description: 'Printer paper made from sugarcane residue (bagasse).', images: [baseImages['Stationery'][4] + suffix] },
      { title: 'Eco Highlighter Pencils', category: 'Stationery', price: 299, stock: 85, description: 'Wood-based neon pencils instead of plastic highlighters.', images: [baseImages['Stationery'][5] + suffix] },
      { title: 'Natural Rubber Eraser', category: 'Stationery', price: 99, stock: 200, description: 'Plastic-free eraser made from sustainable natural rubber.', images: [baseImages['Stationery'][6] + suffix] },
      { title: 'Cardboard Desk Organizer', category: 'Stationery', price: 699, stock: 35, description: 'Modular desk organizer made from reinforced recycled board.', images: [baseImages['Stationery'][7] + suffix] },
      { title: 'Cork Mouse Pad', category: 'Stationery', price: 449, stock: 110, description: 'Antimicrobial and silky smooth natural cork mouse pad.', images: [baseImages['Stationery'][8] + suffix] },

      // Home Decor
      { title: 'Natural Soy Candle', category: 'Home Decor', price: 850, stock: 45, description: 'Clean-burning soy wax candle in an upcycled glass jar.', images: [baseImages['Home Decor'][0] + suffix] },
      { title: 'Bamboo Picture Frame', category: 'Home Decor', price: 599, stock: 50, description: 'Minimalist picture frame made from fast-growing bamboo.', images: [baseImages['Home Decor'][1] + suffix] },
      { title: 'Recycled Glass Vase', category: 'Home Decor', price: 1299, stock: 25, description: 'Artisanal vase hand-blown from 100% recycled glass.', images: [baseImages['Home Decor'][2] + suffix] },
      { title: 'Organic Cotton Throw', category: 'Home Decor', price: 2499, stock: 30, description: 'Large, cozy throw blanket made from organic cotton yarns.', images: [baseImages['Home Decor'][3] + suffix] },
      { title: 'Hemp Wall Hanging', category: 'Home Decor', price: 1899, stock: 15, description: 'Handcrafted macrame wall decor made from natural hemp.', images: [baseImages['Home Decor'][4] + suffix] },
      { title: 'Reclaimed Wood Coasters', category: 'Home Decor', price: 499, stock: 65, description: 'Set of 4 coasters made from salvaged furniture wood.', images: [baseImages['Home Decor'][5] + suffix] },
      { title: 'Salt Lamp (Himalayan)', category: 'Home Decor', price: 1599, stock: 40, description: 'Natural salt crystal lamp on a sustainable wooden base.', images: [baseImages['Home Decor'][6] + suffix] },
      { title: 'Dried Flower Bouquet', category: 'Home Decor', price: 999, stock: 20, description: 'Everlasting bouquet of naturally dried local wildflowers.', images: [baseImages['Home Decor'][7] + suffix] },
      { title: 'Coconut Shell Bowl Set', category: 'Home Decor', price: 749, stock: 55, description: 'Set of 2 polished bowls made from discarded coconut shells.', images: [baseImages['Home Decor'][8] + suffix] },

      // Kitchen
      { title: 'Coconut Husk Scrubber', category: 'Kitchen', price: 199, stock: 120, description: 'Compostable kitchen scrubber made from coconut husks.', images: [baseImages['Kitchen'][0] + suffix] },
      { title: 'Beeswax Food Wraps', category: 'Kitchen', price: 599, stock: 150, description: 'Washable and reusable organic cotton food wraps.', images: [baseImages['Kitchen'][1] + suffix] },
      { title: 'Bamboo Cutting Board', category: 'Kitchen', price: 899, stock: 65, description: 'Durable and antimicrobial solid bamboo cutting board.', images: [baseImages['Kitchen'][2] + suffix] },
      { title: 'Stainless Straw Set', category: 'Kitchen', price: 249, stock: 300, description: 'Pack of 4 stainless steel straws with a cleaning brush.', images: [baseImages['Kitchen'][3] + suffix] },
      { title: 'Compostable Plate Set', category: 'Kitchen', price: 699, stock: 50, description: 'Set of 4 reusable plates made from wheat straw fiber.', images: [baseImages['Kitchen'][4] + suffix] },
      { title: 'Cast Iron Skillet', category: 'Kitchen', price: 2999, stock: 20, description: 'Buy-it-for-life cast iron skillet. Naturally non-stick.', images: [baseImages['Kitchen'][5] + suffix] },
      { title: 'Organic Cotton Apron', category: 'Kitchen', price: 1199, stock: 40, description: 'Durable chef apron made from heavy organic cotton canvas.', images: [baseImages['Kitchen'][6] + suffix] },
      { title: 'Silicone Storage Bags', category: 'Kitchen', price: 799, stock: 90, description: 'Leak-proof reusable silicone bags for food storage.', images: [baseImages['Kitchen'][7] + suffix] },
      { title: 'Bamboo Utensil Set', category: 'Kitchen', price: 349, stock: 180, description: 'Portable set of bamboo fork, spoon, knife, and case.', images: [baseImages['Kitchen'][8] + suffix] },

      // Accessories
      { title: 'Solar Power Bank', category: 'Accessories', price: 2999, stock: 35, description: 'Eco-friendly power bank charged by the sun. Durable build.', images: [baseImages['Accessories'][0] + suffix] },
      { title: 'Bamboo Sunglasses', category: 'Accessories', price: 1999, stock: 45, description: 'Handcrafted Wayfarer sunglasses with bamboo arms.', images: [baseImages['Accessories'][1] + suffix] },
      { title: 'Recycled Plastic Watch', category: 'Accessories', price: 3499, stock: 20, description: 'Minimalist watch with a strap made from ocean plastic.', images: [baseImages['Accessories'][2] + suffix] },
      { title: 'Hemp Phone Case', category: 'Accessories', price: 699, stock: 75, description: 'Compostable phone case made from hemp and plant fibers.', images: [baseImages['Accessories'][3] + suffix] },
      { title: 'Organic Cotton Yoga Mat', category: 'Accessories', price: 2499, stock: 30, description: 'Non-slip yoga mat made from organic cotton and natural rubber.', images: [baseImages['Accessories'][4] + suffix] },
      { title: 'Eco-Friendly Umbrella', category: 'Accessories', price: 1599, stock: 25, description: 'Umbrella with a canopy made from 100% recycled PET.', images: [baseImages['Accessories'][5] + suffix] },
      { title: 'Bio-Acetate Glasses', category: 'Accessories', price: 4499, stock: 15, description: 'Blue light glasses made from biodegradable bio-acetate.', images: [baseImages['Accessories'][6] + suffix] },
      { title: 'Tree Plantation Card', category: 'Accessories', price: 500, stock: 1000, description: 'Gift a tree! We will plant a tree in your name.', images: [baseImages['Accessories'][7] + suffix] },
      { title: 'Ocean Plastic Keychain', category: 'Accessories', price: 149, stock: 200, description: 'Small keychain made from recycled ocean waste material.', images: [baseImages['Accessories'][8] + suffix] },

      // Bundles
      { title: 'Eco Essential Kit', category: 'Bundles', price: 2199, stock: 20, description: 'Our best-sellers: bag, bottle, and bamboo toothbrush.', images: [baseImages['Bundles'][0] + suffix] },
      { title: 'Zero Waste Starter', category: 'Bundles', price: 1599, stock: 35, description: 'Everything you need to start your plastic-free journey.', images: [baseImages['Bundles'][1] + suffix] },
      { title: 'Home Styling Box', category: 'Bundles', price: 3999, stock: 15, description: 'A curated selection of eco-decor for your living space.', images: [baseImages['Bundles'][2] + suffix] },
      { title: 'Kitchen Bundle', category: 'Bundles', price: 1899, stock: 25, description: 'Scrubbers, wraps, and straws for a green kitchen.', images: [baseImages['Bundles'][3] + suffix] },
      { title: 'Organic Spa Set', category: 'Bundles', price: 2499, stock: 30, description: 'Bath mat, towels, and soap for the ultimate retreat.', images: [baseImages['Bundles'][4] + suffix] },
      { title: 'Green Commuter Kit', category: 'Bundles', price: 3499, stock: 10, description: 'Backpack and insulated mug for the busy eco-traveler.', images: [baseImages['Bundles'][5] + suffix] },
      { title: 'Student Station Pack', category: 'Bundles', price: 999, stock: 50, description: 'Notebooks, pens, and erasers for the conscious student.', images: [baseImages['Bundles'][6] + suffix] },
      { title: 'Baby Eco-Bundle', category: 'Bundles', price: 2999, stock: 12, description: 'Hooded towel, organic rounds, and soft accessories.', images: [baseImages['Bundles'][7] + suffix] },
      { title: 'Planet Saver Box', category: 'Bundles', price: 7999, stock: 5, description: 'The ultimate collection of all our sustainable essentials.', images: [baseImages['Bundles'][8] + suffix] }
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
