import FixtureModel from '../../task/components/fixture/model.js';
import { sequelize } from '../../task/auth/database.js';
import weeks1819 from './18-19/seasson-18-19.js';
import weeks1920 from './19-20/seasson-19-20.js';

const seassons = [
  {
    slug: '18-19',
    weeks: weeks1819
  },
  {
    slug: '19-20',
    weeks: weeks1920
  }
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
            test(`${result.score} ${result.home}-${result.away}`, () => {
              return FixtureModel.getByTeams(
                seasson.slug,
                i + 1,
                result.home,
                result.away
              ).then((fixture) => {
                expect(fixture.score.toString()).toBe(result.score);
              });
            });
          }
        });
      }
    }
  });
}
