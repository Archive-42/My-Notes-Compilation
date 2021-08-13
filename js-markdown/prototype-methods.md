EN

- <a href="https://ar.javascript.info/prototype-methods"
- <a href="prototype-methods.html"
- <a href="https://es.javascript.info/prototype-methods"
- <a href="https://fr.javascript.info/prototype-methods"
- <a href="https://it.javascript.info/prototype-methods"
  prototype-methods"

<!-- -->

- <a href="https://ko.javascript.info/prototype-methods"
- <a href=prototype-methods"
- <a href="https://tr.javascript.info/prototype-methods"
- <a href="https://zh.javascript.info/prototype-methods"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fprototype-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprototype-methods" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="prototypes.html" Prototypes, inheritance</span></a></span>

25th October 2020

# Prototype methods, objects without \_\_proto\_\_

In the first chapter of this section, we mentioned that there are modern methods to setup a prototype.

The `__proto__` is considered outdated and somewhat deprecated (in browser-only part of the JavaScript standard).

The modern methods are:

- [Object.create(proto, \[descriptors\])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) – creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
- [Object.getPrototypeOf(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) – returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) – sets the `[[Prototype]]` of `obj` to `proto`.

These should be used instead of `__proto__`.

For instance:

<a href="prototype-methods.html#"
<a href="prototype-methods.html#"

    let animal = {
      eats: true
    };

    // create a new object with animal as a prototype
    let rabbit = Object.create(animal);

    alert(rabbit.eats); // true

    alert(Object.getPrototypeOf(rabbit) === animal); // true

    Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}

`Object.create` has an optional second argument: property descriptors. We can provide additional properties to the new object there, like this:

<a href="prototype-methods.html#"
<a href="prototype-methods.html#"

    let animal = {
      eats: true
    };

    let rabbit = Object.create(animal, {
      jumps: {
        value: true
      }
    });

    alert(rabbit.jumps); // true

The descriptors are in the same format as described in the chapter [Property flags and descriptors](property-descriptors.html).

We can use `Object.create` to perform an object cloning more powerful than copying properties in `for..in`:

    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

This call makes a truly exact copy of `obj`, including all properties: enumerable and non-enumerable, data properties and setters/getters – everything, and with the right `[[Prototype]]`.

## <a href="prototype-methods.html#brief-history" id="brief-history" class="main__anchor">Brief history</a>

If we count all the ways to manage `[[Prototype]]`, there are a lot! Many ways to do the same thing!

Why?

That’s for historical reasons.

- The `"prototype"` property of a constructor function has worked since very ancient times.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. So browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.

As of now we have all these ways at our disposal.

Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`? That’s an interesting question, requiring us to understand why `__proto__` is bad. Read on to get the answer.

<span class="important__type">Don’t change `[[Prototype]]` on existing objects if speed matters</span>

Technically, we can get/set `[[Prototype]]` at any time. But usually we only set it once at the object creation time and don’t modify it anymore: `rabbit` inherits from `animal`, and that is not going to change.

And JavaScript engines are highly optimized for this. Changing a prototype “on-the-fly” with `Object.setPrototypeOf` or `obj.__proto__=` is a very slow operation as it breaks internal optimizations for object property access operations. So avoid it unless you know what you’re doing, or JavaScript speed totally doesn’t matter for you.

## <a href="prototype-methods.html#very-plain" id="very-plain" class="main__anchor">"Very plain" objects</a>

As we know, objects can be used as associative arrays to store key/value pairs.

…But if we try to store _user-provided_ keys in it (for instance, a user-entered dictionary), we can see an interesting glitch: all keys work fine except `"__proto__"`.

Check out the example:

<a href="prototype-methods.html#"
<a href="prototype-methods.html#"

    let obj = {};

    let key = prompt("What's the key?", "__proto__");
    obj[key] = "some value";

    alert(obj[key]); // [object Object], not "some value"!

Here, if the user types in `__proto__`, the assignment is ignored!

That shouldn’t surprise us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype.

But we didn’t _intend_ to implement such behavior, right? We want to store key/value pairs, and the key named `"__proto__"` was not properly saved. So that’s a bug!

Here the consequences are not terrible. But in other cases we may be assigning object values, and then the prototype may indeed be changed. As a result, the execution will go wrong in totally unexpected ways.

What’s worse – usually developers do not think about such possibility at all. That makes such bugs hard to notice and even turn them into vulnerabilities, especially when JavaScript is used on server-side.

Unexpected things also may happen when assigning to `toString`, which is a function by default, and to other built-in methods.

How can we avoid this problem?

First, we can just switch to using `Map` for storage instead of plain objects, then everything’s fine.

But `Object` can also serve us well here, because language creators gave thought to that problem long ago.

`__proto__` is not a property of an object, but an accessor property of `Object.prototype`:

<figure><img src="article/prototype-methods/object-prototype-2.svg" width="449" height="190" /></figure>So, if `obj.__proto__` is read or set, the corresponding getter/setter is called from its prototype, and it gets/sets `[[Prototype]]`.

As it was said in the beginning of this tutorial section: `__proto__` is a way to access `[[Prototype]]`, it is not `[[Prototype]]` itself.

Now, if we intend to use an object as an associative array and be free of such problems, we can do it with a little trick:

<a href="prototype-methods.html#"
<a href="prototype-methods.html#"

    let obj = Object.create(null);

    let key = prompt("What's the key?", "__proto__");
    obj[key] = "some value";

    alert(obj[key]); // "some value"

`Object.create(null)` creates an empty object without a prototype (`[[Prototype]]` is `null`):

<figure><img src="article/prototype-methods/object-prototype-null.svg" width="194" height="121" /></figure>So, there is no inherited getter/setter for `__proto__`. Now it is processed as a regular data property, so the example above works right.

We can call such objects “very plain” or “pure dictionary” objects, because they are even simpler than the regular plain object `{...}`.

A downside is that such objects lack any built-in object methods, e.g. `toString`:

<a href="prototype-methods.html#"
<a href="prototype-methods.html#"

    let obj = Object.create(null);

    alert(obj); // Error (no toString)

…But that’s usually fine for associative arrays.

Note that most object-related methods are `Object.something(...)`, like `Object.keys(obj)` – they are not in the prototype, so they will keep working on such objects:

<a href="prototype-methods.html#"
<a href="prototype-methods.html#"

    let chineseDictionary = Object.create(null);
    chineseDictionary.hello = "你好";
    chineseDictionary.bye = "再见";

    alert(Object.keys(chineseDictionary)); // hello,bye

## <a href="prototype-methods.html#summary" id="summary" class="main__anchor">Summary</a>

Modern methods to set up and directly access the prototype are:

- [Object.create(proto, \[descriptors\])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) – creates an empty object with a given `proto` as `[[Prototype]]` (can be `null`) and optional property descriptors.
- [Object.getPrototypeOf(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) – returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
- [Object.setPrototypeOf(obj, proto)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) – sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

The built-in `__proto__` getter/setter is unsafe if we’d want to put user-generated keys into an object. Just because a user may enter `"__proto__"` as the key, and there’ll be an error, with hopefully light, but generally unpredictable consequences.

So we can either use `Object.create(null)` to create a “very plain” object without `__proto__`, or stick to `Map` objects for that.

Also, `Object.create` provides an easy way to shallow-copy an object with all descriptors:

    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

We also made it clear that `__proto__` is a getter/setter for `[[Prototype]]` and resides in `Object.prototype`, just like other methods.

We can create an object without a prototype by `Object.create(null)`. Such objects are used as “pure dictionaries”, they have no issues with `"__proto__"` as the key.

Other methods:

- [Object.keys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) / [Object.values(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) / [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) – returns an array of enumerable own string property names/values/key-value pairs.
- [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) – returns an array of all own symbolic keys.
- [Object.getOwnPropertyNames(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) – returns an array of all own string keys.
- [Reflect.ownKeys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) – returns an array of all own keys.
- [obj.hasOwnProperty(key)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty): returns `true` if `obj` has its own (not inherited) key named `key`.

All methods that return object properties (like `Object.keys` and others) – return “own” properties. If we want inherited ones, we can use `for..in`.

## <a href="prototype-methods.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="prototype-methods.html#add-tostring-to-the-dictionary" id="add-tostring-to-the-dictionary" class="main__anchor">Add toString to the dictionary</a>

<a href="task/dictionary-tostring.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s an object `dictionary`, created as `Object.create(null)`, to store any `key/value` pairs.

Add method `dictionary.toString()` into it, that should return a comma-delimited list of keys. Your `toString` should not show up in `for..in` over the object.

Here’s how it should work:

    let dictionary = Object.create(null);

    // your code to add dictionary.toString method

    // add some data
    dictionary.apple = "Apple";
    dictionary.__proto__ = "test"; // __proto__ is a regular property key here

    // only apple and __proto__ are in the loop
    for(let key in dictionary) {
      alert(key); // "apple", then "__proto__"
    }

    // your toString in action
    alert(dictionary); // "apple,__proto__"

solution

The method can take all enumerable keys using `Object.keys` and output their list.

To make `toString` non-enumerable, let’s define it using a property descriptor. The syntax of `Object.create` allows us to provide an object with property descriptors as the second argument.

<a href="prototype-methods.html#"
<a href="prototype-methods.html#"

    let dictionary = Object.create(null, {
      toString: { // define toString property
        value() { // the value is a function
          return Object.keys(this).join();
        }
      }
    });

    dictionary.apple = "Apple";
    dictionary.__proto__ = "test";

    // apple and __proto__ is in the loop
    for(let key in dictionary) {
      alert(key); // "apple", then "__proto__"
    }

    // comma-separated list of properties by toString
    alert(dictionary); // "apple,__proto__"

When we create a property using a descriptor, its flags are `false` by default. So in the code above, `dictionary.toString` is non-enumerable.

See the the chapter [Property flags and descriptors](property-descriptors.html) for review.

### <a href="prototype-methods.html#the-difference-between-calls" id="the-difference-between-calls" class="main__anchor">The difference between calls</a>

<a href="task/compare-calls.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Let’s create a new `rabbit` object:

    function Rabbit(name) {
      this.name = name;
    }
    Rabbit.prototype.sayHi = function() {
      alert(this.name);
    };

    let rabbit = new Rabbit("Rabbit");

These calls do the same thing or not?

    rabbit.sayHi();
    Rabbit.prototype.sayHi();
    Object.getPrototypeOf(rabbit).sayHi();
    rabbit.__proto__.sayHi();

solution

The first call has `this == rabbit`, the other ones have `this` equal to `Rabbit.prototype`, because it’s actually the object before the dot.

So only the first call shows `Rabbit`, other ones show `undefined`:

<a href="prototype-methods.html#"
<a href="prototype-methods.html#"

    function Rabbit(name) {
      this.name = name;
    }
    Rabbit.prototype.sayHi = function() {
      alert( this.name );
    }

    let rabbit = new Rabbit("Rabbit");

    rabbit.sayHi();                        // Rabbit
    Rabbit.prototype.sayHi();              // undefined
    Object.getPrototypeOf(rabbit).sayHi(); // undefined
    rabbit.__proto__.sayHi();              // undefined

<a href="native-prototypes.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="classes.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fprototype-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprototype-methods" </a>

<a href="tutorial/map.html" class="map">

## <a href="prototype-methods.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="prototypes.html" class="sidebar__link">Prototypes, inheritance</a>

#### Lesson navigation

- <a href="prototype-methods.html#brief-history" class="sidebar__link">Brief history</a>
- <a href="prototype-methods.html#very-plain" class="sidebar__link">"Very plain" objects</a>
- <a href="prototype-methods.html#summary" class="sidebar__link">Summary</a>

- <a href="prototype-methods.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="prototype-methods.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fprototype-methods" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprototype-methods" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/08-prototypes/04-prototype-methods" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
