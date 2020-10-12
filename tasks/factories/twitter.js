import tweetUtils from '../utils/tweetUtils.js';
import { ResultFactory } from '../factories/factories.js';

const RESULT_REGEX = /\b(1?[0-9]\s?-\s?1?[0-9])\b/g;

const create = (tweet) => ({
  data: tweet,
  text: tweetUtils.getTweetText(tweet),
  extractResult() {
    const matches = [...this.text.matchAll(RESULT_REGEX)];

    let score = null;

    if (matches.length) {
      const scores = [];

      for (let index = 0; index < matches.length; index++) {
        const element = matches[index];

        if (element.length) {
          scores.push(ResultFactory.create(element[0]));
        }
      }

      score = scores.sort().pop();
    }

    return score;
  },
  hasScores() {
    return this.extractResult() !== null;
  },
  isValid() {
    return (
      !tweetUtils.isReply(this.data) &&
      !tweetUtils.isRetweet(this.data) &&
      tweetUtils.isLaLiga(this.data) &&
      this.hasScores()
    );
  }
});

export { create, RESULT_REGEX };
