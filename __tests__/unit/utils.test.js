const upperLowerCase = require('../../public/js/utils');

test('upperLowerCase', () => {
    expect(upperLowerCase('ab')).toBe('aB');
});
