module.exports = function() {
    this.encode = function(s) {
        var dict = {};
        var data = (s + "").split("");
        var out = [];
        var currChar;
        var phrase = data[0];
        var code = 256;
        for (var i = 1; i < data.length; i++) {
            currChar = data[i];
            if (dict[phrase + currChar] != null) {
                phrase += currChar;
            } else {
                out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                dict[phrase + currChar] = code;
                code++;
                phrase = currChar;
            }
        }
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));

        return out;
    }

    this.decode = function(data) {
        var dict = {};
        var currChar = String.fromCharCode(data[0]);
        var oldPhrase = currChar;
        var out = [currChar];
        var code = 256;
        var phrase;
        for (var i = 1; i < data.length; i++) {

            var currCode = data[i];
            if (currCode < 256) {
                phrase = String.fromCharCode(data[i]);
            } else {
                phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
            }
            out += phrase;
            currChar = phrase[0];
            dict[code] = oldPhrase + currChar;
            code++;
            oldPhrase = phrase;
        }
        return out;
    }
}
