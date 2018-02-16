# Lossless text compression

## Benchmark

The performance gets better with the number of words. 

words | compressed | original | encode  | decode
---|---|---|---|---
100 000 | 226 kB | 654 kB | 381 ms | 51 ms
10 000 | 25 kB | 65 kB | 43 ms | 8.7 ms
1 000 | 4.4 kB | 6.4 kB | 6.7 ms | 1.5 ms
100 | 0.62 kB | 0.73 kB | 0.44 ms | 0.16 ms

## Install

```
npm install lossless-text-compression
```

## How to use

#### Encode

```
const { encode } = require('lossless-text-compression');

console.log(
    encode('1121231234123451234561234567123456781234567891234567890')
);
```

#### Decode

```
const { decode } = require('lossless-text-compression');

console.log(
    decode('11234567890')
);
```

#### With files

```
const { encode, decode } = require('lossless-text-compression');
const { readFileSync, writeFileSync } = require('fs');
  
const fileName = ...;           // for example: loremipsum.txt
const compressedFile = ...;     // for example: encoded.txt
const restoredFile = ...;       // for example: decoded.txt

// read yourfile file
const content = readFileSync(fileName, 'utf-8');

// encode and save the content
writeFileSync(compressedFile, encode(content), 'ucs2');

// read and decode the encoded content
const decoded = decode(readFileSync(compressedFileName, 'ucs2'));

// save the restored content
writeFileSync(restoredFileName, decoded, 'utf-8');
```

## Author

Dugagjin Lashi

## License

This project is licensed under the MIT License - see the LICENSE file for details.
