const fs = require("fs");
require('./algorithm.js')();

let str = fs.readFileSync('Startup.wav', 'binary');
let comp = encode(str);
let compUTF8 = comp.map((e) => {
    return String.fromCharCode(e);
}).join('');

fs.writeFileSync('compressed.txt', compUTF8, 'binary');
let readed = fs.readFileSync('compressed.txt', 'binary');

let decomp = decode(comp);
let toSave = decomp.split('').map((e) => {
    return e.charCodeAt(e);
});

fs.writeFileSync('output.wav', decomp, 'binary')

console.log('original: \t' + Buffer.byteLength(str))
console.log('compressed: \t' + Buffer.byteLength(compUTF8))
console.log('output: \t' + Buffer.byteLength(decomp))
