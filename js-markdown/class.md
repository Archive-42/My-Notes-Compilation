EN

- <a href="https://ar.javascript.info/class"
- <a href="class.html"
- <a href="https://es.javascript.info/class"
- <a href="https://fr.javascript.info/class"
- class"
  class"

<!-- -->

- /class"
- <a href=class"
- <a href="https://tr.javascript.info/class"
- <a href="https://zh.javascript.info/class"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fclass" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclass" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="classes.html" Classes</span></a></span>

11th May 2021

# Class basic syntax

> In object-oriented programming, a _class_ is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods).
>
> Wikipedia

In practice, we often need to create many objects of the same kind, like users, or goods or whatever.

As we already know from the chapter [Constructor, operator "new"](constructor-new.html), `new function` can help with that.

But in the modern JavaScript, there’s a more advanced “class” construct, that introduces great new features which are useful for object-oriented programming.

## <a href="class.html#the-class-syntax" id="the-class-syntax" class="main__anchor">The “class” syntax</a>

The basic syntax is:

    class MyClass {
      // class methods
      constructor() { ... }
      method1() { ... }
      method2() { ... }
      method3() { ... }
      ...
    }

Then use `new MyClass()` to create a new object with all the listed methods.

The `constructor()` method is called automatically by `new`, so we can initialize the object there.

For example:

<a href="class.html#"
<a href="class.html#"

    class User {

      constructor(name) {
        this.name = name;
      }

      sayHi() {
        alert(this.name);
      }

    }

    // Usage:
    let user = new User("John");
    user.sayHi();

When `new User("John")` is called:

1.  A new object is created.
2.  The `constructor` runs with the given argument and assigns it to `this.name`.

…Then we can call object methods, such as `user.sayHi()`.

<span class="important__type">No comma between class methods</span>

A common pitfall for novice developers is to put a comma between class methods, which would result in a syntax error.

The notation here is not to be confused with object literals. Within the class, no commas are required.

## <a href="class.html#what-is-a-class" id="what-is-a-class" class="main__anchor">What is a class?</a>

So, what exactly is a `class`? That’s not an entirely new language-level entity, as one might think.

Let’s unveil any magic and see what a class really is. That’ll help in understanding many complex aspects.

In JavaScript, a class is a kind of function.

Here, take a look:

<a href="class.html#"
<a href="class.html#"

    class User {
      constructor(name) { this.name = name; }
      sayHi() { alert(this.name); }
    }

    // proof: User is a function
    alert(typeof User); // function

What `class User {...}` construct really does is:

1.  Creates a function named `User`, that becomes the result of the class declaration. The function code is taken from the `constructor` method (assumed empty if we don’t write such method).
2.  Stores class methods, such as `sayHi`, in `User.prototype`.

After `new User` object is created, when we call its method, it’s taken from the prototype, just as described in the chapter [F.prototype](function-prototype.html). So the object has access to class methods.

We can illustrate the result of `class User` declaration as:

<figure><img src="article/class/class-user.svg" width="486" height="94" /></figure>Here’s the code to introspect it:

<a href="class.html#"
<a href="class.html#"

    class User {
      constructor(name) { this.name = name; }
      sayHi() { alert(this.name); }
    }

    // class is a function
    alert(typeof User); // function

    // ...or, more precisely, the constructor method
    alert(User === User.prototype.constructor); // true

    // The methods are in User.prototype, e.g:
    alert(User.prototype.sayHi); // the code of the sayHi method

    // there are exactly two methods in the prototype
    alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

## <a href="class.html#not-just-a-syntactic-sugar" id="not-just-a-syntactic-sugar" class="main__anchor">Not just a syntactic sugar</a>

Sometimes people say that `class` is a “syntactic sugar” (syntax that is designed to make things easier to read, but doesn’t introduce anything new), because we could actually declare the same without `class` keyword at all:

<a href="class.html#"
<a href="class.html#"

    // rewriting class User in pure functions

    // 1. Create constructor function
    function User(name) {
      this.name = name;
    }
    // a function prototype has "constructor" property by default,
    // so we don't need to create it

    // 2. Add the method to prototype
    User.prototype.sayHi = function() {
      alert(this.name);
    };

    // Usage:
    let user = new User("John");
    user.sayHi();

The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.

1.  First, a function created by `class` is labelled by a special internal property `[[IsClassConstructor]]: true`. So it’s not entirely the same as creating it manually.

    The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with `new`:

    <a href="class.html#"
    <a href="class.html#"

        class User {
          constructor() {}
        }

        alert(typeof User); // function
        User(); // Error: Class constructor User cannot be invoked without 'new'

    Also, a string representation of a class constructor in most JavaScript engines starts with the “class…”

    <a href="class.html#"
    <a href="class.html#"

        class User {
          constructor() {}
        }

        alert(User); // class User { ... }

    There are other differences, we’ll see them soon.

2.  Class methods are non-enumerable. A class definition sets `enumerable` flag to `false` for all methods in the `"prototype"`.

    That’s good, because if we `for..in` over an object, we usually don’t want its class methods.

3.  Classes always `use strict`. All code inside the class construct is automatically in strict mode.

Besides, `class` syntax brings many other features that we’ll explore later.

## <a href="class.html#class-expression" id="class-expression" class="main__anchor">Class Expression</a>

Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

Here’s an example of a class expression:

    let User = class {
      sayHi() {
        alert("Hello");
      }
    };

Similar to Named Function Expressions, class expressions may have a name.

If a class expression has a name, it’s visible inside the class only:

<a href="class.html#"
<a href="class.html#"

    // "Named Class Expression"
    // (no such term in the spec, but that's similar to Named Function Expression)
    let User = class MyClass {
      sayHi() {
        alert(MyClass); // MyClass name is visible only inside the class
      }
    };

    new User().sayHi(); // works, shows MyClass definition

    alert(MyClass); // error, MyClass name isn't visible outside of the class

We can even make classes dynamically “on-demand”, like this:

<a href="class.html#"
<a href="class.html#"

    function makeClass(phrase) {
      // declare a class and return it
      return class {
        sayHi() {
          alert(phrase);
        }
      };
    }

    // Create a new class
    let User = makeClass("Hello");

    new User().sayHi(); // Hello

## <a href="class.html#getters-setters" id="getters-setters" class="main__anchor">Getters/setters</a>

Just like literal objects, classes may include getters/setters, computed properties etc.

Here’s an example for `user.name` implemented using `get/set`:

<a href="class.html#"
<a href="class.html#"

    class User {

      constructor(name) {
        // invokes the setter
        this.name = name;
      }

      get name() {
        return this._name;
      }

      set name(value) {
        if (value.length < 4) {
          alert("Name is too short.");
          return;
        }
        this._name = value;
      }

    }

    let user = new User("John");
    alert(user.name); // John

    user = new User(""); // Name is too short.

Technically, such class declaration works by creating getters and setters in `User.prototype`.

## <a href="class.html#computed-names" id="computed-names" class="main__anchor">Computed names […]</a>

Here’s an example with a computed method name using brackets `[...]`:

<a href="class.html#"
<a href="class.html#"

    class User {

      ['say' + 'Hi']() {
        alert("Hello");
      }

    }

    new User().sayHi();

Such features are easy to remember, as they resemble that of literal objects.

## <a href="class.html#class-fields" id="class-fields" class="main__anchor">Class fields</a>

<span class="important__type">Old browsers may need a polyfill</span>

Class fields are a recent addition to the language.

Previously, our classes only had methods.

“Class fields” is a syntax that allows to add any properties.

For instance, let’s add `name` property to `class User`:

<a href="class.html#"
<a href="class.html#"

    class User {
      name = "John";

      sayHi() {
        alert(`Hello, ${this.name}!`);
      }
    }

    new User().sayHi(); // Hello, John!

So, we just write " = " in the declaration, and that’s it.

The important difference of class fields is that they are set on individual objects, not `User.prototype`:

<a href="class.html#"
<a href="class.html#"

    class User {
      name = "John";
    }

    let user = new User();
    alert(user.name); // John
    alert(User.prototype.name); // undefined

We can also assign values using more complex expressions and function calls:

<a href="class.html#"
<a href="class.html#"

    class User {
      name = prompt("Name, please?", "John");
    }

    let user = new User();
    alert(user.name); // John

### <a href="class.html#making-bound-methods-with-class-fields" id="making-bound-methods-with-class-fields" class="main__anchor">Making bound methods with class fields</a>

As demonstrated in the chapter [Function binding](bind.html) functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won’t be a reference to its object any more.

For instance, this code will show `undefined`:

<a href="class.html#"
<a href="class.html#"

    class Button {
      constructor(value) {
        this.value = value;
      }

      click() {
        alert(this.value);
      }
    }

    let button = new Button("hello");

    setTimeout(button.click, 1000); // undefined

The problem is called "losing `this`".

There are two approaches to fixing it, as discussed in the chapter [Function binding](bind.html):

1.  Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2.  Bind the method to object, e.g. in the constructor.

Class fields provide another, quite elegant syntax:

<a href="class.html#"
<a href="class.html#"

    class Button {
      constructor(value) {
        this.value = value;
      }
      click = () => {
        alert(this.value);
      }
    }

    let button = new Button("hello");

    setTimeout(button.click, 1000); // hello

The class field `click = () => {...}` is created on a per-object basis, there’s a separate function for each `Button` object, with `this` inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.

That’s especially useful in browser environment, for event listeners.

## <a href="class.html#summary" id="summary" class="main__anchor">Summary</a>

The basic class syntax looks like this:

    class MyClass {
      prop = value; // property

      constructor(...) { // constructor
        // ...
      }

      method(...) {} // method

      get something(...) {} // getter method
      set something(...) {} // setter method

      [Symbol.iterator]() {} // method with computed name (symbol here)
      // ...
    }

`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to `MyClass.prototype`.

In the next chapters we’ll learn more about classes, including inheritance and other features.

## <a href="class.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="class.html#rewrite-to-class" id="rewrite-to-class" class="main__anchor">Rewrite to class</a>

<a href="task/rewrite-to-class.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The `Clock` class (see the sandbox) is written in functional style. Rewrite it in the “class” syntax.

P.S. The clock ticks in the console, open it to see.

[Open a sandbox for the task.](https://plnkr.co/edit/MmhvN3wn0sUBqjwR?p=preview)

solution

    class Clock {
      constructor({ template }) {
        this.template = template;
      }

      render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
          .replace('h', hours)
          .replace('m', mins)
          .replace('s', secs);

        console.log(output);
      }

      stop() {
        clearInterval(this.timer);
      }

      start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
      }
    }


    let clock = new Clock({template: 'h:m:s'});
    clock.start();

[Open the solution in a sandbox.](https://plnkr.co/edit/4pMcC17UHDAvmsna?p=preview)

<a href="classes.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="class-inheritance.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fclass" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclass" </a>

<a href="tutorial/map.html" class="map">

## <a href="class.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="classes.html" class="sidebar__link">Classes</a>

#### Lesson navigation

- <a href="class.html#the-class-syntax" class="sidebar__link">The “class” syntax</a>
- <a href="class.html#what-is-a-class" class="sidebar__link">What is a class?</a>
- <a href="class.html#not-just-a-syntactic-sugar" class="sidebar__link">Not just a syntactic sugar</a>
- <a href="class.html#class-expression" class="sidebar__link">Class Expression</a>
- <a href="class.html#getters-setters" class="sidebar__link">Getters/setters</a>
- <a href="class.html#computed-names" class="sidebar__link">Computed names […]</a>
- <a href="class.html#class-fields" class="sidebar__link">Class fields</a>
- <a href="class.html#summary" class="sidebar__link">Summary</a>

- <a href="class.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="class.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fclass" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclass" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/09-classes/01-class" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
