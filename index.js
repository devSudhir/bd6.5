const express = require("express");
const { resolve } = require("path");
const { getAllBooks, getBookById, addBook } = require("./book.js");

const app = express();
const port = 3010;

app.use(express.static("static"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

function validateBook(book) {
  if (!book) {
    return "Book data is invalid!";
  } else if (!book.title || typeof book.title != "string") {
    return "Book title is invalid!";
  } else if (!book.author || typeof book.author != "string") {
    return "Book author is invalid!";
  } else {
    return null;
  }
}

app.post("/api/book/new", async (req, res) => {
  const book = req.body;
  const error = validateBook(book);
  if (error) {
    return res.status(400).json({ error: error });
  }
  try {
    const result = await addBook(book);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app, validateBook };
