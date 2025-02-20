import { containsEntry } from '../utils';

export function toPartiallyContain(actual, expected) {
  const { printReceived, printExpected, matcherHint } = this.utils;

  const passMessage =
    matcherHint('.not.toPartiallyContain') +
    '\n\n' +
    'Expected array not to partially contain:\n' +
    `  ${printExpected(expected)}\n` +
    'Received:\n' +
    `  ${printReceived(actual)}`;

  const failMessage =
    matcherHint('.toPartiallyContain') +
    '\n\n' +
    'Expected array to partially contain:\n' +
    `  ${printExpected(expected)}\n` +
    'Received:\n' +
    `  ${printReceived(actual)}`;

  const pass =
    Array.isArray(actual) &&
    Array.isArray([expected]) &&
    [expected].every(partial =>
      actual.some(value => Object.entries(partial).every(entry => containsEntry(this.equals, value, entry))),
    );

  return { pass, message: () => (pass ? passMessage : failMessage) };
}
