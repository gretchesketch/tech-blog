const router = require('express').Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
      console.log(req);
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.user_id
      });
      console.log("New Comment", newComment);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;