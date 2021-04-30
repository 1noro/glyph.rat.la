// --- Index ---

/*
    The JavaScript code contained in this page is essential for its
    operation.

    @licstart The following is the entire license notice for the
    JavaScript code in this page.

    Copyright 2021 Inoro.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/.

    @licend The above is the entire license notice for the JavaScript
    code in this page.
*/

import { getStats } from './js/utils.js';
import { getText } from './js/text.js';
import { getTable } from './js/table.js';

// --- Main ---

// Refresh table: (text, method) -> calculate -> clear -> display
function refresh(inputTextObject, selectMethodObject, tableContainerObject, copyInput) {
    // start time counter
    console.time('refresh');

    // calculate
    const digestText = getText(inputTextObject, selectMethodObject);

    // clear
    if (tableContainerObject.lastChild) {
        tableContainerObject.removeChild(tableContainerObject.lastChild);
    }

    // display
    const table = getTable(digestText, copyInput);
    tableContainerObject.appendChild(table);

    // log
    console.log(`%c${digestText}`, 'font-size: 1.2em;');
    console.log(getStats(digestText));
    console.timeEnd('refresh');
}

function setup() {
    // get all DOM Elements
    const inputTextObject = document.getElementById('text_input');
    const selectMethodObject = document.getElementById('method');
    const tableContainerObject = document.getElementById('table_cont');
    const copyInput = document.getElementById('copy_input');
    const copySubmit = document.getElementById('copy_submit');
    const clearCopySubmit = document.getElementById('clear_copy_submit');

    // event listeners
    document.getElementById('method').addEventListener('change', () => {
        refresh(inputTextObject, selectMethodObject, tableContainerObject, copyInput);
    });

    document.getElementById('text_input').addEventListener('keyup', () => {
        refresh(inputTextObject, selectMethodObject, tableContainerObject, copyInput);
    });

    clearCopySubmit.addEventListener('click', () => {
        copyInput.setAttribute('value', '');
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
