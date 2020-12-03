import dateUtils from '../utils/dateUtils.js';
import tweetModel from '../twitter/model.js';
import { FixtureController } from '../controllers/controllers.js';
import { build } from '../../ssg/build.js';
import { getFinalResult } from './getFinalResult.js';
import { io } from '../app.js';

const buildContent = (fixture) => ({
  id: fixture.getSlug(),
  content: {
    home: fixture.score.home,
    away: fixture.score.away
  }
});

const processTweets = async (response, fixture) => {
  try {
    if ('error' in response || !response.results.length) {
      throw new Error('No tweets found!');
    }

    fixture.score = getFinalResult(response.results);

    FixtureController.updateFixtureResultById({
      id: fixture.id,
      score: fixture.score.toString(),
      data: JSON.stringify(response)
    });

    io.emit('home', buildContent(fixture));
    build();
    console.info('[1-0]', fixture.getSlug(), fixture.score.toString());
  } catch (error) {
    console.error('[1-0]', error.message, error, response);
  }
};

const runByDate = async (date = dateUtils.getCurrentDate()) => {
  try {
    const fixtures = await FixtureController.findByDate({ date });

    runTask(fixtures);
  } catch (error) {
    console.error('[1-0]', error.message, error);
  }
};

const runTask = (fixtures) => {
  try {
    if (!fixtures.length) {
      throw new Error('No fixtures found!');
    }

    fixtures.forEach((fixture) =>
      tweetModel.getByFixture(fixture, processTweets)
    );
  } catch (error) {
    console.error('[1-0]', error.message, error);
  }
};

export { runByDate, runTask };
