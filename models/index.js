// Setup for Sequelize
const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

// Slugify to handle URL-slugs
// -- When adding a row, hook into the process, then slugify the string
// const slugify = require("slugify");

// Schema setup aka db.define(STUFF)
const Page = db.define("pages", {
  title: {
    type: Sequelize.STRING,
    allowNull: false // title MUST be defined
  },
  slug: {
    type: Sequelize.STRING
    // validate: {
    //   if (slug === slugify(slug))
    // }
  },
  content: Sequelize.TEXT,
  status: Sequelize.BOOLEAN
});

const User = db.define("users", {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

// export the whoooooooole db
module.exports = {
  db
};
