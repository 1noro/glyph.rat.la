// --- Utils ---
import Sha256 from './lib/sha256.js';

// Versión de Mozilla (https://developer.mozilla.org/es/docs/Web/API/SubtleCrypto/digest)
// el test falla, porque jsdom no implementa TextEncoder
/* async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    // convert bytes to hex string
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
} */

const digestMessage = (message) => Sha256.hash(message);

// Uppercase transformation of previous even numbers
function uppercaseTransformation(text) {
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

export { digestMessage, uppercaseTransformation, getStats };
