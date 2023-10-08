const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },  
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
},{timestamps: true});

module.exports = mongoose.model("ratings", ratingSchema);