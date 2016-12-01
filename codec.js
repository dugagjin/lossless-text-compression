const fs = require("fs");
require('./algorithm.js')();

let str = '';
const stream = fs.createReadStream('Startup.wav');
stream.on('readable', () => {
    let chunk;
    while (chunk = stream.read(1)) {
        str += String.fromCharCode(parseInt(chunk.toString('hex'), 16));
    }
});
stream.on('end', () => {
    let comp = encode(str);
    let decomp = decode(comp);
    console.log('input: ' + str.length +'\tcompressed: '+ comp.length + '\tdecompressed: ' + decomp.length);
    fs.writeFileSync('output.wav', decomp, 'binary');
});


/*
stream.on('end', () => {
    comp = encode(str);
    let toSave = comp.map((e) => {
        return String.fromCharCode(e);
    }).join('');

    fs.writeFileSync('compressed.txt', toSave, 'utf8');
    let readed = fs.readFileSync('compressed.txt', 'utf8');

    let toDecode = readed.split('').map((e) => {
        return e.charCodeAt(e);
    });

    let decomp = decode(toDecode);
    fs.writeFileSync('decompressed.wav', decomp, 'binary');
});
*/
