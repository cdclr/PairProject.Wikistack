// All our required modules
const express = require("express");
const morgan = require("morgan");

// Var declarations for later use
const layout = require("./views/layout");
const { db } = require("./models");
const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user.js');

// Initializing express
const app = express();
// Route-handling

// middleware handler
app.use(morgan("dev"));

// serve up static folders from public folder
app.use(express.static(__dirname + "/public"));

// urlEncoded allows us to parse request bodies
app.use(express.urlencoded({ extended: false }));

// Pull details for later use (base layer)

// Setting up db for use in stuff here

// A .then command after authentication
db.authenticate().then(() => {
  console.log("\nYou are connected to the database...");
});

// --- ROUTES ---
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

// - GETS -
app.get("/", (req, res) => {
  // Testing layout by invoking layout and passing it an empty string
  // layout("string") corresponds to ${content} in layout.js
  res.send(layout("Hello Khalid"));
});

// .sync and .listen work inside init
const init = async () => {
  await db.sync();
  const port = 3005;
  app.listen(port, () => {
    console.log(
      `Khalid, Christian, your app isn't broken anymore here on ${port}.`
    );
  });
}
init();