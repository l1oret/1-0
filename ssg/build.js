import { buildHome } from './homeBuilder.js';
import { buildSeassons } from './seassonBuilder.js';
import { buildWeeks } from './weekBuilder.js';
import { sequelize } from '../tasks/auth/database.js';

const build = async () => {
  await Promise.all([buildHome(), buildSeassons(), buildWeeks()])
    .then(() => {
      console.log('Built!');
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      sequelize.close();
    });
};

export { build };
