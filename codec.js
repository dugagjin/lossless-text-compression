const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const lzw = require('./lzw')

const input = path.join(__dirname, 'input.wav') // smaller file for development
//const input = path.join(__dirname, 'original.wav') // original wav
const output = path.join(__dirname, 'output.txt')
//-----------------------------------------------------

const content = fs.readFileSync(input, 'utf8')
const encoded = lzw.encode(content);

const stream = fs.createWriteStream(output)
stream.write(encoded)
stream.end()
stream.on('finish', () => {
    const readBytes = fs.readFileSync(output, 'utf8')

    if (checksum(encoded) !== checksum(readBytes) || encoded !== readBytes) {
        throw new Error('Checksum failed, we are not writing the files correctly')
    }

    const decoded = lzw.decode(readBytes.toString('utf8'))
    const wstream = fs.createWriteStream('output.wav')

    wstream.write(decoded)
    wstream.end()
    wstream.on('finish', () => {
        console.log('Before enconding:', content.length)
        console.log('After enconding:', encoded.length)
        console.log('After decoding:', decoded.length)
        console.log('---------------------------------------')
        console.log('Hash (input.wav):\t', checksum(content))
        console.log('Hash (output.wav):\t', checksum(decoded))
        console.log('---------------------------------------')
        console.log('Content (input.wav):\t', content)
        console.log('Content (output.wav):\t', decoded)
    })
})

// Helper for getting md5 hash
function checksum(str, algorithm, encoding) {
    return crypto.createHash(algorithm || 'md5').update(str, 'utf8').digest(encoding || 'hex')
}
