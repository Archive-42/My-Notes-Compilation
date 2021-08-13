EN

- <a href="https://ar.javascript.info/bind"
- <a href="bind.html"
- <a href="https://es.javascript.info/bind"

- <a href="https://it.javascript.info/bind"
  bind"

<!-- -->

- <a href="https://ko.javascript.info/bind"
- <a href=bind"
- <a href="https://tr.javascript.info/bind"
- <a href="https://zh.javascript.info/bind"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbind" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbind" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" Advanced working with functions</span></a></span>

8th January 2021

# Function binding

When passing object methods as callbacks, for instance to `setTimeout`, there’s a known problem: "losing `this`".

In this chapter we’ll see the ways to fix it.

## <a href="bind.html#losing-this" id="losing-this" class="main__anchor">Losing “this”</a>

We’ve already seen examples of losing `this`. Once a method is passed somewhere separately from the object – `this` is lost.

Here’s how it may happen with `setTimeout`:

<a href="bind.html#"
<a href="bind.html#"

    let user = {
      firstName: "John",
      sayHi() {
        alert(`Hello, ${this.firstName}!`);
      }
    };

    setTimeout(user.sayHi, 1000); // Hello, undefined!

As we can see, the output shows not “John” as `this.firstName`, but `undefined`!

That’s because `setTimeout` got the function `user.sayHi`, separately from the object. The last line can be rewritten as:

    let f = user.sayHi;
    setTimeout(f, 1000); // lost user context

The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn’t really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases, usually `this` just becomes `undefined`.

The task is quite typical – we want to pass an object method somewhere else (here – to the scheduler) where it will be called. How to make sure that it will be called in the right context?

## <a href="bind.html#solution-1-a-wrapper" id="solution-1-a-wrapper" class="main__anchor">Solution 1: a wrapper</a>

The simplest solution is to use a wrapping function:

<a href="bind.html#"
<a href="bind.html#"

    let user = {
      firstName: "John",
      sayHi() {
        alert(`Hello, ${this.firstName}!`);
      }
    };

    setTimeout(function() {
      user.sayHi(); // Hello, John!
    }, 1000);

Now it works, because it receives `user` from the outer lexical environment, and then calls the method normally.

The same, but shorter:

    setTimeout(() => user.sayHi(), 1000); // Hello, John!

Looks fine, but a slight vulnerability appears in our code structure.

What if before `setTimeout` triggers (there’s one second delay!) `user` changes value? Then, suddenly, it will call the wrong object!

<a href="bind.html#"
<a href="bind.html#"

    let user = {
      firstName: "John",
      sayHi() {
        alert(`Hello, ${this.firstName}!`);
      }
    };

    setTimeout(() => user.sayHi(), 1000);

    // ...the value of user changes within 1 second
    user = {
      sayHi() { alert("Another user in setTimeout!"); }
    };

    // Another user in setTimeout!

The next solution guarantees that such thing won’t happen.

## <a href="bind.html#solution-2-bind" id="solution-2-bind" class="main__anchor">Solution 2: bind</a>

Functions provide a built-in method [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) that allows to fix `this`.

The basic syntax is:

    // more complex syntax will come a little later
    let boundFunc = func.bind(context);

The result of `func.bind(context)` is a special function-like “exotic object”, that is callable as function and transparently passes the call to `func` setting `this=context`.

In other words, calling `boundFunc` is like `func` with fixed `this`.

For instance, here `funcUser` passes a call to `func` with `this=user`:

<a href="bind.html#"
<a href="bind.html#"

    let user = {
      firstName: "John"
    };

    function func() {
      alert(this.firstName);
    }

    let funcUser = func.bind(user);
    funcUser(); // John

Here `func.bind(user)` as a “bound variant” of `func`, with fixed `this=user`.

All arguments are passed to the original `func` “as is”, for instance:

<a href="bind.html#"
<a href="bind.html#"

    let user = {
      firstName: "John"
    };

    function func(phrase) {
      alert(phrase + ', ' + this.firstName);
    }

    // bind this to user
    let funcUser = func.bind(user);

    funcUser("Hello"); // Hello, John (argument "Hello" is passed, and this=user)

Now let’s try with an object method:

<a href="bind.html#"
<a href="bind.html#"

    let user = {
      firstName: "John",
      sayHi() {
        alert(`Hello, ${this.firstName}!`);
      }
    };

    let sayHi = user.sayHi.bind(user); // (*)

    // can run it without an object
    sayHi(); // Hello, John!

    setTimeout(sayHi, 1000); // Hello, John!

    // even if the value of user changes within 1 second
    // sayHi uses the pre-bound value which is reference to the old user object
    user = {
      sayHi() { alert("Another user in setTimeout!"); }
    };

In the line `(*)` we take the method `user.sayHi` and bind it to `user`. The `sayHi` is a “bound” function, that can be called alone or passed to `setTimeout` – doesn’t matter, the context will be right.

Here we can see that arguments are passed “as is”, only `this` is fixed by `bind`:

<a href="bind.html#"
<a href="bind.html#"

    let user = {
      firstName: "John",
      say(phrase) {
        alert(`${phrase}, ${this.firstName}!`);
      }
    };

    let say = user.say.bind(user);

    say("Hello"); // Hello, John ("Hello" argument is passed to say)
    say("Bye"); // Bye, John ("Bye" is passed to say)

<span class="important__type">Convenience method: `bindAll`</span>

If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop:

    for (let key in user) {
      if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
      }
    }

JavaScript libraries also provide functions for convenient mass binding , e.g. [\_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) in lodash.

## <a href="bind.html#partial-functions" id="partial-functions" class="main__anchor">Partial functions</a>

Until now we have only been talking about binding `this`. Let’s take it a step further.

We can bind not only `this`, but also arguments. That’s rarely done, but sometimes can be handy.

The full syntax of `bind`:

    let bound = func.bind(context, [arg1], [arg2], ...);

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:

    function mul(a, b) {
      return a * b;
    }

Let’s use `bind` to create a function `double` on its base:

<a href="bind.html#"
<a href="bind.html#"

    function mul(a, b) {
      return a * b;
    }

    let double = mul.bind(null, 2);

    alert( double(3) ); // = mul(2, 3) = 6
    alert( double(4) ); // = mul(2, 4) = 8
    alert( double(5) ); // = mul(2, 5) = 10

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed “as is”.

That’s called [partial function application](https://en.wikipedia.org/wiki/Partial_application) – we create a new function by fixing some parameters of the existing one.

Please note that we actually don’t use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:

<a href="bind.html#"
<a href="bind.html#"

    function mul(a, b) {
      return a * b;
    }

    let triple = mul.bind(null, 3);

    alert( triple(3) ); // = mul(3, 3) = 9
    alert( triple(4) ); // = mul(3, 4) = 12
    alert( triple(5) ); // = mul(3, 5) = 15

Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it’s fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## <a href="bind.html#going-partial-without-context" id="going-partial-without-context" class="main__anchor">Going partial without context</a>

What if we’d like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can’t just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

Like this:

<a href="bind.html#"
<a href="bind.html#"

    function partial(func, ...argsBound) {
      return function(...args) { // (*)
        return func.call(this, ...argsBound, ...args);
      }
    }

    // Usage:
    let user = {
      firstName: "John",
      say(time, phrase) {
        alert(`[${time}] ${this.firstName}: ${phrase}!`);
      }
    };

    // add a partial method with fixed time
    user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

    user.sayNow("Hello");
    // Something like:
    // [10:00] John: Hello!

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:

- Same `this` as it gets (for `user.sayNow` call it’s `user`)
- Then gives it `...argsBound` – arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` – arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread syntax, right?

Also there’s a ready [\_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## <a href="bind.html#summary" id="summary" class="main__anchor">Summary</a>

Method `func.bind(context, ...args)` returns a “bound variant” of function `func` that fixes the context `this` and first arguments if given.

Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called _partially applied_ or _partial_.

Partials are convenient when we don’t want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.

## <a href="bind.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="bind.html#bound-function-as-a-method" id="bound-function-as-a-method" class="main__anchor">Bound function as a method</a>

<a href="task/write-to-object-after-bind.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What will be the output?

    function f() {
      alert( this ); // ?
    }

    let user = {
      g: f.bind(null)
    };

    user.g();

solution

The answer: `null`.

<a href="bind.html#"
<a href="bind.html#"

    function f() {
      alert( this ); // null
    }

    let user = {
      g: f.bind(null)
    };

    user.g();

The context of a bound function is hard-fixed. There’s just no way to further change it.

So even while we run `user.g()`, the original function is called with `this=null`.

### <a href="bind.html#second-bind" id="second-bind" class="main__anchor">Second bind</a>

<a href="task/second-bind.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Can we change `this` by additional binding?

What will be the output?

    function f() {
      alert(this.name);
    }

    f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

    f();

solution

The answer: **John**.

<a href="bind.html#"
<a href="bind.html#"

    function f() {
      alert(this.name);
    }

    f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

    f(); // John

The exotic [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) object returned by `f.bind(...)` remembers the context (and arguments if provided) only at creation time.

A function cannot be re-bound.

### <a href="bind.html#function-property-after-bind" id="function-property-after-bind" class="main__anchor">Function property after bind</a>

<a href="task/function-property-after-bind.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a value in the property of a function. Will it change after `bind`? Why, or why not?

<a href="bind.html#"
<a href="bind.html#"

    function sayHi() {
      alert( this.name );
    }
    sayHi.test = 5;

    let bound = sayHi.bind({
      name: "John"
    });

    alert( bound.test ); // what will be the output? why?

solution

The answer: `undefined`.

The result of `bind` is another object. It does not have the `test` property.

### <a href="bind.html#fix-a-function-that-loses-this" id="fix-a-function-that-loses-this" class="main__anchor">Fix a function that loses "this"</a>

<a href="task/question-use-bind.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The call to `askPassword()` in the code below should check the password and then call `user.loginOk/loginFail` depending on the answer.

But it leads to an error. Why?

Fix the highlighted line for everything to start working right (other lines are not to be changed).

<a href="bind.html#"
<a href="bind.html#"

    function askPassword(ok, fail) {
      let password = prompt("Password?", '');
      if (password == "rockstar") ok();
      else fail();
    }

    let user = {
      name: 'John',

      loginOk() {
        alert(`${this.name} logged in`);
      },

      loginFail() {
        alert(`${this.name} failed to log in`);
      },

    };

    askPassword(user.loginOk, user.loginFail);

solution

The error occurs because `ask` gets functions `loginOk/loginFail` without the object.

When it calls them, they naturally assume `this=undefined`.

Let’s `bind` the context:

<a href="bind.html#"
<a href="bind.html#"

    function askPassword(ok, fail) {
      let password = prompt("Password?", '');
      if (password == "rockstar") ok();
      else fail();
    }

    let user = {
      name: 'John',

      loginOk() {
        alert(`${this.name} logged in`);
      },

      loginFail() {
        alert(`${this.name} failed to log in`);
      },

    };

    askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

Now it works.

An alternative solution could be:

    //...
    askPassword(() => user.loginOk(), () => user.loginFail());

Usually that also works and looks good.

It’s a bit less reliable though in more complex situations where `user` variable might change _after_ `askPassword` is called, but _before_ the visitor answers and calls `() => user.loginOk()`.

### <a href="bind.html#partial-application-for-login" id="partial-application-for-login" class="main__anchor">Partial application for login</a>

<a href="task/ask-partial.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The task is a little more complex variant of [Fix a function that loses "this"](task/question-use-bind.html).

The `user` object was modified. Now instead of two functions `loginOk/loginFail`, it has a single function `user.login(true/false)`.

What should we pass `askPassword` in the code below, so that it calls `user.login(true)` as `ok` and `user.login(false)` as `fail`?

    function askPassword(ok, fail) {
      let password = prompt("Password?", '');
      if (password == "rockstar") ok();
      else fail();
    }

    let user = {
      name: 'John',

      login(result) {
        alert( this.name + (result ? ' logged in' : ' failed to log in') );
      }
    };

    askPassword(?, ?); // ?

Your changes should only modify the highlighted fragment.

solution

1.  Either use a wrapper function, an arrow to be concise:

        askPassword(() => user.login(true), () => user.login(false));

    Now it gets `user` from outer variables and runs it the normal way.

2.  Or create a partial function from `user.login` that uses `user` as the context and has the correct first argument:

        askPassword(user.login.bind(user, true), user.login.bind(user, false));

<a href="call-apply-decorators.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="arrow-functions.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbind" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbind" </a>

<a href="tutorial/map.html" class="map">

## <a href="bind.html id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

- <a href="bind.html#losing-this" class="sidebar__link">Losing “this”</a>
- <a href="bind.html#solution-1-a-wrapper" class="sidebar__link">Solution 1: a wrapper</a>
- <a href="bind.html#solution-2-bind" class="sidebar__link">Solution 2: bind</a>
- <a href="bind.html#partial-functions" class="sidebar__link">Partial functions</a>
- <a href="bind.html#going-partial-without-context" class="sidebar__link">Going partial without context</a>
- <a href="bind.html#summary" class="sidebar__link">Summary</a>

- <a href="bind.html#tasks" class="sidebar__link">Tasks (5)</a>
- <a href="bind.html class="sidebar\_\_link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbind" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbind" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/10-bind" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
