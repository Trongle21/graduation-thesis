const mongoose = require("mongoose");

const connectData = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pet_spa");
    console.log("Connect data success!");
  } catch (err) {
    console.log("Connected data failed!");
  }
};

module.exports = { connectData };
