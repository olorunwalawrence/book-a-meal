const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstname: 'Ezinne',
      lastname: 'Njoku',
      username: 'chubby',
      email: 'chubby@gmail.com',
      isAdmin: true,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: 'Kelechi',
      lastname: 'Njoku',
      username: 'kcee',
      email: 'kcee@gmail.com',
      isAdmin: false,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: 'Nnamdi',
      lastname: 'James',
      username: 'james',
      email: 'james@gmail.com',
      isAdmin: false,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
