import { defaultMethod, numberMethod, numberLetterMethod } from '../../public/js/methods.js';
import { getTextByMethod, getText } from '../../public/js/text.js';

describe('getTextByMethod test', () => {
    test('input "", all methods', () => {
        expect(getTextByMethod('', defaultMethod)).toBe(
            '0d@#$faB131{}788";49C?A7-+970!CD$%9&*()A3F]:4dba>7,eB3=93EBf7%1&',
        );
        expect(getTextByMethod('', numberMethod)).toBe(
            '8047627891974566192798753275879094776177124020873581812711825098',
        );
        expect(getTextByMethod('', numberLetterMethod)).toBe(
            '0d698faB131967883149C0a75F970aCDc69A83AA3F624dba570eB3F93EBf7D1B',
        );
    });

    test('input "glyph 🐭 la", all methods', () => {
        expect(getTextByMethod('glyph 🐭 la', defaultMethod)).toBe(
            '905#3%A9387E}33AE74<7?AE3710_D@86bb4*14992]Ba00<>?F28f=0_!26e1^2',
        );
        expect(getTextByMethod('glyph 🐭 la', numberMethod)).toBe(
            '7839177716517117152253711598003648828927709878800120622801041920',
        );
        expect(getTextByMethod('glyph 🐭 la', numberLetterMethod)).toBe(
            '90513AA9387EA33AE74475AE37102d586bb4b149921Ba00d23F28ff0de26e1F2',
        );
    });

    test('input "party", all methods', () => {
        expect(getTextByMethod('party', defaultMethod)).toBe(
            '1!@#$a39EC33}F]:4;\'3>?B/85D1CCD3$d6&*(){}[D:1;1B>3,/-2c|_94a338c',
        );
        expect(getTextByMethod('party', numberMethod)).toBe(
            '9082171719112253212123816309990120406420750293985156809807271169',
        );
        expect(getTextByMethod('party', numberLetterMethod)).toBe(
            '1D0feA39EC33Ff7543F345Be85D1CCD34d6d864297D4151B737802cB294a338c',
        );
    });
});

describe('getText test', () => {
    const inputTextObject = document.createElement('input');
    const selectMethodObject = document.createElement('select');
    const optionMethodObject = document.createElement('option');
    selectMethodObject.appendChild(optionMethodObject);

    test('input "", all methods', () => {
        inputTextObject.value = '';
        optionMethodObject.value = 0;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '0d@#$faB131{}788";49C?A7-+970!CD$%9&*()A3F]:4dba>7,eB3=93EBf7%1&',
        );
        optionMethodObject.value = 1;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '8047627891974566192798753275879094776177124020873581812711825098',
        );
        optionMethodObject.value = 2;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '0d698faB131967883149C0a75F970aCDc69A83AA3F624dba570eB3F93EBf7D1B',
        );
    });

    test('input "glyph 🐭 la", all methods', () => {
        inputTextObject.value = 'glyph 🐭 la';
        optionMethodObject.value = 0;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '905#3%A9387E}33AE74<7?AE3710_D@86bb4*14992]Ba00<>?F28f=0_!26e1^2',
        );
        optionMethodObject.value = 1;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '7839177716517117152253711598003648828927709878800120622801041920',
        );
        optionMethodObject.value = 2;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '90513AA9387EA33AE74475AE37102d586bb4b149921Ba00d23F28ff0de26e1F2',
        );
    });

    test('input "party", all methods', () => {
        inputTextObject.value = 'party';
        optionMethodObject.value = 0;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '1!@#$a39EC33}F]:4;\'3>?B/85D1CCD3$d6&*(){}[D:1;1B>3,/-2c|_94a338c',
        );
        optionMethodObject.value = 1;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '9082171719112253212123816309990120406420750293985156809807271169',
        );
        optionMethodObject.value = 2;
        expect(getText(inputTextObject, selectMethodObject)).toBe(
            '1D0feA39EC33Ff7543F345Be85D1CCD34d6d864297D4151B737802cB294a338c',
        );
    });
});
