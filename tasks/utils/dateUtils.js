import moment from 'moment-timezone';

moment.locale('es');

const DATABASE_DATE_FORMAT = 'YYYYMMDDHHmm';
const FRIENDLY_DATE_FORMAT = 'ddd, M/D HH:mm';
const TIMEZONE = 'Europe/Madrid';

/**
 * Validate a date
 * @return {Boolean}
 */
const isValidDate = (date) => date.toString().length === 12;

/**
 * To date parts (date and time)
 * @example ['20190823', '2000']
 * @return {Array}
 */
const toDateParts = (date) => {
  return [date.toString().slice(0, 8), date.toString().slice(8, 12)];
};

/**
 * To friendly date format
 * @example Fri, 8/23 20:00
 * @return {String}
 */
const toFriendlyDate = (date) => {
  let dateString = date.toString();

  if (isValidDate(date)) {
    const [datePart, timePart] = toDateParts(date);
    dateString = moment
      .tz(`${datePart} ${timePart}`, TIMEZONE)
      .format(FRIENDLY_DATE_FORMAT);
  }

  return dateString;
};

/**
 * To ISO 8601 date
 * @example 2019-08-23T20:00:00+02:00
 * @return {String}
 */
const toISODate = (date) => {
  let dateString = date.toString();

  if (isValidDate(date)) {
    const [datePart, timePart] = toDateParts(date);

    dateString = moment.tz(`${datePart} ${timePart}`, TIMEZONE).format();
  }

  return dateString;
};

/**
 * To local date (Europe/Madrid)
 * @example 201908232000
 * @return {String}
 */
const toLocalDate = (date) => {
  let dateString = date.toString();

  if (isValidDate(date)) {
    const [datePart, timePart] = toDateParts(date);

    dateString = moment
      .tz(`${datePart} ${timePart}`, TIMEZONE)
      .format(DATABASE_DATE_FORMAT);
  }

  return dateString;
};

/**
 * To UTC date (Coordinated Universal Time)
 * @example 201908232000
 * @return {String}
 */
const toUTCDate = (date) => {
  let dateString = date.toString();

  if (isValidDate(date)) {
    const [datePart, timePart] = toDateParts(date);

    dateString = moment
      .tz(`${datePart} ${timePart}`, TIMEZONE)
      .utc()
      .format(DATABASE_DATE_FORMAT);
  }

  return dateString;
};

const getCurrentDate = () => moment.tz(TIMEZONE).format(DATABASE_DATE_FORMAT);

export default {
  getCurrentDate,
  isValidDate,
  toDateParts,
  toFriendlyDate,
  toISODate,
  toLocalDate,
  toUTCDate
};
