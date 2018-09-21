// Initialize express
const express = require("express");
const app = express();

// middleware handler
const morgan = require("morgan");
app.use(morgan("dev"));

// serve up static folders from public folder
app.use(express.static(__dirname + "/public"));

// urlEncoded allows us to parse request bodies
app.use(express.urlencoded({ extended: false }));

// Pull details for later use (base layer)
const layout = require("./views/layout");

// Setting up db for use in stuff here
const { db } = require("./models");

// --- ROUTES ---

// - GETS -
app.get("/", (req, res) => {
  // Testing layout by invoking layout and passing it an empty string
  // layout("string") corresponds to ${content} in layout.js
  res.send(layout("Hello Khalid"));
});

// - LISTEN -
const port = 3005;
app.listen(port, () => {
  console.log(
    `Khalid, Christian, your app isn't broken anymore here on ${port}.`
  );
});
