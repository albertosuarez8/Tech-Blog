const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        })
        const posts = postData.map((project) => project.get({ plain: true }));
        res.render('home', {
            posts,
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

router.get('/dashboard', withAuth, async (req, res) => {
    if (req.session.logged_in) {
        const user = await User.findOne({ where: { username: req.session.username } });
        const postData = await Post.findAll({ where: { user_id: user.id } });
        const posts = postData.map((project) => project.get({ plain: true }));
        res.render('dashboard', {
            logged_in: req.session.logged_in,
            posts
        });
        return;
    }
    res.render('login');
})

router.get('/dashboard/createpost', withAuth, (req, res) => {
    res.render('createpost');
});

router.get('/dashboard/updatepost/:id', withAuth, async (req, res) => {
    const postData = await Post.findByPk(req.params.id);
    res.render('updatepost', {
        logged_in: req.session.logged_in,
        postTitle: postData.title,
        postDescription: postData.description,
        postId: postData.id
    });
})

module.exports = router;