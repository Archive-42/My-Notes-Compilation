EN

- <a href="https://ar.javascript.info/arrow-functions-basics" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="arrow-functions-basics.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/arrow-functions-basics" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- arrow-functions-basics" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/arrow-functions-basics" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- <a href="https://ko.javascript.info/arrow-functions-basics" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
- <a href="arrow-functions-basics%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/arrow-functions-basics" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/arrow-functions-basics" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<span class="share-icons__title">Share</span>2Farrow-functions-basics" rel="nofollow" &gt;2Farrow-functions-basics عربي English Español Français Italiano 日本語 한국어

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" class="breadcrumbs__link"><span>JavaScript Fundamentals</span></a></span>

15th March 2021

# Arrow functions, the basics

There’s another very simple and concise syntax for creating functions, that’s often better than Function Expressions.

It’s called “arrow functions”, because it looks like this:

    let func = (arg1, arg2, ..., argN) => expression

…This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it’s the shorter version of:

    let func = function(arg1, arg2, ..., argN) {
      return expression;
    };

Let’s see a concrete example:

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let sum = (a, b) => a + b;

    /* This arrow function is a shorter form of:

    let sum = function(a, b) {
      return a + b;
    };
    */

    alert( sum(1, 2) ); // 3

As you can, see `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

  For example:

  <a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_run" title="run"></a>

  <a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

      let double = n => n * 2;
      // roughly the same as: let double = function(n) { return n * 2 }

      alert( double(3) ); // 6

- If there are no arguments, parentheses will be empty (but they should be present):

  <a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_run" title="run"></a>

  <a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

      let sayHi = () => alert("Hello!");

      sayHi();

Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let age = prompt("What is your age?", 18);

    let welcome = (age < 18) ?
      () => alert('Hello') :
      () => alert("Greetings!");

    welcome();

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we’re just too lazy to write many words.

## <a href="arrow-functions-basics.html#multiline-arrow-functions" id="multiline-arrow-functions" class="main__anchor">Multiline arrow functions</a>

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let sum = (a, b) => {  // the curly brace opens a multiline function
      let result = a + b;
      return result; // if we use curly braces, then we need an explicit "return"
    };

    alert( sum(1, 2) ); // 3

<span class="important__type">More to come</span>

Here we praised arrow functions for brevity. But that’s not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we’ll return to arrow functions later in the chapter [Arrow functions revisited](arrow-functions.html).

For now, we can already use arrow functions for one-line actions and callbacks.

## <a href="arrow-functions-basics.html#summary" id="summary" class="main__anchor">Summary</a>

Arrow functions are handy for one-liners. They come in two flavors:

1.  Without curly braces: `(...args) => expression` – the right side is an expression: the function evaluates it and returns the result.
2.  With curly braces: `(...args) => { body }` – brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.

## <a href="arrow-functions-basics.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="arrow-functions-basics.html#rewrite-with-arrow-functions" id="rewrite-with-arrow-functions" class="main__anchor">Rewrite with arrow functions</a>

<a href="task/rewrite-arrow.html" class="task__open-link"></a>

Replace Function Expressions with arrow functions in the code below:

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function ask(question, yes, no) {
      if (confirm(question)) yes();
      else no();
    }

    ask(
      "Do you agree?",
      function() { alert("You agreed."); },
      function() { alert("You canceled the execution."); }
    );

solution

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="arrow-functions-basics.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function ask(question, yes, no) {
      if (confirm(question)) yes();
      else no();
    }

    ask(
      "Do you agree?",
      () => alert("You agreed."),
      () => alert("You canceled the execution.")
    );

Looks short and clean, right?

<a href="function-expressions.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="javascript-specials.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Farrow-functions-basics" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farrow-functions-basics" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

[Comments](arrow-functions-basics.html%20name=)

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

arrow-functions-basics.html\#multiline-arrow-functions" &gt;Multiline arrow functions

arrow-functions-basics.html

arrow-functions-basics.html\#tasks" &gt;Tasks (1)

arrow-functions-basics.html &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Farrow-functions-basics" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farrow-functions-basics" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/17-arrow-functions-basics" class="sidebar__link">Edit on GitHub</a>
