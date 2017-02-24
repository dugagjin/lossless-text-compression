const ltc = require('./ltc.js');

ltc.encode("1121231234123451234561234567123456781234567891234567890")
    .catch(error => console.log(error))
    .then(compressed => console.log(compressed));

ltc.decode("11234567890")
    .catch(error => console.log(error))
    .then(decompressed => console.log(decompressed));
