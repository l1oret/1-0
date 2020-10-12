import Sequelize from 'sequelize';

import { SeassonModel } from '../models/models.js';

const findAll = () =>
  SeassonModel.findAll({
    attributes: [
      [Sequelize.fn('HEX', Sequelize.col('id')), 'id'],
      'name',
      'slug',
      'weeks'
    ]
  })
    .then((seassons) => {
      return seassons;
    })
    .catch((err) => {
      console.log('Error while retrieving Seassons', err);
    });

export { findAll };
