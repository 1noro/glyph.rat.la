// --- Table ---
import * as GLOBALS from './globals.js';

// TODO: refactor
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

    let h = 0;
    let w = 0;
    for (let tH = 0; tH < GLOBALS.tableSize; tH += 1) {
        const tr = document.createElement('tr');
        if (tH > 0 && tH < 9) w = 0;
        for (let tW = 0; tW < GLOBALS.tableSize; tW += 1) {
            let td;
            if (tW > 0 && tW < 9 && tH > 0 && tH < 9) {
                // square chars
                td = getSquareCharTd(charArr[h][w], copyInput);
                w += 1;
            } else if (tH > 0 && tH < 9) {
                // vertical dots (left & right)
                td = getVerticalDotTd(charArr, h, tW, copyInput);
            } else if (tW > 0 && tW < 9) {
                // horizontal dots (top & bottom)
                td = getHorizontalDotTd(invCharArr, tW, tH, copyInput);
            } else {
                // blank corners
                td = getBlankCornerTd();
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
        if (tH > 0 && tH < 9) h += 1;
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
