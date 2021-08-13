EN

- <a href="https://ar.javascript.info/promise-chaining" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="promise-chaining.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/promise-chaining" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- <a href="https://fr.javascript.info/promise-chaining" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span>Français</span></a>
- promise-chaining" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/promise-chaining" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- <a href="https://ko.javascript.info/promise-chaining" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
- <a href="promise-chaining%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/promise-chaining" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/promise-chaining" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

Search

Search

<span class="share-icons__title">Share</span>2Fpromise-chaining" rel="nofollow" &gt;2Fpromise-chaining" rel="nofollow" &gt;

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="async.html" class="breadcrumbs__link"><span>Promises, async/await</span></a></span>

11th November 2020

# Promises chaining

Let’s return to the problem mentioned in the chapter [Introduction: callbacks](callbacks.html): we have a sequence of asynchronous tasks to be performed one after another — for instance, loading scripts. How can we code it well?

Promises provide a couple of recipes to do that.

In this chapter we cover promise chaining.

It looks like this:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise(function(resolve, reject) {

      setTimeout(() => resolve(1), 1000); // (*)

    }).then(function(result) { // (**)

      alert(result); // 1
      return result * 2;

    }).then(function(result) { // (***)

      alert(result); // 2
      return result * 2;

    }).then(function(result) {

      alert(result); // 4
      return result * 2;

    });

The idea is that the result is passed through the chain of `.then` handlers.

Here the flow is:

1.  The initial promise resolves in 1 second `(*)`,
2.  Then the `.then` handler is called `(**)`.
3.  The value that it returns is passed to the next `.then` handler `(***)`
4.  …and so on.

As the result is passed along the chain of handlers, we can see a sequence of `alert` calls: `1` → `2` → `4`.

<figure><img src="article/promise-chaining/promise-then-chain.svg" width="165" height="339" /></figure>The whole thing works, because a call to `promise.then` returns a promise, so that we can call the next `.then` on it.

When a handler returns a value, it becomes the result of that promise, so the next `.then` is called with it.

**A classic newbie error: technically we can also add many `.then` to a single promise. This is not chaining.**

For example:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => resolve(1), 1000);
    });

    promise.then(function(result) {
      alert(result); // 1
      return result * 2;
    });

    promise.then(function(result) {
      alert(result); // 1
      return result * 2;
    });

    promise.then(function(result) {
      alert(result); // 1
      return result * 2;
    });

What we did here is just several handlers to one promise. They don’t pass the result to each other; instead they process it independently.

Here’s the picture (compare it with the chaining above):

<figure><img src="article/promise-chaining/promise-then-many.svg" width="373" height="152" /></figure>All `.then` on the same promise get the same result – the result of that promise. So in the code above all `alert` show the same: `1`.

In practice we rarely need multiple handlers for one promise. Chaining is used much more often.

## <a href="promise-chaining.html#returning-promises" id="returning-promises" class="main__anchor">Returning promises</a>

A handler, used in `.then(handler)` may create and return a promise.

In that case further handlers wait until it settles, and then get its result.

For instance:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise(function(resolve, reject) {

      setTimeout(() => resolve(1), 1000);

    }).then(function(result) {

      alert(result); // 1

      return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(result * 2), 1000);
      });

    }).then(function(result) { // (**)

      alert(result); // 2

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
      });

    }).then(function(result) {

      alert(result); // 4

    });

Here the first `.then` shows `1` and returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result (the argument of `resolve`, here it’s `result * 2`) is passed on to handler of the second `.then`. That handler is in the line `(**)`, it shows `2` and does the same thing.

So the output is the same as in the previous example: 1 → 2 → 4, but now with 1 second delay between `alert` calls.

Returning promises allows us to build chains of asynchronous actions.

## <a href="promise-chaining.html#example-loadscript" id="example-loadscript" class="main__anchor">Example: loadScript</a>

Let’s use this feature with the promisified `loadScript`, defined in the [previous chapter](promise-basics.html#loadscript), to load scripts one by one, in sequence:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    loadScript("/article/promise-chaining/one.js")
      .then(function(script) {
        return loadScript("/article/promise-chaining/two.js");
      })
      .then(function(script) {
        return loadScript("/article/promise-chaining/three.js");
      })
      .then(function(script) {
        // use functions declared in scripts
        // to show that they indeed loaded
        one();
        two();
        three();
      });

This code can be made bit shorter with arrow functions:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    loadScript("/article/promise-chaining/one.js")
      .then(script => loadScript("/article/promise-chaining/two.js"))
      .then(script => loadScript("/article/promise-chaining/three.js"))
      .then(script => {
        // scripts are loaded, we can use functions declared there
        one();
        two();
        three();
      });

Here each `loadScript` call returns a promise, and the next `.then` runs when it resolves. Then it initiates the loading of the next script. So scripts are loaded one after another.

We can add more asynchronous actions to the chain. Please note that the code is still “flat” — it grows down, not to the right. There are no signs of the “pyramid of doom”.

Technically, we could add `.then` directly to each `loadScript`, like this:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    loadScript("/article/promise-chaining/one.js").then(script1 => {
      loadScript("/article/promise-chaining/two.js").then(script2 => {
        loadScript("/article/promise-chaining/three.js").then(script3 => {
          // this function has access to variables script1, script2 and script3
          one();
          two();
          three();
        });
      });
    });

This code does the same: loads 3 scripts in sequence. But it “grows to the right”. So we have the same problem as with callbacks.

People who start to use promises sometimes don’t know about chaining, so they write it this way. Generally, chaining is preferred.

Sometimes it’s ok to write `.then` directly, because the nested function has access to the outer scope. In the example above the most nested callback has access to all variables `script1`, `script2`, `script3`. But that’s an exception rather than a rule.

<span class="important__type">Thenables</span>

To be precise, a handler may return not exactly a promise, but a so-called “thenable” object – an arbitrary object that has a method `.then`. It will be treated the same way as a promise.

The idea is that 3rd-party libraries may implement “promise-compatible” objects of their own. They can have an extended set of methods, but also be compatible with native promises, because they implement `.then`.

Here’s an example of a thenable object:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Thenable {
      constructor(num) {
        this.num = num;
      }
      then(resolve, reject) {
        alert(resolve); // function() { native code }
        // resolve with this.num*2 after the 1 second
        setTimeout(() => resolve(this.num * 2), 1000); // (**)
      }
    }

    new Promise(resolve => resolve(1))
      .then(result => {
        return new Thenable(result); // (*)
      })
      .then(alert); // shows 2 after 1000ms

JavaScript checks the object returned by the `.then` handler in line `(*)`: if it has a callable method named `then`, then it calls that method providing native functions `resolve`, `reject` as arguments (similar to an executor) and waits until one of them is called. In the example above `resolve(2)` is called after 1 second `(**)`. Then the result is passed further down the chain.

This feature allows us to integrate custom objects with promise chains without having to inherit from `Promise`.

## <a href="promise-chaining.html#bigger-example-fetch" id="bigger-example-fetch" class="main__anchor">Bigger example: fetch</a>

In frontend programming promises are often used for network requests. So let’s see an extended example of that.

We’ll use the [fetch](fetch.html) method to load the information about the user from the remote server. It has a lot of optional parameters covered in [separate chapters](fetch.html), but the basic syntax is quite simple:

    let promise = fetch(url);

This makes a network request to the `url` and returns a promise. The promise resolves with a `response` object when the remote server responds with headers, but _before the full response is downloaded_.

To read the full response, we should call the method `response.text()`: it returns a promise that resolves when the full text is downloaded from the remote server, with that text as a result.

The code below makes a request to `user.json` and loads its text from the server:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    fetch('/article/promise-chaining/user.json')
      // .then below runs when the remote server responds
      .then(function(response) {
        // response.text() returns a new promise that resolves with the full response text
        // when it loads
        return response.text();
      })
      .then(function(text) {
        // ...and here's the content of the remote file
        alert(text); // {"name": "iliakan", "isAdmin": true}
      });

The `response` object returned from `fetch` also includes the method `response.json()` that reads the remote data and parses it as JSON. In our case that’s even more convenient, so let’s switch to it.

We’ll also use arrow functions for brevity:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // same as above, but response.json() parses the remote content as JSON
    fetch('/article/promise-chaining/user.json')
      .then(response => response.json())
      .then(user => alert(user.name)); // iliakan, got user name

Now let’s do something with the loaded user.

For instance, we can make one more request to GitHub, load the user profile and show the avatar:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // Make a request for user.json
    fetch('/article/promise-chaining/user.json')
      // Load it as json
      .then(response => response.json())
      // Make a request to GitHub
      .then(user => fetch(`https://api.github.com/users/${user.name}`))
      // Load the response as json
      .then(response => response.json())
      // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
      .then(githubUser => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => img.remove(), 3000); // (*)
      });

The code works; see comments about the details. However, there’s a potential problem in it, a typical error for those who begin to use promises.

Look at the line `(*)`: how can we do something _after_ the avatar has finished showing and gets removed? For instance, we’d like to show a form for editing that user or something else. As of now, there’s no way.

To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing.

Like this:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    fetch('/article/promise-chaining/user.json')
      .then(response => response.json())
      .then(user => fetch(`https://api.github.com/users/${user.name}`))
      .then(response => response.json())
      .then(githubUser => new Promise(function(resolve, reject) { // (*)
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser); // (**)
        }, 3000);
      }))
      // triggers after 3 seconds
      .then(githubUser => alert(`Finished showing ${githubUser.name}`));

That is, the `.then` handler in line `(*)` now returns `new Promise`, that becomes settled only after the call of `resolve(githubUser)` in `setTimeout` `(**)`. The next `.then` in the chain will wait for that.

As a good practice, an asynchronous action should always return a promise. That makes it possible to plan actions after it; even if we don’t plan to extend the chain now, we may need it later.

Finally, we can split the code into reusable functions:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function loadJson(url) {
      return fetch(url)
        .then(response => response.json());
    }

    function loadGithubUser(name) {
      return fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json());
    }

    function showAvatar(githubUser) {
      return new Promise(function(resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      });
    }

    // Use them:
    loadJson('/article/promise-chaining/user.json')
      .then(user => loadGithubUser(user.name))
      .then(showAvatar)
      .then(githubUser => alert(`Finished showing ${githubUser.name}`));
      // ...

## <a href="promise-chaining.html#summary" id="summary" class="main__anchor">Summary</a>

If a `.then` (or `catch/finally`, doesn’t matter) handler returns a promise, the rest of the chain waits until it settles. When it does, its result (or error) is passed further.

Here’s a full picture:

<figure><img src="article/promise-chaining/promise-handler-variants.svg" width="659" height="350" /></figure>

## <a href="promise-chaining.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="promise-chaining.html#promise-then-versus-catch" id="promise-then-versus-catch" class="main__anchor">Promise: then versus catch</a>

<a href="task/then-vs-catch.html" class="task__open-link"></a>

Are these code fragments equal? In other words, do they behave the same way in any circumstances, for any handler functions?

    promise.then(f1).catch(f2);

Versus:

    promise.then(f1, f2);

solution

The short answer is: **no, they are not equal**:

The difference is that if an error happens in `f1`, then it is handled by `.catch` here:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    promise
      .then(f1)
      .catch(f2);

…But not here:

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="promise-chaining.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    promise
      .then(f1, f2);

That’s because an error is passed down the chain, and in the second code piece there’s no chain below `f1`.

In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there’s a `catch` below, and in the second one there isn’t, so the error is unhandled.

<a href="promise-basics.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="promise-error-handling.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fpromise-chaining" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpromise-chaining" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="promise-chaining.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

- <a href="async.html" class="sidebar__link">Promises, async/await</a>

#### Lesson navigation

- promise-chaining.html\#returning-promises" &gt;Returning promises
- promise-chaining.html\#example-loadscript" &gt;Example: loadScript
- promise-chaining.html\#bigger-example-fetch" &gt;Bigger example: fetch
- promise-chaining.html

<!-- -->

- promise-chaining.html\#tasks" &gt;Tasks (1)
- promise-chaining.html\#comments" &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Fpromise-chaining" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpromise-chaining" class="share share_fb sidebar**share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/11-async/03-promise-chaining" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
