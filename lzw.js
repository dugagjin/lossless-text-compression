/*
 lzw - Lempel–Ziv–Welch data compression algorithm
 copyright (c) 2013 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function byte2hex(val) {
    if (val < 16) return '0' + val.toString(16);
    return val.toString(16);
}

function hex2byte(hex) {
    let bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

module.exports.encode = function(src) {

    if (!Buffer.isBuffer(src)) {
        throw new Error('Encode: input must be a buffer');
    }

    let abc = {}, size = 256;
    for (let i = 0; i < size; i++) {
        abc[byte2hex(i)] = i;
    }

    let acc = '', offset = 0, buf = [], next_byte;
    while (offset < src.length) {
        next_byte = byte2hex(src.readUInt8(offset));
        if (!abc[acc + next_byte]) {

            let bbb = abc[acc] << 12 | abc[next_byte];
            buf.push(bbb >> 16);
            buf.push((bbb >> 8) & 0xff);
            buf.push(bbb & 0xff);

            if (size > 0xfff) size = 256;

            abc[acc + next_byte] = size++;
            acc = '';

        } else {
            acc += next_byte;
        }
        offset++;
    }
    if (acc != '') {
        buf.push(abc[acc] >> 4);
        buf.push((abc[acc] & 0x0f) << 4);
    }

    return new Buffer(buf);
}

module.exports.decode = function(src) {

    if (!Buffer.isBuffer(src)) {
        throw new Error('Decode: input must be a buffer');
    }

    let abc1 = {}, abc2 = {}, size = 256;
    for (let i = 0; i < size; i++) {
        abc1[byte2hex(i)] = i;
        abc2[i] = byte2hex(i);
    }

    let offset = 0, acc = '', buf = [], idx;

    loop: {
        while (offset < src.length) {

            for (let serialNumber = 0; serialNumber < 2; serialNumber++) {

                if (serialNumber) {
                    if ((offset + 2) >= src.length) break loop;
                    else idx = ((src.readUInt8(offset + 1) & 0x0f) << 4) | src.readUInt8(offset + 2);
                } else {
                    if ((offset + 1) >= src.length) break loop;
                    else idx = (src.readUInt8(offset) << 4) | (src.readUInt8(offset + 1) >> 4)
                }

                buf = buf.concat(hex2byte(abc2[idx]));

                acc += abc2[idx];
                if (!abc1[acc]) {
                    if (size > 0xfff) size = 256;
                    abc1[acc] = size;
                    abc2[size] = acc;
                    size++;
                    acc = '';
                }

            }

            offset += 3;
        }
    }

    return new Buffer(buf);
}
