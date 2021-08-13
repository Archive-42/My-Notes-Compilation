EN

- <a href="https://ar.javascript.info/map-set"
- <a href="map-set.html"
- <a href="https://es.javascript.info/map-set"
- <a href="https://fr.javascript.info/map-set"
- <a href="https://it.javascript.info/map-set"
  map-set"

<!-- -->

- <a href="https://ko.javascript.info/map-set"
- <a href=map-set"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/map-set"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmap-set" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmap-set" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

25th November 2020

# Map and Set

Till now, we’ve learned about the following complex data structures:

- Objects are used for storing keyed collections.
- Arrays are used for storing ordered collections.

But that’s not enough for real life. That’s why `Map` and `Set` also exist.

## <a href="map-set.html#map" id="map" class="main__anchor">Map</a>

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is a collection of keyed data items, just like an `Object`. But the main difference is that `Map` allows keys of any type.

Methods and properties are:

- `new Map()` – creates the map.
- `map.set(key, value)` – stores the value by the key.
- `map.get(key)` – returns the value by the key, `undefined` if `key` doesn’t exist in map.
- `map.has(key)` – returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` – removes the value by the key.
- `map.clear()` – removes everything from the map.
- `map.size` – returns the current element count.

For instance:

<a href="map-set.html#"
<a href="map-set.html#"

    let map = new Map();

    map.set('1', 'str1');   // a string key
    map.set(1, 'num1');     // a numeric key
    map.set(true, 'bool1'); // a boolean key

    // remember the regular Object? it would convert keys to string
    // Map keeps the type, so these two are different:
    alert( map.get(1)   ); // 'num1'
    alert( map.get('1') ); // 'str1'

    alert( map.size ); // 3

As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

<span class="important__type">`map[key]` isn’t the right way to use a `Map`</span>

Although `map[key]` also works, e.g. we can set `map[key] = 2`, this is treating `map` as a plain JavaScript object, so it implies all corresponding limitations (only string/symbol keys and so on).

So we should use `map` methods: `set`, `get` and so on.

**Map can also use objects as keys.**

For instance:

<a href="map-set.html#"
<a href="map-set.html#"

    let john = { name: "John" };

    // for every user, let's store their visits count
    let visitsCountMap = new Map();

    // john is the key for the map
    visitsCountMap.set(john, 123);

    alert( visitsCountMap.get(john) ); // 123

Using objects as keys is one of the most notable and important `Map` features. The same does not count for `Object`. String as a key in `Object` is fine, but we can’t use another `Object` as a key in `Object`.

Let’s try:

<a href="map-set.html#"
<a href="map-set.html#"

    let john = { name: "John" };
    let ben = { name: "Ben" };

    let visitsCountObj = {}; // try to use an object

    visitsCountObj[ben] = 234; // try to use ben object as the key
    visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

    // That's what got written!
    alert( visitsCountObj["[object Object]"] ); // 123

As `visitsCountObj` is an object, it converts all `Object` keys, such as `john` and `ben` above, to same string `"[object Object]"`. Definitely not what we want.

<span class="important__type">How `Map` compares keys</span>

To test keys for equivalence, `Map` uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`. So `NaN` can be used as the key as well.

This algorithm can’t be changed or customized.

<span class="important__type">Chaining</span>

Every `map.set` call returns the map itself, so we can “chain” the calls:

    map.set('1', 'str1')
      .set(1, 'num1')
      .set(true, 'bool1');

## <a href="map-set.html#iteration-over-map" id="iteration-over-map" class="main__anchor">Iteration over Map</a>

For looping over a `map`, there are 3 methods:

- `map.keys()` – returns an iterable for keys,
- `map.values()` – returns an iterable for values,
- `map.entries()` – returns an iterable for entries `[key, value]`, it’s used by default in `for..of`.

For instance:

<a href="map-set.html#"
<a href="map-set.html#"

    let recipeMap = new Map([
      ['cucumber', 500],
      ['tomatoes', 350],
      ['onion',    50]
    ]);

    // iterate over keys (vegetables)
    for (let vegetable of recipeMap.keys()) {
      alert(vegetable); // cucumber, tomatoes, onion
    }

    // iterate over values (amounts)
    for (let amount of recipeMap.values()) {
      alert(amount); // 500, 350, 50
    }

    // iterate over [key, value] entries
    for (let entry of recipeMap) { // the same as of recipeMap.entries()
      alert(entry); // cucumber,500 (and so on)
    }

<span class="important__type">The insertion order is used</span>

The iteration goes in the same order as the values were inserted. `Map` preserves this order, unlike a regular `Object`.

Besides that, `Map` has a built-in `forEach` method, similar to `Array`:

    // runs the function for each (key, value) pair
    recipeMap.forEach( (value, key, map) => {
      alert(`${key}: ${value}`); // cucumber: 500 etc
    });

## <a href="map-set.html#object-entries-map-from-object" id="object-entries-map-from-object" class="main__anchor">Object.entries: Map from Object</a>

When a `Map` is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

<a href="map-set.html#"
<a href="map-set.html#"

    // array of [key, value] pairs
    let map = new Map([
      ['1',  'str1'],
      [1,    'num1'],
      [true, 'bool1']
    ]);

    alert( map.get('1') ); // str1

If we have a plain object, and we’d like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) that returns an array of key/value pairs for an object exactly in that format.

So we can create a map from an object like this:

<a href="map-set.html#"
<a href="map-set.html#"

    let obj = {
      name: "John",
      age: 30
    };

    let map = new Map(Object.entries(obj));

    alert( map.get('name') ); // John

Here, `Object.entries` returns the array of key/value pairs: `[ ["name","John"], ["age", 30] ]`. That’s what `Map` needs.

## <a href="map-set.html#object-fromentries-object-from-map" id="object-fromentries-object-from-map" class="main__anchor">Object.fromEntries: Object from Map</a>

We’ve just seen how to create `Map` from a plain object with `Object.entries(obj)`.

There’s `Object.fromEntries` method that does the reverse: given an array of `[key, value]` pairs, it creates an object from them:

<a href="map-set.html#"
<a href="map-set.html#"

    let prices = Object.fromEntries([
      ['banana', 1],
      ['orange', 2],
      ['meat', 4]
    ]);

    // now prices = { banana: 1, orange: 2, meat: 4 }

    alert(prices.orange); // 2

We can use `Object.fromEntries` to get a plain object from `Map`.

E.g. we store the data in a `Map`, but we need to pass it to a 3rd-party code that expects a plain object.

Here we go:

<a href="map-set.html#"
<a href="map-set.html#"

    let map = new Map();
    map.set('banana', 1);
    map.set('orange', 2);
    map.set('meat', 4);

    let obj = Object.fromEntries(map.entries()); // make a plain object (*)

    // done!
    // obj = { banana: 1, orange: 2, meat: 4 }

    alert(obj.orange); // 2

A call to `map.entries()` returns an iterable of key/value pairs, exactly in the right format for `Object.fromEntries`.

We could also make line `(*)` shorter:

    let obj = Object.fromEntries(map); // omit .entries()

That’s the same, because `Object.fromEntries` expects an iterable object as the argument. Not necessarily an array. And the standard iteration for `map` returns same key/value pairs as `map.entries()`. So we get a plain object with same key/values as the `map`.

## <a href="map-set.html#set" id="set" class="main__anchor">Set</a>

A `Set` is a special type collection – “set of values” (without keys), where each value may occur only once.

Its main methods are:

- `new Set(iterable)` – creates the set, and if an `iterable` object is provided (usually an array), copies values from it into the set.
- `set.add(value)` – adds a value, returns the set itself.
- `set.delete(value)` – removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` – returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` – removes everything from the set.
- `set.size` – is the elements count.

The main feature is that repeated calls of `set.add(value)` with the same value don’t do anything. That’s the reason why each value appears in a `Set` only once.

For example, we have visitors coming, and we’d like to remember everyone. But repeated visits should not lead to duplicates. A visitor must be “counted” only once.

`Set` is just the right thing for that:

<a href="map-set.html#"
<a href="map-set.html#"

    let set = new Set();

    let john = { name: "John" };
    let pete = { name: "Pete" };
    let mary = { name: "Mary" };

    // visits, some users come multiple times
    set.add(john);
    set.add(pete);
    set.add(mary);
    set.add(john);
    set.add(mary);

    // set keeps only unique values
    alert( set.size ); // 3

    for (let user of set) {
      alert(user.name); // John (then Pete and Mary)
    }

The alternative to `Set` could be an array of users, and the code to check for duplicates on every insertion using [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.

## <a href="map-set.html#iteration-over-set" id="iteration-over-set" class="main__anchor">Iteration over Set</a>

We can loop over a set either with `for..of` or using `forEach`:

<a href="map-set.html#"
<a href="map-set.html#"

    let set = new Set(["oranges", "apples", "bananas"]);

    for (let value of set) alert(value);

    // the same with forEach:
    set.forEach((value, valueAgain, set) => {
      alert(value);
    });

Note the funny thing. The callback function passed in `forEach` has 3 arguments: a `value`, then _the same value_ `valueAgain`, and then the target object. Indeed, the same value appears in the arguments twice.

That’s for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But may help to replace `Map` with `Set` in certain cases with ease, and vice versa.

The same methods `Map` has for iterators are also supported:

- `set.keys()` – returns an iterable object for values,
- `set.values()` – same as `set.keys()`, for compatibility with `Map`,
- `set.entries()` – returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.

## <a href="map-set.html#summary" id="summary" class="main__anchor">Summary</a>

`Map` – is a collection of keyed values.

Methods and properties:

- `new Map([iterable])` – creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- `map.set(key, value)` – stores the value by the key, returns the map itself.
- `map.get(key)` – returns the value by the key, `undefined` if `key` doesn’t exist in map.
- `map.has(key)` – returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` – removes the value by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- `map.clear()` – removes everything from the map.
- `map.size` – returns the current element count.

The differences from a regular `Object`:

- Any keys, objects can be keys.
- Additional convenient methods, the `size` property.

`Set` – is a collection of unique values.

Methods and properties:

- `new Set([iterable])` – creates the set, with optional `iterable` (e.g. array) of values for initialization.
- `set.add(value)` – adds a value (does nothing if `value` exists), returns the set itself.
- `set.delete(value)` – removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` – returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` – removes everything from the set.
- `set.size` – is the elements count.

Iteration over `Map` and `Set` is always in the insertion order, so we can’t say that these collections are unordered, but we can’t reorder elements or directly get an element by its number.

## <a href="map-set.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="map-set.html#filter-unique-array-members" id="filter-unique-array-members" class="main__anchor">Filter unique array members</a>

<a href="task/array-unique-map.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Let `arr` be an array.

Create a function `unique(arr)` that should return an array with unique items of `arr`.

For instance:

    function unique(arr) {
      /* your code */
    }

    let values = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    alert( unique(values) ); // Hare, Krishna, :-O

P.S. Here strings are used, but can be values of any type.

P.P.S. Use `Set` to store unique values.

[Open a sandbox with tests.](https://plnkr.co/edit/bnR28ae4ErRl45XQ?p=preview)

solution

    function unique(arr) {
      return Array.from(new Set(arr));
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/4pQARSNmQTlDKMgI?p=preview)

### <a href="map-set.html#filter-anagrams" id="filter-anagrams" class="main__anchor">Filter anagrams</a>

<a href="task/filter-anagrams.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

[Anagrams](https://en.wikipedia.org/wiki/Anagram) are words that have the same number of same letters, but in different order.

For instance:

    nap - pan
    ear - are - era
    cheaters - hectares - teachers

Write a function `aclean(arr)` that returns an array cleaned from anagrams.

For instance:

    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"

From every anagram group should remain only one word, no matter which one.

[Open a sandbox with tests.](https://plnkr.co/edit/ZHonRzFbNMH8iQi6?p=preview)

solution

To find all anagrams, let’s split every word to letters and sort them. When letter-sorted, all anagrams are same.

For instance:

    nap, pan -> anp
    ear, era, are -> aer
    cheaters, hectares, teachers -> aceehrst
    ...

We’ll use the letter-sorted variants as map keys to store only one value per each key:

<a href="map-set.html#"
<a href="map-set.html#"

    function aclean(arr) {
      let map = new Map();

      for (let word of arr) {
        // split the word by letters, sort them and join back
        let sorted = word.toLowerCase().split('').sort().join(''); // (*)
        map.set(sorted, word);
      }

      return Array.from(map.values());
    }

    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    alert( aclean(arr) );

Letter-sorting is done by the chain of calls in the line `(*)`.

For convenience let’s split it into multiple lines:

    let sorted = word // PAN
      .toLowerCase() // pan
      .split('') // ['p','a','n']
      .sort() // ['a','n','p']
      .join(''); // anp

Two different words `'PAN'` and `'nap'` receive the same letter-sorted form `'anp'`.

The next line put the word into the map:

    map.set(sorted, word);

If we ever meet a word the same letter-sorted form again, then it would overwrite the previous value with the same key in the map. So we’ll always have at maximum one word per letter-form.

At the end `Array.from(map.values())` takes an iterable over map values (we don’t need keys in the result) and returns an array of them.

Here we could also use a plain object instead of the `Map`, because keys are strings.

That’s how the solution can look:

<a href="map-set.html#"
<a href="map-set.html#"

    function aclean(arr) {
      let obj = {};

      for (let i = 0; i < arr.length; i++) {
        let sorted = arr[i].toLowerCase().split("").sort().join("");
        obj[sorted] = arr[i];
      }

      return Object.values(obj);
    }

    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    alert( aclean(arr) );

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/RvzgJ479VAmbVeTQ?p=preview)

### <a href="map-set.html#iterable-keys" id="iterable-keys" class="main__anchor">Iterable keys</a>

<a href="task/iterable-keys.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We’d like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.

But that doesn’t work:

<a href="map-set.html#"
<a href="map-set.html#"

    let map = new Map();

    map.set("name", "John");

    let keys = map.keys();

    // Error: keys.push is not a function
    keys.push("more");

Why? How can we fix the code to make `keys.push` work?

solution

That’s because `map.keys()` returns an iterable, but not an array.

We can convert it into an array using `Array.from`:

<a href="map-set.html#"
<a href="map-set.html#"

    let map = new Map();

    map.set("name", "John");

    let keys = Array.from(map.keys());

    keys.push("more");

    alert(keys); // name, more

<a href="iterable.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="weakmap-weakset.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmap-set" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmap-set" </a>

<a href="tutorial/map.html" class="map">

## <a href="map-set.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="map-set.html#map" class="sidebar__link">Map</a>
- <a href="map-set.html#iteration-over-map" class="sidebar__link">Iteration over Map</a>
- <a href="map-set.html#object-entries-map-from-object" class="sidebar__link">Object.entries: Map from Object</a>
- <a href="map-set.html#object-fromentries-object-from-map" class="sidebar__link">Object.fromEntries: Object from Map</a>
- <a href="map-set.html#set" class="sidebar__link">Set</a>
- <a href="map-set.html#iteration-over-set" class="sidebar__link">Iteration over Set</a>
- <a href="map-set.html#summary" class="sidebar__link">Summary</a>

- <a href="map-set.html#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="map-set.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmap-set" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmap-set" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/07-map-set" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
