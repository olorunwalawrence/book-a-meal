import Sequelize from 'sequelize';

export default (sequelize) => {
  const Order = sequelize.define('Order', {
    mealId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'default-img.jpg'
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId',
        as: 'userId'
      }
    }
  }, { paranoid: true });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      as: 'customer',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Order;
};
