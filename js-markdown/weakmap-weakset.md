EN

- <a href="https://ar.javascript.info/weakmap-weakset"
- <a href="weakmap-weakset.html"
- <a href="https://es.javascript.info/weakmap-weakset"
- <a href="https://fr.javascript.info/weakmap-weakset"
- weakmap-weakset"
  weakmap-weakset"

<!-- -->

- /weakmap-weakset"
- <a href=weakmap-weakset"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/weakmap-weakset"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fweakmap-weakset" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fweakmap-weakset" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

12th April 2021

# WeakMap and WeakSet

As we know from the chapter [Garbage collection](garbage-collection.html), JavaScript engine keeps a value in memory while it is “reachable” and can potentially be used.

For instance:

    let john = { name: "John" };

    // the object can be accessed, john is the reference to it

    // overwrite the reference
    john = null;

    // the object will be removed from memory

Usually, properties of an object or elements of an array or another data structure are considered reachable and kept in memory while that data structure is in memory.

For instance, if we put an object into an array, then while the array is alive, the object will be alive as well, even if there are no other references to it.

Like this:

    let john = { name: "John" };

    let array = [ john ];

    john = null; // overwrite the reference

    // the object previously referenced by john is stored inside the array
    // therefore it won't be garbage-collected
    // we can get it as array[0]

Similar to that, if we use an object as the key in a regular `Map`, then while the `Map` exists, that object exists as well. It occupies memory and may not be garbage collected.

For instance:

    let john = { name: "John" };

    let map = new Map();
    map.set(john, "...");

    john = null; // overwrite the reference

    // john is stored inside the map,
    // we can get it by using map.keys()

`WeakMap` is fundamentally different in this aspect. It doesn’t prevent garbage-collection of key objects.

Let’s see what it means on examples.

## <a href="weakmap-weakset.html#weakmap" id="weakmap" class="main__anchor">WeakMap</a>

The first difference between `Map` and `WeakMap` is that keys must be objects, not primitive values:

<a href="weakmap-weakset.html#"
<a href="weakmap-weakset.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let weakMap = new WeakMap();

    let obj = {};

    weakMap.set(obj, "ok"); // works fine (object key)

    // can't use a string as the key
    weakMap.set("test", "Whoops"); // Error, because "test" is not an object

Now, if we use an object as the key in it, and there are no other references to that object – it will be removed from memory (and from the map) automatically.

    let john = { name: "John" };

    let weakMap = new WeakMap();
    weakMap.set(john, "...");

    john = null; // overwrite the reference

    // john is removed from memory!

Compare it with the regular `Map` example above. Now if `john` only exists as the key of `WeakMap` – it will be automatically deleted from the map (and memory).

`WeakMap` does not support iteration and methods `keys()`, `values()`, `entries()`, so there’s no way to get all keys or values from it.

`WeakMap` has only the following methods:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Why such a limitation? That’s for technical reasons. If an object has lost all other references (like `john` in the code above), then it is to be garbage-collected automatically. But technically it’s not exactly specified _when the cleanup happens_.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically, the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

Now, where do we need such a data structure?

## <a href="weakmap-weakset.html#use-case-additional-data" id="use-case-additional-data" class="main__anchor">Use case: additional data</a>

The main area of application for `WeakMap` is an _additional data storage_.

If we’re working with an object that “belongs” to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive – then `WeakMap` is exactly what’s needed.

We put the data to a `WeakMap`, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

    weakMap.set(john, "secret documents");
    // if john dies, secret documents will be destroyed automatically

Let’s look at an example.

For instance, we have code that keeps a visit count for users. The information is stored in a map: a user object is the key and the visit count is the value. When a user leaves (its object gets garbage collected), we don’t want to store their visit count anymore.

Here’s an example of a counting function with `Map`:

    // 📁 visitsCount.js
    let visitsCountMap = new Map(); // map: user => visits count

    // increase the visits count
    function countUser(user) {
      let count = visitsCountMap.get(user) || 0;
      visitsCountMap.set(user, count + 1);
    }

And here’s another part of the code, maybe another file using it:

    // 📁 main.js
    let john = { name: "John" };

    countUser(john); // count his visits

    // later john leaves us
    john = null;

Now, `john` object should be garbage collected, but remains in memory, as it’s a key in `visitsCountMap`.

We need to clean `visitsCountMap` when we remove users, otherwise it will grow in memory indefinitely. Such cleaning can become a tedious task in complex architectures.

We can avoid it by switching to `WeakMap` instead:

    // 📁 visitsCount.js
    let visitsCountMap = new WeakMap(); // weakmap: user => visits count

    // increase the visits count
    function countUser(user) {
      let count = visitsCountMap.get(user) || 0;
      visitsCountMap.set(user, count + 1);
    }

Now we don’t have to clean `visitsCountMap`. After `john` object becomes unreachable, by all means except as a key of `WeakMap`, it gets removed from memory, along with the information by that key from `WeakMap`.

## <a href="weakmap-weakset.html#use-case-caching" id="use-case-caching" class="main__anchor">Use case: caching</a>

Another common example is caching. We can store (“cache”) results from a function, so that future calls on the same object can reuse it.

To achieve that, we can use `Map` (not optimal scenario):

<a href="weakmap-weakset.html#"
<a href="weakmap-weakset.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // 📁 cache.js
    let cache = new Map();

    // calculate and remember the result
    function process(obj) {
      if (!cache.has(obj)) {
        let result = /* calculations of the result for */ obj;

        cache.set(obj, result);
      }

      return cache.get(obj);
    }

    // Now we use process() in another file:

    // 📁 main.js
    let obj = {/* let's say we have an object */};

    let result1 = process(obj); // calculated

    // ...later, from another place of the code...
    let result2 = process(obj); // remembered result taken from cache

    // ...later, when the object is not needed any more:
    obj = null;

    alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)

For multiple calls of `process(obj)` with the same object, it only calculates the result the first time, and then just takes it from `cache`. The downside is that we need to clean `cache` when the object is not needed any more.

If we replace `Map` with `WeakMap`, then this problem disappears. The cached result will be removed from memory automatically after the object gets garbage collected.

<a href="weakmap-weakset.html#"
<a href="weakmap-weakset.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // 📁 cache.js
    let cache = new WeakMap();

    // calculate and remember the result
    function process(obj) {
      if (!cache.has(obj)) {
        let result = /* calculate the result for */ obj;

        cache.set(obj, result);
      }

      return cache.get(obj);
    }

    // 📁 main.js
    let obj = {/* some object */};

    let result1 = process(obj);
    let result2 = process(obj);

    // ...later, when the object is not needed any more:
    obj = null;

    // Can't get cache.size, as it's a WeakMap,
    // but it's 0 or soon be 0
    // When obj gets garbage collected, cached data will be removed as well

## <a href="weakmap-weakset.html#weakset" id="weakset" class="main__anchor">WeakSet</a>

`WeakSet` behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports `add`, `has` and `delete`, but not `size`, `keys()` and no iterations.

Being “weak”, it also serves as additional storage. But not for arbitrary data, rather for “yes/no” facts. A membership in `WeakSet` may mean something about the object.

For instance, we can add users to `WeakSet` to keep track of those who visited our site:

<a href="weakmap-weakset.html#"
<a href="weakmap-weakset.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let visitedSet = new WeakSet();

    let john = { name: "John" };
    let pete = { name: "Pete" };
    let mary = { name: "Mary" };

    visitedSet.add(john); // John visited us
    visitedSet.add(pete); // Then Pete
    visitedSet.add(john); // John again

    // visitedSet has 2 users now

    // check if John visited?
    alert(visitedSet.has(john)); // true

    // check if Mary visited?
    alert(visitedSet.has(mary)); // false

    john = null;

    // visitedSet will be cleaned automatically

The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and the inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job – be an “additional” storage of data for objects which are stored/managed at another place.

## <a href="weakmap-weakset.html#summary" id="summary" class="main__anchor">Summary</a>

`WeakMap` is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

`WeakSet` is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.

Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.

That comes at the cost of not having support for `clear`, `size`, `keys`, `values`…

`WeakMap` and `WeakSet` are used as “secondary” data structures in addition to the “primary” object storage. Once the object is removed from the primary storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.

## <a href="weakmap-weakset.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="weakmap-weakset.html#store-unread-flags" id="store-unread-flags" class="main__anchor">Store "unread" flags</a>

<a href="task/recipients-read.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s an array of messages:

    let messages = [
      {text: "Hello", from: "John"},
      {text: "How goes?", from: "John"},
      {text: "See you soon", from: "Alice"}
    ];

Your code can access it, but the messages are managed by someone else’s code. New messages are added, old ones are removed regularly by that code, and you don’t know the exact moments when it happens.

Now, which data structure could you use to store information about whether the message “has been read”? The structure must be well-suited to give the answer “was it read?” for the given message object.

P.S. When a message is removed from `messages`, it should disappear from your structure as well.

P.P.S. We shouldn’t modify message objects, add our properties to them. As they are managed by someone else’s code, that may lead to bad consequences.

solution

Let’s store read messages in `WeakSet`:

<a href="weakmap-weakset.html#"
<a href="weakmap-weakset.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let messages = [
      {text: "Hello", from: "John"},
      {text: "How goes?", from: "John"},
      {text: "See you soon", from: "Alice"}
    ];

    let readMessages = new WeakSet();

    // two messages have been read
    readMessages.add(messages[0]);
    readMessages.add(messages[1]);
    // readMessages has 2 elements

    // ...let's read the first message again!
    readMessages.add(messages[0]);
    // readMessages still has 2 unique elements

    // answer: was the message[0] read?
    alert("Read message 0: " + readMessages.has(messages[0])); // true

    messages.shift();
    // now readMessages has 1 element (technically memory may be cleaned later)

The `WeakSet` allows to store a set of messages and easily check for the existence of a message in it.

It cleans up itself automatically. The tradeoff is that we can’t iterate over it, can’t get “all read messages” from it directly. But we can do it by iterating over all messages and filtering those that are in the set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it’s read. As messages objects are managed by another code, that’s generally discouraged, but we can use a symbolic property to avoid conflicts.

Like this:

    // the symbolic property is only known to our code
    let isRead = Symbol("isRead");
    messages[0][isRead] = true;

Now third-party code probably won’t see our extra property.

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.

### <a href="weakmap-weakset.html#store-read-dates" id="store-read-dates" class="main__anchor">Store read dates</a>

<a href="task/recipients-when-read.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s an array of messages as in the [previous task](task/recipients-read.html). The situation is similar.

    let messages = [
      {text: "Hello", from: "John"},
      {text: "How goes?", from: "John"},
      {text: "See you soon", from: "Alice"}
    ];

The question now is: which data structure you’d suggest to store the information: “when the message was read?”.

In the previous task we only needed to store the “yes/no” fact. Now we need to store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in `Date` class, that we’ll cover later.

solution

To store a date, we can use `WeakMap`:

    let messages = [
      {text: "Hello", from: "John"},
      {text: "How goes?", from: "John"},
      {text: "See you soon", from: "Alice"}
    ];

    let readMap = new WeakMap();

    readMap.set(messages[0], new Date(2017, 1, 1));
    // Date object we'll study later

<a href="map-set.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="keys-values-entries.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fweakmap-weakset" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fweakmap-weakset" </a>

<a href="tutorial/map.html" class="map">

## <a href="weakmap-weakset.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="weakmap-weakset.html#weakmap" class="sidebar__link">WeakMap</a>
- <a href="weakmap-weakset.html#use-case-additional-data" class="sidebar__link">Use case: additional data</a>
- <a href="weakmap-weakset.html#use-case-caching" class="sidebar__link">Use case: caching</a>
- <a href="weakmap-weakset.html#weakset" class="sidebar__link">WeakSet</a>
- <a href="weakmap-weakset.html#summary" class="sidebar__link">Summary</a>

- <a href="weakmap-weakset.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="weakmap-weakset.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fweakmap-weakset" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fweakmap-weakset" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/08-weakmap-weakset" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
