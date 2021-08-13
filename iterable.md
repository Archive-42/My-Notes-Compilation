EN

- <a href="https://ar.javascript.info/iterable"
- <a href="iterable.html"
- <a href="https://es.javascript.info/iterable"
- <a href="https://fr.javascript.info/iterable"
- iterable"
  iterable"

<!-- -->

- /iterable"
- <a href=iterable"
- <a href="https://tr.javascript.info/iterable"
- <a href="https://zh.javascript.info/iterable"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fiterable" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fiterable" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

25th December 2020

# Iterables

_Iterable_ objects are a generalization of arrays. That’s a concept that allows us to make any object useable in a `for..of` loop.

Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

If an object isn’t technically an array, but represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it, so let’s see how to make it work.

## <a href="iterable.html#symbol-iterator" id="symbol-iterator" class="main__anchor">Symbol.iterator</a>

We can easily grasp the concept of iterables by making one of our own.

For instance, we have an object that is not an array, but looks suitable for `for..of`.

Like a `range` object that represents an interval of numbers:

    let range = {
      from: 1,
      to: 5
    };

    // We want the for..of to work:
    // for(let num of range) ... num=1,2,3,4,5

To make the `range` object iterable (and thus let `for..of` work) we need to add a method to the object named `Symbol.iterator` (a special built-in symbol just for that).

1.  When `for..of` starts, it calls that method once (or errors if not found). The method must return an _iterator_ – an object with the method `next`.
2.  Onward, `for..of` works _only with that returned object_.
3.  When `for..of` wants the next value, it calls `next()` on that object.
4.  The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true` means that the iteration is finished, otherwise `value` is the next value.

Here’s the full implementation for `range` with remarks:

<a href="iterable.html#"
<a href="iterable.html#"

    let range = {
      from: 1,
      to: 5
    };

    // 1. call to for..of initially calls this
    range[Symbol.iterator] = function() {

      // ...it returns the iterator object:
      // 2. Onward, for..of works only with this iterator, asking it for next values
      return {
        current: this.from,
        last: this.to,

        // 3. next() is called on each iteration by the for..of loop
        next() {
          // 4. it should return the value as an object {done:.., value :...}
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    };

    // now it works!
    for (let num of range) {
      alert(num); // 1, then 2, 3, 4, 5
    }

Please note the core feature of iterables: separation of concerns.

- The `range` itself does not have the `next()` method.
- Instead, another object, a so-called “iterator” is created by the call to `range[Symbol.iterator]()`, and its `next()` generates values for the iteration.

So, the iterator object is separate from the object it iterates over.

Technically, we may merge them and use `range` itself as the iterator to make the code simpler.

Like this:

<a href="iterable.html#"
<a href="iterable.html#"

    let range = {
      from: 1,
      to: 5,

      [Symbol.iterator]() {
        this.current = this.from;
        return this;
      },

      next() {
        if (this.current <= this.to) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };

    for (let num of range) {
      alert(num); // 1, then 2, 3, 4, 5
    }

Now `range[Symbol.iterator]()` returns the `range` object itself: it has the necessary `next()` method and remembers the current iteration progress in `this.current`. Shorter? Yes. And sometimes that’s fine too.

The downside is that now it’s impossible to have two `for..of` loops running over the object simultaneously: they’ll share the iteration state, because there’s only one iterator – the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.

<span class="important__type">Infinite iterators</span>

Infinite iterators are also possible. For instance, the `range` becomes infinite for `range.to = Infinity`. Or we can make an iterable object that generates an infinite sequence of pseudorandom numbers. Also can be useful.

There are no limitations on `next`, it can return more and more values, that’s normal.

Of course, the `for..of` loop over such an iterable would be endless. But we can always stop it using `break`.

## <a href="iterable.html#string-is-iterable" id="string-is-iterable" class="main__anchor">String is iterable</a>

Arrays and strings are most widely used built-in iterables.

For a string, `for..of` loops over its characters:

<a href="iterable.html#"
<a href="iterable.html#"

    for (let char of "test") {
      // triggers 4 times: once for each character
      alert( char ); // t, then e, then s, then t
    }

And it works correctly with surrogate pairs!

<a href="iterable.html#"
<a href="iterable.html#"

    let str = '𝒳😂';
    for (let char of str) {
        alert( char ); // 𝒳, and then 😂
    }

## <a href="iterable.html#calling-an-iterator-explicitly" id="calling-an-iterator-explicitly" class="main__anchor">Calling an iterator explicitly</a>

For deeper understanding, let’s see how to use an iterator explicitly.

We’ll iterate over a string in exactly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it “manually”:

<a href="iterable.html#"
<a href="iterable.html#"

    let str = "Hello";

    // does the same as
    // for (let char of str) alert(char);

    let iterator = str[Symbol.iterator]();

    while (true) {
      let result = iterator.next();
      if (result.done) break;
      alert(result.value); // outputs characters one by one
    }

That is rarely needed, but gives us more control over the process than `for..of`. For instance, we can split the iteration process: iterate a bit, then stop, do something else, and then resume later.

## <a href="iterable.html#array-like" id="array-like" class="main__anchor">Iterables and array-likes</a>

Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.

- _Iterables_ are objects that implement the `Symbol.iterator` method, as described above.
- _Array-likes_ are objects that have indexes and `length`, so they look like arrays.

When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).

But an iterable may be not array-like. And vice versa an array-like may be not iterable.

For example, the `range` in the example above is iterable, but not array-like, because it does not have indexed properties and `length`.

And here’s the object that is array-like, but not iterable:

<a href="iterable.html#"
<a href="iterable.html#"

    let arrayLike = { // has indexes and length => array-like
      0: "Hello",
      1: "World",
      length: 2
    };

    // Error (no Symbol.iterator)
    for (let item of arrayLike) {}

Both iterables and array-likes are usually _not arrays_, they don’t have `push`, `pop` etc. That’s rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## <a href="iterable.html#array-from" id="array-from" class="main__anchor">Array.from</a>

There’s a universal method [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) that takes an iterable or array-like value and makes a “real” `Array` from it. Then we can call array methods on it.

For instance:

<a href="iterable.html#"
<a href="iterable.html#"

    let arrayLike = {
      0: "Hello",
      1: "World",
      length: 2
    };

    let arr = Array.from(arrayLike); // (*)
    alert(arr.pop()); // World (method works)

`Array.from` at the line `(*)` takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.

The same happens for an iterable:

    // assuming that range is taken from the example above
    let arr = Array.from(range);
    alert(arr); // 1,2,3,4,5 (array toString conversion works)

The full syntax for `Array.from` also allows us to provide an optional “mapping” function:

    Array.from(obj[, mapFn, thisArg])

The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.

For instance:

    // assuming that range is taken from the example above

    // square each number
    let arr = Array.from(range, num => num * num);

    alert(arr); // 1,4,9,16,25

Here we use `Array.from` to turn a string into an array of characters:

<a href="iterable.html#"
<a href="iterable.html#"

    let str = '𝒳😂';

    // splits str into array of characters
    let chars = Array.from(str);

    alert(chars[0]); // 𝒳
    alert(chars[1]); // 😂
    alert(chars.length); // 2

Unlike `str.split`, it relies on the iterable nature of the string and so, just like `for..of`, correctly works with surrogate pairs.

Technically here it does the same as:

<a href="iterable.html#"
<a href="iterable.html#"

    let str = '𝒳😂';

    let chars = []; // Array.from internally does the same loop
    for (let char of str) {
      chars.push(char);
    }

    alert(chars);

…But it is shorter.

We can even build surrogate-aware `slice` on it:

<a href="iterable.html#"
<a href="iterable.html#"

    function slice(str, start, end) {
      return Array.from(str).slice(start, end).join('');
    }

    let str = '𝒳😂𩷶';

    alert( slice(str, 1, 3) ); // 😂𩷶

    // the native method does not support surrogate pairs
    alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)

## <a href="iterable.html#summary" id="summary" class="main__anchor">Summary</a>

Objects that can be used in `for..of` are called _iterable_.

- Technically, iterables must implement the method named `Symbol.iterator`.
  - The result of `obj[Symbol.iterator]()` is called an _iterator_. It handles further iteration process.
  - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.

Objects that have indexed properties and `length` are called _array-like_. Such objects may also have other properties and methods, but lack the built-in methods of arrays.

If we look inside the specification – we’ll see that most built-in methods assume that they work with iterables or array-likes instead of “real” arrays, because that’s more abstract.

`Array.from(obj[, mapFn, thisArg])` makes a real `Array` from an iterable or array-like `obj`, and we can then use array methods on it. The optional arguments `mapFn` and `thisArg` allow us to apply a function to each item.

<a href="array-methods.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="map-set.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fiterable" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fiterable" </a>

<a href="tutorial/map.html" class="map">

## <a href="iterable.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="iterable.html#symbol-iterator" class="sidebar__link">Symbol.iterator</a>
- <a href="iterable.html#string-is-iterable" class="sidebar__link">String is iterable</a>
- <a href="iterable.html#calling-an-iterator-explicitly" class="sidebar__link">Calling an iterator explicitly</a>
- <a href="iterable.html#array-like" class="sidebar__link">Iterables and array-likes</a>
- <a href="iterable.html#array-from" class="sidebar__link">Array.from</a>
- <a href="iterable.html#summary" class="sidebar__link">Summary</a>

- <a href="iterable.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fiterable" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fiterable" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/06-iterable" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
