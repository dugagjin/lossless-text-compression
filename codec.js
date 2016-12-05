const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const lzw = require('./lzw')

const input = path.join(__dirname, 'input.wav') // smaller file for development
//const input = path.join(__dirname, 'original.wav') // original wav
const output = path.join(__dirname, 'output.txt')
//-----------------------------------------------------

const content = fs.readFileSync(input)
const encoded = lzw.encode(content);
const stream  = fs.createWriteStream(output)

stream.write(encoded)
stream.end()
stream.on('finish', () => {
    const readBytes = fs.readFileSync(output)
    const decoded = lzw.decode(Buffer.from(readBytes))

    console.log('content:', Buffer.byteLength(content), content)
    console.log('encoded:', Buffer.byteLength(encoded), encoded)
    console.log('decoded:', Buffer.byteLength(decoded), decoded)

    if (checksum(encoded) !== checksum(readBytes)) {
        throw new Error('Checksum failed, we are not writing the files correctly')
    }

    console.log('Hash (original):\t', checksum(content))
    console.log('Hash  (decoded):\t', checksum(decoded))

    //console.log('Hash (input.wav):\t', checksum(content))
    //console.log('Hash (output.wav):\t', checksum(decoded))
    /*console.log('Content (input.wav):\t', content)
    console.log('Content (output.wav):\t', decoded)
    console.log('Before enconding:', content.length)
    console.log('After enconding:', encoded.length)
    console.log('After decoding:', decoded.length)*/
})



//fs.writeFileSync('output.wav', decoded, 'binary')

// Helper for getting md5 hash
function checksum(str, algorithm, encoding) {
    return crypto.createHash(algorithm || 'md5').update(str, 'utf8').digest(encoding || 'hex')
}
