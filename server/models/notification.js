import Sequelize from 'sequelize';

export default (sequelize) => {
  const Notification = sequelize.define(
    'Notification',
    {
      notifId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    },
  );

  return Notification;
};
