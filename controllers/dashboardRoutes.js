const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User } = require("../models");

router.get("/", withAuth, async (req, res) => {
  console.log("dashboard")
  try {
    const postsData = await Post.findAll({
      include: [
        {
          model: User
        },
      ],
      where: { userId: req.session.user_id },
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {posts});
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
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
