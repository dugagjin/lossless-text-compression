const fs = require("fs");
const path = require("path");

const Algorithm = require('./Algorithm');
const algorithm = new Algorithm()

const input = path.join(__dirname, 'input.wav') // smaller file for development
//const input = path.join(__dirname, 'original.wav') // original wav
const output = path.join(__dirname, 'output.txt')

const stream = fs.createReadStream(input);
const toDecode = [];
const items = []
const headerSize = 44
const bytesToRead = 2

console.log('Filesize:', filesize(input))

let str = '';

// This works, don't touch it
stream.on('readable', () => {
    let chunk;
    // let chunkID = stream.read(4)
    // let chunkSize = stream.read(4)
    // let format = stream.read(4)
    // let Subchunk1ID = stream.read(4)
    // let Subchunk1Size = stream.read(4)
    // let AudioFormat = stream.read(2)
    // let NumChannels = stream.read(2)
    // let SampleRate = stream.read(4)
    // let ByteRate = stream.read(4)
    // let BlockAlign = stream.read(2)
    // let BitsPerSample = stream.read(2)
    // let Subchunk2ID = stream.read(4)
    // let Subchunk2Size = stream.read(4)
    // Skip header
    //stream.read(44)

    while (chunk = stream.read(2)) {
        const item = String.fromCharCode(parseInt(chunk.toString('hex'), 16))
        str += item
    }
})

//const x = [206182, 206044, 206132, 206107, 206130, 206188, 204479, 201072, 206158, 206150, 206137, 206148, 206098, 193595, 205980, 197932, 206105];

// This works, don't touch it
stream.on('end',() => {

    console.log('Before enconding:', str.length)

    const comp = algorithm.encode(str);
    const result = comp.join('')

    console.log('After enconding:', str.length)

    const wStream = fs.createWriteStream(output);

    comp.forEach(int => {
        const buf = Buffer.from(hex16(int), 'hex');
        items.push(int)
        wStream.write(buf)
    })
    wStream.end()

    countDuplicates(items)

    wStream.on('finish', decodeAndWrite)
});

function decodeAndWrite() {
    const stream2 = fs.createReadStream(output);
    stream2.on('readable', () => {
        let chunk2;
        while (chunk2 = stream2.read(2)) {
            toDecode.push(chunk2.readUIntBE(0, 2))
        }
    });
    stream2.on('end', () => {
        // This doesn't work :( algorithm problem ?
        console.log('---- End result ---')
        const sss = algorithm.decode(toDecode)
        console.log(sss)
        //fs.writeFileSync('output.wav', algorithm.decode(toDecode), 'binary');
        //fs.writeFileSync('output.wav', toDecode.join(''), 'binary');
    })
}

/**
 * Counts duplicates and estimates gains in size
 * @param arr {array}
 * @private
 */
function countDuplicates(arr) {
    const oldLength = arr.length
    const sorted_arr = arr.slice().sort();
    const results = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    console.log('Total words:', oldLength);
    console.log('Duplicates words:', results.length);
}

/**
 * Converts an integer into a hex string
 * @param val {number}
 * @returns {string}
 */
function hex16(val) {
    val &= 0xFFFFFF;
    const hex = val.toString(16).toUpperCase();
    return ("0000" + hex).slice(-4);
}

function filesize(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}
