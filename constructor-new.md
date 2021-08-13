EN

- <a href="https://ar.javascript.info/constructor-new"
- <a href="constructor-new.html"
- <a href="https://es.javascript.info/constructor-new"
- <a href="https://fr.javascript.info/constructor-new"
- constructor-new"
  constructor-new"

<!-- -->

- /constructor-new"
- <a href=constructor-new"
- <a href="https://tr.javascript.info/constructor-new"
- <a href="https://zh.javascript.info/constructor-new"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fconstructor-new" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fconstructor-new" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="object-basics.html" Objects: the basics</span></a></span>

13th July 2021

# Constructor, operator "new"

The regular `{...}` syntax allows to create one object. But often we need to create many similar objects, like multiple users or menu items and so on.

That can be done using constructor functions and the `"new"` operator.

## <a href="constructor-new.html#constructor-function" id="constructor-function" class="main__anchor">Constructor function</a>

Constructor functions technically are regular functions. There are two conventions though:

1.  They are named with capital letter first.
2.  They should be executed only with `"new"` operator.

For instance:

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    function User(name) {
      this.name = name;
      this.isAdmin = false;
    }

    let user = new User("Jack");

    alert(user.name); // Jack
    alert(user.isAdmin); // false

When a function is executed with `new`, it does the following steps:

1.  A new empty object is created and assigned to `this`.
2.  The function body executes. Usually it modifies `this`, adds new properties to it.
3.  The value of `this` is returned.

In other words, `new User(...)` does something like:

    function User(name) {
      // this = {};  (implicitly)

      // add properties to this
      this.name = name;
      this.isAdmin = false;

      // return this;  (implicitly)
    }

So `let user = new User("Jack")` gives the same result as:

    let user = {
      name: "Jack",
      isAdmin: false
    };

Now if we want to create other users, we can call `new User("Ann")`, `new User("Alice")` and so on. Much shorter than using literals every time, and also easy to read.

That’s the main purpose of constructors – to implement reusable object creation code.

Let’s note once again – technically, any function (except arrow functions, as they don’t have `this`) can be used as a constructor. It can be run with `new`, and it will execute the algorithm above. The “capital letter first” is a common agreement, to make it clear that a function is to be run with `new`.

<span class="important__type">new function() { … }</span>

If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:

    // create a function and immediately call it with new
    let user = new function() {
      this.name = "John";
      this.isAdmin = false;

      // ...other code for user creation
      // maybe complex logic and statements
      // local variables etc
    };

This constructor can’t be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.

## <a href="constructor-new.html#constructor-mode-test-new-target" id="constructor-mode-test-new-target" class="main__anchor">Constructor mode test: new.target</a>

<span class="important__type">Advanced stuff</span>

The syntax from this section is rarely used, skip it unless you want to know everything.

Inside a function, we can check whether it was called with `new` or without it, using a special `new.target` property.

It is undefined for regular calls and equals the function if called with `new`:

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    function User() {
      alert(new.target);
    }

    // without "new":
    User(); // undefined

    // with "new":
    new User(); // function User { ... }

That can be used inside the function to know whether it was called with `new`, “in constructor mode”, or without it, “in regular mode”.

We can also make both `new` and regular calls to do the same, like this:

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    function User(name) {
      if (!new.target) { // if you run me without new
        return new User(name); // ...I will add new for you
      }

      this.name = name;
    }

    let john = User("John"); // redirects call to new User
    alert(john.name); // John

This approach is sometimes used in libraries to make the syntax more flexible. So that people may call the function with or without `new`, and it still works.

Probably not a good thing to use everywhere though, because omitting `new` makes it a bit less obvious what’s going on. With `new` we all know that the new object is being created.

## <a href="constructor-new.html#return-from-constructors" id="return-from-constructors" class="main__anchor">Return from constructors</a>

Usually, constructors do not have a `return` statement. Their task is to write all necessary stuff into `this`, and it automatically becomes the result.

But if there is a `return` statement, then the rule is simple:

- If `return` is called with an object, then the object is returned instead of `this`.
- If `return` is called with a primitive, it’s ignored.

In other words, `return` with an object returns that object, in all other cases `this` is returned.

For instance, here `return` overrides `this` by returning an object:

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    function BigUser() {

      this.name = "John";

      return { name: "Godzilla" };  // <-- returns this object
    }

    alert( new BigUser().name );  // Godzilla, got that object

And here’s an example with an empty `return` (or we could place a primitive after it, doesn’t matter):

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    function SmallUser() {

      this.name = "John";

      return; // <-- returns this
    }

    alert( new SmallUser().name );  // John

Usually constructors don’t have a `return` statement. Here we mention the special behavior with returning objects mainly for the sake of completeness.

<span class="important__type">Omitting parentheses</span>

By the way, we can omit parentheses after `new`, if it has no arguments:

    let user = new User; // <-- no parentheses
    // same as
    let user = new User();

Omitting parentheses here is not considered a “good style”, but the syntax is permitted by specification.

## <a href="constructor-new.html#methods-in-constructor" id="methods-in-constructor" class="main__anchor">Methods in constructor</a>

Using constructor functions to create objects gives a great deal of flexibility. The constructor function may have parameters that define how to construct the object, and what to put in it.

Of course, we can add to `this` not only properties, but methods as well.

For instance, `new User(name)` below creates an object with the given `name` and the method `sayHi`:

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    function User(name) {
      this.name = name;

      this.sayHi = function() {
        alert( "My name is: " + this.name );
      };
    }

    let john = new User("John");

    john.sayHi(); // My name is: John

    /*
    john = {
       name: "John",
       sayHi: function() { ... }
    }
    */

To create complex objects, there’s a more advanced syntax, [classes](classes.html), that we’ll cover later.

## <a href="constructor-new.html#summary" id="summary" class="main__anchor">Summary</a>

- Constructor functions or, briefly, constructors, are regular functions, but there’s a common agreement to name them with capital letter first.
- Constructor functions should only be called using `new`. Such a call implies a creation of empty `this` at the start and returning the populated one at the end.

We can use constructor functions to make multiple similar objects.

JavaScript provides constructor functions for many built-in language objects: like `Date` for dates, `Set` for sets and others that we plan to study.

<span class="important__type">Objects, we’ll be back!</span>

In this chapter we only cover the basics about objects and constructors. They are essential for learning more about data types and functions in the next chapters.

After we learn that, we return to objects and cover them in-depth in the chapters [Prototypes, inheritance](prototypes.html) and [Classes](classes.html).

## <a href="constructor-new.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="constructor-new.html#two-functions--one-object" id="two-functions--one-object" class="main__anchor">Two functions – one object</a>

<a href="task/two-functions-one-object.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Is it possible to create functions `A` and `B` so that `new A() == new B()`?

    function A() { ... }
    function B() { ... }

    let a = new A;
    let b = new B;

    alert( a == b ); // true

If it is, then provide an example of their code.

solution

Yes, it’s possible.

If a function returns an object then `new` returns it instead of `this`.

So they can, for instance, return the same externally defined object `obj`:

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    let obj = {};

    function A() { return obj; }
    function B() { return obj; }

    alert( new A() == new B() ); // true

### <a href="constructor-new.html#create-new-calculator" id="create-new-calculator" class="main__anchor">Create new Calculator</a>

<a href="task/calculator-constructor.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a constructor function `Calculator` that creates objects with 3 methods:

- `read()` asks for two values using `prompt` and remembers them in object properties.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.

For instance:

    let calculator = new Calculator();
    calculator.read();

    alert( "Sum=" + calculator.sum() );
    alert( "Mul=" + calculator.mul() );

[Run the demo](constructor-new.html#)

[Open a sandbox with tests.](https://plnkr.co/edit/Fno25vMDXjQGEJuY?p=preview)

solution

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    function Calculator() {

      this.read = function() {
        this.a = +prompt('a?', 0);
        this.b = +prompt('b?', 0);
      };

      this.sum = function() {
        return this.a + this.b;
      };

      this.mul = function() {
        return this.a * this.b;
      };
    }

    let calculator = new Calculator();
    calculator.read();

    alert( "Sum=" + calculator.sum() );
    alert( "Mul=" + calculator.mul() );

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/EMihuTt1LLUEh60f?p=preview)

### <a href="constructor-new.html#create-new-accumulator" id="create-new-accumulator" class="main__anchor">Create new Accumulator</a>

<a href="task/accumulator.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a constructor function `Accumulator(startingValue)`.

Object that it creates should:

- Store the “current value” in the property `value`. The starting value is set to the argument of the constructor `startingValue`.
- The `read()` method should use `prompt` to read a new number and add it to `value`.

In other words, the `value` property is the sum of all user-entered values with the initial value `startingValue`.

Here’s the demo of the code:

    let accumulator = new Accumulator(1); // initial value 1

    accumulator.read(); // adds the user-entered value
    accumulator.read(); // adds the user-entered value

    alert(accumulator.value); // shows the sum of these values

[Run the demo](constructor-new.html#)

[Open a sandbox with tests.](https://plnkr.co/edit/uuDv6NABOHIU6hgU?p=preview)

solution

<a href="constructor-new.html#"
<a href="constructor-new.html#"

    function Accumulator(startingValue) {
      this.value = startingValue;

      this.read = function() {
        this.value += +prompt('How much to add?', 0);
      };

    }

    let accumulator = new Accumulator(1);
    accumulator.read();
    accumulator.read();
    alert(accumulator.value);

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/4izv43LoZxeOmEa0?p=preview)

<a href="object-methods.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="optional-chaining.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fconstructor-new" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fconstructor-new" </a>

<a href="tutorial/map.html" class="map">

## <a href="constructor-new.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="object-basics.html" class="sidebar__link">Objects: the basics</a>

#### Lesson navigation

- <a href="constructor-new.html#constructor-function" class="sidebar__link">Constructor function</a>
- <a href="constructor-new.html#constructor-mode-test-new-target" class="sidebar__link">Constructor mode test: new.target</a>
- <a href="constructor-new.html#return-from-constructors" class="sidebar__link">Return from constructors</a>
- <a href="constructor-new.html#methods-in-constructor" class="sidebar__link">Methods in constructor</a>
- <a href="constructor-new.html#summary" class="sidebar__link">Summary</a>

- <a href="constructor-new.html#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="constructor-new.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fconstructor-new" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fconstructor-new" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/04-object-basics/06-constructor-new" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
