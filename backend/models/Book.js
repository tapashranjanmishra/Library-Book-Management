const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
    trim: true
  },

  authorName: {
    type: String,
    required: true,
    trim: true
  },

  isbn: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true,
    trim: true
  },

  publicationYear: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Book", bookSchema);