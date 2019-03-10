module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Meal.associate = (models) => {
    Meal.belongsToMany(models.Menu, {
      through: 'MealMenu',
      foreignKey: 'MealId',
      otherKey: 'MenuId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Meal;
};
