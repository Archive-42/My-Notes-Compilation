EN

- <a href="https://ar.javascript.info/var"
- <a href="var.html"
- <a href="https://es.javascript.info/var"
- <a href="https://fr.javascript.info/var"
- var"
  var"

<!-- -->

- <a href="https://ko.javascript.info/var"
- <a href=var"
- <a href="https://tr.javascript.info/var"
- <a href="https://zh.javascript.info/var"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fvar" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fvar" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" Advanced working with functions</span></a></span>

20th December 2020

# The old "var"

<span class="important__type">This article is for understanding old scripts</span>

The information in this article is useful for understanding old scripts.

That’s not how we write a new code.

In the very first chapter about [variables](variables.html), we mentioned three ways of variable declaration:

1.  `let`
2.  `const`
3.  `var`

The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    var message = "Hi";
    alert(message); // Hi

But internally `var` is a very different beast, that originates from very old times. It’s generally not used in modern scripts, but still lurks in the old ones.

If you don’t plan on meeting such scripts you may even skip this chapter or postpone it.

On the other hand, it’s important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.

## <a href="var.html#var-has-no-block-scope" id="var-has-no-block-scope" class="main__anchor">“var” has no block scope</a>

Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.

For instance:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    if (true) {
      var test = true; // use "var" instead of "let"
    }

    alert(test); // true, the variable lives after if

As `var` ignores code blocks, we’ve got a global variable `test`.

If we used `let test` instead of `var test`, then the variable would only be visible inside `if`:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    if (true) {
      let test = true; // use "let"
    }

    alert(test); // ReferenceError: test is not defined

The same thing for loops: `var` cannot be block- or loop-local:

    for (var i = 0; i < 10; i++) {
      var one = 1;
      // ...
    }

    alert(i);   // 10, "i" is visible after loop, it's a global variable
    alert(one); // 1, "one" is visible after loop, it's a global variable

If a code block is inside a function, then `var` becomes a function-level variable:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      if (true) {
        var phrase = "Hello";
      }

      alert(phrase); // works
    }

    sayHi();
    alert(phrase); // ReferenceError: phrase is not defined

As we can see, `var` pierces through `if`, `for` or other code blocks. That’s because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.

## <a href="var.html#var-tolerates-redeclarations" id="var-tolerates-redeclarations" class="main__anchor">“var” tolerates redeclarations</a>

If we declare the same variable with `let` twice in the same scope, that’s an error:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user;
    let user; // SyntaxError: 'user' has already been declared

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it’s just ignored:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    var user = "Pete";

    var user = "John"; // this "var" does nothing (already declared)
    // ...it doesn't trigger an error

    alert(user); // John

## <a href="var.html#var-variables-can-be-declared-below-their-use" id="var-variables-can-be-declared-below-their-use" class="main__anchor">“var” variables can be declared below their use</a>

`var` declarations are processed when the function starts (or script starts for globals).

In other words, `var` variables are defined from the beginning of the function, no matter where the definition is (assuming that the definition is not in the nested function).

So this code:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      phrase = "Hello";

      alert(phrase);

      var phrase;
    }
    sayHi();

…Is technically the same as this (moved `var phrase` above):

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      var phrase;

      phrase = "Hello";

      alert(phrase);
    }
    sayHi();

…Or even as this (remember, code blocks are ignored):

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      phrase = "Hello"; // (*)

      if (false) {
        var phrase;
      }

      alert(phrase);
    }
    sayHi();

People also call such behavior “hoisting” (raising), because all `var` are “hoisted” (raised) to the top of the function.

So in the example above, `if (false)` branch never executes, but that doesn’t matter. The `var` inside it is processed in the beginning of the function, so at the moment of `(*)` the variable exists.

**Declarations are hoisted, but assignments are not.**

That’s best demonstrated with an example:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      alert(phrase);

      var phrase = "Hello";
    }

    sayHi();

The line `var phrase = "Hello"` has two actions in it:

1.  Variable declaration `var`
2.  Variable assignment `=`.

The declaration is processed at the start of function execution (“hoisted”), but the assignment always works at the place where it appears. So the code works essentially like this:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      var phrase; // declaration works at the start...

      alert(phrase); // undefined

      phrase = "Hello"; // ...assignment - when the execution reaches it.
    }

    sayHi();

Because all `var` declarations are processed at the function start, we can reference them at any place. But variables are undefined until the assignments.

In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

## <a href="var.html#iife" id="iife" class="main__anchor">IIFE</a>

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called “immediately-invoked function expressions” (abbreviated as IIFE).

That’s not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    (function() {

      var message = "Hello";

      alert(message); // Hello

    })();

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // Tries to declare and immediately call a function
    function() { // <-- SyntaxError: Function statements require a function name

      var message = "Hello";

      alert(message); // Hello

    }();

Even if we say: “okay, let’s add a name”, that won’t work, as JavaScript does not allow Function Declarations to be called immediately:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // syntax error because of parentheses below
    function go() {

    }(); // <-- can't call Function Declaration immediately

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it’s a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

<a href="var.html#"
<a href="var.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // Ways to create IIFE

    (function() {
      alert("Parentheses around the function");
    })();

    (function() {
      alert("Parentheses around the whole thing");
    }());

    !function() {
      alert("Bitwise NOT operator starts the expression");
    }();

    +function() {
      alert("Unary plus starts the expression");
    }();

In all the above cases we declare a Function Expression and run it immediately. Let’s note again: nowadays there’s no reason to write such code.

## <a href="var.html#summary" id="summary" class="main__anchor">Summary</a>

There are two main differences of `var` compared to `let/const`:

1.  `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
2.  `var` declarations are processed at function start (script start for globals).

There’s one more very minor difference related to the global object, that we’ll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That’s why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.

<a href="closure.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="global-object.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fvar" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fvar" </a>

<a href="tutorial/map.html" class="map">

## <a href="var.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

- <a href="var.html#var-has-no-block-scope" class="sidebar__link">“var” has no block scope</a>
- <a href="var.html#var-tolerates-redeclarations" class="sidebar__link">“var” tolerates redeclarations</a>
- <a href="var.html#var-variables-can-be-declared-below-their-use" class="sidebar__link">“var” variables can be declared below their use</a>
- <a href="var.html#iife" class="sidebar__link">IIFE</a>
- <a href="var.html#summary" class="sidebar__link">Summary</a>

- <a href="var.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fvar" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fvar" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/04-var" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
