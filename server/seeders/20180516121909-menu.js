module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Menus', [
    {
      date: new Date().toISOString().substr(0, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date: '2018-05-15',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date: '2018-05-18',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Menus', null, {}),
};
