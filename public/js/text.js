// --- Text ---
import * as GLOBALS from './globals.js';
import { defaultMethod, numberMethod, numberLetterMethod } from './methods.js';
import { digestMessage } from './utils.js';

function getTextByMethod(text, methodFunction) {
    // if (text === '') return methodFunction(await digestMessage(GLOBALS.sampText)); // async
    if (text === '') return methodFunction(digestMessage(GLOBALS.sampText));
    // return methodFunction(await digestMessage(text)); // async
    return methodFunction(digestMessage(text));
}

function getText(inputTextObject, selectMethodObject) {
    const method = {
        0: (text) => defaultMethod(text),
        1: (text) => numberMethod(text),
        2: (text) => numberLetterMethod(text),
    };
    return getTextByMethod(inputTextObject.value, method[selectMethodObject.value]);
}

export { getText, getTextByMethod };
