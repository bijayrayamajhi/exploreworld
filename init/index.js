const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/exploreworld');
   }
   main()
     .then((res) => {console.log("connection successful")})
     .catch((err) => {console.log(err)});


async function initDb() {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => 
        ({...obj, owner: "6642d617e6778b6983fa6748"})
    );
    await Listing.insertMany(initData.data) ;
};

initDb()
.then((res) => {
    console.log("data saved to the database");
})
.catch((err) => {
    console.log(err)
});

