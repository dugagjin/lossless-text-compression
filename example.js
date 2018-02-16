const { encode, decode } = require('./ltc.js');
const { readFileSync, writeFileSync } = require('fs');
  
const textFile = ...;           // for example: loremipsum.txt
const compressedFile = ...;     // for example: encoded.txt
const restoredFile = ...;       // for example: decoded.txt

// read yourfile file
const content = readFileSync(textFile, 'utf-8');

// save encoded the content
writeFileSync(compressedFile, encode(content), 'ucs2');

// read and decode the encoded content
const decoded = decode(readFileSync(compressedFile, 'ucs2'));

// save the restored content
writeFileSync(restoredFile, decoded, 'utf-8');


