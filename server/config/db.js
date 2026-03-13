const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

// Force DNS to use Google's servers if local DNS is unreliable for SRV records
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.log('Using default DNS settings');
}

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecocart';
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('DNS')) {
      console.error('TIP: This looks like a DNS issue. Try using the "Standard Connection String" (mongodb://...) from Atlas or change your system DNS to 8.8.8.8.');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
