EN

- <a href="https://ar.javascript.info/property-accessors"
- <a href="property-accessors.html"
- <a href="https://es.javascript.info/property-accessors"

- property-accessors"
  property-accessors"

<!-- -->

- /property-accessors"
- <a href=property-accessors"
- <a href="https://tr.javascript.info/property-accessors"
- <a href="https://zh.javascript.info/property-accessors"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fproperty-accessors" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fproperty-accessors" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="object-properties.html" Object properties configuration</span></a></span>

28th May 2020

# Property getters and setters

There are two kinds of object properties.

The first kind is _data properties_. We already know how to work with them. All properties that we’ve been using until now were data properties.

The second type of properties is something new. It’s _accessor properties_. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.

## <a href="property-accessors.html#getters-and-setters" id="getters-and-setters" class="main__anchor">Getters and setters</a>

Accessor properties are represented by “getter” and “setter” methods. In an object literal they are denoted by `get` and `set`:

    let obj = {
      get propName() {
        // getter, the code executed on getting obj.propName
      },

      set propName(value) {
        // setter, the code executed on setting obj.propName = value
      }
    };

The getter works when `obj.propName` is read, the setter – when it is assigned.

For instance, we have a `user` object with `name` and `surname`:

    let user = {
      name: "John",
      surname: "Smith"
    };

Now we want to add a `fullName` property, that should be `"John Smith"`. Of course, we don’t want to copy-paste existing information, so we can implement it as an accessor:

<a href="property-accessors.html#"
<a href="property-accessors.html#"

    let user = {
      name: "John",
      surname: "Smith",

      get fullName() {
        return `${this.name} ${this.surname}`;
      }
    };

    alert(user.fullName); // John Smith

From the outside, an accessor property looks like a regular one. That’s the idea of accessor properties. We don’t _call_ `user.fullName` as a function, we _read_ it normally: the getter runs behind the scenes.

As of now, `fullName` has only a getter. If we attempt to assign `user.fullName=`, there will be an error:

<a href="property-accessors.html#"
<a href="property-accessors.html#"

    let user = {
      get fullName() {
        return `...`;
      }
    };

    user.fullName = "Test"; // Error (property has only a getter)

Let’s fix it by adding a setter for `user.fullName`:

<a href="property-accessors.html#"
<a href="property-accessors.html#"

    let user = {
      name: "John",
      surname: "Smith",

      get fullName() {
        return `${this.name} ${this.surname}`;
      },

      set fullName(value) {
        [this.name, this.surname] = value.split(" ");
      }
    };

    // set fullName is executed with the given value.
    user.fullName = "Alice Cooper";

    alert(user.name); // Alice
    alert(user.surname); // Cooper

As the result, we have a “virtual” property `fullName`. It is readable and writable.

## <a href="property-accessors.html#accessor-descriptors" id="accessor-descriptors" class="main__anchor">Accessor descriptors</a>

Descriptors for accessor properties are different from those for data properties.

For accessor properties, there is no `value` or `writable`, but instead there are `get` and `set` functions.

That is, an accessor descriptor may have:

- **`get`** – a function without arguments, that works when a property is read,
- **`set`** – a function with one argument, that is called when the property is set,
- **`enumerable`** – same as for data properties,
- **`configurable`** – same as for data properties.

For instance, to create an accessor `fullName` with `defineProperty`, we can pass a descriptor with `get` and `set`:

<a href="property-accessors.html#"
<a href="property-accessors.html#"

    let user = {
      name: "John",
      surname: "Smith"
    };

    Object.defineProperty(user, 'fullName', {
      get() {
        return `${this.name} ${this.surname}`;
      },

      set(value) {
        [this.name, this.surname] = value.split(" ");
      }
    });

    alert(user.fullName); // John Smith

    for(let key in user) alert(key); // name, surname

Please note that a property can be either an accessor (has `get/set` methods) or a data property (has a `value`), not both.

If we try to supply both `get` and `value` in the same descriptor, there will be an error:

<a href="property-accessors.html#"
<a href="property-accessors.html#"

    // Error: Invalid property descriptor.
    Object.defineProperty({}, 'prop', {
      get() {
        return 1
      },

      value: 2
    });

## <a href="property-accessors.html#smarter-getters-setters" id="smarter-getters-setters" class="main__anchor">Smarter getters/setters</a>

Getters/setters can be used as wrappers over “real” property values to gain more control over operations with them.

For instance, if we want to forbid too short names for `user`, we can have a setter `name` and keep the value in a separate property `_name`:

<a href="property-accessors.html#"
<a href="property-accessors.html#"

    let user = {
      get name() {
        return this._name;
      },

      set name(value) {
        if (value.length < 4) {
          alert("Name is too short, need at least 4 characters");
          return;
        }
        this._name = value;
      }
    };

    user.name = "Pete";
    alert(user.name); // Pete

    user.name = ""; // Name is too short...

So, the name is stored in `_name` property, and the access is done via getter and setter.

Technically, external code is able to access the name directly by using `user._name`. But there is a widely known convention that properties starting with an underscore `"_"` are internal and should not be touched from outside the object.

## <a href="property-accessors.html#using-for-compatibility" id="using-for-compatibility" class="main__anchor">Using for compatibility</a>

One of the great uses of accessors is that they allow to take control over a “regular” data property at any moment by replacing it with a getter and a setter and tweak its behavior.

Imagine we started implementing user objects using data properties `name` and `age`:

    function User(name, age) {
      this.name = name;
      this.age = age;
    }

    let john = new User("John", 25);

    alert( john.age ); // 25

…But sooner or later, things may change. Instead of `age` we may decide to store `birthday`, because it’s more precise and convenient:

    function User(name, birthday) {
      this.name = name;
      this.birthday = birthday;
    }

    let john = new User("John", new Date(1992, 6, 1));

Now what to do with the old code that still uses `age` property?

We can try to find all such places and fix them, but that takes time and can be hard to do if that code is used by many other people. And besides, `age` is a nice thing to have in `user`, right?

Let’s keep it.

Adding a getter for `age` solves the problem:

<a href="property-accessors.html#"
<a href="property-accessors.html#"

    function User(name, birthday) {
      this.name = name;
      this.birthday = birthday;

      // age is calculated from the current date and birthday
      Object.defineProperty(this, "age", {
        get() {
          let todayYear = new Date().getFullYear();
          return todayYear - this.birthday.getFullYear();
        }
      });
    }

    let john = new User("John", new Date(1992, 6, 1));

    alert( john.birthday ); // birthday is available
    alert( john.age );      // ...as well as the age

Now the old code works too and we’ve got a nice additional property.

<a href="property-descriptors.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="prototypes.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fproperty-accessors" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fproperty-accessors" </a>

<a href="tutorial/map.html" class="map">

## <a href="property-accessors.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="object-properties.html" class="sidebar__link">Object properties configuration</a>

#### Lesson navigation

- <a href="property-accessors.html#getters-and-setters" class="sidebar__link">Getters and setters</a>
- <a href="property-accessors.html#accessor-descriptors" class="sidebar__link">Accessor descriptors</a>
- <a href="property-accessors.html#smarter-getters-setters" class="sidebar__link">Smarter getters/setters</a>
- <a href="property-accessors.html#using-for-compatibility" class="sidebar__link">Using for compatibility</a>

- <a href="property-accessors.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fproperty-accessors" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fproperty-accessors" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/07-object-properties/02-property-accessors" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
