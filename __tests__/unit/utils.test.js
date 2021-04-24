import { uppercaseTransformation, getStats } from '../../public/js/utils.js';
import * as GLOBALS from '../../public/js/globals.js';

describe('uppercaseTransformation test', () => {
    test('las posiciones 0 y 2 son minúsculas', () => {
        expect(uppercaseTransformation('abc')).toBe('aBc');
    });
});

describe('getStats test', () => {
    test('una cadena solo de letras', () => {
        expect(getStats('abc')).toEqual({
            special: 0,
            number: 0,
            char: 100,
            lower: 100,
            upper: 0,
        });
    });

    test('una cadena solo de números', () => {
        expect(getStats('123')).toEqual({
            special: 0,
            number: 100,
            char: 0,
            lower: 0,
            upper: 0,
        });
    });

    test('una cadena de caracteres especiales', () => {
        expect(getStats(GLOBALS.specialChars)).toEqual({
            special: 100,
            number: 0,
            char: 0,
            lower: 0,
            upper: 0,
        });
    });

    test('una cadena de mayúsculas y minúsculas', () => {
        expect(getStats('aBcD')).toEqual({
            special: 0,
            number: 0,
            char: 100,
            lower: 50,
            upper: 50,
        });
    });

    test('una cadena con un carácter de cada', () => {
        expect(getStats('aB0_')).toEqual({
            special: 25,
            number: 25,
            char: 50,
            lower: 25,
            upper: 25,
        });
    });
});
