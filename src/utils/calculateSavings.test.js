
import { describe, it, expect } from 'vitest';
import { calculateSavings } from './calculateSavings.js';

describe('calculateSavings', () => {
  it('обчислює залишок до повної суми', () => {
    expect(calculateSavings(100000, 30000)).toBe(70000);
  });

  it('повертає 0, якщо суму зібрано', () => {
    expect(calculateSavings(100000, 100000)).toBe(0);
  });

  it('не повертає від’ємний залишок', () => {
    expect(calculateSavings(100000, 120000)).toBe(0);
  });
});
