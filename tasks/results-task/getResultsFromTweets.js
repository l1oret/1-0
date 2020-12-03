import { ResultFactory } from '../factories/factories.js';

/**
 * Get the result from the tweet
 * @param {Array} results Array of accumulated results
 * @param {Object} tweet Tweet
 * @returns {Array} results
 */
const getResultFromTweet = (results, tweet) =>
  results.concat(tweet.extractResult());

/**
 * Get an array of results from tweets
 * @param {Array} tweets Tweets
 * @returns {Array} results
 */
const getResultsFromTweets = (tweets) => {
  const results = tweets.reduceRight(getResultFromTweet, []);
  return [ResultFactory.create(), ResultFactory.create()].concat(results);
};

export { getResultsFromTweets };
