// const mongoose=require('mongoose');
// const initdata=require('./data.js');
// const Listing=require('../models/listing.js');

// main().then(()=>console.log("init data added")).catch(err=>console.log(err));

// async function main(){
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
// }

// const initDB=async()=>{
//     await Listing.deleteMany({});
//     initdata.data= initdata.data.map((obj)=>({...obj,owner:'690b3176a3363a4ea207e8fd'}));
//     await Listing.insertMany(initdata.data);
//     console.log("data inserted");
// }
// initDB();

// in init/index.js
// in init/index.js
// const mongoose = require("mongoose");
// const initData = require("./data.js"); // Your sampleListings file
// const Listing = require("../models/listing.js");
// require('dotenv').config({ path: '../.env' }); // Make sure path to .env is correct

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

// main()
//   .then(() => {
//     console.log("connected to DB");
//     initDB();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   console.log("Old data deleted.");

//   // The ID you want to assign as owner
//   const defaultOwnerId = "690b3176a3363a4ea207e8fd"; // The ID from your old code

//   for (let listing of initData.data) {
//     try {
//       // 1. Geocode the location to get coordinates
//       const location = listing.location;
//       const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
//         location
//       )}.json?key=${MAPTILER_API_KEY}&limit=1`;
      
//       const response = await fetch(url);
//       const geoData = await response.json();

//       if (!geoData.features || geoData.features.length === 0) {
//         throw new Error("No coordinates found for location.");
//       }

//       // 2. Add the geometry to the listing object
//       // This is the clean way, just like in your controller
//       listing.geometry = geoData.features[0].geometry; 

//       // 3. Add the owner
//       listing.owner = defaultOwnerId;

//       // 4. Save the listing (which now has geometry AND owner)
//       let newListing = new Listing(listing);
//       await newListing.save();

//     } catch (err) {
//       console.log(`Could not geocode ${listing.location}: ${err.message}`);
//     }
//   }
  
//   console.log("Database was initialized with new geocoded data!");
// };

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
require('dotenv').config({ path: '../.env' });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

const updateCategories = async () => {
  // 1. Define your categories array
  const categories = [
    "Trending", "Rooms", "Iconic_Cities", "Mountains", "Castles", 
    "Amazing_pools", "Camping", "Farming", "Arctic", "Domes", "Boats"
  ];

  // 2. Find ALL listings
  const allListings = await Listing.find({});

  // 3. Loop through and assign a random category
  for (let listing of allListings) {
    // Pick a random category index
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    
    listing.category = randomCat;
    await listing.save();
    console.log(`Updated ${listing.title} to category: ${randomCat}`);
  }

  console.log("All listings have been assigned a category!");
};

main()
  .then(() => {
    console.log("Connected to DB");
    updateCategories();
  })
  .catch((err) => {
    console.log(err);
  });