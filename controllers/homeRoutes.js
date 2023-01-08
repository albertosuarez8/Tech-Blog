const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        })
        const userData = await User.findAll()
        const users = userData.map((project) => project.get({ plain: true }));
        const posts = postData.map((project) => project.get({ plain: true }));
        res.render('home', {
            posts,
            users,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;