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
        // copyInput.value = '';
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
