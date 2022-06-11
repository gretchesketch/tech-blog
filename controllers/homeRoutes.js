const router = require('express').Router();
const { Post, User, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    let userText;
    let name;
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // if(req.session.logged_in) {
    //   const userData = await User.findByPk(req.session.user_id, {
    //     attributes: { exclude: ['password'] },
    //   });
  
    //   userText = userData.get({ plain: true });
    //   name= userText['username']
    //   console.log('user', name)
    // };
    res.render('homepage', { 
      posts, logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

   if (postData) {
     const blog = postData.get({plain:true})
     res.render('blog-page', {blog})
   }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
// router.get('/dashboard', async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });

//     console.log('user', user)
//     res.render('dashboard', {
//       ...user,
//       logged_in: req.session.logged_in,
//       name:req.session.name
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });





  
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;