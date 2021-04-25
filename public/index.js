// --- Index ---
import { getStats } from './js/utils.js';
import { getText } from './js/text.js';
import { getTable } from './js/table.js';

// --- Main ---

// Refresh table: (text, method) -> calculate -> clear -> display
function refresh(inputTextObject, selectMethodObject, tableContainerObject, copyInput) {
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
    const table = getTable(digestText, copyInput);
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
        refresh(inputTextObject, selectMethodObject, tableContainerObject, copyInput);
    });

    document.getElementById('text_input').addEventListener('keyup', () => {
        refresh(inputTextObject, selectMethodObject, tableContainerObject, copyInput);
    });

    clearCopySubmit.addEventListener('click', () => {
        copyInput.value = '';
        refresh(inputTextObject, selectMethodObject, tableContainerObject, copyInput);
    });

    copySubmit.addEventListener('click', () => {
        copyInput.select();
        copyInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
        copySubmit.value = 'copy again';
    });

    // first print (main)
    refresh(inputTextObject, selectMethodObject, tableContainerObject, copyInput);
}

window.addEventListener('load', setup);
