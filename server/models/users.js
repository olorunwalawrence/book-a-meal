import { hashPassword } from '../helpers/helpers';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('caterer', 'customer'),
      allowNull: false
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  User.beforeCreate(user => hashPassword(user), { individualHooks: true });

  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: 'userId',
    });
  };

  return User;
};
