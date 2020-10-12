import Sequelize from 'sequelize';

import { sequelize } from '../auth/database.js';

import { initFixtureModel } from './fixture.js';
import { initTeamModel } from './team.js';
import { initSeassonModel } from './seasson.js';

const { DataTypes } = Sequelize;

const TeamModel = initTeamModel({ sequelize, DataTypes });
const SeassonModel = initSeassonModel({ sequelize, DataTypes });
const FixtureModel = initFixtureModel({
  sequelize,
  DataTypes,
  TeamModel,
  SeassonModel
});

export { FixtureModel, SeassonModel, TeamModel };
