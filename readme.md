# Lossless text compression

## Benchmark

original size | compressed size   | compression speed  | decompression based
---|---|---|---
56.1 kb | 35.5 kb | 35.57 ms | 21.24 ms
90 kb | 52.8 kb | 46.96 ms | 30.52 ms

## How to use

#### Encode

```
const lzw = require('./lzw.js');
originalString = "TOBEORNOTTOBEORTOBEORNOTTOBEORTOBEORNOT"

lzw.encode(originalString)
    .catch(error => console.log(error))
    .then(compressed => console.log(compressed));
```

#### Decode

```
const lzw = require('./lzw.js');
compressedString = "TOBEORNOTT"

lzw.decode(compressedString)
    .catch(error => console.log(error))
    .then(decompressed => console.log(decompressed));

```

## Author

Dugagjin Lashi

## License

This project is licensed under the MIT License - see the LICENSE file for details.
