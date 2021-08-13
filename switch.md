EN

- <a href="https://ar.javascript.info/switch"
- <a href="switch.html"
- <a href="https://es.javascript.info/switch"
- <a href="https://fr.javascript.info/switch"
- <a href="https://it.javascript.info/switch"
  switch"

<!-- -->

- <a href="https://ko.javascript.info/switch"
- <a href=switch"
- <a href="https://tr.javascript.info/switch"
- <a href="https://zh.javascript.info/switch"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fswitch" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fswitch" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

16th January 2021

# The "switch" statement

A `switch` statement can replace multiple `if` checks.

It gives a more descriptive way to compare a value with multiple variants.

## <a href="switch.html#the-syntax" id="the-syntax" class="main__anchor">The syntax</a>

The `switch` has one or more `case` blocks and an optional default.

It looks like this:

    switch(x) {
      case 'value1':  // if (x === 'value1')
        ...
        [break]

      case 'value2':  // if (x === 'value2')
        ...
        [break]

      default:
        ...
        [break]
    }

- The value of `x` is checked for a strict equality to the value from the first `case` (that is, `value1`) then to the second (`value2`) and so on.
- If the equality is found, `switch` starts to execute the code starting from the corresponding `case`, until the nearest `break` (or until the end of `switch`).
- If no case is matched then the `default` code is executed (if it exists).

## <a href="switch.html#an-example" id="an-example" class="main__anchor">An example</a>

An example of `switch` (the executed code is highlighted):

<a href="switch.html#"
<a href="switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = 2 + 2;

    switch (a) {
      case 3:
        alert( 'Too small' );
        break;
      case 4:
        alert( 'Exactly!' );
        break;
      case 5:
        alert( 'Too big' );
        break;
      default:
        alert( "I don't know such values" );
    }

Here the `switch` starts to compare `a` from the first `case` variant that is `3`. The match fails.

Then `4`. That’s a match, so the execution starts from `case 4` until the nearest `break`.

**If there is no `break` then the execution continues with the next `case` without any checks.**

An example without `break`:

<a href="switch.html#"
<a href="switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = 2 + 2;

    switch (a) {
      case 3:
        alert( 'Too small' );
      case 4:
        alert( 'Exactly!' );
      case 5:
        alert( 'Too big' );
      default:
        alert( "I don't know such values" );
    }

In the example above we’ll see sequential execution of three `alert`s:

    alert( 'Exactly!' );
    alert( 'Too big' );
    alert( "I don't know such values" );

<span class="important__type">Any expression can be a `switch/case` argument</span>

Both `switch` and `case` allow arbitrary expressions.

For example:

<a href="switch.html#"
<a href="switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = "1";
    let b = 0;

    switch (+a) {
      case b + 1:
        alert("this runs, because +a is 1, exactly equals b+1");
        break;

      default:
        alert("this doesn't run");
    }

Here `+a` gives `1`, that’s compared with `b + 1` in `case`, and the corresponding code is executed.

## <a href="switch.html#grouping-of-case" id="grouping-of-case" class="main__anchor">Grouping of “case”</a>

Several variants of `case` which share the same code can be grouped.

For example, if we want the same code to run for `case 3` and `case 5`:

<a href="switch.html#"
<a href="switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = 3;

    switch (a) {
      case 4:
        alert('Right!');
        break;

      case 3: // (*) grouped two cases
      case 5:
        alert('Wrong!');
        alert("Why don't you take a math class?");
        break;

      default:
        alert('The result is strange. Really.');
    }

Now both `3` and `5` show the same message.

The ability to “group” cases is a side-effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there’s no `break`.

## <a href="switch.html#type-matters" id="type-matters" class="main__anchor">Type matters</a>

Let’s emphasize that the equality check is always strict. The values must be of the same type to match.

For example, let’s consider the code:

<a href="switch.html#"
<a href="switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let arg = prompt("Enter a value?");
    switch (arg) {
      case '0':
      case '1':
        alert( 'One or zero' );
        break;

      case '2':
        alert( 'Two' );
        break;

      case 3:
        alert( 'Never executes!' );
        break;
      default:
        alert( 'An unknown value' );
    }

1.  For `0`, `1`, the first `alert` runs.
2.  For `2` the second `alert` runs.
3.  But for `3`, the result of the `prompt` is a string `"3"`, which is not strictly equal `===` to the number `3`. So we’ve got a dead code in `case 3`! The `default` variant will execute.

## <a href="switch.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="switch.html#rewrite-the-switch-into-an-if" id="rewrite-the-switch-into-an-if" class="main__anchor">Rewrite the "switch" into an "if"</a>

<a href="task/rewrite-switch-if-else.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code using `if..else` which would correspond to the following `switch`:

    switch (browser) {
      case 'Edge':
        alert( "You've got the Edge!" );
        break;

      case 'Chrome':
      case 'Firefox':
      case 'Safari':
      case 'Opera':
        alert( 'Okay we support these browsers too' );
        break;

      default:
        alert( 'We hope that this page looks ok!' );
    }

solution

To precisely match the functionality of `switch`, the `if` must use a strict comparison `'==='`.

For given strings though, a simple `'=='` works too.

    if(browser == 'Edge') {
      alert("You've got the Edge!");
    } else if (browser == 'Chrome'
     || browser == 'Firefox'
     || browser == 'Safari'
     || browser == 'Opera') {
      alert( 'Okay we support these browsers too' );
    } else {
      alert( 'We hope that this page looks ok!' );
    }

Please note: the construct `browser == 'Chrome' || browser == 'Firefox' …` is split into multiple lines for better readability.

But the `switch` construct is still cleaner and more descriptive.

### <a href="switch.html#rewrite-if-into-switch" id="rewrite-if-into-switch" class="main__anchor">Rewrite "if" into "switch"</a>

<a href="task/rewrite-if-switch.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Rewrite the code below using a single `switch` statement:

<a href="switch.html#"
<a href="switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = +prompt('a?', '');

    if (a == 0) {
      alert( 0 );
    }
    if (a == 1) {
      alert( 1 );
    }

    if (a == 2 || a == 3) {
      alert( '2,3' );
    }

solution

The first two checks turn into two `case`. The third check is split into two cases:

<a href="switch.html#"
<a href="switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = +prompt('a?', '');

    switch (a) {
      case 0:
        alert( 0 );
        break;

      case 1:
        alert( 1 );
        break;

      case 2:
      case 3:
        alert( '2,3' );
        break;
    }

Please note: the `break` at the bottom is not required. But we put it to make the code future-proof.

In the future, there is a chance that we’d want to add one more `case`, for example `case 4`. And if we forget to add a break before it, at the end of `case 3`, there will be an error. So that’s a kind of self-insurance.

<a href="while-for.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="function-basics.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fswitch" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fswitch" </a>

<a href="tutorial/map.html" class="map">

## <a href="switch.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="switch.html#the-syntax" class="sidebar__link">The syntax</a>
- <a href="switch.html#an-example" class="sidebar__link">An example</a>
- <a href="switch.html#grouping-of-case" class="sidebar__link">Grouping of “case”</a>
- <a href="switch.html#type-matters" class="sidebar__link">Type matters</a>

- <a href="switch.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="switch.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fswitch" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fswitch" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/14-switch" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
