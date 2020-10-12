const initSeassonModel = ({ sequelize, DataTypes }) => {
  const SeassonModel = sequelize.define(
    'seasson',
    {
      id: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true
      },
      slug: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: 'slug'
      },
      name: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      weeks: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'seasson'
    }
  );

  return SeassonModel;
};

export { initSeassonModel };
