const mongoose = require("mongoose");
module.exports = () => {
  debugger;
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB!");
  });
};

// "mongodb+srv://zebimalik4567:kEO35IfqIEb8vJU8@cluster0.kmgg6y8.mongodb.net/test
