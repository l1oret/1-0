import Sequelize from 'sequelize';

import { FixtureModel, TeamModel, SeassonModel } from '../models/models.js';

const { Op } = Sequelize;

const findOneByTeams = ({ seasson, week, homeTeam, awayTeam }) =>
  FixtureModel.findOne({
    attributes: ['finishDate', 'id', 'matchWeek', 'score', 'startDate'],
    where: { matchWeek: week },
    include: [
      {
        as: 'homeTeam',
        attributes: ['slug', 'team', 'twitterUser'],
        model: TeamModel,
        where: { twitterUser: homeTeam }
      },
      {
        as: 'awayTeam',
        attributes: ['slug', 'team', 'twitterUser'],
        model: TeamModel,
        where: { twitterUser: awayTeam }
      },
      {
        as: 'seasson',
        attributes: ['slug', 'name', 'weeks'],
        model: SeassonModel,
        where: { slug: seasson }
      }
    ]
  })
    .then((fixture) => {
      return fixture;
    })
    .catch((err) => {
      console.log('Error while retrieving Fixtures', err);
    });

const findByMatchhWeek = ({ seasson, week }) =>
  FixtureModel.findAll({
    attributes: ['finishDate', 'id', 'matchWeek', 'score', 'startDate'],
    where: { matchWeek: week },
    include: [
      {
        as: 'homeTeam',
        attributes: ['slug', 'team', 'twitterUser'],
        model: TeamModel
      },
      {
        as: 'awayTeam',
        attributes: ['slug', 'team', 'twitterUser'],
        model: TeamModel
      },
      {
        as: 'seasson',
        attributes: ['slug', 'name', 'weeks'],
        model: SeassonModel,
        where: { slug: seasson }
      }
    ]
  })
    .then((fixtures) => {
      return fixtures;
    })
    .catch((err) => {
      console.log('Error while retrieving Fixtures', err);
    });

const findByDate = ({ dateString }) =>
  FixtureModel.findAll({
    attributes: ['finishDate', 'id', 'matchWeek', 'score', 'startDate'],
    where: {
      startDate: { [Op.lte]: dateString },
      finishDate: { [Op.gte]: dateString }
    },
    include: [
      {
        as: 'homeTeam',
        attributes: ['slug', 'team', 'twitterUser'],
        model: TeamModel
      },
      {
        as: 'awayTeam',
        attributes: ['slug', 'team', 'twitterUser'],
        model: TeamModel
      },
      {
        as: 'seasson',
        attributes: ['slug', 'name', 'weeks'],
        model: SeassonModel
      }
    ]
  })
    .then((fixtures) => {
      return fixtures;
    })
    .catch((err) => {
      console.log('Error while retrieving Fixtures', err);
    });

const updateFixtureResultById = ({ id, score, data }) =>
  FixtureModel.update({ score, data }, { where: { id } })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('Error while retrieving Fixtures', err);
    });

export {
  findByDate,
  findByMatchhWeek,
  findOneByTeams,
  updateFixtureResultById
};
