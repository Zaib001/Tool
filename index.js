require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connection = require('./db');
const router = require("./Routes/index.js");
const erroeHandling = require("./midleware/errorHandling")
const cookieParser = require('cookie-parser');
const app = express();


app.use(cookieParser());

app.use(
  cors({
    origin: "http://127.0.0.1:5500/",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(router);

const port = process.env.PORT || 8000;

// Database Connection
connection();

app.use("/storage", express.static("storage"));
app.use(erroeHandling);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received. Closing server and database connection.');
  server.close(() => {
    connection.close(() => {
      console.log('Server and database connection closed.');
      process.exit(0);
    });
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server and database connection.');
  server.close(() => {
    connection.close(() => {
      console.log('Server and database connection closed.');
      process.exit(0);
    });
  });
});