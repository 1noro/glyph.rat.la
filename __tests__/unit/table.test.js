import {
    getSquareCharTd,
    getBlankCornerTd,
} from '../../public/js/table.js';

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
