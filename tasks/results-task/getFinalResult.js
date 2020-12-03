import pipe from 'ramda/src/pipe.js';

import { ResultFactory, TwitterFactory } from '../factories/factories.js';
import { fixResults } from './fixResults.js';
import { getResultsFromTweets } from './getResultsFromTweets.js';

/**
 * Filter valid tweets
 * @param {Array} tweets Unfiltered tweets
 * @returns {Array} Filtered tweets
 */
const filterValidTweets = (tweets) => tweets.filter((tweet) => tweet.isValid());

/**
 * Get the final result of the match from Twitter API response
 * @param {Object} response Twitter API response
 * @returns {Object} result
 */
const getFinalResult = (response) => {
  let result = ResultFactory.create();

  if (isValidResponse(response)) {
    const results = pipe(
      getTweets,
      filterValidTweets,
      getResultsFromTweets,
      fixResults
    )(response);

    result = results.pop();
  }

  return result;
};

/**
 * Get and array of tweet objects from the Twitter API response
 * @param {object} response Twitter API response
 * @returns {Array} tweets
 */
const getTweets = (response) =>
  response.map((tweet) => TwitterFactory.create(tweet));

/**
 * Validate Twitter API response
 * @param {Object} response Twitter API response
 * @returns {Boolean}
 */
const isValidResponse = (response) =>
  Array.isArray(response) && response.length;

export { getFinalResult };
