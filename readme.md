# Lossless text compression

## Benchmark

original size | compressed size   | compression speed  | decompression based
---|---|---|---
56.1 kb | 35.5 kb | 35.57 ms | 21.24 ms
90 kb | 52.8 kb | 46.96 ms | 30.52 ms

## Install

```
npm install lossless-text-compression
```

## How to use

#### Encode

```
const ltc = require('lossless-text-compression');

ltc.encode('1121231234123451234561234567123456781234567891234567890')
    .catch(error => console.log(error))
    .then(compressed => console.log(compressed));
```

#### Decode

```
const ltc = require('lossless-text-compression');

ltc.decode('11234567890')
    .catch(error => console.log(error))
    .then(decompressed => console.log(decompressed));
```

#### Remarks

- Compressed files should be readed/saved in UTF-8.
- decompressed files or orignal files should be readed/saved in binary.

## Author

Dugagjin Lashi

## License

This project is licensed under the MIT License - see the LICENSE file for details.
