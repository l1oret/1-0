import minifier from 'html-minifier';

import { SeassonController } from '../tasks/controllers/controllers.js';
import fileUtils from '../tasks/utils/fileUtils.js';
import renderHomeLayout from './layouts/home/homeLayout.js';

const minify = (content, options = { collapseWhitespace: true }) =>
  minifier.minify(content, options);

const getFileName = () => 'index.html';

const buildHome = async () => {
  const seassons = await SeassonController.findAll();

  const seassonLayout = renderHomeLayout(seassons);
  const fileName = getFileName();
  const fileContent = minify(seassonLayout);

  fileUtils.createFile(fileName, fileContent);
};

export { buildHome };
