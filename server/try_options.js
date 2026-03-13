const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const options = [
  {},
  { family: 4 },
  { serverSelectionTimeoutMS: 5000 },
];

async function testAll() {
  const uri = process.env.MONGO_URI;
  console.log('Testing with URI:', uri.replace(/:([^@]+)@/, ':****@'));
  
  for (let option of options) {
    console.log('Testing with options:', JSON.stringify(option));
    try {
      await mongoose.connect(uri, option);
      console.log('CONNECTION SUCCESSFUL!');
      process.exit(0);
    } catch (err) {
      console.log('FAILED:', err.message);
      await mongoose.disconnect();
    }
  }
  console.log('All attempts failed.');
}

testAll();
