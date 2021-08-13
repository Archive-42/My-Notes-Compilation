EN

- <a href="https://ar.javascript.info/fetch-progress"
- <a href="fetch-progress.html"
- <a href="https://es.javascript.info/fetch-progress"
- <a href="https://fr.javascript.info/fetch-progress"
- fetch-progress"
  fetch-progress"

<!-- -->

- /fetch-progress"
- <a href=fetch-progress"
- <a href="https://tr.javascript.info/fetch-progress"
- <a href="https://zh.javascript.info/fetch-progress"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffetch-progress" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-progress" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

22nd June 2021

# Fetch: Download progress

The `fetch` method allows to track _download_ progress.

Please note: there’s currently no way for `fetch` to track _upload_ progress. For that purpose, please use [XMLHttpRequest](xmlhttprequest.html), we’ll cover it later.

To track download progress, we can use `response.body` property. It’s a `ReadableStream` – a special object that provides body chunk-by-chunk, as it comes. Readable streams are described in the [Streams API](https://streams.spec.whatwg.org/#rs-class) specification.

Unlike `response.text()`, `response.json()` and other methods, `response.body` gives full control over the reading process, and we can count how much is consumed at any moment.

Here’s the sketch of code that reads the response from `response.body`:

    // instead of response.json() and other methods
    const reader = response.body.getReader();

    // infinite loop while the body is downloading
    while(true) {
      // done is true for the last chunk
      // value is Uint8Array of the chunk bytes
      const {done, value} = await reader.read();

      if (done) {
        break;
      }

      console.log(`Received ${value.length} bytes`)
    }

The result of `await reader.read()` call is an object with two properties:

- **`done`** – `true` when the reading is complete, otherwise `false`.
- **`value`** – a typed array of bytes: `Uint8Array`.

<span class="important__type">Please note:</span>

Streams API also describes asynchronous iteration over `ReadableStream` with `for await..of` loop, but it’s not yet widely supported (see [browser issues](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), so we use `while` loop.

We receive response chunks in the loop, until the loading finishes, that is: until `done` becomes `true`.

To log the progress, we just need for every received fragment `value` to add its length to the counter.

Here’s the full working example that gets the response and logs the progress in console, more explanations to follow:

<a href="fetch-progress.html#"
<a href="fetch-progress.html#"

    // Step 1: start the fetch and obtain a reader
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

    const reader = response.body.getReader();

    // Step 2: get total length
    const contentLength = +response.headers.get('Content-Length');

    // Step 3: read the data
    let receivedLength = 0; // received that many bytes at the moment
    let chunks = []; // array of received binary chunks (comprises the body)
    while(true) {
      const {done, value} = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      console.log(`Received ${receivedLength} of ${contentLength}`)
    }

    // Step 4: concatenate chunks into single Uint8Array
    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for(let chunk of chunks) {
      chunksAll.set(chunk, position); // (4.2)
      position += chunk.length;
    }

    // Step 5: decode into a string
    let result = new TextDecoder("utf-8").decode(chunksAll);

    // We're done!
    let commits = JSON.parse(result);
    alert(commits[0].author.login);

Let’s explain that step-by-step:

1.  We perform `fetch` as usual, but instead of calling `response.json()`, we obtain a stream reader `response.body.getReader()`.

    Please note, we can’t use both these methods to read the same response: either use a reader or a response method to get the result.

2.  Prior to reading, we can figure out the full response length from the `Content-Length` header.

    It may be absent for cross-origin requests (see chapter [Fetch: Cross-Origin Requests](fetch-crossorigin.html)) and, well, technically a server doesn’t have to set it. But usually it’s at place.

3.  Call `await reader.read()` until it’s done.

    We gather response chunks in the array `chunks`. That’s important, because after the response is consumed, we won’t be able to “re-read” it using `response.json()` or another way (you can try, there’ll be an error).

4.  At the end, we have `chunks` – an array of `Uint8Array` byte chunks. We need to join them into a single result. Unfortunately, there’s no single method that concatenates those, so there’s some code to do that:

    1.  We create `chunksAll = new Uint8Array(receivedLength)` – a same-typed array with the combined length.
    2.  Then use `.set(chunk, position)` method to copy each `chunk` one after another in it.

5.  We have the result in `chunksAll`. It’s a byte array though, not a string.

    To create a string, we need to interpret these bytes. The built-in [TextDecoder](text-decoder.html) does exactly that. Then we can `JSON.parse` it, if necessary.

    What if we need binary content instead of a string? That’s even simpler. Replace steps 4 and 5 with a single line that creates a `Blob` from all chunks:

        let blob = new Blob(chunks);

At the end we have the result (as a string or a blob, whatever is convenient), and progress-tracking in the process.

Once again, please note, that’s not for _upload_ progress (no way now with `fetch`), only for _download_ progress.

Also, if the size is unknown, we should check `receivedLength` in the loop and break it once it reaches a certain limit. So that the `chunks` won’t overflow the memory.

<a href="formdata.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="fetch-abort.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffetch-progress" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-progress" </a>

<a href="tutorial/map.html" class="map">

## <a href="fetch-progress.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

- <a href="fetch-progress.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Ffetch-progress" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-progress" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/03-fetch-progress" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
