module.exports = function() {
    this.encode = function(s) {
        let dictionary = {},
            out = [],
            currentChar,
            phrase = s[0],
            code = 256;
        s = (s + "").split("");
        for (let i = 1; i < s.length; i++) {
            currentChar = s[i];
            if (dictionary[phrase + currentChar] != null) {
                phrase += currentChar;
            } else {
                out.push(phrase.length > 1 ? dictionary[phrase] : phrase.charCodeAt(0));
                dictionary[phrase + currentChar] = code;
                code++;
                phrase = currentChar;
            }
        }
        out.push(phrase.length > 1 ? dictionary[phrase] : phrase.charCodeAt(0));
        return out;
    }

    this.decode = function(data) {
        let dictionary = {},
            currentChar = String.fromCharCode(data[0]),
            oldPhrase = currentChar,
            out = [currentChar],
            code = 256,
            phrase;
        for (let i = 1; i < data.length; i++) {
            let currCode = data[i];
            if (currCode < 256) {
                phrase = String.fromCharCode(data[i]);
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
}
