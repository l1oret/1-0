import pipe from 'ramda/src/pipe.js';

import { buildWeeks } from '../../ssg/weekBuilder.js';
import dateUtils from '../utils/dateUtils.js';
import { FixtureController } from '../controllers/controllers.js';
import tweetModel from '../twitter/model.js';
import { ResultFactory, TwitterFactory } from '../factories/factories.js';
import { io } from '../app.js';

const buildContent = (fixture) => ({
  id: fixture.getSlug(),
  content: {
    home: fixture.score.home,
    away: fixture.score.away
  }
});

const filterValidTweets = (tweets) => tweets.filter((tweet) => tweet.isValid());

const getResultFromTweet = (results, tweet) =>
  results.concat(tweet.extractResult());

const getResultsFromTweets = (tweets) => {
  const results = tweets.reduceRight(getResultFromTweet, []);
  return [ResultFactory.create(), ResultFactory.create()].concat(results);
};

const fixVAR = (result, index, results) => {
  if (index > 2) {
    const controlResult = results[index - 3];
    const previousResult = results[index - 2];

    if (result.isEqualTo(controlResult) && !result.isEqualTo(previousResult)) {
      results[index - 2] = results[index - 1];
    }
  }

  return result;
};

const fixUnexpected = (result, index, results) => {
  if (index > 1) {
    const previousResult = results[index - 1];
    const homeScoreDiff = previousResult.home - result.home;
    const awayScoreDiff = previousResult.away - result.away;

    if (homeScoreDiff > 1 || awayScoreDiff > 1) {
      result = previousResult;
    }
  }

  return result;
};

const isValidResponse = (response) =>
  Array.isArray(response) && response.length;

const getTweets = (response) =>
  response.map((tweet) => TwitterFactory.create(tweet));

const fixResults = (results) => pipe(fixVAR, fixUnexpected)(results);

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

const processTweets = async (response, fixture) => {
  try {
    if ('error' in response || !response.results.length) {
      throw new Error('No tweets found!');
    }
    console.log(response.results);
    fixture.score = getFinalResult(response.results);
    FixtureController.setScoreById(
      fixture.id,
      fixture.score.toString(),
      response
    );
    io.emit('home', buildContent(fixture));
    buildWeeks();
    console.info('[1-0]', fixture.getSlug(), fixture.score.toString());
  } catch (error) {
    console.error('[1-0]', error.message, error, response);
  }
};

const run = async (date = dateUtils.getCurrentDate()) => {
  try {
    /* let fixture = FixtureController.findOneByTeams({
      seasson: '19-20',
      week: 38,
      homeTeam: 'LevanteUD',
      awayTeam: 'GetafeCF'
    });

    tweetModel.getByFixture(fixture, processTweets) */

    const fixtures = await FixtureController.findByDate({ date });

    if (!fixtures.length) {
      throw new Error('No fixtures found!');
    }

    for (const fixture of fixtures) {
      tweetModel.getByFixture(fixture, processTweets);
    }
  } catch (error) {
    console.error('[1-0]', error.message, error);
  }
};

export { run };
