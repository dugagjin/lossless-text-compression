const fs = require("fs");
require('./algorithm.js')();

let str = '';
fs.open('Startup.wav', 'r', function(err, fd) {
    if (err) {
        throw err;
    }
    let buffer = new Buffer(1);
    while (true) {
        var num = fs.readSync(fd, buffer, 0, 1, null);
        if (num === 0) {
            break;
        }
        str += String.fromCharCode(buffer[0]);
    }
    let comp = encode(str);
    let decomp = decode(encode(str));
    console.log(str.length);
    console.log(comp.length);
    console.log(decomp.length);
    fs.writeFileSync('output.wav', decomp, 'binary');
});
