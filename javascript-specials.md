EN

- <a href="https://ar.javascript.info/javascript-specials"
- <a href="javascript-specials.html"
- <a href="https://es.javascript.info/javascript-specials"
- <a href="https://fr.javascript.info/javascript-specials"
- javascript-specials"
  javascript-specials"

<!-- -->

- /javascript-specials"
- <a href=javascript-specials"
- <a href="https://tr.javascript.info/javascript-specials"
- <a href="https://zh.javascript.info/javascript-specials"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fjavascript-specials" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fjavascript-specials" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

9th January 2021

# JavaScript specials

This chapter briefly recaps the features of JavaScript that we’ve learned by now, paying special attention to subtle moments.

## <a href="javascript-specials.html#code-structure" id="code-structure" class="main__anchor">Code structure</a>

Statements are delimited with a semicolon:

<a href="javascript-specials.html#"
<a href="javascript-specials.html#"

    alert('Hello'); alert('World');

Usually, a line-break is also treated as a delimiter, so that would also work:

<a href="javascript-specials.html#"
<a href="javascript-specials.html#"

    alert('Hello')
    alert('World')

That’s called “automatic semicolon insertion”. Sometimes it doesn’t work, for instance:

<a href="javascript-specials.html#"
<a href="javascript-specials.html#"

    alert("There will be an error after this message")

    [1, 2].forEach(alert)

Most codestyle guides agree that we should put a semicolon after each statement.

Semicolons are not required after code blocks `{...}` and syntax constructs with them like loops:

    function f() {
      // no semicolon needed after function declaration
    }

    for(;;) {
      // no semicolon needed after the loop
    }

…But even if we can put an “extra” semicolon somewhere, that’s not an error. It will be ignored.

More in: [Code structure](structure.html).

## <a href="javascript-specials.html#strict-mode" id="strict-mode" class="main__anchor">Strict mode</a>

To fully enable all features of modern JavaScript, we should start scripts with `"use strict"`.

    'use strict';

    ...

The directive must be at the top of a script or at the beginning of a function body.

Without `"use strict"`, everything still works, but some features behave in the old-fashion, “compatible” way. We’d generally prefer the modern behavior.

Some modern features of the language (like classes that we’ll study in the future) enable strict mode implicitly.

More in: [The modern mode, "use strict"](strict-mode.html).

## <a href="javascript-specials.html#variables" id="variables" class="main__anchor">Variables</a>

Can be declared using:

- `let`
- `const` (constant, can’t be changed)
- `var` (old-style, will see later)

A variable name can include:

- Letters and digits, but the first character may not be a digit.
- Characters `$` and `_` are normal, on par with letters.
- Non-Latin alphabets and hieroglyphs are also allowed, but commonly not used.

Variables are dynamically typed. They can store any value:

    let x = 5;
    x = "John";

There are 8 data types:

- `number` for both floating-point and integer numbers,
- `bigint` for integer numbers of arbitrary length,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` – a type with a single value `null`, meaning “empty” or “does not exist”,
- `undefined` – a type with a single value `undefined`, meaning “not assigned”,
- `object` and `symbol` – for complex data structures and unique identifiers, we haven’t learnt them yet.

The `typeof` operator returns the type for a value, with two exceptions:

    typeof null == "object" // error in the language
    typeof function(){} == "function" // functions are treated specially

More in: [Variables](variables.html) and [Data types](types.html).

## <a href="javascript-specials.html#interaction" id="interaction" class="main__anchor">Interaction</a>

We’re using a browser as a working environment, so basic UI functions will be:

[`prompt(question, [default])`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)  
Ask a `question`, and return either what the visitor entered or `null` if they clicked “cancel”.

[`confirm(question)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)  
Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)  
Output a `message`.

All these functions are _modal_, they pause the code execution and prevent the visitor from interacting with the page until they answer.

For instance:

<a href="javascript-specials.html#"
<a href="javascript-specials.html#"

    let userName = prompt("Your name?", "Alice");
    let isTeaWanted = confirm("Do you want some tea?");

    alert( "Visitor: " + userName ); // Alice
    alert( "Tea wanted: " + isTeaWanted ); // true

More in: [Interaction: alert, prompt, confirm](alert-prompt-confirm.html).

## <a href="javascript-specials.html#operators" id="operators" class="main__anchor">Operators</a>

JavaScript supports the following operators:

Arithmetical  
Regular: `* + - /`, also `%` for the remainder and `**` for power of a number.

The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:

<a href="javascript-specials.html#"
<a href="javascript-specials.html#"

    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string

Assignments  
There is a simple assignment: `a = b` and combined ones like `a *= 2`.

Bitwise  
Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) when they are needed.

Conditional  
The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators  
Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped (not necessary `true`/`false`). Logical NOT `!` converts the operand to boolean type and returns the inverse value.

Nullish coalescing operator  
The `??` operator provides a way to choose a defined value from a list of variables. The result of `a ?? b` is `a` unless it’s `null/undefined`, then `b`.

Comparisons  
Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:

<a href="javascript-specials.html#"
<a href="javascript-specials.html#"

    alert( 0 == false ); // true
    alert( 0 == '' ); // true

Other comparisons convert to a number as well.

The strict equality operator `===` doesn’t do the conversion: different types always mean different values for it.

Values `null` and `undefined` are special: they equal `==` each other and don’t equal anything else.

Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Other operators  
There are few others, like a comma operator.

More in: [Basic operators, maths](operators.html), [Comparisons](comparison.html), [Logical operators](logical-operators.html), [Nullish coalescing operator '??'](nullish-coalescing-operator.html).

## <a href="javascript-specials.html#loops" id="loops" class="main__anchor">Loops</a>

- We covered 3 types of loops:

      // 1
      while (condition) {
        ...
      }

      // 2
      do {
        ...
      } while (condition);

      // 3
      for(let i = 0; i < 10; i++) {
        ...
      }

- The variable declared in `for(let...)` loop is visible only inside the loop. But we can also omit `let` and reuse an existing variable.

- Directives `break/continue` allow to exit the whole loop/current iteration. Use labels to break nested loops.

Details in: [Loops: while and for](while-for.html).

Later we’ll study more types of loops to deal with objects.

## <a href="javascript-specials.html#the-switch-construct" id="the-switch-construct" class="main__anchor">The “switch” construct</a>

The “switch” construct can replace multiple `if` checks. It uses `===` (strict equality) for comparisons.

For instance:

<a href="javascript-specials.html#"
<a href="javascript-specials.html#"

    let age = prompt('Your age?', 18);

    switch (age) {
      case 18:
        alert("Won't work"); // the result of prompt is a string, not a number
        break;

      case "18":
        alert("This works!");
        break;

      default:
        alert("Any value not equal to one above");
    }

Details in: [The "switch" statement](switch.html).

## <a href="javascript-specials.html#functions" id="functions" class="main__anchor">Functions</a>

We covered three ways to create a function in JavaScript:

1.  Function Declaration: the function in the main code flow

        function sum(a, b) {
          let result = a + b;

          return result;
        }

2.  Function Expression: the function in the context of an expression

        let sum = function(a, b) {
          let result = a + b;

          return result;
        };

3.  Arrow functions:

        // expression at the right side
        let sum = (a, b) => a + b;

        // or multi-line syntax with { ... }, need return here:
        let sum = (a, b) => {
          // ...
          return a + b;
        }

        // without arguments
        let sayHi = () => alert("Hello");

        // with a single argument
        let double = n => n * 2;

- Functions may have local variables: those declared inside its body or its parameter list. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there’s no `return` statement, then the result is `undefined`.

Details: see [Functions](function-basics.html), [Arrow functions, the basics](arrow-functions-basics.html).

## <a href="javascript-specials.html#more-to-come" id="more-to-come" class="main__anchor">More to come</a>

That was a brief list of JavaScript features. As of now we’ve studied only basics. Further in the tutorial you’ll find more specials and advanced features of JavaScript.

<a href="arrow-functions-basics.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="code-quality.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fjavascript-specials" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fjavascript-specials" </a>

<a href="tutorial/map.html" class="map">

## <a href="javascript-specials.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="javascript-specials.html#code-structure" class="sidebar__link">Code structure</a>
- <a href="javascript-specials.html#strict-mode" class="sidebar__link">Strict mode</a>
- <a href="javascript-specials.html#variables" class="sidebar__link">Variables</a>
- <a href="javascript-specials.html#interaction" class="sidebar__link">Interaction</a>
- <a href="javascript-specials.html#operators" class="sidebar__link">Operators</a>
- <a href="javascript-specials.html#loops" class="sidebar__link">Loops</a>
- <a href="javascript-specials.html#the-switch-construct" class="sidebar__link">The “switch” construct</a>
- <a href="javascript-specials.html#functions" class="sidebar__link">Functions</a>
- <a href="javascript-specials.html#more-to-come" class="sidebar__link">More to come</a>

- <a href="javascript-specials.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fjavascript-specials" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fjavascript-specials" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/18-javascript-specials" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
