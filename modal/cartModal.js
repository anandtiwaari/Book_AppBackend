const mongoose = require("mongoose");

const cartModal = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "The title is required"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
  },
  isFavourite: {
    type: Boolean,
    required: [true, "The isFavourite is required"],
  },
  userId: {
    type: String,
  },
});

const cart = new mongoose.model("cart", {
  userId: {
    type: String,
    required: true,
  },
  cartData: [cartModal],
});

module.exports = cart;
