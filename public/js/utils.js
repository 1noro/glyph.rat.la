// --- Utils ---

function upperLowerCase(text) {
    let result = text.charAt(0);
    for (let i = 1; i < text.length; i += 1) {
        if (text.charCodeAt(i - 1) % 2 !== 0) {
            result += text.charAt(i).toUpperCase();
        } else {
            // result += text.charAt(i).toLowerCase();
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

export { upperLowerCase, getStats };
