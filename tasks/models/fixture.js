import dateUtils from '../utils/dateUtils.js';
import { ResultFactory } from '../factories/factories.js';

const SLUG_SEPARATOR = '-';

const initFixtureModel = ({
  sequelize,
  DataTypes,
  TeamModel,
  SeassonModel
}) => {
  const FixtureModel = sequelize.define(
    'fixture',
    {
      id: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true
      },
      homeTeamId: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true
      },
      awayTeamId: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true
      },
      matchWeek: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      seassonId: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true
      },
      score: {
        type: DataTypes.STRING(5),
        allowNull: true,
        get() {
          return ResultFactory.create(this.getDataValue('score'));
        },
        set(score) {
          this.setDataValue('score', score.toString());
        }
      },
      startDate: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      finishDate: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      data: {
        type: 'LONGTEXT',
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'fixture'
    }
  );

  FixtureModel.hasOne(TeamModel, {
    as: 'homeTeam',
    sourceKey: 'homeTeamId',
    foreignKey: 'id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  });

  FixtureModel.hasOne(TeamModel, {
    as: 'awayTeam',
    sourceKey: 'awayTeamId',
    foreignKey: 'id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  });

  FixtureModel.hasOne(SeassonModel, {
    as: 'seasson',
    sourceKey: 'seassonId',
    foreignKey: 'id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  });

  FixtureModel.prototype.getSlug = function () {
    return `${this.homeTeam.slug}${SLUG_SEPARATOR}${this.awayTeam.slug}`;
  };

  FixtureModel.prototype.hasStarted = function () {
    return dateUtils.isValidDate(this.startDate)
      ? dateUtils.toLocalDate(this.startDate) <= dateUtils.getCurrentDate()
      : false;
  };

  return FixtureModel;
};

export { initFixtureModel };
