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
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(router);

const port = process.env.PORT || 8000;

// Database Connection
const db = connection();

app.use("/storage", express.static("storage"));
app.use(erroeHandling);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received. Closing server and database connection.');
  server.close(() => {
    db.close(() => {
      console.log('Server and database connection closed.');
      process.exit(0);
    });
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server and database connection.');
  server.close(() => {
    db.close(() => {
      console.log('Server and database connection closed.');
      process.exit(0);
    });
  });
});
