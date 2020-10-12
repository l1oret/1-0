import createResult, { DEFAULT_RESULT } from '../../components/result/factory';

describe('result.js', () => {
  test('Default result must be 0-0', () => {
    expect(DEFAULT_RESULT).toBe('0-0');
  });

  test('Must create a default result', () => {
    expect(createResult().toString()).toBe(DEFAULT_RESULT);
  });

  test('Must create a result', () => {
    expect(createResult('5-2').toString()).toBe('5-2');
  });

  test('Must set home score', () => {
    expect(createResult('5-2').home).toBe(5);
  });

  test('Must set away score', () => {
    expect(createResult('5-2').away).toBe(2);
  });

  test('isEqualTo must be true', () => {
    expect(createResult('5-2').isEqualTo(createResult('5-2'))).toBeTruthy();
  });

  test('isEqualTo must be false', () => {
    expect(createResult('5-2').isEqualTo(createResult('5-1'))).toBeFalsy();
  });
});
