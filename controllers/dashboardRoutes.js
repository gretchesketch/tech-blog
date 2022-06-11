const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post } = require("../models");

router.get("/", withAuth, async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: { userId: req.session.user_id },
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    res.render("homepage", {posts});
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/new-post", withAuth, (req, res) => {
  res.render("create-blog")
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id)
    if (postData) {
      const post = postData.get({plain: true});
      res.render("edit-post", {post})
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.redirect("login")
  }
})

module.exports = router;
