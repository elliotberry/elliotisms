import test from 'node:test';
import assert from 'node:assert/strict';
import timeAgo from './time-ago.js'; // Adjust the import based on your file structure

test('timeAgo - basic functionality', () => {
  const now = Date.now();
  const oneMinuteAgo = new Date(now - 60 * 1000);
  const result = timeAgo(oneMinuteAgo);
  assert.strictEqual(result, '1 minute ago');
});

test('timeAgo - compact option', () => {
  const now = Date.now();
  const oneHourAgo = new Date(now - 60 * 60 * 1000);
  const result = timeAgo(oneHourAgo, { compact: true });
  assert.strictEqual(result, '1h');
});

test('timeAgo - invalid date string', () => {
  const result = timeAgo('not_a_date');
  assert.strictEqual(result, '');
});

test('timeAgo - valid date string', () => {
  const result = timeAgo('2023-01-01T12:00:00Z');
  const expected = '9 months ago'; // Adjust based on current date
  assert.match(result, /\d+ months? ago/); // Use regex to match variable output
});

test('timeAgo - custom strings', () => {
  const now = Date.now();
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
  const customStrings = { daysAgo: 'days past' };
  const result = timeAgo(oneDayAgo, { customStrings });
  assert.strictEqual(result, '1 days past');
});

test('timeAgo - granularity detailed', () => {
  const now = Date.now();
  const oneYearAgo = new Date(now - 365 * 24 * 60 * 60 * 1000);
  const result = timeAgo(oneYearAgo, { granularity: 'detailed' });
  assert.strictEqual(result, '1 year ago');
});

test('timeAgo - future date', () => {
  const now = Date.now();
  const oneDayInFuture = new Date(now + 24 * 60 * 60 * 1000);
  const result = timeAgo(oneDayInFuture);
  assert.strictEqual(result, 'in 1 day ago');
});

test('timeAgo - null input', () => {
  const result = timeAgo(null);
  assert.strictEqual(result, null);
});

test('timeAgo - timestamp input', () => {
  const timestamp = Date.now() - 2 * 60 * 60 * 1000; // 2 hours ago
  const result = timeAgo(timestamp);
  assert.strictEqual(result, '2 hours ago');
});
