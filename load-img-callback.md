EN

langs\_\_title">عربي</span></a>

- <a href="load-img-callback.html"
  /load-img-callback"
  /load-img-callback"
  load-img-callbackload-img-callback"

<!-- -->

- /"
  load-img-callback"
- <a href="https://tr.javascript.info/"
  load-img-callback"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fload-img-callback"%2Fload-img-callback" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../loading.html" Document and resource loading</span></a>

<a href="../onload-onerror.html" Resource loading: onload and onerror</span></a>

<a href="../onload-onerror.html"

## Load images with a callback

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Normally, images are loaded when they are created. So when we add `<img>` to the page, the user does not see the picture immediately. The browser needs to load it first.

To show an image immediately, we can create it “in advance”, like this:

    let img = document.createElement('img');
    img.src = 'my.jpg';

The browser starts loading the image and remembers it in the cache. Later, when the same image appears in the document (no matter how), it shows up immediately.

**Create a function `preloadImages(sources, callback)` that loads all images from the array `sources` and, when ready, runs `callback`.**

For instance, this will show an `alert` after the images are loaded:

    function loaded() {
      alert("Images loaded")
    }

    preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);

In case of an error, the function should still assume the picture “loaded”.

In other words, the `callback` is executed when all images are either loaded or errored out.

The function is useful, for instance, when we plan to show a gallery with many scrollable images, and want to be sure that all images are loaded.

In the source document you can find links to test images, and also the code to check whether they are loaded or not. It should output `300`.

[Open a sandbox for the task.](https://plnkr.co/edit/dZ22M5URaGd0Dx0Q?p=preview)

solution

The algorithm:

1.  Make `img` for every source.
2.  Add `onload/onerror` for every image.
3.  Increase the counter when either `onload` or `onerror` triggers.
4.  When the counter value equals to the sources count – we’re done: `callback()`.

[Open the solution in a sandbox.](https://plnkr.co/edit/D31flNmxdXwV2g8G?p=preview)
