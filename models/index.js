// Setup for Sequelize
const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

// Slugify to handle URL-slugs
// -- When adding a row, hook into the process, then slugify the string
const slugify = require("slugify");

// Schema setup aka db.define(STUFF)
const Page = db.define("pages", {
  title: {
    type: Sequelize.STRING,
    allowNull: false // title MUST be defined
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

// Before the page submits from to create page...
Page.beforeValidate(pageInstance => {
  // Create the slug from the title grabbed from body and passed into slugify
  pageInstance.slug = slugify(pageInstance.title);
});

const User = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

// export the whoooooooole db
module.exports = {
  db,
  Page,
  User
};
