const fs = require("fs");
require('./algorithm.js')();

let str = '';
const stream = fs.createReadStream('Startup.wav')
stream.on('readable', function() {
    let chunk;
    while (chunk = stream.read(1)) {
        str += String.fromCharCode(parseInt(chunk.toString('hex'), 16));
    }
    let comp = encode(str);
    let decomp = decode(comp);
    console.log('input: ' + str.length +'\tcompressed: '+ comp.length + '\tdecompressed: ' + decomp.length);

    fs.writeFileSync('output.wav', decomp, 'binary');
})
