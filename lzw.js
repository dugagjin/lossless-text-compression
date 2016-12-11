const lzw = function LZW() {}

lzw.prototype.encode = function(s) {
    let dictionary = {},
        out = [],
        currentChar,
        phrase = s[0],
        code = 57344;
    s = (s + "").split("");
    for (let i = 1; i < s.length; i++) {
        currentChar = s[i];
        if (dictionary[phrase + currentChar] != null) {
            phrase += currentChar;
        } else {
            out.push(phrase.length > 1 ? dictionary[phrase] : phrase.codePointAt(0));
            dictionary[phrase + currentChar] = code;
            code++;
            phrase = currentChar;
        }
    }
    out.push(phrase.length > 1 ? dictionary[phrase] : phrase.codePointAt(0));
    return out.map(e => String.fromCodePoint(e)).join('');
}

lzw.prototype.decode = function(dataAsText) {
    let data = [...dataAsText].map(e => e.codePointAt(0));
    let dictionary = {},
        currentChar = String.fromCodePoint(data[0]),
        oldPhrase = currentChar,
        out = [currentChar],
        code = 57344,
        phrase;
    for (let i = 1; i < data.length; i++) {
        let currCode = data[i];
        if (currCode < 57344) {
            phrase = String.fromCodePoint(data[i]);
        } else {
            phrase = dictionary[currCode] ? dictionary[currCode] : (oldPhrase + currentChar);
        }
        out += phrase;
        currentChar = phrase[0];
        dictionary[code] = oldPhrase + currentChar;
        code++;
        oldPhrase = phrase;
    }
    return out;
}
module.exports = new lzw();
