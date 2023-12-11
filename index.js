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
    origin: 'https://hubitai.co',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

