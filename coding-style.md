EN

- <a href="https://ar.javascript.info/coding-style" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="coding-style.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/coding-style" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- <a href="https://it.javascript.info/coding-style" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/coding-style" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- <a href="https://ko.javascript.info/coding-style" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
- <a href="coding-style%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/coding-style" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/coding-style" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<span class="share-icons__title">Share</span>2Fcoding-style" rel="nofollow" &gt;2Fcoding-style عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="code-quality.html" class="breadcrumbs__link"><span>Code quality</span></a></span>

13th January 2021

# Coding Style

Our code must be as clean and easy to read as possible.

That is actually the art of programming – to take a complex task and code it in a way that is both correct and human-readable. A good code style greatly assists in that.

## <a href="coding-style.html#syntax" id="syntax" class="main__anchor">Syntax</a>

Here is a cheat sheet with some suggested rules (see below for more details):

<figure><img src="article/coding-style/code-style.svg" width="715" height="528" /></figure>Now let’s discuss the rules and reasons for them in detail.

<span class="important__type">There are no “you must” rules</span>

Nothing is set in stone here. These are style preferences, not religious dogmas.

### <a href="coding-style.html#curly-braces" id="curly-braces" class="main__anchor">Curly Braces</a>

In most JavaScript projects curly braces are written in “Egyptian” style with the opening brace on the same line as the corresponding keyword – not on a new line. There should also be a space before the opening bracket, like this:

    if (condition) {
      // do this
      // ...and that
      // ...and that
    }

A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?

Here are the annotated variants so you can judge their readability for yourself:

1.  😠 Beginners sometimes do that. Bad! Curly braces are not needed:
    if (n < 0) {alert(`Power ${n} is not supported`);}

2.  😠 Split to a separate line without braces. Never do that, easy to make an error when adding new lines:
    if (n < 0)
    alert(`Power ${n} is not supported`);

3.  😏 One line without braces – acceptable, if it’s short:
    if (n < 0) alert(`Power ${n} is not supported`);

4.  😃 The best variant:
    if (n < 0) {
    alert(`Power ${n} is not supported`);
    }

For a very brief code, one line is allowed, e.g. `if (cond) return null`. But a code block (the last variant) is usually more readable.

### <a href="coding-style.html#line-length" id="line-length" class="main__anchor">Line Length</a>

No one likes to read a long horizontal line of code. It’s best practice to split them.

For example:

    // backtick quotes ` allow to split the string into multiple lines
    let str = `
      ECMA International's TC39 is a group of JavaScript developers,
      implementers, academics, and more, collaborating with the community
      to maintain and evolve the definition of JavaScript.
    `;

And, for `if` statements:

    if (
      id === 123 &&
      moonPhase === 'Waning Gibbous' &&
      zodiacSign === 'Libra'
    ) {
      letTheSorceryBegin();
    }

The maximum line length should be agreed upon at the team-level. It’s usually 80 or 120 characters.

### <a href="coding-style.html#indents" id="indents" class="main__anchor">Indents</a>

There are two types of indents:

- **Horizontal indents: 2 or 4 spaces.**

  A horizontal indentation is made using either 2 or 4 spaces or the horizontal tab symbol (key Tab). Which one to choose is an old holy war. Spaces are more common nowadays.

  One advantage of spaces over tabs is that spaces allow more flexible configurations of indents than the tab symbol.

  For instance, we can align the parameters with the opening bracket, like this:

      show(parameters,
           aligned, // 5 spaces padding at the left
           one,
           after,
           another
        ) {
        // ...
      }

- **Vertical indents: empty lines for splitting code into logical blocks.**

  Even a single function can often be divided into logical blocks. In the example below, the initialization of variables, the main loop and returning the result are split vertically:

      function pow(x, n) {
        let result = 1;
        //              <--
        for (let i = 0; i < n; i++) {
          result *= x;
        }
        //              <--
        return result;
      }

  Insert an extra newline where it helps to make the code more readable. There should not be more than nine lines of code without a vertical indentation.

### <a href="coding-style.html#semicolons" id="semicolons" class="main__anchor">Semicolons</a>

A semicolon should be present after each statement, even if it could possibly be skipped.

There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter [Code structure](structure.html#semicolon).

If you’re an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it’s best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.

### <a href="coding-style.html#nesting-levels" id="nesting-levels" class="main__anchor">Nesting Levels</a>

Try to avoid nesting code too many levels deep.

For example, in the loop, it’s sometimes a good idea to use the [`continue`](while-for.html#continue) directive to avoid extra nesting.

For example, instead of adding a nested `if` conditional like this:

    for (let i = 0; i < 10; i++) {
      if (cond) {
        ... // <- one more nesting level
      }
    }

We can write:

    for (let i = 0; i < 10; i++) {
      if (!cond) continue;
      ...  // <- no extra nesting level
    }

A similar thing can be done with `if/else` and `return`.

For example, two constructs below are identical.

Option 1:

    function pow(x, n) {
      if (n < 0) {
        alert("Negative 'n' not supported");
      } else {
        let result = 1;

        for (let i = 0; i < n; i++) {
          result *= x;
        }

        return result;
      }
    }

Option 2:

    function pow(x, n) {
      if (n < 0) {
        alert("Negative 'n' not supported");
        return;
      }

      let result = 1;

      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

The second one is more readable because the “special case” of `n < 0` is handled early on. Once the check is done we can move on to the “main” code flow without the need for additional nesting.

## <a href="coding-style.html#function-placement" id="function-placement" class="main__anchor">Function Placement</a>

If you are writing several “helper” functions and the code that uses them, there are three ways to organize the functions.

1.  Declare the functions _above_ the code that uses them:

        // function declarations
        function createElement() {
          ...
        }

        function setHandler(elem) {
          ...
        }

        function walkAround() {
          ...
        }

        // the code which uses them
        let elem = createElement();
        setHandler(elem);
        walkAround();

2.  Code first, then functions

        // the code which uses the functions
        let elem = createElement();
        setHandler(elem);
        walkAround();

        // --- helper functions ---
        function createElement() {
          ...
        }

        function setHandler(elem) {
          ...
        }

        function walkAround() {
          ...
        }

3.  Mixed: a function is declared where it’s first used.

Most of time, the second variant is preferred.

That’s because when reading code, we first want to know _what it does_. If the code goes first, then it becomes clear from the start. Then, maybe we won’t need to read the functions at all, especially if their names are descriptive of what they actually do.

## <a href="coding-style.html#style-guides" id="style-guides" class="main__anchor">Style Guides</a>

A style guide contains general rules about “how to write” code, e.g. which quotes to use, how many spaces to indent, the maximal line length, etc. A lot of minor things.

When all members of a team use the same style guide, the code looks uniform, regardless of which team member wrote it.

Of course, a team can always write their own style guide, but usually there’s no need to. There are many existing guides to choose from.

Some popular choices:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (plus many more)

If you’re a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.

## <a href="coding-style.html#automated-linters" id="automated-linters" class="main__anchor">Automated Linters</a>

Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don’t want to stick to one particular “code style”.

Here are some well-known linting tools:

- [JSLint](http://www.jslint.com/) – one of the first linters.
- [JSHint](http://www.jshint.com/) – more settings than JSLint.
- [ESLint](http://eslint.org/) – probably the newest one.

All of them can do the job. The author uses [ESLint](http://eslint.org/).

Most linters are integrated with many popular editors: just enable the plugin in the editor and configure the style.

For instance, for ESLint you should do the following:

1.  Install [Node.js](https://nodejs.org/).
2.  Install ESLint with the command `npm install -g eslint` (npm is a JavaScript package installer).
3.  Create a config file named `.eslintrc` in the root of your JavaScript project (in the folder that contains all your files).
4.  Install/enable the plugin for your editor that integrates with ESLint. The majority of editors have one.

Here’s an example of an `.eslintrc` file:

    {
      "extends": "eslint:recommended",
      "env": {
        "browser": true,
        "node": true,
        "es6": true
      },
      "rules": {
        "no-console": 0,
        "indent": 2
      }
    }

Here the directive `"extends"` denotes that the configuration is based on the “eslint:recommended” set of settings. After that, we specify our own.

It is also possible to download style rule sets from the web and extend them instead. See <http://eslint.org/docs/user-guide/getting-started> for more details about installation.

Also certain IDEs have built-in linting, which is convenient but not as customizable as ESLint.

## <a href="coding-style.html#summary" id="summary" class="main__anchor">Summary</a>

All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing “better” code, the questions we should ask ourselves are: “What makes the code more readable and easier to understand?” and “What can help us avoid errors?” These are the main things to keep in mind when choosing and debating code styles.

Reading popular style guides will allow you to keep up to date with the latest ideas about code style trends and best practices.

## <a href="coding-style.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="coding-style.html#bad-style" id="bad-style" class="main__anchor">Bad style</a>

<a href="task/style-errors.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

What’s wrong with the code style below?

    function pow(x,n)
    {
      let result=1;
      for(let i=0;i<n;i++) {result*=x;}
      return result;
    }

    let x=prompt("x?",''), n=prompt("n?",'')
    if (n<=0)
    {
      alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
    }
    else
    {
      alert(pow(x,n))
    }

Fix it.

solution

You could note the following:

    function pow(x,n)  // <- no space between arguments
    {  // <- figure bracket on a separate line
      let result=1;   // <- no spaces before or after =
      for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
      // the contents of { ... } should be on a new line
      return result;
    }

    let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
    // but better make it 2 lines, also there's no spaces and missing ;
    if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
    {   // <- figure bracket on a separate line
      // below - long lines can be split into multiple lines for improved readability
      alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
    }
    else // <- could write it on a single line like "} else {"
    {
      alert(pow(x,n))  // no spaces and missing ;
    }

The fixed variant:

    function pow(x, n) {
      let result = 1;

      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

    let x = prompt("x?", "");
    let n = prompt("n?", "");

    if (n <= 0) {
      alert(`Power ${n} is not supported,
        please enter an integer number greater than zero`);
    } else {
      alert( pow(x, n) );
    }

<a href="debugging-chrome.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="comments.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fcoding-style" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcoding-style" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="coding-style.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

- <a href="code-quality.html" class="sidebar__link">Code quality</a>

#### Lesson navigation

<a href="coding-style.html#syntax" class="sidebar__link">Syntax</a>

coding-style.html\#function-placement" &gt;Function Placement

coding-style.html\#style-guides" &gt;Style Guides

coding-style.html\#automated-linters" &gt;Automated Linters

<a href="coding-style.html%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/ul%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/nav%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cnav%20class=" class="sidebar__link"></a>

- <a href="coding-style.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="coding-style.html#comments" class="sidebar__link">Comments</a>

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fcoding-style" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcoding-style" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/03-code-quality/02-coding-style" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
