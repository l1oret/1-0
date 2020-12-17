import { FixtureController } from '../../tasks/controllers/controllers.js';
import { sequelize } from '../../tasks/auth/database.js';
import weeks1819 from './18-19/seasson-18-19.js';
import weeks1920 from './19-20/seasson-19-20.js';
import weeks2021 from './20-21/seasson-20-21.js';

const seassons = [
  { slug: '18-19', weeks: weeks1819 },
  { slug: '19-20', weeks: weeks1920 },
  { slug: '20-21', weeks: weeks2021 }
];

afterAll(() => {
  sequelize.close();
});

for (const seasson of seassons) {
  describe(`Seasson ${seasson.slug}`, () => {
    for (let i = 0; i < seasson.weeks.length; i++) {
      const week = seasson.weeks[i];

      if (week) {
        describe(`Week ${i + 1}`, () => {
          for (const result of week) {
            test(`${result.score} ${result.home}-${result.away}`, () =>
              FixtureController.findOneByTeams({
                seasson: seasson.slug,
                week: i + 1,
                homeTeam: result.home,
                awayTeam: result.away
              }).then((fixture) => {
                expect(fixture.score.toString()).toBe(result.score);
              }));
          }
        });
      }
    }
  });
}
