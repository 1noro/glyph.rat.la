// --- Index ---
import * as GLOBALS from './js/globals.js';
import { digestMessage, getStats } from './js/utils.js';
import { defaultMethod, numberMethod, numberLetterMethod } from './js/methods.js';

// --- Copy ---

function addToCopy(text) {
    const copyInput = document.getElementById('copy_input');
    copyInput.value += text;
}

// --- Table ---

function printTable(text) {
    // logs
    console.log(text);
    console.log(getStats(text));

    const tableCont = document.getElementById('table_cont');
    tableCont.innerHTML = '';
    const table = document.createElement('table');

    // here we create the character arrays
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

    // console.log(charArr);
    // console.log(invCharArr);

    let h = 0;
    let w = 0;
    for (let tH = 0; tH < GLOBALS.tableSize; tH += 1) {
        const tr = document.createElement('tr');
        if (tH > 0 && tH < 9) w = 0;
        for (let tW = 0; tW < GLOBALS.tableSize; tW += 1) {
            const td = document.createElement('td');
            if (tW > 0 && tW < 9 && tH > 0 && tH < 9) {
                // square chars
                td.innerText = charArr[h][w];
                td.addEventListener('click', () => {
                    addToCopy(td.innerText);
                    td.style.color = 'red';
                    td.style.fontWeight = 'bold';
                });
                w += 1;
            } else if (tH > 0 && tH < 9) {
                // vertical dots (left & right)
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
            } else if (tW > 0 && tW < 9) {
                // horizontal dots (top & bottom)
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
            } else {
                // blank corners
                td.innerText = ' ';
                td.style.cursor = 'default';
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
        if (tH > 0 && tH < 9) h += 1;
    }

    tableCont.appendChild(table);
}

// TODO: Refactor
// async function calculateAndPrint() {
//     const input = document.querySelector('#text_input');
//     let inputText = input.value;
//     if (inputText === '') inputText = GLOBALS.sampText;
//     const digestBuffer = await digestMessage(inputText);

//     let text;
//     switch (document.getElementById('method').value) {
//     case '0':
//         text = defaultMethod(digestBuffer);
//         break;
//     case '1':
//         text = numberMethod(digestBuffer);
//         break;
//     case '2':
//         text = numberLetterMethod(digestBuffer);
//         break;
//     default:
//         text = GLOBALS.errorText;
//     }

//     console.log(text);
//     console.log(getStats(text));
//     printTable(text);
// }

const method = {
    0: (text) => defaultMethod(text),
    1: (text) => numberMethod(text),
    2: (text) => numberLetterMethod(text),
};

function getTextByMethod(text, methodFunction) {
    if (text === '') return methodFunction(GLOBALS.sampText);
    return methodFunction(text);
}

function getText(inputTextObject, selectMethodObject) {
    // const digestBuffer = await digestMessage(inputText); // async version
    const digestBuffer = digestMessage(inputTextObject.value);
    return getTextByMethod(digestBuffer, method[selectMethodObject.value]);
}

// --- Main ---
function setup() {
    const inputTextObject = document.getElementById('text_input');
    const selectMethodObject = document.getElementById('method');
    const copyInput = document.getElementById('copy_input');
    const copySubmit = document.getElementById('copy_submit');
    const clearCopySubmit = document.getElementById('clear_copy_submit');

    document.querySelector('#method').addEventListener('change', () => {
        printTable(getText(inputTextObject, selectMethodObject));
    });
    document.querySelector('#text_input').addEventListener('keyup', () => {
        printTable(getText(inputTextObject, selectMethodObject));
    });

    clearCopySubmit.addEventListener('click', () => {
        copyInput.value = '';
        printTable(getText(inputTextObject, selectMethodObject));
    });

    copySubmit.addEventListener('click', () => {
        copyInput.select();
        copyInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
        copySubmit.value = 'copy again';
    });

    // first print
    printTable(getText(inputTextObject, selectMethodObject));
}

window.addEventListener('load', setup);
