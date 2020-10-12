import getWeeks from '../../ssg/layouts/week/weekUtils.js';

describe('Get weeks to show from current week', () => {
  test('Current week -1', () => {
    expect(getWeeks(-1)).toEqual([]);
  });

  test('Current week 0', () => {
    expect(getWeeks(0)).toEqual([]);
  });

  test('Current week 1', () => {
    expect(getWeeks(1)).toEqual([1, 2, 3, 4, 5]);
  });

  test('Current week 2', () => {
    expect(getWeeks(2)).toEqual([1, 2, 3, 4, 5]);
  });

  test('Current week 3', () => {
    expect(getWeeks(3)).toEqual([2, 3, 4, 5, 6]);
  });

  test('Current week 20', () => {
    expect(getWeeks(20)).toEqual([19, 20, 21, 22, 23]);
  });

  test('Current week 34', () => {
    expect(getWeeks(34)).toEqual([33, 34, 35, 36, 37]);
  });

  test('Current week 35', () => {
    expect(getWeeks(35)).toEqual([34, 35, 36, 37, 38]);
  });

  test('Current week 36', () => {
    expect(getWeeks(36)).toEqual([34, 35, 36, 37, 38]);
  });

  test('Current week 37', () => {
    expect(getWeeks(37)).toEqual([34, 35, 36, 37, 38]);
  });

  test('Current week 38', () => {
    expect(getWeeks(38)).toEqual([34, 35, 36, 37, 38]);
  });

  test('Current week 39', () => {
    expect(getWeeks(39)).toEqual([]);
  });
});
