module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      through: 'MealMenu',
      foreignKey: 'menuId',
      otherKey: 'mealId',
    });
  };

  return Menu;
};
