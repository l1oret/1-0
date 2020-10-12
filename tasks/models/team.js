const initTeamModel = ({ sequelize, DataTypes }) => {
  const TeamModel = sequelize.define(
    'team',
    {
      id: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true
      },
      slug: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      team: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      twitterUser: {
        type: DataTypes.STRING(15),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'team'
    }
  );

  return TeamModel;
};

export { initTeamModel };
