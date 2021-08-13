EN

- <a href="https://ar.javascript.info/structure"
- <a href="structure.html"
- <a href="https://es.javascript.info/structure"
- <a href="https://fr.javascript.info/structure"
- <a href="https://it.javascript.info/structure"
  structure"

<!-- -->

- <a href="https://ko.javascript.info/structure"
- <a href=structure"
- <a href="https://tr.javascript.info/structure"
- <a href="https://zh.javascript.info/structure"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fstructure" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstructure" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

29th May 2021

# Code structure

The first thing we’ll study is the building blocks of code.

## <a href="structure.html#statements" id="statements" class="main__anchor">Statements</a>

Statements are syntax constructs and commands that perform actions.

We’ve already seen a statement, `alert('Hello, world!')`, which shows the message “Hello, world!”.

We can have as many statements in our code as we want. Statements can be separated with a semicolon.

For example, here we split “Hello World” into two alerts:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert('Hello'); alert('World');

Usually, statements are written on separate lines to make the code more readable:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert('Hello');
    alert('World');

## <a href="structure.html#semicolon" id="semicolon" class="main__anchor">Semicolons</a>

A semicolon may be omitted in most cases when a line break exists.

This would also work:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert('Hello')
    alert('World')

Here, JavaScript interprets the line break as an “implicit” semicolon. This is called an [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**In most cases, a newline implies a semicolon. But “in most cases” does not mean “always”!**

There are cases when a newline does not mean a semicolon. For example:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert(3 +
    1
    + 2);

The code outputs `6` because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an “incomplete expression”, so a semicolon there would be incorrect. And in this case, that works as intended.

**But there are situations where JavaScript “fails” to assume a semicolon where it is really needed.**

Errors which occur in such cases are quite hard to find and fix.

<span class="important__type">An example of an error</span>

If you’re curious to see a concrete example of such an error, check this code out:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert("Hello");

    [1, 2].forEach(alert);

No need to think about the meaning of the brackets `[]` and `forEach` yet. We’ll study them later. For now, just remember the result of running the code: it shows `Hello`, then `1`, then `2`.

Now let’s remove the semicolon after the `alert`:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert("Hello")

    [1, 2].forEach(alert);

The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.

If we run this code, only the first `Hello` shows (and there’s an error, you may need to open the console to see it). There are no numbers any more.

That’s because JavaScript does not assume a semicolon before square brackets `[...]`. So, the code in the last example is treated as a single statement.

Here’s how the engine sees it:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert("Hello")[1, 2].forEach(alert);

Looks weird, right? Such merging in this case is just wrong. We need to put a semicolon after `alert` for the code to work correctly.

This can happen in other situations also.

We recommend putting semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community. Let’s note once again – _it is possible_ to leave out semicolons most of the time. But it’s safer – especially for a beginner – to use them.

## <a href="structure.html#code-comments" id="code-comments" class="main__anchor">Comments</a>

As time goes on, programs become more and more complex. It becomes necessary to add _comments_ which describe what the code does and why.

Comments can be put into any place of a script. They don’t affect its execution because the engine simply ignores them.

**One-line comments start with two forward slash characters `//`.**

The rest of the line is a comment. It may occupy a full line of its own or follow a statement.

Like here:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // This comment occupies a line of its own
    alert('Hello');

    alert('World'); // This comment follows the statement

**Multiline comments start with a forward slash and an asterisk `/*` and end with an asterisk and a forward slash `*/`.**

Like this:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    /* An example with two messages.
    This is a multiline comment.
    */
    alert('Hello');
    alert('World');

The content of comments is ignored, so if we put code inside `/* … */`, it won’t execute.

Sometimes it can be handy to temporarily disable a part of code:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    /* Commenting out the code
    alert('Hello');
    */
    alert('World');

<span class="important__type">Use hotkeys!</span>

In most editors, a line of code can be commented out by pressing the Ctrl<span class="shortcut__plus">+</span>/ hotkey for a single-line comment and something like Ctrl<span class="shortcut__plus">+</span>Shift<span class="shortcut__plus">+</span>/ – for multiline comments (select a piece of code and press the hotkey). For Mac, try Cmd instead of Ctrl and Option instead of Shift.

<span class="important__type">Nested comments are not supported!</span>

There may not be `/*...*/` inside another `/*...*/`.

Such code will die with an error:

<a href="structure.html#"
<a href="structure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    /*
      /* nested comment ?!? */
    */
    alert( 'World' );

Please, don’t hesitate to comment your code.

Comments increase the overall code footprint, but that’s not a problem at all. There are many tools which minify code before publishing to a production server. They remove comments, so they don’t appear in the working scripts. Therefore, comments do not have negative effects on production at all.

Later in the tutorial there will be a chapter [Code quality](code-quality.html) that also explains how to write better comments.

<a href="hello-world.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="strict-mode.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fstructure" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstructure" </a>

<a href="tutorial/map.html" class="map">

## <a href="structure.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="structure.html#statements" class="sidebar__link">Statements</a>
- <a href="structure.html#semicolon" class="sidebar__link">Semicolons</a>
- <a href="structure.html#code-comments" class="sidebar__link">Comments</a>

- <a href="structure.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fstructure" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstructure" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/02-structure" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
