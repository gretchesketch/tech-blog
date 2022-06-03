const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

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
    const posts = allPosts.map(post => post.get({ plain: true }));
    res.render('homepage', { posts, 
      loggedIn: req.session.loggedIn //Need to change this line to true
    });
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});


router.get('/posts/:id', async (req, res) => {
  try {
    const postById = await Post.findOne({
      where: {
        id: req.params.id
      },
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

    if (!postById) {
      return res.status(404).json({ message: 'No Post found with this id' });
    }

    const post = postById.get({ plain: true });
    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn //Need to change this line to true
    });
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});


module.exports = router;