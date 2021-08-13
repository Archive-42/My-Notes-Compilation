EN

- <a href="https://ar.javascript.info/primitives-methods"
- <a href="primitives-methods.html"
- <a href="https://es.javascript.info/primitives-methods"
- <a href="https://fr.javascript.info/primitives-methods"
- primitives-methods"
  primitives-methods"

<!-- -->

- <a href="https://ko.javascript.info/primitives-methods"
- <a href=primitives-methods"
- <a href="https://tr.javascript.info/primitives-methods"
- <a href="https://zh.javascript.info/primitives-methods"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fprimitives-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprimitives-methods" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

29th April 2021

# Methods of primitives

JavaScript allows us to work with primitives (strings, numbers, etc.) as if they were objects. They also provide methods to call as such. We will study those soon, but first we’ll see how it works because, of course, primitives are not objects (and here we will make it even clearer).

Let’s look at the key distinctions between primitives and objects.

A primitive

- Is a value of a primitive type.
- There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`.

An object

- Is capable of storing multiple values as properties.
- Can be created with `{}`, for instance: `{name: "John", age: 30}`. There are other kinds of objects in JavaScript: functions, for example, are objects.

One of the best things about objects is that we can store a function as one of its properties.

<a href="primitives-methods.html#"
<a href="primitives-methods.html#"

    let john = {
      name: "John",
      sayHi: function() {
        alert("Hi buddy!");
      }
    };

    john.sayHi(); // Hi buddy!

So here we’ve made an object `john` with the method `sayHi`.

Many built-in objects already exist, such as those that work with dates, errors, HTML elements, etc. They have different properties and methods.

But, these features come with a cost!

Objects are “heavier” than primitives. They require additional resources to support the internal machinery.

## <a href="primitives-methods.html#a-primitive-as-an-object" id="a-primitive-as-an-object" class="main__anchor">A primitive as an object</a>

Here’s the paradox faced by the creator of JavaScript:

- There are many things one would want to do with a primitive like a string or a number. It would be great to access them using methods.
- Primitives must be as fast and lightweight as possible.

The solution looks a little bit awkward, but here it is:

1.  Primitives are still primitive. A single value, as desired.
2.  The language allows access to methods and properties of strings, numbers, booleans and symbols.
3.  In order for that to work, a special “object wrapper” that provides the extra functionality is created, and then is destroyed.

The “object wrappers” are different for each primitive type and are called: `String`, `Number`, `Boolean` and `Symbol`. Thus, they provide different sets of methods.

For instance, there exists a string method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns a capitalized `str`.

Here’s how it works:

<a href="primitives-methods.html#"
<a href="primitives-methods.html#"

    let str = "Hello";

    alert( str.toUpperCase() ); // HELLO

Simple, right? Here’s what actually happens in `str.toUpperCase()`:

1.  The string `str` is a primitive. So in the moment of accessing its property, a special object is created that knows the value of the string, and has useful methods, like `toUpperCase()`.
2.  That method runs and returns a new string (shown by `alert`).
3.  The special object is destroyed, leaving the primitive `str` alone.

So primitives can provide methods, but they still remain lightweight.

The JavaScript engine highly optimizes this process. It may even skip the creation of the extra object at all. But it must still adhere to the specification and behave as if it creates one.

A number has methods of its own, for instance, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rounds the number to the given precision:

<a href="primitives-methods.html#"
<a href="primitives-methods.html#"

    let n = 1.23456;

    alert( n.toFixed(2) ); // 1.23

We’ll see more specific methods in chapters [Numbers](number.html) and [Strings](string.html).

<span class="important__type">Constructors `String/Number/Boolean` are for internal use only</span>

Some languages like Java allow us to explicitly create “wrapper objects” for primitives using a syntax like `new Number(1)` or `new Boolean(false)`.

In JavaScript, that’s also possible for historical reasons, but highly **unrecommended**. Things will go crazy in several places.

For instance:

<a href="primitives-methods.html#"
<a href="primitives-methods.html#"

    alert( typeof 0 ); // "number"

    alert( typeof new Number(0) ); // "object"!

Objects are always truthy in `if`, so here the alert will show up:

<a href="primitives-methods.html#"
<a href="primitives-methods.html#"

    let zero = new Number(0);

    if (zero) { // zero is true, because it's an object
      alert( "zero is truthy!?!" );
    }

On the other hand, using the same functions `String/Number/Boolean` without `new` is a totally sane and useful thing. They convert a value to the corresponding type: to a string, a number, or a boolean (primitive).

For example, this is entirely valid:

    let num = Number("123"); // convert a string to number

<span class="important__type">null/undefined have no methods</span>

The special primitives `null` and `undefined` are exceptions. They have no corresponding “wrapper objects” and provide no methods. In a sense, they are “the most primitive”.

An attempt to access a property of such value would give the error:

<a href="primitives-methods.html#"
<a href="primitives-methods.html#"

    alert(null.test); // error

## <a href="primitives-methods.html#summary" id="summary" class="main__anchor">Summary</a>

- Primitives except `null` and `undefined` provide many helpful methods. We will study those in the upcoming chapters.
- Formally, these methods work via temporary objects, but JavaScript engines are well tuned to optimize that internally, so they are not expensive to call.

## <a href="primitives-methods.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="primitives-methods.html#can-i-add-a-string-property" id="can-i-add-a-string-property" class="main__anchor">Can I add a string property?</a>

<a href="task/string-new-property.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Consider the following code:

    let str = "Hello";

    str.test = 5;

    alert(str.test);

How do you think, will it work? What will be shown?

solution

Try running it:

<a href="primitives-methods.html#"
<a href="primitives-methods.html#"

    let str = "Hello";

    str.test = 5; // (*)

    alert(str.test);

Depending on whether you have `use strict` or not, the result may be:

1.  `undefined` (no strict mode)
2.  An error (strict mode).

Why? Let’s replay what’s happening at line `(*)`:

1.  When a property of `str` is accessed, a “wrapper object” is created.
2.  In strict mode, writing into it is an error.
3.  Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the “wrapper object” disappears, so in the last line `str` has no trace of the property.

**This example clearly shows that primitives are not objects.**

They can’t store additional data.

<a href="data-types.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="number.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fprimitives-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprimitives-methods" </a>

<a href="tutorial/map.html" class="map">

## <a href="primitives-methods.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="primitives-methods.html#a-primitive-as-an-object" class="sidebar__link">A primitive as an object</a>
- <a href="primitives-methods.html#summary" class="sidebar__link">Summary</a>

- <a href="primitives-methods.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="primitives-methods.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fprimitives-methods" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprimitives-methods" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/01-primitives-methods" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
