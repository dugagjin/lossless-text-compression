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
stream.on('finish',() => {
    //const x = [206182, 206044, 206132, 206107, 206130, 206188, 204479, 201072, 206158, 206150, 206137, 206148, 206098, 193595, 205980, 197932, 206105];
    const comp = encode(str);
    const toDecode = [];
    function hex16(val) {
        val &= 0xFFFFFF;
        const hex = val.toString(16).toUpperCase();
        return ("000000" + hex).slice(-6);
    }
    const wStream = fs.createWriteStream('t.txt');
    comp.forEach(int => {
        const buf = Buffer.from(hex16(int), 'hex');
        wStream.write(buf)
    })
    wStream.end()
    wStream.on('finish', readBinaryFile)
    function readBinaryFile() {
        const stream2 = fs.createReadStream('t.txt');
        stream2.on('readable', () => {
            let chunk2;
            while (chunk2 = stream2.read(3)) {
                toDecode.push(chunk2.readUIntBE(0, 3))
            }
        });
        stream2.on('end', () => {
            console.log(toDecode);
            fs.writeFileSync('output.wav', decode(toDecode), 'binary');
        })
    }
});
