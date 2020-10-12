import dateUtils from '../../../tasks/utils/dateUtils.js';
import getWeeks from './weekUtils.js';
import path from 'path';
import pug from 'pug';

const renderWeekLayout = (seasson, currentWeek, fixtures) => {
  const filePath = path.join(process.cwd(), '/ssg/layouts/week/template.pug');
  const weeks = getWeeks(currentWeek);
  const title = `Resultados jornada ${currentWeek} LaLiga temporada ${seasson.name} | 1-0.futbol`;

  return pug.compileFile(filePath)({
    dateUtils,
    fixtures,
    seasson,
    title,
    currentWeek,
    weeks
  });
};

export default renderWeekLayout;
