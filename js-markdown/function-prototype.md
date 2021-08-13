EN

- <a href="https://ar.javascript.info/function-prototype"
- <a href="function-prototype.html"
- <a href="https://es.javascript.info/function-prototype"
- <a href="https://fr.javascript.info/function-prototype"
- function-prototype"
  function-prototype"

<!-- -->

- /function-prototype"
- <a href=function-prototype"
- <a href="https://tr.javascript.info/function-prototype"
- <a href="https://zh.javascript.info/function-prototype"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffunction-prototype" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-prototype" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="prototypes.html" Prototypes, inheritance</span></a></span>

16th May 2021

# F.prototype

Remember, new objects can be created with a constructor function, like `new F()`.

If `F.prototype` is an object, then the `new` operator uses it to set `[[Prototype]]` for the new object.

<span class="important__type">Please note:</span>

JavaScript had prototypal inheritance from the beginning. It was one of the core features of the language.

But in the old times, there was no direct access to it. The only thing that worked reliably was a `"prototype"` property of the constructor function, described in this chapter. So there are many scripts that still use it.

Please note that `F.prototype` here means a regular property named `"prototype"` on `F`. It sounds something similar to the term “prototype”, but here we really mean a regular property with this name.

Here’s the example:

<a href="function-prototype.html#"
<a href="function-prototype.html#"

    let animal = {
      eats: true
    };

    function Rabbit(name) {
      this.name = name;
    }

    Rabbit.prototype = animal;

    let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

    alert( rabbit.eats ); // true

Setting `Rabbit.prototype = animal` literally states the following: "When a `new Rabbit` is created, assign its `[[Prototype]]` to `animal`".

That’s the resulting picture:

<figure><img src="article/function-prototype/proto-constructor-animal-rabbit.svg" width="453" height="160" /></figure>On the picture, `"prototype"` is a horizontal arrow, meaning a regular property, and `[[Prototype]]` is vertical, meaning the inheritance of `rabbit` from `animal`.

<span class="important__type">`F.prototype` only used at `new F` time</span>

`F.prototype` property is only used when `new F` is called, it assigns `[[Prototype]]` of the new object.

If, after the creation, `F.prototype` property changes (`F.prototype = <another object>`), then new objects created by `new F` will have another object as `[[Prototype]]`, but already existing objects keep the old one.

## <a href="function-prototype.html#default-f-prototype-constructor-property" id="default-f-prototype-constructor-property" class="main__anchor">Default F.prototype, constructor property</a>

Every function has the `"prototype"` property even if we don’t supply it.

The default `"prototype"` is an object with the only property `constructor` that points back to the function itself.

Like this:

    function Rabbit() {}

    /* default prototype
    Rabbit.prototype = { constructor: Rabbit };
    */

<figure><img src="article/function-prototype/function-prototype-constructor.svg" width="449" height="73" /></figure>We can check it:

<a href="function-prototype.html#"
<a href="function-prototype.html#"

    function Rabbit() {}
    // by default:
    // Rabbit.prototype = { constructor: Rabbit }

    alert( Rabbit.prototype.constructor == Rabbit ); // true

Naturally, if we do nothing, the `constructor` property is available to all rabbits through `[[Prototype]]`:

<a href="function-prototype.html#"
<a href="function-prototype.html#"

    function Rabbit() {}
    // by default:
    // Rabbit.prototype = { constructor: Rabbit }

    let rabbit = new Rabbit(); // inherits from {constructor: Rabbit}

    alert(rabbit.constructor == Rabbit); // true (from prototype)

<figure><img src="article/function-prototype/rabbit-prototype-constructor.svg" width="460" height="157" /></figure>We can use `constructor` property to create a new object using the same constructor as the existing one.

Like here:

<a href="function-prototype.html#"
<a href="function-prototype.html#"

    function Rabbit(name) {
      this.name = name;
      alert(name);
    }

    let rabbit = new Rabbit("White Rabbit");

    let rabbit2 = new rabbit.constructor("Black Rabbit");

That’s handy when we have an object, don’t know which constructor was used for it (e.g. it comes from a 3rd party library), and we need to create another one of the same kind.

But probably the most important thing about `"constructor"` is that…

**…JavaScript itself does not ensure the right `"constructor"` value.**

Yes, it exists in the default `"prototype"` for functions, but that’s all. What happens with it later – is totally on us.

In particular, if we replace the default prototype as a whole, then there will be no `"constructor"` in it.

For instance:

<a href="function-prototype.html#"
<a href="function-prototype.html#"

    function Rabbit() {}
    Rabbit.prototype = {
      jumps: true
    };

    let rabbit = new Rabbit();
    alert(rabbit.constructor === Rabbit); // false

So, to keep the right `"constructor"` we can choose to add/remove properties to the default `"prototype"` instead of overwriting it as a whole:

    function Rabbit() {}

    // Not overwrite Rabbit.prototype totally
    // just add to it
    Rabbit.prototype.jumps = true
    // the default Rabbit.prototype.constructor is preserved

Or, alternatively, recreate the `constructor` property manually:

    Rabbit.prototype = {
      jumps: true,
      constructor: Rabbit
    };

    // now constructor is also correct, because we added it

## <a href="function-prototype.html#summary" id="summary" class="main__anchor">Summary</a>

In this chapter we briefly described the way of setting a `[[Prototype]]` for objects created via a constructor function. Later we’ll see more advanced programming patterns that rely on it.

Everything is quite simple, just a few notes to make things clear:

- The `F.prototype` property (don’t mistake it for `[[Prototype]]`) sets `[[Prototype]]` of new objects when `new F()` is called.
- The value of `F.prototype` should be either an object or `null`: other values won’t work.
- The `"prototype"` property only has such a special effect when set on a constructor function, and invoked with `new`.

On regular objects the `prototype` is nothing special:

    let user = {
      name: "John",
      prototype: "Bla-bla" // no magic at all
    };

By default all functions have `F.prototype = { constructor: F }`, so we can get the constructor of an object by accessing its `"constructor"` property.

## <a href="function-prototype.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="function-prototype.html#changing-prototype" id="changing-prototype" class="main__anchor">Changing "prototype"</a>

<a href="task/changing-prototype.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In the code below we create `new Rabbit`, and then try to modify its prototype.

In the start, we have this code:

<a href="function-prototype.html#"
<a href="function-prototype.html#"

    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    alert( rabbit.eats ); // true

1.  We added one more string (emphasized). What will `alert` show now?

        function Rabbit() {}
        Rabbit.prototype = {
          eats: true
        };

        let rabbit = new Rabbit();

        Rabbit.prototype = {};

        alert( rabbit.eats ); // ?

2.  …And if the code is like this (replaced one line)?

        function Rabbit() {}
        Rabbit.prototype = {
          eats: true
        };

        let rabbit = new Rabbit();

        Rabbit.prototype.eats = false;

        alert( rabbit.eats ); // ?

3.  And like this (replaced one line)?

        function Rabbit() {}
        Rabbit.prototype = {
          eats: true
        };

        let rabbit = new Rabbit();

        delete rabbit.eats;

        alert( rabbit.eats ); // ?

4.  The last variant:

        function Rabbit() {}
        Rabbit.prototype = {
          eats: true
        };

        let rabbit = new Rabbit();

        delete Rabbit.prototype.eats;

        alert( rabbit.eats ); // ?

solution

Answers:

1.  `true`.

    The assignment to `Rabbit.prototype` sets up `[[Prototype]]` for new objects, but it does not affect the existing ones.

2.  `false`.

    Objects are assigned by reference. The object from `Rabbit.prototype` is not duplicated, it’s still a single object referenced both by `Rabbit.prototype` and by the `[[Prototype]]` of `rabbit`.

    So when we change its content through one reference, it is visible through the other one.

3.  `true`.

    All `delete` operations are applied directly to the object. Here `delete rabbit.eats` tries to remove `eats` property from `rabbit`, but it doesn’t have it. So the operation won’t have any effect.

4.  `undefined`.

    The property `eats` is deleted from the prototype, it doesn’t exist any more.

### <a href="function-prototype.html#create-an-object-with-the-same-constructor" id="create-an-object-with-the-same-constructor" class="main__anchor">Create an object with the same constructor</a>

<a href="task/new-object-same-constructor.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Imagine, we have an arbitrary object `obj`, created by a constructor function – we don’t know which one, but we’d like to create a new object using it.

Can we do it like that?

    let obj2 = new obj.constructor();

Give an example of a constructor function for `obj` which lets such code work right. And an example that makes it work wrong.

solution

We can use such approach if we are sure that `"constructor"` property has the correct value.

For instance, if we don’t touch the default `"prototype"`, then this code works for sure:

<a href="function-prototype.html#"
<a href="function-prototype.html#"

    function User(name) {
      this.name = name;
    }

    let user = new User('John');
    let user2 = new user.constructor('Pete');

    alert( user2.name ); // Pete (worked!)

It worked, because `User.prototype.constructor == User`.

…But if someone, so to speak, overwrites `User.prototype` and forgets to recreate `constructor` to reference `User`, then it would fail.

For instance:

<a href="function-prototype.html#"
<a href="function-prototype.html#"

    function User(name) {
      this.name = name;
    }
    User.prototype = {}; // (*)

    let user = new User('John');
    let user2 = new user.constructor('Pete');

    alert( user2.name ); // undefined

Why `user2.name` is `undefined`?

Here’s how `new user.constructor('Pete')` works:

1.  First, it looks for `constructor` in `user`. Nothing.
2.  Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we “forgot” to set it right!).
3.  Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`.
4.  Finally, for the built-in `Object.prototype`, there’s a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`.

Probably, that’s not what we want. We’d like to create `new User`, not `new Object`. That’s the outcome of the missing `constructor`.

(Just in case you’re curious, the `new Object(...)` call converts its argument to an object. That’s a theoretical thing, in practice no one calls `new Object` with a value, and generally we don’t use `new Object` to make objects at all).

<a href="prototype-inheritance.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="native-prototypes.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffunction-prototype" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-prototype" </a>

<a href="tutorial/map.html" class="map">

## <a href="function-prototype.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="prototypes.html" class="sidebar__link">Prototypes, inheritance</a>

#### Lesson navigation

- <a href="function-prototype.html#default-f-prototype-constructor-property" class="sidebar__link">Default F.prototype, constructor property</a>
- <a href="function-prototype.html#summary" class="sidebar__link">Summary</a>

- <a href="function-prototype.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="function-prototype.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Ffunction-prototype" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-prototype" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/08-prototypes/02-function-prototype" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
