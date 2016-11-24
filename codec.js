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

let samplerate, leftAudio, rightAudio;

readFile("Startup.wav").then((buffer) => {
    return WavDecoder.decode(buffer);
}).then(function(audioData) {
    samplerate = audioData.sampleRate;
    leftAudio = audioData.channelData[0];
    rightAudio = audioData.channelData[1];
}).then(() => {
    const whiteNoise1sec = {
        sampleRate: samplerate,
        channelData: [leftAudio, rightAudio]
    };
    WavEncoder.encode(whiteNoise1sec).then((buffer) => {
        fs.writeFileSync("output.wav", new Buffer(buffer));
    });
});
