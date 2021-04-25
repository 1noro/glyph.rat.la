// --- Index ---
import * as GLOBALS from './js/globals.js';
import { getStats } from './js/utils.js';
import { getText } from './js/text.js';

// --- Copy ---

function addToCopy(text) {
    const copyInput = document.getElementById('copy_input');
    copyInput.value += text;
}

// --- Table utils ---

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

// TODO: refactor
function getTable(text) {
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
                td = getSquareCharTd(charArr[h][w]);
                w += 1;
            } else if (tH > 0 && tH < 9) {
                // vertical dots (left & right)
                td = getVerticalDotTd(charArr, h, tW);
            } else if (tW > 0 && tW < 9) {
                // horizontal dots (top & bottom)
                td = getHorizontalDotTd(invCharArr, tW, tH);
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

// --- Main ---

// Refresh table: (text, method) -> calculate -> clear -> display
function refresh(inputTextObject, selectMethodObject, tableContainerObject) {
    // calculate
    const digestText = getText(inputTextObject, selectMethodObject);

    // log
    console.log(digestText);
    console.log(getStats(digestText));

    // clear
    // tableContainerObject.innerHTML = '';
    if (tableContainerObject.lastChild) {
        tableContainerObject.removeChild(tableContainerObject.lastChild);
    }

    // display
    const table = getTable(digestText);
    tableContainerObject.appendChild(table);
}

function setup() {
    const inputTextObject = document.getElementById('text_input');
    const selectMethodObject = document.getElementById('method');
    const tableContainerObject = document.getElementById('table_cont');
    const copyInput = document.getElementById('copy_input');
    const copySubmit = document.getElementById('copy_submit');
    const clearCopySubmit = document.getElementById('clear_copy_submit');

    document.getElementById('method').addEventListener('change', () => {
        refresh(inputTextObject, selectMethodObject, tableContainerObject);
    });

    document.getElementById('text_input').addEventListener('keyup', () => {
        refresh(inputTextObject, selectMethodObject, tableContainerObject);
    });

    clearCopySubmit.addEventListener('click', () => {
        copyInput.value = '';
        refresh(inputTextObject, selectMethodObject, tableContainerObject);
    });

    copySubmit.addEventListener('click', () => {
        copyInput.select();
        copyInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
        copySubmit.value = 'copy again';
    });

    // first print (main)
    refresh(inputTextObject, selectMethodObject, tableContainerObject);
}

window.addEventListener('load', setup);
