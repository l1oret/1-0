import { ResultFactory } from '../../tasks/factories/factories.js';

describe('result.js', () => {
  test('Default result must be 0-0', () => {
    expect(ResultFactory.DEFAULT_RESULT).toBe('0-0');
  });

  test('Must create a default result', () => {
    expect(ResultFactory.create().toString()).toBe(
      ResultFactory.DEFAULT_RESULT
    );
  });

  test('Must create a result', () => {
    expect(ResultFactory.create('5-2').toString()).toBe('5-2');
  });

  test('Must set home score', () => {
    expect(ResultFactory.create('5-2').home).toBe(5);
  });

  test('Must set away score', () => {
    expect(ResultFactory.create('5-2').away).toBe(2);
  });

  test('isEqualTo must be true', () => {
    expect(
      ResultFactory.create('5-2').isEqualTo(ResultFactory.create('5-2'))
    ).toBeTruthy();
  });

  test('isEqualTo must be false', () => {
    expect(
      ResultFactory.create('5-2').isEqualTo(ResultFactory.create('5-1'))
    ).toBeFalsy();
  });
});
