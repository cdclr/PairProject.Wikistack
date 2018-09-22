// ROUTER setup
const express = require("express");
const router = express.Router();
//
const { Page } = require("../models");
const { addPage, wikiPage, main } = require("../views/");

router.get("/", async (req, res, next) => {
  const pages = await Page.findAll()
//   console.log(pages);  // WRONG AF
  res.send(main(pages));
});

router.post("/", async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage(req));
  // res.send('GET /wiki/add');  WORKS
});

// For each added wiki-page
router.get("/:slug", async (req, res, next) => {
//   res.send(`hit dynamic route at ${req.params.slug}`);
  // res.send('GET /wiki/add');  WORKS
    const pageInfo = await Page.findOne({
        where: {slug: `${req.params.slug}`}
    })
    res.send(wikiPage(pageInfo));
});

module.exports = router;
