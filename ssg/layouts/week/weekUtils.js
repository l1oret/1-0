const getWeeks = (currentWeek, seassonWeeks = 38, weeksToShow = 5) => {
  let weeks = [];

  if (currentWeek >= 1 && currentWeek <= seassonWeeks) {
    let begin = currentWeek - 1;

    if (begin < 1) {
      begin = 1;
    }

    if (begin + weeksToShow > seassonWeeks) {
      begin -= ((begin + weeksToShow) % seassonWeeks) - 1;
    }

    weeks = Array.from([...Array(weeksToShow).keys()], (week) => week + begin);
  }

  return weeks;
};

export default getWeeks;
