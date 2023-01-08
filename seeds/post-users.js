const { User } = require('../models');

const userData = [
    {
        username: 'glub',
        password: 'alengthoften'
    },
    {
        username: 'bran',
        password: 'alengthoftenn'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;