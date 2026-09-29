const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Book = require("./models/Book");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Library Book Management API is running");
});

// POST /api/books
app.post("/api/books", async (req, res) => {
  try {
    const {
      bookTitle,
      authorName,
      isbn,
      category,
      publicationYear
    } = req.body;

    // Validate required fields
    if (
      !bookTitle ||
      !authorName ||
      !isbn ||
      !category ||
      !publicationYear
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Create book
    const newBook = new Book({
      bookTitle,
      authorName,
      isbn,
      category,
      publicationYear
    });

    // Save to MongoDB
    const savedBook = await newBook.save();

    // Return created book
    res.status(201).json({
      message: "Book added successfully",
      book: savedBook
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});