const lzw = function LZW() {}

lzw.prototype.encode = function(s) {
    return new Promise(function(resolve, reject) {
        try {
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
            return resolve(out.map(e => String.fromCodePoint(e)).join(''));
        } catch (error) {
            return reject(error);
        }
    })
}

lzw.prototype.decode = function(dataAsText) {
    return new Promise(function(resolve, reject) {
        try {
            let data = [...dataAsText].map(e => e.codePointAt(0)),
                dictionary = {},
                currentChar = String.fromCodePoint(data[0]),
                oldPhrase = currentChar,
                out = [currentChar],
                code = 57344,
                phrase;
            for (let i = 1; i < data.length; i++) {
                let currentCode = data[i];
                if (currentCode < 57344) {
                    phrase = String.fromCodePoint(data[i]);
                } else {
                    phrase = dictionary[currentCode] ? dictionary[currentCode] : (oldPhrase + currentChar);
                }
                out += phrase;
                currentChar = phrase[0];
                dictionary[code] = oldPhrase + currentChar;
                code++;
                oldPhrase = phrase;
            }
            return resolve(out);
        } catch (error) {
            return reject(error);
        }
    })
}
module.exports = new lzw();
