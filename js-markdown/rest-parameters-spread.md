EN

- <a href="https://ar.javascript.info/rest-parameters-spread"
- <a href="rest-parameters-spread.html"
- <a href="https://es.javascript.info/rest-parameters-spread"
- <a href="https://fr.javascript.info/rest-parameters-spread"
- rest-parameters-spread"
  rest-parameters-spread"

<!-- -->

- /rest-parameters-spread"
- <a href="
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/rest-parameters-spread"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Frest-parameters-spread" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Frest-parameters-spread" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" Advanced working with functions</span></a></span>

2nd February 2021

# Rest parameters and spread syntax

Many JavaScript built-in functions support an arbitrary number of arguments.

For instance:

- `Math.max(arg1, arg2, ..., argN)` – returns the greatest of the arguments.
- `Object.assign(dest, src1, ..., srcN)` – copies properties from `src1..N` into `dest`.
- …and so on.

In this chapter we’ll learn how to do the same. And also, how to pass arrays to such functions as parameters.

## <a href="rest-parameters-spread.html#rest-parameters" id="rest-parameters" class="main__anchor">Rest parameters <code>...</code></a>

A function can be called with any number of arguments, no matter how it is defined.

Like here:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sum(a, b) {
      return a + b;
    }

    alert( sum(1, 2, 3, 4, 5) );

There will be no error because of “excessive” arguments. But of course in the result only the first two will be counted.

The rest of the parameters can be included in the function definition by using three dots `...` followed by the name of the array that will contain them. The dots literally mean “gather the remaining parameters into an array”.

For instance, to gather all arguments into array `args`:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sumAll(...args) { // args is the name for the array
      let sum = 0;

      for (let arg of args) sum += arg;

      return sum;
    }

    alert( sumAll(1) ); // 1
    alert( sumAll(1, 2) ); // 3
    alert( sumAll(1, 2, 3) ); // 6

We can choose to get the first parameters as variables, and gather only the rest.

Here the first two arguments go into variables and the rest go into `titles` array:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function showName(firstName, lastName, ...titles) {
      alert( firstName + ' ' + lastName ); // Julius Caesar

      // the rest go into titles array
      // i.e. titles = ["Consul", "Imperator"]
      alert( titles[0] ); // Consul
      alert( titles[1] ); // Imperator
      alert( titles.length ); // 2
    }

    showName("Julius", "Caesar", "Consul", "Imperator");

<span class="important__type">The rest parameters must be at the end</span>

The rest parameters gather all remaining arguments, so the following does not make sense and causes an error:

    function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
      // error
    }

The `...rest` must always be last.

## <a href="rest-parameters-spread.html#the-arguments-variable" id="the-arguments-variable" class="main__anchor">The “arguments” variable</a>

There is also a special array-like object named `arguments` that contains all arguments by their index.

For instance:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function showName() {
      alert( arguments.length );
      alert( arguments[0] );
      alert( arguments[1] );

      // it's iterable
      // for(let arg of arguments) alert(arg);
    }

    // shows: 2, Julius, Caesar
    showName("Julius", "Caesar");

    // shows: 1, Ilya, undefined (no second argument)
    showName("Ilya");

In old times, rest parameters did not exist in the language, and using `arguments` was the only way to get all arguments of the function. And it still works, we can find it in the old code.

But the downside is that although `arguments` is both array-like and iterable, it’s not an array. It does not support array methods, so we can’t call `arguments.map(...)` for example.

Also, it always contains all arguments. We can’t capture them partially, like we did with rest parameters.

So when we need these features, then rest parameters are preferred.

<span class="important__type">Arrow functions do not have `"arguments"`</span>

If we access the `arguments` object from an arrow function, it takes them from the outer “normal” function.

Here’s an example:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function f() {
      let showArg = () => alert(arguments[0]);
      showArg();
    }

    f(1); // 1

As we remember, arrow functions don’t have their own `this`. Now we know they don’t have the special `arguments` object either.

## <a href="rest-parameters-spread.html#spread-syntax" id="spread-syntax" class="main__anchor">Spread syntax</a>

We’ve just seen how to get an array from the list of parameters.

But sometimes we need to do exactly the reverse.

For instance, there’s a built-in function [Math.max](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) that returns the greatest number from a list:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( Math.max(3, 5, 1) ); // 5

Now let’s say we have an array `[3, 5, 1]`. How do we call `Math.max` with it?

Passing it “as is” won’t work, because `Math.max` expects a list of numeric arguments, not a single array:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let arr = [3, 5, 1];

    alert( Math.max(arr) ); // NaN

And surely we can’t manually list items in the code `Math.max(arr[0], arr[1], arr[2])`, because we may be unsure how many there are. As our script executes, there could be a lot, or there could be none. And that would get ugly.

_Spread syntax_ to the rescue! It looks similar to rest parameters, also using `...`, but does quite the opposite.

When `...arr` is used in the function call, it “expands” an iterable object `arr` into the list of arguments.

For `Math.max`:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let arr = [3, 5, 1];

    alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)

We also can pass multiple iterables this way:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let arr1 = [1, -2, 3, 4];
    let arr2 = [8, 3, -8, 1];

    alert( Math.max(...arr1, ...arr2) ); // 8

We can even combine the spread syntax with normal values:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let arr1 = [1, -2, 3, 4];
    let arr2 = [8, 3, -8, 1];

    alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

Also, the spread syntax can be used to merge arrays:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let arr = [3, 5, 1];
    let arr2 = [8, 9, 15];

    let merged = [0, ...arr, 2, ...arr2];

    alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)

In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

For instance, here we use the spread syntax to turn the string into array of characters:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "Hello";

    alert( [...str] ); // H,e,l,l,o

The spread syntax internally uses iterators to gather elements, the same way as `for..of` does.

So, for a string, `for..of` returns characters and `...str` becomes `"H","e","l","l","o"`. The list of characters is passed to array initializer `[...str]`.

For this particular task we could also use `Array.from`, because it converts an iterable (like a string) into an array:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = "Hello";

    // Array.from converts an iterable into an array
    alert( Array.from(str) ); // H,e,l,l,o

The result is the same as `[...str]`.

But there’s a subtle difference between `Array.from(obj)` and `[...obj]`:

- `Array.from` operates on both array-likes and iterables.
- The spread syntax works only with iterables.

So, for the task of turning something into an array, `Array.from` tends to be more universal.

## <a href="rest-parameters-spread.html#copy-an-array-object" id="copy-an-array-object" class="main__anchor">Copy an array/object</a>

Remember when we talked about `Object.assign()` [in the past](object-copy.html#cloning-and-merging-object-assign)?

It is possible to do the same thing with the spread syntax.

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let arr = [1, 2, 3];

    let arrCopy = [...arr]; // spread the array into a list of parameters
                            // then put the result into a new array

    // do the arrays have the same contents?
    alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

    // are the arrays equal?
    alert(arr === arrCopy); // false (not same reference)

    // modifying our initial array does not modify the copy:
    arr.push(4);
    alert(arr); // 1, 2, 3, 4
    alert(arrCopy); // 1, 2, 3

Note that it is possible to do the same thing to make a copy of an object:

<a href="rest-parameters-spread.html#"
<a href="rest-parameters-spread.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let obj = { a: 1, b: 2, c: 3 };

    let objCopy = { ...obj }; // spread the object into a list of parameters
                              // then return the result in a new object

    // do the objects have the same contents?
    alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

    // are the objects equal?
    alert(obj === objCopy); // false (not same reference)

    // modifying our initial object does not modify the copy:
    obj.d = 4;
    alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
    alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}

This way of copying an object is much shorter than `let objCopy = Object.assign({}, obj)` or for an array `let arrCopy = Object.assign([], arr)` so we prefer to use it whenever we can.

## <a href="rest-parameters-spread.html#summary" id="summary" class="main__anchor">Summary</a>

When we see `"..."` in the code, it is either rest parameters or the spread syntax.

There’s an easy way to distinguish between them:

- When `...` is at the end of function parameters, it’s “rest parameters” and gathers the rest of the list of arguments into an array.
- When `...` occurs in a function call or alike, it’s called a “spread syntax” and expands an array into a list.

Use patterns:

- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.

Together they help to travel between a list and an array of parameters with ease.

All arguments of a function call are also available in “old-style” `arguments`: array-like iterable object.

<a href="recursion.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="closure.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Frest-parameters-spread" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Frest-parameters-spread" </a>

<a href="tutorial/map.html" class="map">

## <a href="rest-parameters-spread.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

- <a href="rest-parameters-spread.html#rest-parameters" class="sidebar__link">Rest parameters <code>...</code></a>
- <a href="rest-parameters-spread.html#the-arguments-variable" class="sidebar__link">The “arguments” variable</a>
- <a href="rest-parameters-spread.html#spread-syntax" class="sidebar__link">Spread syntax</a>
- <a href="rest-parameters-spread.html#copy-an-array-object" class="sidebar__link">Copy an array/object</a>
- <a href="rest-parameters-spread.html#summary" class="sidebar__link">Summary</a>

- <a href="rest-parameters-spread.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Frest-parameters-spread" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Frest-parameters-spread" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/02-rest-parameters-spread" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
