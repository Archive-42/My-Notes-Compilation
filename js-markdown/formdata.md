EN

langs\_\_title">عربي</span></a>

- <a href="formdata.html"
- <a href="https://es.javascript.info/formdata"
- <a href="https://fr.javascript.info/formdata"
- <a href="https://it.javascript.info/formdata"
  formdata"

<!-- -->

- <a href="https://ko.javascript.info/"
- <a href=formdata"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/formdata"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fformdata" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fformdata" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="network.html" Network requests</span></a></span>

22nd June 2021

# FormData

This chapter is about sending HTML forms: with or without files, with additional fields and so on.

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) objects can help with that. As you might have guessed, it’s the object to represent HTML form data.

The constructor is:

    let formData = new FormData([form]);

If HTML `form` element is provided, it automatically captures its fields.

The special thing about `FormData` is that network methods, such as `fetch`, can accept a `FormData` object as a body. It’s encoded and sent out with `Content-Type: multipart/form-data`.

From the server point of view, that looks like a usual form submission.

## <a href="formdata.html#sending-a-simple-form" id="sending-a-simple-form" class="main__anchor">Sending a simple form</a>

Let’s send a simple form first.

As you can see, that’s almost one-liner:

<a href="formdata.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="formdata.html#"

    <form id="formElem">
      <input type="text" name="name" value="John">
      <input type="text" name="surname" value="Smith">
      <input type="submit">
    </form>

    <script>
      formElem.onsubmit = async (e) => {
        e.preventDefault();

        let response = await fetch('/article/formdata/post/user', {
          method: 'POST',
          body: new FormData(formElem)
        });

        let result = await response.json();

        alert(result.message);
      };
    </script>

In this example, the server code is not presented, as it’s beyond our scope. The server accepts the POST request and replies “User saved”.

## <a href="formdata.html#formdata-methods" id="formdata-methods" class="main__anchor">FormData Methods</a>

We can modify fields in `FormData` with methods:

- `formData.append(name, value)` – add a form field with the given `name` and `value`,
- `formData.append(name, blob, fileName)` – add a field as if it were `<input type="file">`, the third argument `fileName` sets file name (not form field name), as it were a name of the file in user’s filesystem,
- `formData.delete(name)` – remove the field with the given `name`,
- `formData.get(name)` – get the value of the field with the given `name`,
- `formData.has(name)` – if there exists a field with the given `name`, returns `true`, otherwise `false`

A form is technically allowed to have many fields with the same `name`, so multiple calls to `append` add more same-named fields.

There’s also method `set`, with the same syntax as `append`. The difference is that `.set` removes all fields with the given `name`, and then appends a new field. So it makes sure there’s only one field with such `name`, the rest is just like `append`:

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

Also we can iterate over formData fields using `for..of` loop:

<a href="formdata.html#"
<a href="formdata.html#"

    let formData = new FormData();
    formData.append('key1', 'value1');
    formData.append('key2', 'value2');

    // List key/value pairs
    for(let [name, value] of formData) {
      alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
    }

## <a href="formdata.html#sending-a-form-with-a-file" id="sending-a-form-with-a-file" class="main__anchor">Sending a form with a file</a>

The form is always sent as `Content-Type: multipart/form-data`, this encoding allows to send files. So, `<input type="file">` fields are sent also, similar to a usual form submission.

Here’s an example with such form:

<a href="formdata.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="formdata.html#"

    <form id="formElem">
      <input type="text" name="firstName" value="John">
      Picture: <input type="file" name="picture" accept="image/*">
      <input type="submit">
    </form>

    <script>
      formElem.onsubmit = async (e) => {
        e.preventDefault();

        let response = await fetch('/article/formdata/post/user-avatar', {
          method: 'POST',
          body: new FormData(formElem)
        });

        let result = await response.json();

        alert(result.message);
      };
    </script>

## <a href="formdata.html#sending-a-form-with-blob-data" id="sending-a-form-with-blob-data" class="main__anchor">Sending a form with Blob data</a>

As we’ve seen in the chapter [Fetch](fetch.html), it’s easy to send dynamically generated binary data e.g. an image, as `Blob`. We can supply it directly as `fetch` parameter `body`.

In practice though, it’s often convenient to send an image not separately, but as a part of the form, with additional fields, such as “name” and other metadata.

Also, servers are usually more suited to accept multipart-encoded forms, rather than raw binary data.

This example submits an image from `<canvas>`, along with some other fields, as a form, using `FormData`:

<a href="formdata.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="formdata.html#"

    <body style="margin:0">
      <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

      <input type="button" value="Submit" onclick="submit()">

      <script>
        canvasElem.onmousemove = function(e) {
          let ctx = canvasElem.getContext('2d');
          ctx.lineTo(e.clientX, e.clientY);
          ctx.stroke();
        };

        async function submit() {
          let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

          let formData = new FormData();
          formData.append("firstName", "John");
          formData.append("image", imageBlob, "image.png");

          let response = await fetch('/article/formdata/post/image-form', {
            method: 'POST',
            body: formData
          });
          let result = await response.json();
          alert(result.message);
        }

      </script>
    </body>

Please note how the image `Blob` is added:

    formData.append("image", imageBlob, "image.png");

That’s same as if there were `<input type="file" name="image">` in the form, and the visitor submitted a file named `"image.png"` (3rd argument) with the data `imageBlob` (2nd argument) from their filesystem.

The server reads form data and the file, as if it were a regular form submission.

## <a href="formdata.html#summary" id="summary" class="main__anchor">Summary</a>

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) objects are used to capture HTML form and submit it using `fetch` or another network method.

We can either create `new FormData(form)` from an HTML form, or create an object without a form at all, and then append fields with methods:

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

Let’s note two peculiarities here:

1.  The `set` method removes fields with the same name, `append` doesn’t. That’s the only difference between them.
2.  To send a file, 3-argument syntax is needed, the last argument is a file name, that normally is taken from user filesystem for `<input type="file">`.

Other methods are:

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

That’s it!

<a href="fetch.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="fetch-progress.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fformdata" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fformdata" </a>

<a href="tutorial/map.html" class="map">

## <a href="formdata.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="network.html" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="formdata.html#sending-a-simple-form" class="sidebar__link">Sending a simple form</a>
- <a href="formdata.html#formdata-methods" class="sidebar__link">FormData Methods</a>
- <a href="formdata.html#sending-a-form-with-a-file" class="sidebar__link">Sending a form with a file</a>
- <a href="formdata.html#sending-a-form-with-blob-data" class="sidebar__link">Sending a form with Blob data</a>
- <a href="formdata.html#summary" class="sidebar__link">Summary</a>

- <a href="formdata.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fformdata" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fformdata" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/02-formdata" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
