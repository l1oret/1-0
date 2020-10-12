import dateUtils from '../../../tasks/utils/dateUtils.js';
import path from 'path';
import pug from 'pug';

const renderHomeLayout = (seassons) => {
  const filePath = path.join(process.cwd(), '/ssg/layouts/home/template.pug');
  const title = '1-0.futbol';

  return pug.compileFile(filePath)({
    dateUtils,
    seassons,
    title
  });
};

export default renderHomeLayout;
