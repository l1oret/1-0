import dateUtils from '../../../tasks/utils/dateUtils.js';
import path from 'path';
import pug from 'pug';

const renderSeassonLayout = (seasson, currentWeek, fixtures) => {
  const filePath = path.join(
    process.cwd(),
    '/ssg/layouts/seasson/template.pug'
  );
  const title = `Jornadas LaLiga temporada ${seasson.name} | 1-0.futbol`;

  return pug.compileFile(filePath)({
    dateUtils,
    fixtures,
    seasson,
    title,
    currentWeek,
    weeks: seasson.weeks
  });
};

export default renderSeassonLayout;
