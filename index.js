const express = require("express");

const { open } = require("sqlite");

const sqlite3 = require("sqlite3");

const path = require("path");
const dbFilePath = path.join(__dirname, "goodreads.db");

const app = express();

let db = null;

const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbFilePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBandServer();

app.get("/books/", async (request, response) => {
  const booksQuery = `SELECT * FROM book ORDER BY book_id;`;

  const resultQuery = await db.all(booksQuery);
  response.send(resultQuery);
});
