const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sessionAuth = require('../../utils/auth');

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      attributes: [
        'id',
        'post_title',
        'post_contents',
        'createdAt'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id', 'updatedAt'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    res.status(200).json(allPosts);
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});

// GET /api/posts/id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const postById = await Post.findOne({
      where: { id }
    });
    if (!postById) {
      return res.status(404).json({ message: 'No Post found with this id' });
    }
    res.status(200).json(postById);
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});

// POST /api/posts
router.post('/', sessionAuth, async (req, res) => {
  try {
    // console.log(req.body);
    const { post_title, post_contents} = req.body;
    const user_id = req.session.user_id;  // should be 'f7922fa0-b26a-4223-b1c5-172799866878'
    // console.log("Post Route", post_title, post_contents);
    const newPost = await Post.create({
      post_title,
      post_contents,
      user_id 
    });
    res.status(200).json(newPost);
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});

// PUT /api/posts/id
router.put('/:id', sessionAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await Post.update(req.body, {
      where: { id }
    });
    const postById = await Post.findOne({
      where: { id }
    });
    if (!postById) {
      return res.status(404).json({ message: 'No Post found with this id' });
    }
    res.status(200).json({Updated: postById});
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});

// DELETE /api/posts/id
router.delete('/:id', sessionAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const postById = await Post.findOne({
      where: { id }
    });
    if (!postById) {
      return res.status(404).json({ message: 'No post found with this id' });
    }
    await Post.destroy({ where: { id } });
    res.status(200).json({ Deleted: postById });

  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;