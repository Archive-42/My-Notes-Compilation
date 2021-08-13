EN

- <a href="https://ar.javascript.info/ifelse"
- <a href="ifelse.html"
- <a href="https://es.javascript.info/ifelse"
- <a href="https://fr.javascript.info/ifelse"
- <a href="https://it.javascript.info/ifelse"
  ifelse"

<!-- -->

- <a href="https://ko.javascript.info/ifelse"
- <a href=ifelse"
- <a href="https://tr.javascript.info/ifelse"
- <a href="https://zh.javascript.info/ifelse"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fifelse" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fifelse" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

23rd January 2021

# Conditional branching: if, '?'

Sometimes, we need to perform different actions based on different conditions.

To do that, we can use the `if` statement and the conditional operator `?`, that’s also called a “question mark” operator.

## <a href="ifelse.html#the-if-statement" id="the-if-statement" class="main__anchor">The “if” statement</a>

The `if(...)` statement evaluates a condition in parentheses and, if the result is `true`, executes a block of code.

For example:

<a href="ifelse.html#"
<a href="ifelse.html#"

    let year = prompt('In which year was ECMAScript-2015 specification published?', '');

    if (year == 2015) alert( 'You are right!' );

In the example above, the condition is a simple equality check (`year == 2015`), but it can be much more complex.

If we want to execute more than one statement, we have to wrap our code block inside curly braces:

    if (year == 2015) {
      alert( "That's correct!" );
      alert( "You're so smart!" );
    }

We recommend wrapping your code block with curly braces `{}` every time you use an `if` statement, even if there is only one statement to execute. Doing so improves readability.

## <a href="ifelse.html#boolean-conversion" id="boolean-conversion" class="main__anchor">Boolean conversion</a>

The `if (…)` statement evaluates the expression in its parentheses and converts the result to a boolean.

Let’s recall the conversion rules from the chapter [Type Conversions](type-conversions.html):

- A number `0`, an empty string `""`, `null`, `undefined`, and `NaN` all become `false`. Because of that they are called “falsy” values.
- Other values become `true`, so they are called “truthy”.

So, the code under this condition would never execute:

    if (0) { // 0 is falsy
      ...
    }

…and inside this condition – it always will:

    if (1) { // 1 is truthy
      ...
    }

We can also pass a pre-evaluated boolean value to `if`, like this:

    let cond = (year == 2015); // equality evaluates to true or false

    if (cond) {
      ...
    }

## <a href="ifelse.html#the-else-clause" id="the-else-clause" class="main__anchor">The “else” clause</a>

The `if` statement may contain an optional “else” block. It executes when the condition is falsy.

For example:

<a href="ifelse.html#"
<a href="ifelse.html#"

    let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

    if (year == 2015) {
      alert( 'You guessed it right!' );
    } else {
      alert( 'How can you be so wrong?' ); // any value except 2015
    }

## <a href="ifelse.html#several-conditions-else-if" id="several-conditions-else-if" class="main__anchor">Several conditions: “else if”</a>

Sometimes, we’d like to test several variants of a condition. The `else if` clause lets us do that.

For example:

<a href="ifelse.html#"
<a href="ifelse.html#"

    let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

    if (year < 2015) {
      alert( 'Too early...' );
    } else if (year > 2015) {
      alert( 'Too late' );
    } else {
      alert( 'Exactly!' );
    }

In the code above, JavaScript first checks `year < 2015`. If that is falsy, it goes to the next condition `year > 2015`. If that is also falsy, it shows the last `alert`.

There can be more `else if` blocks. The final `else` is optional.

## <a href="ifelse.html#conditional-operator" id="conditional-operator" class="main__anchor">Conditional operator ‘?’</a>

Sometimes, we need to assign a variable depending on a condition.

For instance:

<a href="ifelse.html#"
<a href="ifelse.html#"

    let accessAllowed;
    let age = prompt('How old are you?', '');

    if (age > 18) {
      accessAllowed = true;
    } else {
      accessAllowed = false;
    }

    alert(accessAllowed);

The so-called “conditional” or “question mark” operator lets us do that in a shorter and simpler way.

The operator is represented by a question mark `?`. Sometimes it’s called “ternary”, because the operator has three operands. It is actually the one and only operator in JavaScript which has that many.

The syntax is:

    let result = condition ? value1 : value2;

The `condition` is evaluated: if it’s truthy then `value1` is returned, otherwise – `value2`.

For example:

    let accessAllowed = (age > 18) ? true : false;

Technically, we can omit the parentheses around `age > 18`. The question mark operator has a low precedence, so it executes after the comparison `>`.

This example will do the same thing as the previous one:

    // the comparison operator "age > 18" executes first anyway
    // (no need to wrap it into parentheses)
    let accessAllowed = age > 18 ? true : false;

But parentheses make the code more readable, so we recommend using them.

<span class="important__type">Please note:</span>

In the example above, you can avoid using the question mark operator because the comparison itself returns `true/false`:

    // the same
    let accessAllowed = age > 18;

## <a href="ifelse.html#multiple" id="multiple" class="main__anchor">Multiple ‘?’</a>

A sequence of question mark operators `?` can return a value that depends on more than one condition.

For instance:

<a href="ifelse.html#"
<a href="ifelse.html#"

    let age = prompt('age?', 18);

    let message = (age < 3) ? 'Hi, baby!' :
      (age < 18) ? 'Hello!' :
      (age < 100) ? 'Greetings!' :
      'What an unusual age!';

    alert( message );

It may be difficult at first to grasp what’s going on. But after a closer look, we can see that it’s just an ordinary sequence of tests:

1.  The first question mark checks whether `age < 3`.
2.  If true – it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon ‘":"’, checking `age < 18`.
3.  If that’s true – it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon ‘":"’, checking `age < 100`.
4.  If that’s true – it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon ‘":"’, returning `'What an unusual age!'`.

Here’s how this looks using `if..else`:

    if (age < 3) {
      message = 'Hi, baby!';
    } else if (age < 18) {
      message = 'Hello!';
    } else if (age < 100) {
      message = 'Greetings!';
    } else {
      message = 'What an unusual age!';
    }

## <a href="ifelse.html#non-traditional-use-of" id="non-traditional-use-of" class="main__anchor">Non-traditional use of ‘?’</a>

Sometimes the question mark `?` is used as a replacement for `if`:

<a href="ifelse.html#"
<a href="ifelse.html#"

    let company = prompt('Which company created JavaScript?', '');

    (company == 'Netscape') ?
       alert('Right!') : alert('Wrong.');

Depending on the condition `company == 'Netscape'`, either the first or the second expression after the `?` gets executed and shows an alert.

We don’t assign a result to a variable here. Instead, we execute different code depending on the condition.

**It’s not recommended to use the question mark operator in this way.**

The notation is shorter than the equivalent `if` statement, which appeals to some programmers. But it is less readable.

Here is the same code using `if` for comparison:

<a href="ifelse.html#"
<a href="ifelse.html#"

    let company = prompt('Which company created JavaScript?', '');

    if (company == 'Netscape') {
      alert('Right!');
    } else {
      alert('Wrong.');
    }

Our eyes scan the code vertically. Code blocks which span several lines are easier to understand than a long, horizontal instruction set.

The purpose of the question mark operator `?` is to return one value or another depending on its condition. Please use it for exactly that. Use `if` when you need to execute different branches of code.

## <a href="ifelse.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="ifelse.html#if-a-string-with-zero" id="if-a-string-with-zero" class="main__anchor">if (a string with zero)</a>

<a href="task/if-zero-string.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Will `alert` be shown?

    if ("0") {
      alert( 'Hello' );
    }

solution

**Yes, it will.**

Any string except an empty one (and `"0"` is not empty) becomes `true` in the logical context.

We can run and check:

<a href="ifelse.html#"
<a href="ifelse.html#"

    if ("0") {
      alert( 'Hello' );
    }

### <a href="ifelse.html#the-name-of-javascript" id="the-name-of-javascript" class="main__anchor">The name of JavaScript</a>

<a href="task/check-standard.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Using the `if..else` construct, write the code which asks: ‘What is the “official” name of JavaScript?’

If the visitor enters “ECMAScript”, then output “Right!”, otherwise – output: “You don’t know? ECMAScript!”

<figure><img src="task/check-standard/ifelse_task2.svg" width="500" height="264" /></figure>[Demo in new window](https://en.js.cx/task/check-standard/ifelse_task2/)

solution

<a href="ifelse.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="ifelse.html#"

    <!DOCTYPE html>
    <html>

    <body>
      <script>
        'use strict';

        let value = prompt('What is the "official" name of JavaScript?', '');

        if (value == 'ECMAScript') {
          alert('Right!');
        } else {
          alert("You don't know? ECMAScript!");
        }
      </script>


    </body>

    </html>

### <a href="ifelse.html#show-the-sign" id="show-the-sign" class="main__anchor">Show the sign</a>

<a href="task/sign.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Using `if..else`, write the code which gets a number via `prompt` and then shows in `alert`:

- `1`, if the value is greater than zero,
- `-1`, if less than zero,
- `0`, if equals zero.

In this task we assume that the input is always a number.

[Demo in new window](https://en.js.cx/task/sign/if_sign/)

solution

<a href="ifelse.html#"
<a href="ifelse.html#"

    let value = prompt('Type a number', 0);

    if (value > 0) {
      alert( 1 );
    } else if (value < 0) {
      alert( -1 );
    } else {
      alert( 0 );
    }

### <a href="ifelse.html#rewrite-if-into" id="rewrite-if-into" class="main__anchor">Rewrite 'if' into '?'</a>

<a href="task/rewrite-if-question.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Rewrite this `if` using the conditional operator `'?'`:

    let result;

    if (a + b < 4) {
      result = 'Below';
    } else {
      result = 'Over';
    }

solution

    let result = (a + b < 4) ? 'Below' : 'Over';

### <a href="ifelse.html#rewrite-if-else-into" id="rewrite-if-else-into" class="main__anchor">Rewrite 'if..else' into '?'</a>

<a href="task/rewrite-if-else-question.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Rewrite `if..else` using multiple ternary operators `'?'`.

For readability, it’s recommended to split the code into multiple lines.

    let message;

    if (login == 'Employee') {
      message = 'Hello';
    } else if (login == 'Director') {
      message = 'Greetings';
    } else if (login == '') {
      message = 'No login';
    } else {
      message = '';
    }

solution

    let message = (login == 'Employee') ? 'Hello' :
      (login == 'Director') ? 'Greetings' :
      (login == '') ? 'No login' :
      '';

<a href="comparison.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="logical-operators.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fifelse" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fifelse" </a>

<a href="tutorial/map.html" class="map">

## <a href="ifelse.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="ifelse.html#the-if-statement" class="sidebar__link">The “if” statement</a>
- <a href="ifelse.html#boolean-conversion" class="sidebar__link">Boolean conversion</a>
- <a href="ifelse.html#the-else-clause" class="sidebar__link">The “else” clause</a>
- <a href="ifelse.html#several-conditions-else-if" class="sidebar__link">Several conditions: “else if”</a>
- <a href="ifelse.html#conditional-operator" class="sidebar__link">Conditional operator ‘?’</a>
- <a href="ifelse.html#multiple" class="sidebar__link">Multiple ‘?’</a>
- <a href="ifelse.html#non-traditional-use-of" class="sidebar__link">Non-traditional use of ‘?’</a>

- <a href="ifelse.html#tasks" class="sidebar__link">Tasks (5)</a>
- <a href="ifelse.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fifelse" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fifelse" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/10-ifelse" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
