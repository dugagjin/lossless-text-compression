const fs = require("fs");
require('./algorithm.js')();


let str = fs.readFileSync('Startup.wav', 'binary');
let comp = encode(str);

let compUTF8 = comp.map((e) => {
    return String.fromCodePoint(e);
}).join('');

//fs.writeFileSync('compressed.txt', compUTF8, 'binary');
//let readed = fs.readFileSync('compressed.txt', 'binary');

let toDecomp = [...compUTF8].map((e) => {
    return e.codePointAt(0);
});

let decomp = decode(toDecomp);
fs.writeFileSync('output.wav', decomp, 'binary');

console.log(str.length);
console.log(comp.length);
console.log(compUTF8.length);
console.log(toDecomp.length);
console.log(decomp.length);
