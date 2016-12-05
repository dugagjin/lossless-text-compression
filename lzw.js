/*
 lzw - Lempel–Ziv–Welch data compression algorithm
 copyright (c) 2013 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function byte2hex16(val) {
    val &= 0xFFFFFF;
    const hex = val.toString(16).toUpperCase();
    return ("000000" + hex).slice(-6);
}

function byte2hex(val) {
    if (val < 16) return '0' + val.toString(16);
    return val.toString(16);
}

function hex2byte(hex) {
    let bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

module.exports.encode = function(s) {
    if (typeof s !== 'string') {
        throw new Error('Encode: input must be a string');
    }

    let dict = {};
    let data = (s + "").split("");
    let out = [];
    let currChar;
    let phrase = data[0];
    let code = 256;
    for (let i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict['_' + phrase + currChar] != null) {
            phrase += currChar;
        } else {
            out.push(phrase.length > 1 ? dict['_' + phrase] : phrase.charCodeAt(0));
            dict['_' + phrase + currChar] = code;
            code++;
            phrase = currChar;
        }
    }
    out.push(phrase.length > 1 ? dict['_' + phrase] : phrase.charCodeAt(0));
    for (let i = 0; i < out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

module.exports.decode = function(s) {
    if (typeof s !== 'string') {
        throw new Error('Decode: input must be a string');
    }

    let dict = {};
    let data = (s + "").split("");
    let currChar = data[0];
    let oldPhrase = currChar;
    let out = [currChar];
    let code = 256;
    let phrase;
    for (let i = 1; i < data.length; i++) {
        let currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        } else {
            phrase = dict['_' + currCode] ? dict['_' + currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict['_' + code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}
