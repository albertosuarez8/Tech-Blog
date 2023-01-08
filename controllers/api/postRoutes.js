const router = require('express').Router();
const { Post, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.session.username } });
        const postData = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: user.id,
            date: new Date(),
        });
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;