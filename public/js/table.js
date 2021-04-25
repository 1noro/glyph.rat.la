// --- Table ---
import * as GLOBALS from './globals.js';

function addToCopy(text) {
    const copyInput = document.getElementById('copy_input');
    copyInput.value += text;
}

function getCharacterArrays(text) {
    const charArr = [];
    const invCharArr = [];

    let wAlpha = 0;
    let hAlpha = 0;

    for (let h = 0; h < GLOBALS.charTableSize; h += 1) {
        charArr.push([]);
        invCharArr.push([]);
        hAlpha = 0;
        for (let w = 0; w < GLOBALS.charTableSize; w += 1) {
            charArr[h][w] = text.charAt(h * 8 + w);
            invCharArr[wAlpha][hAlpha] = text.charAt(hAlpha * 8 + wAlpha);
            hAlpha += 1;
        }
        wAlpha += 1;
    }

    return { charArr, invCharArr };
}

function getSquareCharTd(text) {
    const td = document.createElement('td');
    td.innerText = text;
    td.addEventListener('click', () => {
        addToCopy(td.innerText);
        td.style.color = 'red';
        td.style.fontWeight = 'bold';
    });
    return td;
}

// TODO: refactor
function getVerticalDotTd(charArr, h, tW) {
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
        addToCopy(textToCopy);
        td.style.color = 'red';
        td.style.fontWeight = 'bold';
    });
    return td;
}

// TODO: refactor
function getHorizontalDotTd(invCharArr, tW, tH) {
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
        addToCopy(textToCopy);
        td.style.color = 'red';
        td.style.fontWeight = 'bold';
    });
    return td;
}

// TODO: refactor
function getBlankCornerTd() {
    const td = document.createElement('td');
    td.innerText = ' ';
    td.style.cursor = 'default';
    return td;
}

export {
    addToCopy,
    getCharacterArrays,
    getSquareCharTd,
    getVerticalDotTd,
    getHorizontalDotTd,
    getBlankCornerTd,
};