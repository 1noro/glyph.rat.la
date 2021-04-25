import { getBlankCornerTd } from '../../public/js/table.js';

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
