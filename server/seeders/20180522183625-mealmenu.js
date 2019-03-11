module.exports = {
  up: queryInterface => queryInterface.bulkInsert('MealMenus', [
    {
      mealId: 1,
      menuId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      mealId: 2,
      menuId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      mealId: 3,
      menuId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      mealId: 1,
      menuId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      mealId: 3,
      menuId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      mealId: 2,
      menuId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('MealMenus', null, {}),
};
