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

// --- ROUTES ---

// - GETS -
