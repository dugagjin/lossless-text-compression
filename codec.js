const fs = require("fs");
const lzw = require('./lzw.js');


let str = fs.readFileSync('Startup.wav', 'binary');
let comp = lzw.encode(str);

fs.writeFileSync('compressed.txt', comp, 'utf8');
let readed = fs.readFileSync('compressed.txt', 'utf8');

let decomp = lzw.decode(readed);
fs.writeFileSync('output.wav', decomp, 'binary');

console.log(str.length);
console.log(comp.length);
console.log(decomp.length);
