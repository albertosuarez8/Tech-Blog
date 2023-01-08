const { User } = require('../models');

const userData = [
    {
        username: 'glubtacular',
        password: 'glub',
    },
    {
        username: 'bransmartUK',
        password: 'bran',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;