import minifier from 'html-minifier';

import { SeassonController } from '../tasks/controllers/controllers.js';
import fileUtils from '../tasks/utils/fileUtils.js';
import renderSeassonLayout from './layouts/seasson/seassonLayout.js';

const minify = (content, options = { collapseWhitespace: true }) =>
  minifier.minify(content, options);

const getFileName = (seassonSlug) => `temporada-${seassonSlug}.html`;

const buildSeassons = async () => {
  const seassons = await SeassonController.findAll();

  for (const seasson of seassons) {
    const seassonLayout = renderSeassonLayout(seasson);
    const fileName = getFileName(seasson.slug);
    const fileContent = minify(seassonLayout);

    fileUtils.createFile(fileName, fileContent);
  }
};

export { buildSeassons };
