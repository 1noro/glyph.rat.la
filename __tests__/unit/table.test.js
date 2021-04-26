import {
    getCharacterArrays,
    getSquareCharTd,
    getBlankCornerTd,
} from '../../public/js/table.js';

describe('getCharacterArrays test', () => {
    test('default input', () => {
        const text = '0d@#$faB131{}788";49C?A7-+970!CD$%9&*()A3F]:4dba>7,eB3=93EBf7%1&';

        const expectedCharArr = [
            ['0', 'd', '@', '#', '$', 'f', 'a', 'B'],
            ['1', '3', '1', '{', '}', '7', '8', '8'],
            ['"', ';', '4', '9', 'C', '?', 'A', '7'],
            ['-', '+', '9', '7', '0', '!', 'C', 'D'],
            ['$', '%', '9', '&', '*', '(', ')', 'A'],
            ['3', 'F', ']', ':', '4', 'd', 'b', 'a'],
            ['>', '7', ',', 'e', 'B', '3', '=', '9'],
            ['3', 'E', 'B', 'f', '7', '%', '1', '&'],
        ];

        const expectedInvCharArr = [
            ['0', '1', '"', '-', '$', '3', '>', '3'],
            ['d', '3', ';', '+', '%', 'F', '7', 'E'],
            ['@', '1', '4', '9', '9', ']', ',', 'B'],
            ['#', '{', '9', '7', '&', ':', 'e', 'f'],
            ['$', '}', 'C', '0', '*', '4', 'B', '7'],
            ['f', '7', '?', '!', '(', 'd', '3', '%'],
            ['a', '8', 'A', 'C', ')', 'b', '=', '1'],
            ['B', '8', '7', 'D', 'A', 'a', '9', '&'],
        ];

        const { charArr, invCharArr } = getCharacterArrays(text);
        // console.log(charArr, invCharArr);
        expect(charArr).toEqual(expectedCharArr);
        expect(invCharArr).toEqual(expectedInvCharArr);
    });
});

describe('getSquareCharTd test', () => {
    test('¿tdA == tdB?', () => {
        const text = 'A';

        const tdA = document.createElement('td');
        tdA.innerText = text;

        const tdB = getSquareCharTd(text);

        expect(tdB.innerText).toBe(tdA.innerText);
        expect(tdB).toEqual(tdA);
    });

    test('¿tdA == tdB before click?', () => {
        const text = 'A';
        const input = document.createElement('input');

        const tdA = document.createElement('td');
        tdA.innerText = text;
        tdA.style.color = 'red';
        tdA.style.fontWeight = 'bold';

        const tdB = getSquareCharTd(text, input);
        tdB.click();

        expect(tdB.innerText).toBe(tdA.innerText);
        expect(input.value).toBe(text);
        expect(tdB).toEqual(tdA);
    });
});

describe('getBlankCornerTd test', () => {
    test('¿tdA == tdB?', () => {
        const tdA = document.createElement('td');
        tdA.innerText = ' ';
        tdA.style.cursor = 'default';

        const tdB = getBlankCornerTd();

        expect(tdB.innerText).toBe(tdA.innerText);
        expect(tdB).toEqual(tdA);
    });
});
