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
    allowNull: false,
    validate: {
      isSlug(value) {
      if (slugify(value) !== value)
        throw new Error('Please enter a valid slug');
      }
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: { 
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
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
  db, Page, User
};
