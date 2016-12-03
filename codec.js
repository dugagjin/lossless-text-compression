const fs = require("fs")
const path = require("path")
const lzw = require('./lzw')

//const input = path.join(__dirname, 'input.wav') // smaller file for development
const input = path.join(__dirname, 'original.wav') // original wav
const output = path.join(__dirname, 'output.txt')

const content = fs.readFileSync(input, 'binary')
const encoded = lzw.encode(content);

console.log('Before enconding:', content.length)
console.log('After enconding:', encoded.length)

fs.writeFileSync(output, encoded, 'binary');

const decoded = lzw.decode(encoded);
console.log('After deconding:', decoded.length)

fs.writeFileSync('output.wav', decoded, 'binary')
