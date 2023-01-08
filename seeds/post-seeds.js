const { Post } = require('../models');

const postData = [
    {
        title: 'this is glubs title',
        description: 'this is glubs description',
        user_id: 1,
        date: new Date(),
    },
    {
        title: 'this is brans title',
        description: 'this is brans description',
        user_id: 2,
        date: new Date(),
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;