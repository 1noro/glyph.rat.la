// --- Methods ---
import * as GLOBALS from './globals.js';
import { uppercaseTransformation } from './utils.js';

// Numbers + Letters + Special characters
function defaultMethod(text) {
    let result = text.charAt(0);
    for (let i = 1; i < text.length; i += 1) {
        if ((text.charCodeAt(i - 1) + text.charCodeAt(i) + i) % 3 === 0) {
            result += GLOBALS.specialChars.charAt(i % GLOBALS.specialChars.length);
        } else {
            result += text.charAt(i);
        }
    }
    return uppercaseTransformation(result);
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
    return uppercaseTransformation(text);
}

export { defaultMethod, numbersMethod, numbersLettersMethod };
