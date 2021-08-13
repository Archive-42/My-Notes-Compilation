EN

- <a href="https://ar.javascript.info/instanceof"
- <a href="instanceof.html"
- <a href="https://es.javascript.info/instanceof"
- <a href="https://fr.javascript.info/instanceof"
- instanceof"
  instanceof"

<!-- -->

- /instanceof"
- <a href=instanceof"
- <a href="https://tr.javascript.info/instanceof"
- <a href="https://zh.javascript.info/instanceof"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Finstanceof" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Finstanceof" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="classes.html" Classes</span></a></span>

29th October 2020

# Class checking: "instanceof"

The `instanceof` operator allows to check whether an object belongs to a certain class. It also takes inheritance into account.

Such a check may be necessary in many cases. For example, it can be used for building a _polymorphic_ function, the one that treats arguments differently depending on their type.

## <a href="instanceof.html#ref-instanceof" id="ref-instanceof" class="main__anchor">The instanceof operator</a>

The syntax is:

    obj instanceof Class

It returns `true` if `obj` belongs to the `Class` or a class inheriting from it.

For instance:

<a href="instanceof.html#"
<a href="instanceof.html#"

    class Rabbit {}
    let rabbit = new Rabbit();

    // is it an object of Rabbit class?
    alert( rabbit instanceof Rabbit ); // true

It also works with constructor functions:

<a href="instanceof.html#"
<a href="instanceof.html#"

    // instead of class
    function Rabbit() {}

    alert( new Rabbit() instanceof Rabbit ); // true

…And with built-in classes like `Array`:

<a href="instanceof.html#"
<a href="instanceof.html#"

    let arr = [1, 2, 3];
    alert( arr instanceof Array ); // true
    alert( arr instanceof Object ); // true

Please note that `arr` also belongs to the `Object` class. That’s because `Array` prototypically inherits from `Object`.

Normally, `instanceof` examines the prototype chain for the check. We can also set a custom logic in the static method `Symbol.hasInstance`.

The algorithm of `obj instanceof Class` works roughly as follows:

1.  If there’s a static method `Symbol.hasInstance`, then just call it: `Class[Symbol.hasInstance](obj)`. It should return either `true` or `false`, and we’re done. That’s how we can customize the behavior of `instanceof`.

    For example:

    <a href="instanceof.html#"
    <a href="instanceof.html#"

        // setup instanceOf check that assumes that
        // anything with canEat property is an animal
        class Animal {
          static [Symbol.hasInstance](obj) {
            if (obj.canEat) return true;
          }
        }

        let obj = { canEat: true };

        alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called

2.  Most classes do not have `Symbol.hasInstance`. In that case, the standard logic is used: `obj instanceOf Class` checks whether `Class.prototype` is equal to one of the prototypes in the `obj` prototype chain.

    In other words, compare one after another:

        obj.__proto__ === Class.prototype?
        obj.__proto__.__proto__ === Class.prototype?
        obj.__proto__.__proto__.__proto__ === Class.prototype?
        ...
        // if any answer is true, return true
        // otherwise, if we reached the end of the chain, return false

    In the example above `rabbit.__proto__ === Rabbit.prototype`, so that gives the answer immediately.

    In the case of an inheritance, the match will be at the second step:

    <a href="instanceof.html#"
    <a href="instanceof.html#"

        class Animal {}
        class Rabbit extends Animal {}

        let rabbit = new Rabbit();
        alert(rabbit instanceof Animal); // true

        // rabbit.__proto__ === Rabbit.prototype
        // rabbit.__proto__.__proto__ === Animal.prototype (match!)

Here’s the illustration of what `rabbit instanceof Animal` compares with `Animal.prototype`:

<figure><img src="article/instanceof/instanceof.svg" width="509" height="435" /></figure>By the way, there’s also a method [objA.isPrototypeOf(objB)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object/isPrototypeOf), that returns `true` if `objA` is somewhere in the chain of prototypes for `objB`. So the test of `obj instanceof Class` can be rephrased as `Class.prototype.isPrototypeOf(obj)`.

It’s funny, but the `Class` constructor itself does not participate in the check! Only the chain of prototypes and `Class.prototype` matters.

That can lead to interesting consequences when a `prototype` property is changed after the object is created.

Like here:

<a href="instanceof.html#"
<a href="instanceof.html#"

    function Rabbit() {}
    let rabbit = new Rabbit();

    // changed the prototype
    Rabbit.prototype = {};

    // ...not a rabbit any more!
    alert( rabbit instanceof Rabbit ); // false

## <a href="instanceof.html#bonus-object-prototype-tostring-for-the-type" id="bonus-object-prototype-tostring-for-the-type" class="main__anchor">Bonus: Object.prototype.toString for the type</a>

We already know that plain objects are converted to string as `[object Object]`:

<a href="instanceof.html#"
<a href="instanceof.html#"

    let obj = {};

    alert(obj); // [object Object]
    alert(obj.toString()); // the same

That’s their implementation of `toString`. But there’s a hidden feature that makes `toString` actually much more powerful than that. We can use it as an extended `typeof` and an alternative for `instanceof`.

Sounds strange? Indeed. Let’s demystify.

By [specification](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), the built-in `toString` can be extracted from the object and executed in the context of any other value. And its result depends on that value.

- For a number, it will be `[object Number]`
- For a boolean, it will be `[object Boolean]`
- For `null`: `[object Null]`
- For `undefined`: `[object Undefined]`
- For arrays: `[object Array]`
- …etc (customizable).

Let’s demonstrate:

<a href="instanceof.html#"
<a href="instanceof.html#"

    // copy toString method into a variable for convenience
    let objectToString = Object.prototype.toString;

    // what type is this?
    let arr = [];

    alert( objectToString.call(arr) ); // [object Array]

Here we used [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/function/call) as described in the chapter [Decorators and forwarding, call/apply](call-apply-decorators.html) to execute the function `objectToString` in the context `this=arr`.

Internally, the `toString` algorithm examines `this` and returns the corresponding result. More examples:

<a href="instanceof.html#"
<a href="instanceof.html#"

    let s = Object.prototype.toString;

    alert( s.call(123) ); // [object Number]
    alert( s.call(null) ); // [object Null]
    alert( s.call(alert) ); // [object Function]

### <a href="instanceof.html#symbol-tostringtag" id="symbol-tostringtag" class="main__anchor">Symbol.toStringTag</a>

The behavior of Object `toString` can be customized using a special object property `Symbol.toStringTag`.

For instance:

<a href="instanceof.html#"
<a href="instanceof.html#"

    let user = {
      [Symbol.toStringTag]: "User"
    };

    alert( {}.toString.call(user) ); // [object User]

For most environment-specific objects, there is such a property. Here are some browser specific examples:

<a href="instanceof.html#"
<a href="instanceof.html#"

    // toStringTag for the environment-specific object and class:
    alert( window[Symbol.toStringTag]); // Window
    alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

    alert( {}.toString.call(window) ); // [object Window]
    alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]

As you can see, the result is exactly `Symbol.toStringTag` (if exists), wrapped into `[object ...]`.

At the end we have “typeof on steroids” that not only works for primitive data types, but also for built-in objects and even can be customized.

We can use `{}.toString.call` instead of `instanceof` for built-in objects when we want to get the type as a string rather than just to check.

## <a href="instanceof.html#summary" id="summary" class="main__anchor">Summary</a>

Let’s summarize the type-checking methods that we know:

<table><thead><tr class="header"><th></th><th>works for</th><th>returns</th></tr></thead><tbody><tr class="odd"><td><code>typeof</code></td><td>primitives</td><td>string</td></tr><tr class="even"><td><code>{}.toString</code></td><td>primitives, built-in objects, objects with <code>Symbol.toStringTag</code></td><td>string</td></tr><tr class="odd"><td><code>instanceof</code></td><td>objects</td><td>true/false</td></tr></tbody></table>

As we can see, `{}.toString` is technically a “more advanced” `typeof`.

And `instanceof` operator really shines when we are working with a class hierarchy and want to check for the class taking into account inheritance.

## <a href="instanceof.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="instanceof.html#strange-instanceof" id="strange-instanceof" class="main__anchor">Strange instanceof</a>

<a href="task/strange-instanceof.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.

<a href="instanceof.html#"
<a href="instanceof.html#"

    function A() {}
    function B() {}

    A.prototype = B.prototype = {};

    let a = new A();

    alert( a instanceof B ); // true

solution

Yeah, looks strange indeed.

But `instanceof` does not care about the function, but rather about its `prototype`, that it matches against the prototype chain.

And here `a.__proto__ == B.prototype`, so `instanceof` returns `true`.

So, by the logic of `instanceof`, the `prototype` actually defines the type, not the constructor function.

<a href="extend-natives.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="mixins.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Finstanceof" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Finstanceof" </a>

<a href="tutorial/map.html" class="map">

## <a href="instanceof.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="classes.html" class="sidebar__link">Classes</a>

#### Lesson navigation

- <a href="instanceof.html#ref-instanceof" class="sidebar__link">The instanceof operator</a>
- <a href="instanceof.html#bonus-object-prototype-tostring-for-the-type" class="sidebar__link">Bonus: Object.prototype.toString for the type</a>
- <a href="instanceof.html#summary" class="sidebar__link">Summary</a>

- <a href="instanceof.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="instanceof.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Finstanceof" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Finstanceof" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/09-classes/06-instanceof" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
