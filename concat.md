EN

- <a href="https://ar.javascript.info/"
- <a href="concat.html"
  /concat"
  /concat"
  concatconcat"

<!-- -->

- /"
  /concat"
- <a href="https://tr.javascript.info/"
  concat"

k%2Fconcat"%2Fconcat" </a>

<a href="../binary.html" Binary data, files</span></a>

<a href="../arraybuffer-binary-arrays.html" ArrayBuffer, binary arrays</span></a>

<a href="../arraybuffer-binary-arrays.html"

## Concatenate typed arrays

Given an array of `Uint8Array`, write a function `concat(arrays)` that returns a concatenation of them into a single array.

[Open a sandbox with tests.](https://plnkr.co/edit/iyG5tfOchHTHKIrt?p=preview)

solution

    function concat(arrays) {
      // sum of individual array lengths
      let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

      if (!arrays.length) return null;

      let result = new Uint8Array(totalLength);

      // for each array - copy it over result
      // next array is copied right after the previous one
      let length = 0;
      for(let array of arrays) {
        result.set(array, length);
        length += array.length;
      }

      return result;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/sazJ16sytvM74sAH?p=preview)
