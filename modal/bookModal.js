const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const bookModal = new mongoose.model("bookData", bookSchema);

module.exports = bookModal;
