import EventEmitter from 'events';
import https from 'https';
import tweetUtils from '../utils/tweetUtils.js';

const EVENT = 'twitterDataGet';

const getByFixture = (fixture, callback) => {
  const emitter = new EventEmitter().on(EVENT, callback);
  const data = tweetUtils.buildQuery(fixture);
  const httpRequest = https.request(
    tweetUtils.buildRequest(data),
    (response) => {
      let tweets = '';

      response.setEncoding('utf8');
      response.on('data', (chunk) => (tweets += chunk));
      response.on('end', () =>
        emitter.emit(EVENT, JSON.parse(tweets), fixture)
      );
    }
  );

  httpRequest.on('error', (error) => console.error(error));
  httpRequest.write(data);
  httpRequest.end();
};

export default { getByFixture };
