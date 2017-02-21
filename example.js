const lzw = require('./lzw.js');

lzw.encode("TOBEORNOTTOBEORTOBEORNOTTOBEORTOBEORNOT")
    .catch(error => console.log(error))
    .then(compressed => console.log(compressed));

lzw.decode("TOBEORNOTT")
    .catch(error => console.log(error))
    .then(decompressed => console.log(decompressed));
