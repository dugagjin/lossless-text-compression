const rl = function rl() {}

rl.prototype.encode = function(input) {
    var encoding = [];
    var prev, count, i;
    for (count = 1, prev = input[0], i = 1; i < input.length; i++) {
        if (input[i] != prev) {
            if (count == 1) {
                encoding.push(prev);
            } else {
                encoding.push(prev);
                encoding.push(count);
            }
            count = 1;
            prev = input[i];
        } else {
            count++;
        }
    }
    encoding.push(prev);
    return encoding;
}

rl.prototype.decode = function(encoded) {
    var output = [];
    var run = false;
    for (var i = 0; i < encoded.length; i++) {
        if (encoded[i] != 0) {
            output.push(encoded[i]);
        } else {
            let x = 0;
            while (x < encoded[i + 1]) {
                if (encoded[i + 1] == '1') {
                    output.push(encoded[i]);
                }
                output.push(encoded[i]);
                x++;
            }
            i++;
        }
    }
    return output.join('');
}

module.exports = new rl();
