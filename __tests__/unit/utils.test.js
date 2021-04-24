// const upperLowerCase = require('../../public/js/utils.js');
import { upperLowerCase } from '../../public/js/utils.js';

test('upperLowerCase', () => {
    expect(upperLowerCase('ab')).toBe('aB');
});
