EN

- <a href="https://ar.javascript.info/property-descriptors"
- <a href="property-descriptors.html"
- <a href="https://es.javascript.info/property-descriptors"
- <a href="https://fr.javascript.info/property-descriptors"
- property-descriptors"
  property-descriptors"

<!-- -->

- <a href="https://ko.javascript.info/property-descriptors"
- <a href=property-descriptors"
- <a href="https://tr.javascript.info/property-descriptors"
- <a href="https://zh.javascript.info/property-descriptors"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fproperty-descriptors" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fproperty-descriptors" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="object-properties.html" Object properties configuration</span></a></span>

22nd July 2021

# Property flags and descriptors

As we know, objects can store properties.

Until now, a property was a simple “key-value” pair to us. But an object property is actually a more flexible and powerful thing.

In this chapter we’ll study additional configuration options, and in the next we’ll see how to invisibly turn them into getter/setter functions.

## <a href="property-descriptors.html#property-flags" id="property-flags" class="main__anchor">Property flags</a>

Object properties, besides a **`value`**, have three special attributes (so-called “flags”):

- **`writable`** – if `true`, the value can be changed, otherwise it’s read-only.
- **`enumerable`** – if `true`, then listed in loops, otherwise not listed.
- **`configurable`** – if `true`, the property can be deleted and these attributes can be modified, otherwise not.

We didn’t see them yet, because generally they do not show up. When we create a property “the usual way”, all of them are `true`. But we also can change them anytime.

First, let’s see how to get those flags.

The method [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) allows to query the _full_ information about a property.

The syntax is:

    let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

`obj`  
The object to get information from.

`propertyName`  
The name of the property.

The returned value is a so-called “property descriptor” object: it contains the value and all the flags.

For instance:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let user = {
      name: "John"
    };

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    alert( JSON.stringify(descriptor, null, 2 ) );
    /* property descriptor:
    {
      "value": "John",
      "writable": true,
      "enumerable": true,
      "configurable": true
    }
    */

To change the flags, we can use [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

The syntax is:

    Object.defineProperty(obj, propertyName, descriptor)

`obj`, `propertyName`  
The object and its property to apply the descriptor.

`descriptor`  
Property descriptor object to apply.

If the property exists, `defineProperty` updates its flags. Otherwise, it creates the property with the given value and flags; in that case, if a flag is not supplied, it is assumed `false`.

For instance, here a property `name` is created with all falsy flags:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let user = {};

    Object.defineProperty(user, "name", {
      value: "John"
    });

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    alert( JSON.stringify(descriptor, null, 2 ) );
    /*
    {
      "value": "John",
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
     */

Compare it with “normally created” `user.name` above: now all flags are falsy. If that’s not what we want then we’d better set them to `true` in `descriptor`.

Now let’s see effects of the flags by example.

## <a href="property-descriptors.html#non-writable" id="non-writable" class="main__anchor">Non-writable</a>

Let’s make `user.name` non-writable (can’t be reassigned) by changing `writable` flag:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let user = {
      name: "John"
    };

    Object.defineProperty(user, "name", {
      writable: false
    });

    user.name = "Pete"; // Error: Cannot assign to read only property 'name'

Now no one can change the name of our user, unless they apply their own `defineProperty` to override ours.

<span class="important__type">Errors appear only in strict mode</span>

In the non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won’t succeed. Flag-violating actions are just silently ignored in non-strict.

Here’s the same example, but the property is created from scratch:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let user = { };

    Object.defineProperty(user, "name", {
      value: "John",
      // for new properties we need to explicitly list what's true
      enumerable: true,
      configurable: true
    });

    alert(user.name); // John
    user.name = "Pete"; // Error

## <a href="property-descriptors.html#non-enumerable" id="non-enumerable" class="main__anchor">Non-enumerable</a>

Now let’s add a custom `toString` to `user`.

Normally, a built-in `toString` for objects is non-enumerable, it does not show up in `for..in`. But if we add a `toString` of our own, then by default it shows up in `for..in`, like this:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let user = {
      name: "John",
      toString() {
        return this.name;
      }
    };

    // By default, both our properties are listed:
    for (let key in user) alert(key); // name, toString

If we don’t like it, then we can set `enumerable:false`. Then it won’t appear in a `for..in` loop, just like the built-in one:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let user = {
      name: "John",
      toString() {
        return this.name;
      }
    };

    Object.defineProperty(user, "toString", {
      enumerable: false
    });

    // Now our toString disappears:
    for (let key in user) alert(key); // name

Non-enumerable properties are also excluded from `Object.keys`:

    alert(Object.keys(user)); // name

## <a href="property-descriptors.html#non-configurable" id="non-configurable" class="main__anchor">Non-configurable</a>

The non-configurable flag (`configurable:false`) is sometimes preset for built-in objects and properties.

A non-configurable property can’t be deleted, its attributes can’t be modified.

For instance, `Math.PI` is non-writable, non-enumerable and non-configurable:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

    alert( JSON.stringify(descriptor, null, 2 ) );
    /*
    {
      "value": 3.141592653589793,
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
    */

So, a programmer is unable to change the value of `Math.PI` or overwrite it.

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    Math.PI = 3; // Error, because it has writable: false

    // delete Math.PI won't work either

We also can’t change `Math.PI` to be `writable` again:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    // Error, because of configurable: false
    Object.defineProperty(Math, "PI", { writable: true });

There’s absolutely nothing we can do with `Math.PI`.

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it’s writable):

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let user = {
      name: "John"
    };

    Object.defineProperty(user, "name", {
      configurable: false
    });

    user.name = "Pete"; // works fine
    delete user.name; // Error

And here we make `user.name` a “forever sealed” constant, just like the built-in `Math.PI`:

<a href="property-descriptors.html#"
<a href="property-descriptors.html#"

    let user = {
      name: "John"
    };

    Object.defineProperty(user, "name", {
      writable: false,
      configurable: false
    });

    // won't be able to change user.name or its flags
    // all this won't work:
    user.name = "Pete";
    delete user.name;
    Object.defineProperty(user, "name", { value: "Pete" });

<span class="important__type">The only attribute change possible: writable true → false</span>

There’s a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.

## <a href="property-descriptors.html#object-defineproperties" id="object-defineproperties" class="main__anchor">Object.defineProperties</a>

There’s a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.

The syntax is:

    Object.defineProperties(obj, {
      prop1: descriptor1,
      prop2: descriptor2
      // ...
    });

For instance:

    Object.defineProperties(user, {
      name: { value: "John", writable: false },
      surname: { value: "Smith", writable: false },
      // ...
    });

So, we can set many properties at once.

## <a href="property-descriptors.html#object-getownpropertydescriptors" id="object-getownpropertydescriptors" class="main__anchor">Object.getOwnPropertyDescriptors</a>

To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).

Together with `Object.defineProperties` it can be used as a “flags-aware” way of cloning an object:

    let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

Normally when we clone an object, we use an assignment to copy properties, like this:

    for (let key in user) {
      clone[key] = user[key]
    }

…But that does not copy flags. So if we want a “better” clone then `Object.defineProperties` is preferred.

Another difference is that `for..in` ignores symbolic properties, but `Object.getOwnPropertyDescriptors` returns _all_ property descriptors including symbolic ones.

## <a href="property-descriptors.html#sealing-an-object-globally" id="sealing-an-object-globally" class="main__anchor">Sealing an object globally</a>

Property descriptors work at the level of individual properties.

There are also methods that limit access to the _whole_ object:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)  
Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)  
Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)  
Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.

And also there are tests for them:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)  
Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)  
Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)  
Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.

These methods are rarely used in practice.

<a href="object-properties.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="property-accessors.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fproperty-descriptors" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fproperty-descriptors" </a>

<a href="tutorial/map.html" class="map">

## <a href="property-descriptors.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="object-properties.html" class="sidebar__link">Object properties configuration</a>

#### Lesson navigation

- <a href="property-descriptors.html#property-flags" class="sidebar__link">Property flags</a>
- <a href="property-descriptors.html#non-writable" class="sidebar__link">Non-writable</a>
- <a href="property-descriptors.html#non-enumerable" class="sidebar__link">Non-enumerable</a>
- <a href="property-descriptors.html#non-configurable" class="sidebar__link">Non-configurable</a>
- <a href="property-descriptors.html#object-defineproperties" class="sidebar__link">Object.defineProperties</a>
- <a href="property-descriptors.html#object-getownpropertydescriptors" class="sidebar__link">Object.getOwnPropertyDescriptors</a>
- <a href="property-descriptors.html#sealing-an-object-globally" class="sidebar__link">Sealing an object globally</a>

- <a href="property-descriptors.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fproperty-descriptors" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fproperty-descriptors" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/07-object-properties/01-property-descriptors" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
