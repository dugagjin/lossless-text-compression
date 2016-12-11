# online-codec

The goal of this project is to compress wav files online.

## Files

There is an Algorithm file and a main file called codec.js

### What is already implemented

- Decoding and encoding wav files
- Compression algorithm (LZW)

### What has to be implemented

Saving the file:
- It has to be saved as binary and not UTF-8. Otherwise the file will not always be smaller than the original file.
- It does not matter with which encoding do we read the compressed file. But in order to decode it with LZW it has to be converted to UTF-8.

I have tried by using the following but with no success:
```
function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}
```

## Built With

* [Startup.wav](https://github.com/dugagjinll/online-codec/blob/master/Startup.wav) - Startup sound Windows XP

## Author

Dugagjin Lashi

## License

This project is licensed under the MIT License - see the LICENSE file for details.
