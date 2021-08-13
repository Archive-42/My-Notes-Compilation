EN

- <a href="https://ar.javascript.info/async-iterators-generators"
- <a href="async-iterators-generators.html"
- <a href="https://es.javascript.info/async-iterators-generators"
- <a href="https://fr.javascript.info/async-iterators-generators"
- async-iterators-generators"
  async-iterators-generators"

<!-- -->

- /async-iterators-generators"
- <a href=async-iterators-generators"
- <a href="https://tr.javascript.info/async-iterators-generators"
- <a href="https://zh.javascript.info/async-iterators-generators"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fasync-iterators-generators" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fasync-iterators-generators" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="generators-iterators.html" Generators, advanced iteration</span></a></span>

11th April 2021

# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.

Let’s see a simple example first, to grasp the syntax, and then review a real-life use case.

## <a href="async-iterators-generators.html#recall-iterables" id="recall-iterables" class="main__anchor">Recall iterables</a>

Let’s recall the topic about iterables.

The idea is that we have an object, such as `range` here:

    let range = {
      from: 1,
      to: 5
    };

…And we’d like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an _iteration ability_ to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here’s an implementation for the iterable `range`:

<a href="async-iterators-generators.html#"
<a href="async-iterators-generators.html#"

    let range = {
      from: 1,
      to: 5,

      [Symbol.iterator]() { // called once, in the beginning of for..of
        return {
          current: this.from,
          last: this.to,

          next() { // called every iteration, to get the next value
            if (this.current <= this.last) {
              return { done: false, value: this.current++ };
            } else {
              return { done: true };
            }
          }
        };
      }
    };

    for(let value of range) {
      alert(value); // 1 then 2, then 3, then 4, then 5
    }

If anything is unclear, please visit the chapter [Iterables](iterable.html), it gives all the details about regular iterables.

## <a href="async-iterators-generators.html#async-iterables" id="async-iterables" class="main__anchor">Async iterables</a>

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay.

The most common case is that the object needs to make a network request to deliver the next value, we’ll see a real-life example of it a bit later.

To make an object iterable asynchronously:

1.  Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2.  The `next()` method should return a promise (to be fulfilled with the next value).
    - The `async` keyword handles it, we can simply make `async next()`.
3.  To iterate over such an object, we should use a `for await (let item of iterable)` loop.
    - Note the `await` word.

As a starting example, let’s make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:

<a href="async-iterators-generators.html#"
<a href="async-iterators-generators.html#"

    let range = {
      from: 1,
      to: 5,

      [Symbol.asyncIterator]() { // (1)
        return {
          current: this.from,
          last: this.to,

          async next() { // (2)

            // note: we can use "await" inside the async next:
            await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

            if (this.current <= this.last) {
              return { done: false, value: this.current++ };
            } else {
              return { done: true };
            }
          }
        };
      }
    };

    (async () => {

      for await (let value of range) { // (4)
        alert(value); // 1,2,3,4,5
      }

    })()

As we can see, the structure is similar to regular iterators:

1.  To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
2.  This method must return the object with `next()` method returning a promise `(2)`.
3.  The `next()` method doesn’t have to be `async`, it may be a regular method returning a promise, but `async` allows us to use `await`, so that’s convenient. Here we just delay for a second `(3)`.
4.  To iterate, we use `for await(let value of range)` `(4)`, namely add “await” after “for”. It calls `range[Symbol.asyncIterator]()` once, and then its `next()` for values.

Here’s a small table with the differences:

<table><thead><tr class="header"><th></th><th>Iterators</th><th>Async iterators</th></tr></thead><tbody><tr class="odd"><td>Object method to provide iterator</td><td><code>Symbol.iterator</code></td><td><code>Symbol.asyncIterator</code></td></tr><tr class="even"><td><code>next()</code> return value is</td><td>any value</td><td><code>Promise</code></td></tr><tr class="odd"><td>to loop, use</td><td><code>for..of</code></td><td><code>for await..of</code></td></tr></tbody></table>

<span class="important__type">The spread syntax `...` doesn’t work asynchronously</span>

Features that require regular, synchronous iterators, don’t work with asynchronous ones.

For instance, a spread syntax won’t work:

    alert( [...range] ); // Error, no Symbol.iterator

That’s natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It’s also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.

## <a href="async-iterators-generators.html#recall-generators" id="recall-generators" class="main__anchor">Recall generators</a>

Now let’s recall generators, as they allow to make iteration code much shorter. Most of the time, when we’d like to make an iterable, we’ll use generators.

For sheer simplicity, omitting some important stuff, they are “functions that generate (yield) values”. They are explained in detail in the chapter [Generators](generators.html).

Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:

<a href="async-iterators-generators.html#"
<a href="async-iterators-generators.html#"

    function* generateSequence(start, end) {
      for (let i = start; i <= end; i++) {
        yield i;
      }
    }

    for(let value of generateSequence(1, 5)) {
      alert(value); // 1, then 2, then 3, then 4, then 5
    }

As we already know, to make an object iterable, we should add `Symbol.iterator` to it.

    let range = {
      from: 1,
      to: 5,
      [Symbol.iterator]() {
        return <object with next to make range iterable>
      }
    }

A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:

<a href="async-iterators-generators.html#"
<a href="async-iterators-generators.html#"

    let range = {
      from: 1,
      to: 5,

      *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
        for(let value = this.from; value <= this.to; value++) {
          yield value;
        }
      }
    };

    for(let value of range) {
      alert(value); // 1, then 2, then 3, then 4, then 5
    }

Please see the chapter [Generators](generators.html) if you’d like more details.

In regular generators we can’t use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we’d like to generate values asynchronously? From network requests, for instance.

Let’s switch to asynchronous generators to make it possible.

## <a href="async-iterators-generators.html#async-generators-finally" id="async-generators-finally" class="main__anchor">Async generators (finally)</a>

For most practical applications, when we’d like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:

<a href="async-iterators-generators.html#"
<a href="async-iterators-generators.html#"

    async function* generateSequence(start, end) {

      for (let i = start; i <= end; i++) {

        // Wow, can use await!
        await new Promise(resolve => setTimeout(resolve, 1000));

        yield i;
      }

    }

    (async () => {

      let generator = generateSequence(1, 5);
      for await (let value of generator) {
        alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
      }

    })();

As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

<span class="important__type">Under-the-hood difference</span>

Technically, if you’re an advanced reader who remembers the details about generators, there’s an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.

In a regular generator we’d use `result = generator.next()` to get values. In an async generator, we should add `await`, like this:

    result = await generator.next(); // result = {value: ..., done: true/false}

That’s why async generators work with `for await...of`.

### <a href="async-iterators-generators.html#async-iterable-range" id="async-iterable-range" class="main__anchor">Async iterable range</a>

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:

<a href="async-iterators-generators.html#"
<a href="async-iterators-generators.html#"

    let range = {
      from: 1,
      to: 5,

      // this line is same as [Symbol.asyncIterator]: async function*() {
      async *[Symbol.asyncIterator]() {
        for(let value = this.from; value <= this.to; value++) {

          // make a pause between values, wait for something
          await new Promise(resolve => setTimeout(resolve, 1000));

          yield value;
        }
      }
    };

    (async () => {

      for await (let value of range) {
        alert(value); // 1, then 2, then 3, then 4, then 5
      }

    })();

Now values come with a delay of 1 second between them.

<span class="important__type">Please note:</span>

Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it’s both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be a weird thing to do.

## <a href="async-iterators-generators.html#real-life-example-paginated-data" id="real-life-example-paginated-data" class="main__anchor">Real-life example: paginated data</a>

So far we’ve seen basic examples, to gain understanding. Now let’s review a real-life use case.

There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) – “one page”, and provides a URL to the next page.

This pattern is very common. It’s not about users, but just about anything.

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

For our code, we’d like to have a simpler way to get commits.

Let’s make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it’ll be a simple async iteration `for await..of`.

So the usage will be like this:

    for await (let commit of fetchCommits("username/repository")) {
      // process commit
    }

Here’s such function, implemented as async generator:

    async function* fetchCommits(repo) {
      let url = `https://api.github.com/repos/${repo}/commits`;

      while (url) {
        const response = await fetch(url, { // (1)
          headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
        });

        const body = await response.json(); // (2) response is JSON (array of commits)

        // (3) the URL of the next page is in the headers, extract it
        let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
        nextPage = nextPage?.[1];

        url = nextPage;

        for(let commit of body) { // (4) yield commits one by one, until the page ends
          yield commit;
        }
      }
    }

More explanations about how it works:

1.  We use the browser [fetch](fetch.html) method to download the commits.

    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed – here GitHub requires `User-Agent`.

2.  The commits are returned in JSON format.

3.  We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](regular-expressions.html)).

    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It’s generated by GitHub itself.

4.  Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.

An example of use (shows commit authors in console):

<a href="async-iterators-generators.html#"
<a href="async-iterators-generators.html#"

    (async () => {

      let count = 0;

      for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

        console.log(commit.author.login);

        if (++count == 100) { // let's stop at 100 commits
          break;
        }
      }

    })();

    // Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above

That’s just what we wanted.

The internal mechanics of paginated requests is invisible from the outside. For us it’s just an async generator that returns commits.

## <a href="async-iterators-generators.html#summary" id="summary" class="main__anchor">Summary</a>

Regular iterators and generators work fine with the data that doesn’t take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.

Syntax differences between async and regular iterators:

<table><thead><tr class="header"><th></th><th>Iterable</th><th>Async Iterable</th></tr></thead><tbody><tr class="odd"><td>Method to provide iterator</td><td><code>Symbol.iterator</code></td><td><code>Symbol.asyncIterator</code></td></tr><tr class="even"><td><code>next()</code> return value is</td><td><code>{value:…, done: true/false}</code></td><td><code>Promise</code> that resolves to <code>{value:…, done: true/false}</code></td></tr></tbody></table>

Syntax differences between async and regular generators:

<table><thead><tr class="header"><th></th><th>Generators</th><th>Async generators</th></tr></thead><tbody><tr class="odd"><td>Declaration</td><td><code>function*</code></td><td><code>async function*</code></td></tr><tr class="even"><td><code>next()</code> return value is</td><td><code>{value:…, done: true/false}</code></td><td><code>Promise</code> that resolves to <code>{value:…, done: true/false}</code></td></tr></tbody></table>

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

We can use async generators to process such data. It’s also noteworthy that in some environments, like in browsers, there’s also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere).

<a href="generators.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="modules.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fasync-iterators-generators" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fasync-iterators-generators" </a>

<a href="tutorial/map.html" class="map">

## <a href="async-iterators-generators.html id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="generators-iterators.html" class="sidebar__link">Generators, advanced iteration</a>

#### Lesson navigation

- <a href="async-iterators-generators.html#recall-iterables" class="sidebar__link">Recall iterables</a>
- <a href="async-iterators-generators.html#async-iterables" class="sidebar__link">Async iterables</a>
- <a href="async-iterators-generators.html#recall-generators" class="sidebar__link">Recall generators</a>
- <a href="async-iterators-generators.html#async-generators-finally" class="sidebar__link">Async generators (finally)</a>
- <a href="async-iterators-generators.html#real-life-example-paginated-data" class="sidebar__link">Real-life example: paginated data</a>
- <a href="async-iterators-generators.html#summary" class="sidebar__link">Summary</a>

- <a href="async-iterators-generators.html class="sidebar\_\_link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fasync-iterators-generators" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fasync-iterators-generators" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/12-generators-iterators/2-async-iterators-generators" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
