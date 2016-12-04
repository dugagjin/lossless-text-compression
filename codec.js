const fs = require("fs");
require('./algorithm.js')();

audioWithSave();
//audioWithoutSave();
//text();

function audioWithSave() {
    let str = fs.readFileSync('Startup.wav', 'binary');
    let comp = encode(str);

    let compUTF8 = comp.map((e) => {
        return String.fromCharCode(e);
    }).join('');

    fs.writeFileSync('compressed.txt', compUTF8, 'binary');
    let readed = fs.readFileSync('compressed.txt', 'binary');

    let toDecomp = readed.split('').map((e) => {
        return e.charCodeAt(e);
    });

    let decomp = decode(toDecomp);
    fs.writeFileSync('output.wav', decomp, 'binary')

    console.log('original: \t' + Buffer.byteLength(str));
    console.log('compressed: \t' + Buffer.byteLength(compUTF8));
    console.log('output: \t' + Buffer.byteLength(decomp));
}

function audioWithoutSave() {
    let str = fs.readFileSync('Startup.wav', 'binary');
    let comp = encode(str);
    let decomp = decode(comp);
    fs.writeFileSync('output.wav', decomp, 'binary')

    console.log('original: \t' + Buffer.byteLength(str));
    console.log('compressed: \t' + Buffer.byteLength(comp)); // is longer because it's an array not a utf8 string
    console.log('output: \t' + Buffer.byteLength(decomp));
}

function text() {
    let str = fs.readFileSync('text.txt', 'binary');
    let comp = encode(str);

    let compUTF8 = comp.map((e) => {
        return String.fromCharCode(e);
    }).join('');

    fs.writeFileSync('compressed.txt', compUTF8, 'utf8');
    let readed = fs.readFileSync('compressed.txt', 'utf8');

    let toDecomp = readed.split('').map((e) => {
        return e.charCodeAt(e);
    });

    let decomp = decode(toDecomp);
    fs.writeFileSync('output.txt', decomp, 'utf8')

    console.log('original: \t' + Buffer.byteLength(str));
    console.log('compressed: \t' + Buffer.byteLength(compUTF8));
    console.log('output: \t' + Buffer.byteLength(decomp));
}
