import { defaultMethod, numbersMethod, numbersLettersMethod } from '../../public/js/methods.js';

describe('defaultMethod test', () => {
    test('ca978112 -> cA@78112', () => {
        expect(defaultMethod('ca978112')).toBe('cA@78112');
    });

    test('fe2fccce -> f!@fcC^&', () => {
        expect(defaultMethod('fe2fccce')).toBe('f!@fcC^&');
    });

    test('Holmes, Lowell and Longfellow lie buried in Mount Auburn', () => {
        expect(
            defaultMethod('0d698fab131967883149c0a75f970acdc69a83aa3f624dba570eb3f93ebf7d1b'),
        ).toBe('0d@#$faB131{}788";49C?A7-+970!CD$%9&*()A3F]:4dba>7,eB3=93EBf7%1&');
    });
});

describe('numbersMethod test', () => {
    test('abcde -> 78901', () => {
        expect(numbersMethod('abcde')).toBe('78901');
    });
});

describe('numbersLettersMethod test', () => {
    test('la última letra es mayúscula', () => {
        expect(numbersLettersMethod('a2cd')).toBe('a2cD');
    });
});
