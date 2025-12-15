const mongoose = require("mongoose");

const animalsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = animalsSchema;

