import { digestMessage, upperCaseTransformation, getStats } from '../../public/js/utils.js';
import * as GLOBALS from '../../public/js/globals.js';

// falla con la versión de Mozilla, porque jsdom no implementa TextEncoder
describe('digestMessage test', () => {
    test('SHA-256 of "a"', () => {
        const result = digestMessage('a');
        expect(result).toBe(
            'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
        );
    });

    test('SHA-256 of "1noro"', () => {
        const result = digestMessage('1noro');
        expect(result).toBe(
            '60aa36613507819cd301a9f0d4acd26d14e94a0155c7f37adf0b72f2d07620b3',
        );
    });

    test('SHA-256 of "😋" (UTF-8)', () => {
        const result = digestMessage('😋');
        expect(result).toBe(
            '9dafc7625aaa787cc9577d3870d73652366a63707392cb2ee8534df134074fbe',
        );
    });

    test('SHA-256 of "日本語" (UTF-8)', () => {
        const result = digestMessage('日本語');
        expect(result).toBe(
            '77710aedc74ecfa33685e33a6c7df5cc83004da1bdcef7fb280f5c2b2e97e0a5',
        );
    });

    // https://onlineutf8tools.com/generate-random-utf8
    test('SHA-256 of ",ȭ澶⛽ܝ" (random UTF-8)', () => {
        const result = digestMessage(',ȭ澶⛽ܝ');
        expect(result).toBe(
            '9de6d3ae388d8b7a7f7104391cb33d02b6610d75570e374d025025b7d3f7ffe8',
        );
    });

    // https://onlineutf8tools.com/generate-random-utf8
    test('SHA-256 of "𫪥ű򶁘䅗̆#и🦠3󍓴񇡂茎䉔췃𩥆ᶹ˸󅚝~𡫲륫󑆡h%򏟶w" (random UTF-8)', () => {
        const result = digestMessage('𫪥ű򶁘䅗̆#и🦠3󍓴񇡂茎䉔췃𩥆ᶹ˸󅚝~𡫲륫󑆡h%򏟶w');
        expect(result).toBe(
            '83fececf0b49b0b460b26e609b21b91a469d08f6433f071cbbc8568d6cdf3ab0',
        );
    });
});

describe('uppercaseTransformation test', () => {
    test('las posiciones 0 y 2 son minúsculas', () => {
        expect(upperCaseTransformation('abc')).toBe('aBc');
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
