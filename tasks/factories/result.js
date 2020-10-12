const DEFAULT_SCORE = 0;
const SCORE_SEPARATOR = '-';
const DEFAULT_RESULT = `${DEFAULT_SCORE}${SCORE_SEPARATOR}${DEFAULT_SCORE}`;
const REGEX_REMOVE_WHITESPACE = /\s/g;

const create = (result = DEFAULT_RESULT) => {
  const [home, away] = result
    .replace(REGEX_REMOVE_WHITESPACE, '')
    .split(SCORE_SEPARATOR)
    .map((score) => Number(score));

  return {
    home,
    away,
    isEqualTo(result) {
      return this.toString() === result.toString();
    },
    setAway(away) {
      this.away = away;
    },
    setHome(home) {
      this.home = home;
    },
    toString() {
      return `${this.home}${SCORE_SEPARATOR}${this.away}`;
    }
  };
};

export { create, DEFAULT_RESULT };
