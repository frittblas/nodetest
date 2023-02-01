"use strict";
const sqlite3 = require("sqlite3").verbose();
let db;
let sql;

exports.connect = function connectDB() {

  db = new sqlite3.Database("./books.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  });

  console.log("Connected to DB!");

}

exports.close = function closeDB() {

  db.close();

}

function createTable() {

  sql = `CREATE TABLE books(id INTEGER PRIMARY KEY, name, genre, date, author)`;
  db.run(sql);

  console.log("Connected to DB!");

}

function dropDB() {

  db.run("DROP TABLE books");

  console.log("Dropped table books!");

}

function insertBooks() {

  sql = `INSERT INTO books(name, genre, date, author)VALUES (?, ?, ?, ?)`;

  db.run(sql, ["The Hobbit", "Fantasy", "21-09-1937", "J.R.R. Tolkien"], (err) => {
    if (err) return console.error(err.message);
  });

  db.run(sql, ["Foundation Maths", "Math", "13-12-2020", "Anthony Croft, Robert Davison"], (err) => {
    if (err) return console.error(err.message);
  });

  db.run(sql, ["The Hitchhiker's Guide to the Galaxy", "Humorous Fiction", "12-10-1979", "Douglas Adams"], (err) => {
    if (err) return console.error(err.message);
  });

  console.log("Inserted books to DB!");

}

exports.getAllBooks = function getAllBooks() {

  return new Promise((resolve, reject) => {

    sql = `SELECT * FROM books`;

    db.all(sql, [], (err, rows) => {

      if (err)
        reject(err);
      else {

        let result = "";

        rows.forEach((row) => {

          result += JSON.stringify(row) + "\n";


          //res[i++] = row;


        });

        resolve(result);

      }


    });

  });

}

exports.getBook = function getBook(name) {

  return new Promise((resolve, reject) => {

    sql = `SELECT * FROM books WHERE name = ?`;

    db.get(sql, [name], (err, row) => {

      if (err)
        reject(err);
      else
        resolve(row);

    });

  });

}


//exports.connect();
//exports.drop();
//createTable();
//insertBooks();
//console.log(exports.getAllBooks());
//exports.getBook("The Hobbit");

//console.log(exports.getBook("The Hobbit"));