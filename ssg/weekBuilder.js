import minifier from 'html-minifier';

import fileUtils from '../tasks/utils/fileUtils.js';
import renderWeekLayout from './layouts/week/weekLayout.js';
import {
  FixtureController,
  SeassonController
} from '../tasks/controllers/controllers.js';

const minify = (content, options = { collapseWhitespace: true }) =>
  minifier.minify(content, options);

const getFileName = (seassonSlug, week) =>
  `temporada-${seassonSlug}-jornada-${week}.html`;

const buildWeeks = async () => {
  const seassons = await SeassonController.findAll();

  for (const seasson of seassons) {
    for (let week = 1; week <= seasson.weeks; week++) {
      const fixtures = await FixtureController.findByMatchhWeek({
        seasson: seasson.slug,
        week
      });
      const weekLayout = renderWeekLayout(seasson, week, fixtures);
      const fileName = getFileName(seasson.slug, week);
      const fileContent = minify(weekLayout);

      fileUtils.createFile(fileName, fileContent);
    }
  }
};

export { buildWeeks };
