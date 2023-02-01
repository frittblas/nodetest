"use strict";
let db = require('./database');

// import libs and tools
const express = require('express');
const app = express();

// listening on port
app.listen(5000, () => {
  console.log("Server listening on port: " + 5000);
});

// Basic get
app.get('/Welcome', function (req, res) {

  res.json("Welcome to the bookstore");

});

app.get('/books', async (req, res) => {

  let result = await db.getAllBooks();
  console.log(result);
  res.json(result);

});
/*
app.get('/books/:nameId', (req, res) => {

  let result = db.getBook(req.params.nameId)
    .then(result => {
      res.json(result);
    }).catch(err => {
      console.error(err);
    });
});
*/
app.get('/books/:nameId', async (req, res) => {

  try {
    let result = await db.getBook(req.params.nameId);
    res.json(result);
  } catch (error) {
    console.log(error);
  }

});

db.connect();