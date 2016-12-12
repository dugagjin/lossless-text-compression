const fs = require("fs");
const lzw = require('./lzw.js');

let inputName = String(process.argv[2]);
let outputName = String(process.argv[3]);

let str = fs.readFileSync(inputName, 'binary');
let comp = lzw.encode(str);

fs.writeFileSync('compressed.txt', comp, 'binary');
let readed = fs.readFileSync('compressed.txt', 'binary');

let decomp = lzw.decode(comp);
fs.writeFileSync(outputName, decomp, 'binary');
