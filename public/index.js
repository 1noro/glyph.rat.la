// --- Index ---
import * as GLOBALS from './js/globals.js';
import { getStats } from './js/utils.js';
import { getText } from './js/text.js';
import {
    getCharacterArrays,
    getSquareCharTd,
    getVerticalDotTd,
    getHorizontalDotTd,
    getBlankCornerTd,
} from './js/table.js';

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
