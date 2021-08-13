EN

- <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="arraybuffer-binary-arrays.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/arraybuffer-binary-arrays" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- arraybuffer-binary-arrays" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/arraybuffer-binary-arrays" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>

<a href="arraybuffer-binary-arrays%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>

<a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>

<span class="share-icons__title">Share</span>2Farraybuffer-binary-arrays" rel="nofollow" &gt;2Farraybuffer-binary-arrays عربي English Español Français Italiano 日本語 한국어 Русский Türkçe

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="binary.html" class="breadcrumbs__link"><span>Binary data, files</span></a></span>

25th November 2020

# ArrayBuffer, binary arrays

In web-development we meet binary data mostly while dealing with files (create, upload, download). Another typical use case is image processing.

That’s all possible in JavaScript, and binary operations are high-performant.

Although, there’s a bit of confusion, because there are many classes. To name a few:

- `ArrayBuffer`, `Uint8Array`, `DataView`, `Blob`, `File`, etc.

Binary data in JavaScript is implemented in a non-standard way, compared to other languages. But when we sort things out, everything becomes fairly simple.

**The basic binary object is `ArrayBuffer` – a reference to a fixed-length contiguous memory area.**

We create it like this:

<a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let buffer = new ArrayBuffer(16); // create a buffer of length 16
    alert(buffer.byteLength); // 16

This allocates a contiguous memory area of 16 bytes and pre-fills it with zeroes.

<span class="important__type">`ArrayBuffer` is not an array of something</span>

Let’s eliminate a possible source of confusion. `ArrayBuffer` has nothing in common with `Array`:

- It has a fixed length, we can’t increase or decrease it.
- It takes exactly that much space in the memory.
- To access individual bytes, another “view” object is needed, not `buffer[index]`.

`ArrayBuffer` is a memory area. What’s stored in it? It has no clue. Just a raw sequence of bytes.

**To manipulate an `ArrayBuffer`, we need to use a “view” object.**

A view object does not store anything on it’s own. It’s the “eyeglasses” that give an interpretation of the bytes stored in the `ArrayBuffer`.

For instance:

- **`Uint8Array`** – treats each byte in `ArrayBuffer` as a separate number, with possible values from 0 to 255 (a byte is 8-bit, so it can hold only that much). Such value is called a “8-bit unsigned integer”.
- **`Uint16Array`** – treats every 2 bytes as an integer, with possible values from 0 to 65535. That’s called a “16-bit unsigned integer”.
- **`Uint32Array`** – treats every 4 bytes as an integer, with possible values from 0 to 4294967295. That’s called a “32-bit unsigned integer”.
- **`Float64Array`** – treats every 8 bytes as a floating point number with possible values from `5.0x10-324` to `1.8x10308`.

So, the binary data in an `ArrayBuffer` of 16 bytes can be interpreted as 16 “tiny numbers”, or 8 bigger numbers (2 bytes each), or 4 even bigger (4 bytes each), or 2 floating-point values with high precision (8 bytes each).

<figure><img src="article/arraybuffer-binary-arrays/arraybuffer-views.svg" width="603" height="286" /></figure>`ArrayBuffer` is the core object, the root of everything, the raw binary data.

But if we’re going to write into it, or iterate over it, basically for almost any operation – we must use a view, e.g:

<a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let buffer = new ArrayBuffer(16); // create a buffer of length 16

    let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

    alert(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

    alert(view.length); // 4, it stores that many integers
    alert(view.byteLength); // 16, the size in bytes

    // let's write a value
    view[0] = 123456;

    // iterate over values
    for(let num of view) {
      alert(num); // 123456, then 0, 0, 0 (4 values total)
    }

## <a href="arraybuffer-binary-arrays.html#typedarray" id="typedarray" class="main__anchor">TypedArray</a>

The common term for all these views (`Uint8Array`, `Uint32Array`, etc) is [TypedArray](https://tc39.github.io/ecma262/#sec-typedarray-objects). They share the same set of methods and properities.

Please note, there’s no constructor called `TypedArray`, it’s just a common “umbrella” term to represent one of views over `ArrayBuffer`: `Int8Array`, `Uint8Array` and so on, the full list will soon follow.

When you see something like `new TypedArray`, it means any of `new Int8Array`, `new Uint8Array`, etc.

Typed arrays behave like regular arrays: have indexes and are iterable.

A typed array constructor (be it `Int8Array` or `Float64Array`, doesn’t matter) behaves differently depending on argument types.

There are 5 variants of arguments:

    new TypedArray(buffer, [byteOffset], [length]);
    new TypedArray(object);
    new TypedArray(typedArray);
    new TypedArray(length);
    new TypedArray();

1.  If an `ArrayBuffer` argument is supplied, the view is created over it. We used that syntax already.

    Optionally we can provide `byteOffset` to start from (0 by default) and the `length` (till the end of the buffer by default), then the view will cover only a part of the `buffer`.

2.  If an `Array`, or any array-like object is given, it creates a typed array of the same length and copies the content.

    We can use it to pre-fill the array with the data:

    <a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let arr = new Uint8Array([0, 1, 2, 3]);
        alert( arr.length ); // 4, created binary array of the same length
        alert( arr[1] ); // 1, filled with 4 bytes (unsigned 8-bit integers) with given values

3.  If another `TypedArray` is supplied, it does the same: creates a typed array of the same length and copies values. Values are converted to the new type in the process, if needed.

    <a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let arr16 = new Uint16Array([1, 1000]);
        let arr8 = new Uint8Array(arr16);
        alert( arr8[0] ); // 1
        alert( arr8[1] ); // 232, tried to copy 1000, but can't fit 1000 into 8 bits (explanations below)

4.  For a numeric argument `length` – creates the typed array to contain that many elements. Its byte length will be `length` multiplied by the number of bytes in a single item `TypedArray.BYTES_PER_ELEMENT`:

    <a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let arr = new Uint16Array(4); // create typed array for 4 integers
        alert( Uint16Array.BYTES_PER_ELEMENT ); // 2 bytes per integer
        alert( arr.byteLength ); // 8 (size in bytes)

5.  Without arguments, creates an zero-length typed array.

We can create a `TypedArray` directly, without mentioning `ArrayBuffer`. But a view cannot exist without an underlying `ArrayBuffer`, so gets created automatically in all these cases except the first one (when provided).

To access the `ArrayBuffer`, there are properties:

- `arr.buffer` – references the `ArrayBuffer`.
- `arr.byteLength` – the length of the `ArrayBuffer`.

So, we can always move from one view to another:

    let arr8 = new Uint8Array([0, 1, 2, 3]);

    // another view on the same data
    let arr16 = new Uint16Array(arr8.buffer);

Here’s the list of typed arrays:

- `Uint8Array`, `Uint16Array`, `Uint32Array` – for integer numbers of 8, 16 and 32 bits.
  - `Uint8ClampedArray` – for 8-bit integers, “clamps” them on assignment (see below).
- `Int8Array`, `Int16Array`, `Int32Array` – for signed integer numbers (can be negative).
- `Float32Array`, `Float64Array` – for signed floating-point numbers of 32 and 64 bits.

<span class="important__type">No `int8` or similar single-valued types</span>

Please note, despite of the names like `Int8Array`, there’s no single-value type like `int`, or `int8` in JavaScript.

That’s logical, as `Int8Array` is not an array of these individual values, but rather a view on `ArrayBuffer`.

### <a href="arraybuffer-binary-arrays.html#out-of-bounds-behavior" id="out-of-bounds-behavior" class="main__anchor">Out-of-bounds behavior</a>

What if we attempt to write an out-of-bounds value into a typed array? There will be no error. But extra bits are cut-off.

For instance, let’s try to put 256 into `Uint8Array`. In binary form, 256 is `100000000` (9 bits), but `Uint8Array` only provides 8 bits per value, that makes the available range from 0 to 255.

For bigger numbers, only the rightmost (less significant) 8 bits are stored, and the rest is cut off:

<figure><img src="article/arraybuffer-binary-arrays/8bit-integer-256.svg" width="195" height="145" /></figure>So we’ll get zero.

For 257, the binary form is `100000001` (9 bits), the rightmost 8 get stored, so we’ll have `1` in the array:

<figure><img src="article/arraybuffer-binary-arrays/8bit-integer-257.svg" width="195" height="145" /></figure>In other words, the number modulo 2<sup>8</sup> is saved.

Here’s the demo:

<a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let uint8array = new Uint8Array(16);

    let num = 256;
    alert(num.toString(2)); // 100000000 (binary representation)

    uint8array[0] = 256;
    uint8array[1] = 257;

    alert(uint8array[0]); // 0
    alert(uint8array[1]); // 1

`Uint8ClampedArray` is special in this aspect, its behavior is different. It saves 255 for any number that is greater than 255, and 0 for any negative number. That behavior is useful for image processing.

## <a href="arraybuffer-binary-arrays.html#typedarray-methods" id="typedarray-methods" class="main__anchor">TypedArray methods</a>

`TypedArray` has regular `Array` methods, with notable exceptions.

We can iterate, `map`, `slice`, `find`, `reduce` etc.

There are few things we can’t do though:

- No `splice` – we can’t “delete” a value, because typed arrays are views on a buffer, and these are fixed, contiguous areas of memory. All we can do is to assign a zero.
- No `concat` method.

There are two additional methods:

- `arr.set(fromArr, [offset])` copies all elements from `fromArr` to the `arr`, starting at position `offset` (0 by default).
- `arr.subarray([begin, end])` creates a new view of the same type from `begin` to `end` (exclusive). That’s similar to `slice` method (that’s also supported), but doesn’t copy anything – just creates a new view, to operate on the given piece of data.

These methods allow us to copy typed arrays, mix them, create new arrays from existing ones, and so on.

## <a href="arraybuffer-binary-arrays.html#dataview" id="dataview" class="main__anchor">DataView</a>

[DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) is a special super-flexible “untyped” view over `ArrayBuffer`. It allows to access the data on any offset in any format.

- For typed arrays, the constructor dictates what the format is. The whole array is supposed to be uniform. The i-th number is `arr[i]`.
- With `DataView` we access the data with methods like `.getUint8(i)` or `.getUint16(i)`. We choose the format at method call time instead of the construction time.

The syntax:

    new DataView(buffer, [byteOffset], [byteLength])

- **`buffer`** – the underlying `ArrayBuffer`. Unlike typed arrays, `DataView` doesn’t create a buffer on its own. We need to have it ready.
- **`byteOffset`** – the starting byte position of the view (by default 0).
- **`byteLength`** – the byte length of the view (by default till the end of `buffer`).

For instance, here we extract numbers in different formats from the same buffer:

<a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arraybuffer-binary-arrays.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // binary array of 4 bytes, all have the maximal value 255
    let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

    let dataView = new DataView(buffer);

    // get 8-bit number at offset 0
    alert( dataView.getUint8(0) ); // 255

    // now get 16-bit number at offset 0, it consists of 2 bytes, together interpreted as 65535
    alert( dataView.getUint16(0) ); // 65535 (biggest 16-bit unsigned int)

    // get 32-bit number at offset 0
    alert( dataView.getUint32(0) ); // 4294967295 (biggest 32-bit unsigned int)

    dataView.setUint32(0, 0); // set 4-byte number to zero, thus setting all bytes to 0

`DataView` is great when we store mixed-format data in the same buffer. For example, when we store a sequence of pairs (16-bit integer, 32-bit float), `DataView` allows to access them easily.

## <a href="arraybuffer-binary-arrays.html#summary" id="summary" class="main__anchor">Summary</a>

`ArrayBuffer` is the core object, a reference to the fixed-length contiguous memory area.

To do almost any operation on `ArrayBuffer`, we need a view.

- It can be a `TypedArray`:
  - `Uint8Array`, `Uint16Array`, `Uint32Array` – for unsigned integers of 8, 16, and 32 bits.
  - `Uint8ClampedArray` – for 8-bit integers, “clamps” them on assignment.
  - `Int8Array`, `Int16Array`, `Int32Array` – for signed integer numbers (can be negative).
  - `Float32Array`, `Float64Array` – for signed floating-point numbers of 32 and 64 bits.
- Or a `DataView` – the view that uses methods to specify a format, e.g. `getUint8(offset)`.

In most cases we create and operate directly on typed arrays, leaving `ArrayBuffer` under cover, as a “common denominator”. We can access it as `.buffer` and make another view if needed.

There are also two additional terms, that are used in descriptions of methods that operate on binary data:

- `ArrayBufferView` is an umbrella term for all these kinds of views.
- `BufferSource` is an umbrella term for `ArrayBuffer` or `ArrayBufferView`.

We’ll see these terms in the next chapters. `BufferSource` is one of the most common terms, as it means “any kind of binary data” – an `ArrayBuffer` or a view over it.

Here’s a cheatsheet:

<figure><img src="article/arraybuffer-binary-arrays/arraybuffer-view-buffersource.svg" width="707" height="463" /></figure>

## <a href="arraybuffer-binary-arrays.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="arraybuffer-binary-arrays.html#concatenate-typed-arrays" id="concatenate-typed-arrays" class="main__anchor">Concatenate typed arrays</a>

<a href="task/concat.html" class="task__open-link"></a>

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

<a href="binary.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="text-decoder.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

[plnkr](arraybuffer-binary-arrays.html%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20If%20you%20have%20suggestions%20what%20to%20improve%20-%20please%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20or%20a%20pull%20request%20instead%20of%20commenting.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/li%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20If%20you%20can't%20understand%20something%20in%20the%20article%20–%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20please%20elaborate.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/li%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20To%20insert%20few%20words%20of%20code,%20use%20the%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ccode%3E%3Ccode%3E%3C/code%3E%20tag,%20for%20several%20lines%20–%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20wrap%20them%20in%20%3Ccode%3E%3Cpre%3E%3C/code%3E%20tag,%20for%20more%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20than%2010%20lines%20–%20use%20a%20sandbox%20(%3Ca%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20href=), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="binary.html" class="sidebar__link">Binary data, files</a>

#### Lesson navigation

arraybuffer-binary-arrays.html\#typedarray" &gt;TypedArray

arraybuffer-binary-arrays.html\#typedarray-methods" &gt;TypedArray methods

arraybuffer-binary-arrays.html\#dataview" &gt;DataView

arraybuffer-binary-arrays.html

arraybuffer-binary-arrays.html\#tasks" &gt;Tasks (1)

arraybuffer-binary-arrays.html &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/4-binary/01-arraybuffer-binary-arrays" class="sidebar__link">Edit on GitHub</a>
