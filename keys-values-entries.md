EN

- <a href="https://ar.javascript.info/keys-values-entries"
- <a href="keys-values-entries.html"
- <a href="https://es.javascript.info/keys-values-entries"
- <a href="https://fr.javascript.info/keys-values-entries"
- <a href="https://it.javascript.info/keys-values-entries"
  keys-values-entries"

<!-- -->

- <a href="https://ko.javascript.info/keys-values-entries"
- <a href=keys-values-entries"
- <a href="https://tr.javascript.info/keys-values-entries"
- <a href="https://zh.javascript.info/keys-values-entries"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fkeys-values-entries" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fkeys-values-entries" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

27th June 2021

# Object.keys, values, entries

Let’s step away from the individual data structures and talk about the iterations over them.

In the previous chapter we saw methods `map.keys()`, `map.values()`, `map.entries()`.

These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too.

They are supported for:

- `Map`
- `Set`
- `Array`

Plain objects also support similar methods, but the syntax is a bit different.

## <a href="keys-values-entries.html#object-keys-values-entries" id="object-keys-values-entries" class="main__anchor">Object.keys, values, entries</a>

For plain objects, the following methods are available:

- [Object.keys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) – returns an array of keys.
- [Object.values(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) – returns an array of values.
- [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) – returns an array of `[key, value]` pairs.

Please note the distinctions (compared to map for example):

<table><thead><tr class="header"><th></th><th>Map</th><th>Object</th></tr></thead><tbody><tr class="odd"><td>Call syntax</td><td><code>map.keys()</code></td><td><code>Object.keys(obj)</code>, but not <code>obj.keys()</code></td></tr><tr class="even"><td>Returns</td><td>iterable</td><td>“real” Array</td></tr></tbody></table>

The first difference is that we have to call `Object.keys(obj)`, and not `obj.keys()`.

Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in JavaScript. So we may have an object of our own like `data` that implements its own `data.values()` method. And we still can call `Object.values(data)` on it.

The second difference is that `Object.*` methods return “real” array objects, not just an iterable. That’s mainly for historical reasons.

For instance:

    let user = {
      name: "John",
      age: 30
    };

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Here’s an example of using `Object.values` to loop over property values:

<a href="keys-values-entries.html#"
<a href="keys-values-entries.html#"

    let user = {
      name: "John",
      age: 30
    };

    // loop over values
    for (let value of Object.values(user)) {
      alert(value); // John, then 30
    }

<span class="important__type">Object.keys/values/entries ignore symbolic properties</span>

Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that’s convenient. But if we want symbolic keys too, then there’s a separate method [Object.getOwnPropertySymbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, there exist a method [Reflect.ownKeys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) that returns _all_ keys.

## <a href="keys-values-entries.html#transforming-objects" id="transforming-objects" class="main__anchor">Transforming objects</a>

Objects lack many methods that exist for arrays, e.g. `map`, `filter` and others.

If we’d like to apply them, then we can use `Object.entries` followed by `Object.fromEntries`:

1.  Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2.  Use array methods on that array, e.g. `map`, to transform these key/value pairs.
3.  Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:

<a href="keys-values-entries.html#"
<a href="keys-values-entries.html#"

    let prices = {
      banana: 1,
      orange: 2,
      meat: 4,
    };

    let doublePrices = Object.fromEntries(
      // convert prices to array, map each key/value pair into another pair
      // and then fromEntries gives back the object
      Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
    );

    alert(doublePrices.meat); // 8

It may look difficult at first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way.

## <a href="keys-values-entries.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="keys-values-entries.html#sum-the-properties" id="sum-the-properties" class="main__anchor">Sum the properties</a>

<a href="task/sum-salaries.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There is a `salaries` object with arbitrary number of salaries.

Write the function `sumSalaries(salaries)` that returns the sum of all salaries using `Object.values` and the `for..of` loop.

If `salaries` is empty, then the result must be `0`.

For instance:

    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    alert( sumSalaries(salaries) ); // 650

[Open a sandbox with tests.](https://plnkr.co/edit/3GeBocsoIurq4kJU?p=preview)

solution

<a href="keys-values-entries.html#"
<a href="keys-values-entries.html#"

    function sumSalaries(salaries) {

      let sum = 0;
      for (let salary of Object.values(salaries)) {
        sum += salary;
      }

      return sum; // 650
    }

    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    alert( sumSalaries(salaries) ); // 650

Or, optionally, we could also get the sum using `Object.values` and `reduce`:

    // reduce loops over array of salaries,
    // adding them up
    // and returns the result
    function sumSalaries(salaries) {
      return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/70glWlRJ22XYpdA7?p=preview)

### <a href="keys-values-entries.html#count-properties" id="count-properties" class="main__anchor">Count properties</a>

<a href="task/count-properties.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `count(obj)` that returns the number of properties in the object:

    let user = {
      name: 'John',
      age: 30
    };

    alert( count(user) ); // 2

Try to make the code as short as possible.

P.S. Ignore symbolic properties, count only “regular” ones.

[Open a sandbox with tests.](https://plnkr.co/edit/vPFL4Dyi1Wmml0lm?p=preview)

solution

    function count(obj) {
      return Object.keys(obj).length;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/YDO6lp8tdktgRApU?p=preview)

<a href="weakmap-weakset.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="destructuring-assignment.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fkeys-values-entries" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fkeys-values-entries" </a>

<a href="tutorial/map.html" class="map">

## <a href="keys-values-entries.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="keys-values-entries.html#object-keys-values-entries" class="sidebar__link">Object.keys, values, entries</a>
- <a href="keys-values-entries.html#transforming-objects" class="sidebar__link">Transforming objects</a>

- <a href="keys-values-entries.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="keys-values-entries.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fkeys-values-entries" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fkeys-values-entries" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/09-keys-values-entries" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
