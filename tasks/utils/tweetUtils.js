import { authorization } from '../auth/twitter.js';
import dateUtils from './dateUtils.js';
import moment from 'moment-timezone';

// 0️⃣-9️⃣ | 0⃣-9⃣
const unicodeKeycapRegExps = Array.from(
  { length: 10 },
  (value, index) => `\\u003${index}(\\ufe0f)?\\u20e3`
);

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

const replaceKeyCap = (accumulator, unicodeKeycapRegExp, index) =>
  accumulator.replace(new RegExp(unicodeKeycapRegExp, 'gi'), index);

const getTweetText = (tweet) => {
  const tweetText = tweet.truncated
    ? tweet.extended_tweet.full_text
    : tweet.text;

  return unicodeKeycapRegExps.reduce(replaceKeyCap, tweetText);
};

const isRetweet = (tweet) => 'retweeted_status' in tweet;

const isReply = (tweet) =>
  tweet.in_reply_to_status_id !== null &&
  tweet.in_reply_to_user_id !== tweet.user.id;

const hasIgnoredHastags = (tweet) => {
  let hasIgnoredHastag = false;

  if (tweet.entities?.hashtags) {
    tweet.entities.hashtags.forEach((hashtag) => {
      if (
        !hasIgnoredHastag &&
        ignoredHashtags.includes(hashtag.text.toLowerCase())
      ) {
        hasIgnoredHastag = true;
      }
    });
  }

  return hasIgnoredHastag;
};

const hasIgnoredStrings = (tweet) => {
  let hasIgnoredString = false;

  ignoredStrings.forEach((ignoredString) => {
    const regex = new RegExp(`^(.*?(\\b${ignoredString}\\b)[^$]*)$`, 'igm');

    if (!hasIgnoredString && regex.test(tweet.text)) {
      hasIgnoredString = true;
    }
  });

  return hasIgnoredString;
};

const isLaLiga = (tweet) => {
  return !hasIgnoredHastags(tweet) && !hasIgnoredStrings(tweet);
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
