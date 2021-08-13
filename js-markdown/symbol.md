EN

- <a href="https://ar.javascript.info/symbol"
- <a href="symbol.html"
- <a href="https://es.javascript.info/symbol"
- <a href="https://fr.javascript.info/symbol"
- symbol"
  symbol"

<!-- -->

- /symbol"
- <a href=symbol"
- <a href="https://tr.javascript.info/symbol"
- <a href="https://zh.javascript.info/symbol"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fsymbol" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsymbol" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="object-basics.html" Objects: the basics</span></a></span>

13th January 2021

# Symbol type

By specification, object property keys may be either of string type, or of symbol type. Not numbers, not booleans, only strings or symbols, these two types.

Till now we’ve been using only strings. Now let’s see the benefits that symbols can give us.

## <a href="symbol.html#symbols" id="symbols" class="main__anchor">Symbols</a>

A “symbol” represents a unique identifier.

A value of this type can be created using `Symbol()`:

    // id is a new symbol
    let id = Symbol();

Upon creation, we can give symbol a description (also called a symbol name), mostly useful for debugging purposes:

    // id is a symbol with the description "id"
    let id = Symbol("id");

Symbols are guaranteed to be unique. Even if we create many symbols with the same description, they are different values. The description is just a label that doesn’t affect anything.

For instance, here are two symbols with the same description – they are not equal:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let id1 = Symbol("id");
    let id2 = Symbol("id");

    alert(id1 == id2); // false

If you are familiar with Ruby or another language that also has some sort of “symbols” – please don’t be misguided. JavaScript symbols are different.

<span class="important__type">Symbols don’t auto-convert to a string</span>

Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don’t auto-convert.

For instance, this `alert` will show an error:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let id = Symbol("id");
    alert(id); // TypeError: Cannot convert a Symbol value to a string

That’s a “language guard” against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let id = Symbol("id");
    alert(id.toString()); // Symbol(id), now it works

Or get `symbol.description` property to show the description only:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let id = Symbol("id");
    alert(id.description); // id

## <a href="symbol.html#hidden-properties" id="hidden-properties" class="main__anchor">“Hidden” properties</a>

Symbols allow us to create “hidden” properties of an object, that no other part of code can accidentally access or overwrite.

For instance, if we’re working with `user` objects, that belong to a third-party code. We’d like to add identifiers to them.

Let’s use a symbol key for it:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = { // belongs to another code
      name: "John"
    };

    let id = Symbol("id");

    user[id] = 1;

    alert( user[id] ); // we can access the data using the symbol as the key

What’s the benefit of using `Symbol("id")` over a string `"id"`?

As `user` objects belongs to another code, and that code also works with them, we shouldn’t just add any fields to it. That’s unsafe. But a symbol cannot be accessed accidentally, the third-party code probably won’t even see it, so it’s probably all right to do.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes. That may be another JavaScript library, so that the scripts are completely unaware of each other.

Then that script can create its own `Symbol("id")`, like this:

    // ...
    let id = Symbol("id");

    user[id] = "Their id value";

There will be no conflict between our and their identifiers, because symbols are always different, even if they have the same name.

…But if we used a string `"id"` instead of a symbol for the same purpose, then there _would_ be a conflict:

    let user = { name: "John" };

    // Our script uses "id" property
    user.id = "Our id value";

    // ...Another script also wants "id" for its purposes...

    user.id = "Their id value"
    // Boom! overwritten by another script!

### <a href="symbol.html#symbols-in-an-object-literal" id="symbols-in-an-object-literal" class="main__anchor">Symbols in an object literal</a>

If we want to use a symbol in an object literal `{...}`, we need square brackets around it.

Like this:

    let id = Symbol("id");

    let user = {
      name: "John",
      [id]: 123 // not "id": 123
    };

That’s because we need the value from the variable `id` as the key, not the string “id”.

### <a href="symbol.html#symbols-are-skipped-by-for-in" id="symbols-are-skipped-by-for-in" class="main__anchor">Symbols are skipped by for…in</a>

Symbolic properties do not participate in `for..in` loop.

For instance:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let id = Symbol("id");
    let user = {
      name: "John",
      age: 30,
      [id]: 123
    };

    for (let key in user) alert(key); // name, age (no symbols)

    // the direct access by the symbol works
    alert( "Direct: " + user[id] );

`Object.keys(user)` also ignores them. That’s a part of the general “hiding symbolic properties” principle. If another script or a library loops over our object, it won’t unexpectedly access a symbolic property.

In contrast, [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) copies both string and symbol properties:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let id = Symbol("id");
    let user = {
      [id]: 123
    };

    let clone = Object.assign({}, user);

    alert( clone[id] ); // 123

There’s no paradox here. That’s by design. The idea is that when we clone an object or merge objects, we usually want _all_ properties to be copied (including symbols like `id`).

## <a href="symbol.html#global-symbols" id="global-symbols" class="main__anchor">Global symbols</a>

As we’ve seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.

To achieve that, there exists a _global symbol registry_. We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.

In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`.

That call checks the global registry, and if there’s a symbol described as `key`, then returns it, otherwise creates a new symbol `Symbol(key)` and stores it in the registry by the given `key`.

For instance:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // read from the global registry
    let id = Symbol.for("id"); // if the symbol did not exist, it is created

    // read it again (maybe from another part of the code)
    let idAgain = Symbol.for("id");

    // the same symbol
    alert( id === idAgain ); // true

Symbols inside the registry are called _global symbols_. If we want an application-wide symbol, accessible everywhere in the code – that’s what they are for.

<span class="important__type">That sounds like Ruby</span>

In some programming languages, like Ruby, there’s a single symbol per name.

In JavaScript, as we can see, that’s right for global symbols.

### <a href="symbol.html#symbol-keyfor" id="symbol-keyfor" class="main__anchor">Symbol.keyFor</a>

For global symbols, not only `Symbol.for(key)` returns a symbol by name, but there’s a reverse call: `Symbol.keyFor(sym)`, that does the reverse: returns a name by a global symbol.

For instance:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // get symbol by name
    let sym = Symbol.for("name");
    let sym2 = Symbol.for("id");

    // get name by symbol
    alert( Symbol.keyFor(sym) ); // name
    alert( Symbol.keyFor(sym2) ); // id

The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn’t work for non-global symbols. If the symbol is not global, it won’t be able to find it and returns `undefined`.

That said, any symbols have `description` property.

For instance:

<a href="symbol.html#"
<a href="symbol.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let globalSymbol = Symbol.for("name");
    let localSymbol = Symbol("name");

    alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
    alert( Symbol.keyFor(localSymbol) ); // undefined, not global

    alert( localSymbol.description ); // name

## <a href="symbol.html#system-symbols" id="system-symbols" class="main__anchor">System symbols</a>

There exist many “system” symbols that JavaScript uses internally, and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) table:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- …and so on.

For instance, `Symbol.toPrimitive` allows us to describe object to primitive conversion. We’ll see its use very soon.

Other symbols will also become familiar when we study the corresponding language features.

## <a href="symbol.html#summary" id="summary" class="main__anchor">Summary</a>

`Symbol` is a primitive type for unique identifiers.

Symbols are created with `Symbol()` call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with `key` as the name. Multiple calls of `Symbol.for` with the same `key` return exactly the same symbol.

Symbols have two main use cases:

1.  “Hidden” object properties. If we want to add a property into an object that “belongs” to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won’t be accidentally processed together with other properties. Also it won’t be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

    So we can “covertly” hide something into objects that we need, but others should not see, using symbolic properties.

2.  There are many system symbols used by JavaScript which are accessible as `Symbol.*`. We can use them to alter some built-in behaviors. For instance, later in the tutorial we’ll use `Symbol.iterator` for [iterables](iterable.html), `Symbol.toPrimitive` to setup [object-to-primitive conversion](object-toprimitive.html) and so on.

Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) that returns _all_ keys of an object including symbolic ones. So they are not really hidden. But most libraries, built-in functions and syntax constructs don’t use these methods.

<a href="optional-chaining.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="object-toprimitive.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fsymbol" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsymbol" </a>

<a href="tutorial/map.html" class="map">

## <a href="symbol.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="object-basics.html" class="sidebar__link">Objects: the basics</a>

#### Lesson navigation

- <a href="symbol.html#symbols" class="sidebar__link">Symbols</a>
- <a href="symbol.html#hidden-properties" class="sidebar__link">“Hidden” properties</a>
- <a href="symbol.html#global-symbols" class="sidebar__link">Global symbols</a>
- <a href="symbol.html#system-symbols" class="sidebar__link">System symbols</a>
- <a href="symbol.html#summary" class="sidebar__link">Summary</a>

- <a href="symbol.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fsymbol" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fsymbol" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/04-object-basics/08-symbol" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
