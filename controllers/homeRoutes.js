const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        })
        const posts = postData.map((project) => project.get({ plain: true }));
        res.render('home', {
            posts
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

module.exports = router;