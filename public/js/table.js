// --- Table ---
import * as GLOBALS from './globals.js';

// TODO: refactor
function getCharacterArrays(text) {
    const charArr = [];
    const invCharArr = [];

    let bW = 0;
    let bH = 0;

    for (let aH = 0; aH < GLOBALS.charTableSize; aH += 1) {
        charArr.push([]);
        invCharArr.push([]);
        bH = 0;
        for (let aW = 0; aW < GLOBALS.charTableSize; aW += 1) {
            charArr[aH][aW] = text.charAt(aH * 8 + aW);
            invCharArr[bW][bH] = text.charAt(bH * 8 + bW);
            bH += 1;
        }
        bW += 1;
    }

    return { charArr, invCharArr };
}

function getSquareCharTd(textToCopy, copyInput) {
    const td = document.createElement('td');
    td.innerText = textToCopy;
    td.addEventListener('click', () => {
        copyInput.setAttribute('value', copyInput.value + textToCopy);
        td.style.color = 'red';
        td.style.fontWeight = 'bold';
    });
    return td;
}

// TODO: refactor
// vertical dots (left & right)
function getVerticalDotTd(charArr, h, tW, copyInput) {
    const td = document.createElement('td');
    td.innerText = '·';
    const rowArr = [...charArr[h]]; // clone array
    let textToCopy = '';
    if (tW === 0) {
        textToCopy = rowArr.join('');
    } else {
        rowArr.reverse();
        textToCopy = rowArr.join('');
    }
    td.addEventListener('click', () => {
        copyInput.setAttribute('value', copyInput.value + textToCopy);
        td.style.color = 'red';
        td.style.fontWeight = 'bold';
    });
    return td;
}

// TODO: refactor
// horizontal dots (top & bottom)
function getHorizontalDotTd(invCharArr, tW, tH, copyInput) {
    const td = document.createElement('td');
    td.innerText = '·';
    const rowArr = [...invCharArr[tW - 1]]; // clone array
    let textToCopy = '';
    if (tH === 0) {
        textToCopy = rowArr.join('');
    } else {
        rowArr.reverse();
        textToCopy = rowArr.join('');
    }
    td.addEventListener('click', () => {
        copyInput.setAttribute('value', copyInput.value + textToCopy);
        td.style.color = 'red';
        td.style.fontWeight = 'bold';
    });
    return td;
}

function getBlankCornerTd() {
    const td = document.createElement('td');
    td.innerText = ' ';
    td.style.cursor = 'default';
    return td;
}

// TODO: refactor
function getTable(text, copyInput) {
    const table = document.createElement('table');
    const { charArr, invCharArr } = getCharacterArrays(text); // charArr & invCharArr construction

    // console.log(charArr);
    // console.log(invCharArr);

    let charTabH = 0;
    let charTabW = 0;
    for (let tabH = 0; tabH < GLOBALS.tableSize; tabH += 1) {
        const tr = document.createElement('tr');
        if (tabH > 0 && tabH < 9) charTabW = 0;
        for (let tabW = 0; tabW < GLOBALS.tableSize; tabW += 1) {
            let td;
            if (tabW > 0 && tabW < 9 && tabH > 0 && tabH < 9) {
                // square chars
                td = getSquareCharTd(charArr[charTabH][charTabW], copyInput);
                charTabW += 1;
            } else if (tabH > 0 && tabH < 9) {
                // vertical dots (left & right)
                td = getVerticalDotTd(charArr, charTabH, tabW, copyInput);
            } else if (tabW > 0 && tabW < 9) {
                // horizontal dots (top & bottom)
                td = getHorizontalDotTd(invCharArr, tabW, tabH, copyInput);
            } else {
                // blank corners
                td = getBlankCornerTd();
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
        if (tabH > 0 && tabH < 9) charTabH += 1;
    }

    return table;
}

export {
    getCharacterArrays,
    getSquareCharTd,
    getVerticalDotTd,
    getHorizontalDotTd,
    getBlankCornerTd,
    getTable,
};
