import { authorization } from '../auth/twitter.js';
import dateUtils from './dateUtils.js';
import moment from 'moment-timezone';

const ignoredHashtags = [
  // AthleticClub
  'PLInternationalCup',

  // RealSociedad
  'Zubieta',

  // realvalladolid
  'RVPromesas',

  // SDEibar
  'EibarFem',
  'futfem'
].map((hashtag) => hashtag.toLowerCase());

const ignoredStrings = ['Getafe B'];

const getTweetText = (tweet) =>
  tweet.truncated ? tweet.extended_tweet.full_text : tweet.text;

const isRetweet = (tweet) => 'retweeted_status' in tweet;

const isReply = (tweet) =>
  tweet.in_reply_to_status_id !== null &&
  tweet.in_reply_to_user_id !== tweet.user.id;

const isLaLiga = (tweet) => {
  let isLaLiga = true;

  if ('entities' in tweet && 'hashtags' in tweet.entities) {
    for (const hashtag of tweet.entities.hashtags) {
      if (isLaLiga && ignoredHashtags.includes(hashtag.text.toLowerCase())) {
        isLaLiga = false;
      }
    }
  }

  for (const ignoredString of ignoredStrings) {
    const regex = new RegExp(`^(.*?(\\b${ignoredString}\\b)[^$]*)$`, 'igm');
    if (regex.test(tweet.text)) {
      isLaLiga = false;
    }
  }

  return isLaLiga;
};

const buildRequest = (
  content,
  api = 'fullarchive', //'30day',
  environment = process.env.TWITTER_ENVIRONMENT
) => ({
  hostname: 'api.twitter.com',
  port: 443,
  path: `/1.1/tweets/search/${api}/${environment}.json`,
  method: 'POST',
  headers: {
    authorization,
    'content-length': content.length,
    'content-type': 'application/json'
  }
});

const buildQuery = (fixture) => {
  let toDate = moment.utc().subtract(1, 'minutes').format('YYYYMMDDHHmm');
  const finishDate = dateUtils.toUTCDate(fixture.finishDate);

  if (parseInt(toDate, 10) > parseInt(finishDate, 10)) {
    toDate = finishDate;
  }

  return JSON.stringify({
    fromDate: dateUtils.toUTCDate(fixture.startDate),
    maxResults: '100',
    query:
      'from:' +
      fixture.homeTeam.twitterUser +
      ' OR from:' +
      fixture.awayTeam.twitterUser +
      ' lang:es',
    toDate: toDate
  });
};

export default {
  buildQuery,
  buildRequest,
  getTweetText,
  isLaLiga,
  isReply,
  isRetweet
};
