// --- Methods ---
import * as GLOBALS from './globals.js';
import { upperCaseTransformation } from './utils.js';

// Number + Letter + Special character
// TODO: functional refactor
function defaultMethod(text) {
    let result = text.charAt(0);
    for (let i = 1; i < text.length; i += 1) {
        if ((text.charCodeAt(i - 1) + text.charCodeAt(i) + i) % 3 === 0) {
            result += GLOBALS.specialChars.charAt(i % GLOBALS.specialChars.length);
        } else {
            result += text.charAt(i);
        }
    }
    return upperCaseTransformation(result);
}

// Number
function numberMethod(str) {
    return [...str].map((char) => char.charCodeAt(0) % 10).join('');
}

// Number + Letter
function numberLetterMethod(text) {
    return upperCaseTransformation(text);
}

export { defaultMethod, numberMethod, numberLetterMethod };
