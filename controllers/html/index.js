const router = require('express').Router();
const homeRoute = require('./home-route.js');
const loginRoute = require('./login-route.js');
const dashboardRoute = require('./dashboard-route.js');


router.use('/', homeRoute);
router.use('/login', loginRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;