// --- Globals ---

const tableSize = 10;
const charTableSize = 8;
const sampText = 'Holmes, Lowell and Longfellow lie buried in Mount Auburn';
const errorText = 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
// eslint-disable-next-line no-useless-escape
const specialChars = '_!@#$%^&*(){}[]:";\'<>?,/-+=\|';

// --- Utils ---

function upperLowerCase(text) {
    let result = text.charAt(0);
    for (let i = 1; i < text.length; i += 1) {
        if (text.charCodeAt(i - 1) % 2 !== 0) {
            result += text.charAt(i).toUpperCase();
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

function getStats(text) {
    let number = 0;
    let lower = 0;
    let upper = 0;
    let special = 0;
    for (let i = 0; i < text.length; i += 1) {
        if (/^\d+$/.test(text.charAt(i))) {
            number += 1;
        } else if (/[a-z]/.test(text.charAt(i))) {
            lower += 1;
        } else if (/[A-Z]/.test(text.charAt(i))) {
            upper += 1;
        } else {
            special += 1;
        }
    }
    return {
        special: (special * 100) / text.length,
        number: (number * 100) / text.length,
        char: ((lower + upper) * 100) / text.length,
        lower: (lower * 100) / text.length,
        upper: (upper * 100) / text.length,
    };
}

// --- Copy ---

function addToCopy(text) {
    const copyInput = document.getElementById('copy_input');
    copyInput.value += text;
}

// eslint-disable-next-line no-unused-vars
function copyInputText() {
    const copyInput = document.getElementById('copy_input');
    const copySubmit = document.getElementById('copy_submit');
    copyInput.select();
    copyInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    // alert("Copied the text: " + copyInput.value);
    copySubmit.value = 'copy again';
}

// eslint-disable-next-line no-unused-vars
function clearInput() {
    const copyInput = document.getElementById('copy_input');
    copyInput.value = '';
}

// --- Methods ---

// Numbers + Letters + Special characters
function defaultMethod(text) {
    let result = text.charAt(0);
    for (let i = 1; i < text.length; i += 1) {
        if ((text.charCodeAt(i - 1) + text.charCodeAt(i) + i) % 3 === 0) {
            result += specialChars.charAt(i % specialChars.length);
        } else {
            result += text.charAt(i);
        }
    }
    return upperLowerCase(result);
}

// Numbers
function numbersMethod(text) {
    let result = '';
    for (let i = 0; i < text.length; i += 1) {
        result += text.charCodeAt(i) % 10; // result always < 10
    }
    return result;
}

// Numbers + Letters
function numbersLettersMethod(text) {
    return upperLowerCase(text);
}

// --- Table ---

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

function printTable(text) {
    const tableCont = document.getElementById('table_cont');
    tableCont.innerHTML = '';
    const table = document.createElement('table');

    // here we create the character arrays
    const charArr = [];
    const invCharArr = [];
    let wAlpha = 0;
    let hAlpha = 0;
    for (let h = 0; h < charTableSize; h += 1) {
        charArr.push([]);
        invCharArr.push([]);
        hAlpha = 0;
        for (let w = 0; w < charTableSize; w += 1) {
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
    for (let tH = 0; tH < tableSize; tH += 1) {
        const tr = document.createElement('tr');
        if (tH > 0 && tH < 9) w = 0;
        for (let tW = 0; tW < tableSize; tW += 1) {
            const td = document.createElement('td');
            if (tW > 0 && tW < 9 && tH > 0 && tH < 9) {
                // square chars
                td.innerText = charArr[h][w];
                td.addEventListener('click', () => {
                    addToCopy(this.innerText);
                    this.style.color = 'red';
                    this.style.fontWeight = 'bold';
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
                    this.style.color = 'red';
                    this.style.fontWeight = 'bold';
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
                    this.style.color = 'red';
                    this.style.fontWeight = 'bold';
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

async function calculateAndPrint(input) {
    let inputText = input.value;
    if (inputText === '') inputText = sampText;
    const digestBuffer = await digestMessage(inputText);
    let text = errorText;

    switch (document.getElementById('method').value) {
    case '0':
        text = defaultMethod(digestBuffer);
        break;
    case '1':
        text = numbersMethod(digestBuffer);
        break;
    case '2':
        text = numbersLettersMethod(digestBuffer);
        break;
    default:
        text = errorText;
    }

    console.log(text);
    console.log(getStats(text));
    printTable(text);
}

// --- Main ---

// eslint-disable-next-line no-unused-vars
function main() {
    calculateAndPrint(document.getElementById('text_input'));
}
