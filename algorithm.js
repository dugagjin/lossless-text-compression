
class Algorithm {
    encode(s) {
        let dictionary = {}
        let out = [];
        let currentChar;
        let phrase = s[0];
        let code = 256;
        s = String(s).split("");

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
    decode(data) {
        let dictionary = {}
        let currentChar = String.fromCharCode(data[0]);
        let oldPhrase = currentChar;
        let out = [currentChar];
        let code = 256;
        let phrase;

        for (let i = 1; i < data.length; i++) {
            let currCode = data[i];
            if (currCode < 256) {
                phrase = String.fromCharCode(data[i]);
            } else {
                phrase = dictionary[currCode] ? dictionary[currCode] : (oldPhrase + currentChar);
            }
            // Adding to an array? Don't you mean .push() ??????????
            out += phrase;
            currentChar = phrase[0];
            dictionary[code] = oldPhrase + currentChar;
            code++;
            oldPhrase = phrase;
        }
        return out;
    }
}

module.exports = Algorithm
