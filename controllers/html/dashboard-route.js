const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sessionauth = require('../../utils/auth');

// Get /dashboard
router.get('/', sessionauth, async (req, res) => {
    try {
        const postsByUser = await Post.findAll({
            where: {
                user_id: req.session.user_id   // should change to 'f7922fa0-b26a-4223-b1c5-172799866878'
            },
            attributes: [
                'id',
                'post_title',
                'post_contents',
                'createdAt'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment', 'post_id', 'user_id', 'createdAt'],
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

        const posts = postsByUser.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    }
    catch (e) {
        res.status(400).json({ Error: e });
    }
});

// Get /dashboard/edit/:id
router.get('/edit/:id', sessionauth, async (req, res) => {
    const { id } = req.params;
    try {
        const postToEdit = await Post.findOne({
            where: { id },
            attributes: [
                'id',
                'post_title',
                'post_contents',
                'createdAt'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment', 'post_id', 'user_id', 'createdAt'],
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

        console.log(postToEdit);

        if (!postToEdit) {
            return res.status(404).json({ message: 'No Post found with this id' });
        }
        const post = postToEdit.get({ plain: true });

        console.log(post);

        res.render('edit-post', {
            post,
            loggedIn: true
        });
    }
    catch (e) {
        res.status(400).json({ Error: e });
    }
});

router.get('/new', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    })
});

module.exports = router;