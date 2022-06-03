const router = require('express').Router();
const sequelize = require('../../config/connection');


// GET /login
router.get('/', (req, res) => {
    res.render('login');
});

// GET /login/signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;