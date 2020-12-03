import pipe from 'ramda/src/pipe.js';

/**
 * Fix VAR corrections and unexpected results
 * @param {array} results Array of results
 * @returs {array} results
 */
const fixResults = (results) => pipe(fixVAR, fixUnexpected)(results);

/**
 * Fix typos and other kind of unexpected reults
 * @param {object} result Current result
 * @param {number} index Current index
 * @param {array} results Array of results
 * @returs {object} result
 */
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

/**
 * Fix VAR corrections
 * @param {object} result Current result
 * @param {number} index Current index
 * @param {array} results Array of results
 * @returs {Result} result
 */
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

export { fixResults };
