const fs = require("fs");
const WavDecoder = require("wav-decoder");
const WavEncoder = require("wav-encoder");

const readFile = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, buffer) => {
            return (err) ? reject(err) : resolve(buffer);
        });
    });
};

let audio = {};
readFile("Startup.wav").then((buffer) => {
    return WavDecoder.decode(buffer);
}).then(function(audioData) {
    const output = {
        sampleRate: audioData.sampleRate,
        channelData: [audioData.channelData[0], audioData.channelData[1]]
    };
    WavEncoder.encode(output).then((buffer) => {
        fs.writeFileSync("output.wav", new Buffer(buffer));
    });
})
