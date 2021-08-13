EN

- <a href="https://ar.javascript.info/types"
- <a href="types.html"
- <a href="https://es.javascript.info/types"
- <a href="https://fr.javascript.info/types"
- types"
  types"

<!-- -->

- /types"
- <a href=types"
- <a href="https://tr.javascript.info/types"
  ypes"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ftypes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftypes" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

13th June 2021

# Data types

A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we’ll cover them in general and in the next chapters we’ll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:

    // no error
    let message = "hello";
    message = 123456;

Programming languages that allow such things, such as JavaScript, are called “dynamically typed”, meaning that there exist data types, but variables are not bound to any of them.

## <a href="types.html#number" id="number" class="main__anchor">Number</a>

    let n = 123;
    n = 12.345;

The _number_ type represents both integer and floating point numbers.

There are many operations for numbers, e.g. multiplication `*`, division `/`, addition `+`, subtraction `-`, and so on.

Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: `Infinity`, `-Infinity` and `NaN`.

- `Infinity` represents the mathematical [Infinity](https://en.wikipedia.org/wiki/Infinity) ∞. It is a special value that’s greater than any number.

  We can get it as a result of division by zero:

  <a href="types.html#"
  <a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

      alert( 1 / 0 ); // Infinity

  Or just reference it directly:

  <a href="types.html#"
  <a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

      alert( Infinity ); // Infinity

- `NaN` represents a computational error. It is a result of an incorrect or an undefined mathematical operation, for instance:

  <a href="types.html#"
  <a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

      alert( "not a number" / 2 ); // NaN, such division is erroneous

  `NaN` is sticky. Any further operation on `NaN` returns `NaN`:

  <a href="types.html#"
  <a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

      alert( "not a number" / 2 + 5 ); // NaN

  So, if there’s a `NaN` somewhere in a mathematical expression, it propagates to the whole result.

<span class="important__type">Mathematical operations are safe</span>

Doing maths is “safe” in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

The script will never stop with a fatal error (“die”). At worst, we’ll get `NaN` as the result.

Special numeric values formally belong to the “number” type. Of course they are not numbers in the common sense of this word.

We’ll see more about working with numbers in the chapter [Numbers](number.html).

## <a href="types.html#bigint-type" id="bigint-type" class="main__anchor">BigInt</a>

In JavaScript, the “number” type cannot represent integer values larger than `(253-1)` (that’s `9007199254740991`), or less than `-(253-1)` for negatives. It’s a technical limitation caused by their internal representation.

For most purposes that’s quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

    // the "n" at the end means it's a BigInt
    const bigInt = 1234567890123456789012345678901234567890n;

As `BigInt` numbers are rarely needed, we don’t cover them here, but devoted them a separate chapter [BigInt](bigint.html). Read it when you need such big numbers.

<span class="important__type">Compatibility issues</span>

Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.

You can check [_MDN_ BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## <a href="types.html#string" id="string" class="main__anchor">String</a>

A string in JavaScript must be surrounded by quotes.

    let str = "Hello";
    let str2 = 'Single quotes are ok too';
    let phrase = `can embed another ${str}`;

In JavaScript, there are 3 types of quotes.

1.  Double quotes: `"Hello"`.
2.  Single quotes: `'Hello'`.
3.  Backticks: `` `Hello` ``.

Double and single quotes are “simple” quotes. There’s practically no difference between them in JavaScript.

Backticks are “extended functionality” quotes. They allow us to embed variables and expressions into a string by wrapping them in `${…}`, for example:

<a href="types.html#"
<a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let name = "John";

    // embed a variable
    alert( `Hello, ${name}!` ); // Hello, John!

    // embed an expression
    alert( `the result is ${1 + 2}` ); // the result is 3

The expression inside `${…}` is evaluated and the result becomes a part of the string. We can put anything in there: a variable like `name` or an arithmetical expression like `1 + 2` or something more complex.

Please note that this can only be done in backticks. Other quotes don’t have this embedding functionality!

<a href="types.html#"
<a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)

We’ll cover strings more thoroughly in the chapter [Strings](string.html).

<span class="important__type">There is no _character_ type.</span>

In some languages, there is a special “character” type for a single character. For example, in the C language and in Java it is called “char”.

In JavaScript, there is no such type. There’s only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.

## <a href="types.html#boolean-logical-type" id="boolean-logical-type" class="main__anchor">Boolean (logical type)</a>

The boolean type has only two values: `true` and `false`.

This type is commonly used to store yes/no values: `true` means “yes, correct”, and `false` means “no, incorrect”.

For instance:

    let nameFieldChecked = true; // yes, name field is checked
    let ageFieldChecked = false; // no, age field is not checked

Boolean values also come as a result of comparisons:

<a href="types.html#"
<a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let isGreater = 4 > 1;

    alert( isGreater ); // true (the comparison result is "yes")

We’ll cover booleans more deeply in the chapter [Logical operators](logical-operators.html).

## <a href="types.html#the-null-value" id="the-null-value" class="main__anchor">The “null” value</a>

The special `null` value does not belong to any of the types described above.

It forms a separate type of its own which contains only the `null` value:

    let age = null;

In JavaScript, `null` is not a “reference to a non-existing object” or a “null pointer” like in some other languages.

It’s just a special value which represents “nothing”, “empty” or “value unknown”.

The code above states that `age` is unknown.

## <a href="types.html#the-undefined-value" id="the-undefined-value" class="main__anchor">The “undefined” value</a>

The special value `undefined` also stands apart. It makes a type of its own, just like `null`.

The meaning of `undefined` is “value is not assigned”.

If a variable is declared, but not assigned, then its value is `undefined`:

<a href="types.html#"
<a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let age;

    alert(age); // shows "undefined"

Technically, it is possible to explicitly assign `undefined` to a variable:

<a href="types.html#"
<a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let age = 100;

    // change the value to undefined
    age = undefined;

    alert(age); // "undefined"

…But we don’t recommend doing that. Normally, one uses `null` to assign an “empty” or “unknown” value to a variable, while `undefined` is reserved as a default initial value for unassigned things.

## <a href="types.html#objects-and-symbols" id="objects-and-symbols" class="main__anchor">Objects and Symbols</a>

The `object` type is special.

All other types are called “primitive” because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We’ll deal with them later in the chapter [Objects](object.html), after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.

## <a href="types.html#type-typeof" id="type-typeof" class="main__anchor">The typeof operator</a>

The `typeof` operator returns the type of the argument. It’s useful when we want to process values of different types differently or just want to do a quick check.

It supports two forms of syntax:

1.  As an operator: `typeof x`.
2.  As a function: `typeof(x)`.

In other words, it works with parentheses or without them. The result is the same.

The call to `typeof x` returns a string with the type name:

    typeof undefined // "undefined"

    typeof 0 // "number"

    typeof 10n // "bigint"

    typeof true // "boolean"

    typeof "foo" // "string"

    typeof Symbol("id") // "symbol"

    typeof Math // "object"  (1)

    typeof null // "object"  (2)

    typeof alert // "function"  (3)

The last three lines may need additional explanation:

1.  `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter [Numbers](number.html). Here, it serves just as an example of an object.
2.  The result of `typeof null` is `"object"`. That’s an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3.  The result of `typeof alert` is `"function"`, because `alert` is a function. We’ll study functions in the next chapters where we’ll also see that there’s no special “function” type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn’t correct, but can be convenient in practice.

## <a href="types.html#summary" id="summary" class="main__anchor">Summary</a>

There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by `±(253-1)`.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there’s no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values – a standalone type that has a single value `null`.
- `undefined` for unassigned values – a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.

The `typeof` operator allows us to see which type is stored in a variable.

- Two forms: `typeof x` or `typeof(x)`.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` – this is an error in the language, it’s not actually an object.

In the next chapters, we’ll concentrate on primitive values and once we’re familiar with them, we’ll move on to objects.

## <a href="types.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="types.html#string-quotes" id="string-quotes" class="main__anchor">String quotes</a>

<a href="task/string-quotes.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What is the output of the script?

    let name = "Ilya";

    alert( `hello ${1}` ); // ?

    alert( `hello ${"name"}` ); // ?

    alert( `hello ${name}` ); // ?

solution

Backticks embed the expression inside `${...}` into the string.

<a href="types.html#"
<a href="types.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let name = "Ilya";

    // the expression is a number 1
    alert( `hello ${1}` ); // hello 1

    // the expression is a string "name"
    alert( `hello ${"name"}` ); // hello name

    // the expression is a variable, embed it
    alert( `hello ${name}` ); // hello Ilya

<a href="variables.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="alert-prompt-confirm.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ftypes" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftypes" </a>

<a href="tutorial/map.html" class="map">

## <a href="types.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="types.html#number" class="sidebar__link">Number</a>
- <a href="types.html#bigint-type" class="sidebar__link">BigInt</a>
- <a href="types.html#string" class="sidebar__link">String</a>
- <a href="types.html#boolean-logical-type" class="sidebar__link">Boolean (logical type)</a>
- <a href="types.html#the-null-value" class="sidebar__link">The “null” value</a>
- <a href="types.html#the-undefined-value" class="sidebar__link">The “undefined” value</a>
- <a href="types.html#objects-and-symbols" class="sidebar__link">Objects and Symbols</a>
- <a href="types.html#type-typeof" class="sidebar__link">The typeof operator</a>
- <a href="types.html#summary" class="sidebar__link">Summary</a>

- <a href="types.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="types.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Ftypes" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftypes" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/05-types" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
