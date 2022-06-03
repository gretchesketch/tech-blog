const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const sessionAuth = require('../../utils/auth');

// GET /api/comments
router.get('/', async (req, res) => {
    try {
        const allComments = await Comment.findAll({
            include: [{
                model: User,
                attributes: ['username'],
                include: [{
                    model: Post,
                    attributes: ['post_title']
                }]
            }]
        });
        res.status(200).json(allComments);
    }
    catch (e) {
        res.status(400).json({ Error: e });
    }
});

// GET /api/comments/id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const commentById = await Comment.findOne({
            include: [{
                model: User,
                attributes: ['username'],
                include: [{
                    model: Post,
                    attributes: ['post_title']
                }]
            }],
            where: { id }
        });
        if (!commentById) {
            return res.status(404).json({ message: 'No comment found with this id' });
        }
        res.status(200).json(commentById);
    }
    catch (e) {
        res.status(400).json({ Error: e });
    }
});

// POST /api/comments
router.post('/', sessionAuth, (req, res) => {
    // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
    Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

// PUT /api/comments/id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.update(req.body, {
            where: { id }
        });
        const commentById = await Comment.findOne({
            where: { id }
        });
        if (!commentById) {
            return res.status(404).json({ message: 'No Comment found with this id' });
        }
        res.status(200).json({ Updated: commentById });
    }
    catch (e) {
        res.status(400).json({ Error: e });
    }
});

// DELETE /api/comments/id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const commentById = await Comment.findOne({
            where: { id }
        });
        if (!commentById) {
            return res.status(404).json({ message: 'No comment found with this id' });
        }
        await Comment.destroy({ where: { id } });
        res.status(200).json({ Deleted: commentById });

    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;