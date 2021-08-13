EN

- <a href="https://ar.javascript.info/static-properties-methods"
- <a href="static-properties-methods.html"
- <a href="https://es.javascript.info/static-properties-methods"
- <a href="https://fr.javascript.info/static-properties-methods"
- static-properties-methods"
  static-properties-methods"

<!-- -->

- /static-properties-methods"
- <a href=static-properties-methods"
- <a href="https://tr.javascript.info/static-properties-methods"
- <a href="https://zh.javascript.info/static-properties-methods"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fstatic-properties-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstatic-properties-methods" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="classes.html" Classes</span></a></span>

4th February 2021

# Static properties and methods

We can also assign a method to the class function itself, not to its `"prototype"`. Such methods are called _static_.

In a class, they are prepended by `static` keyword, like this:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class User {
      static staticMethod() {
        alert(this === User);
      }
    }

    User.staticMethod(); // true

That actually does the same as assigning it as a property directly:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class User { }

    User.staticMethod = function() {
      alert(this === User);
    };

    User.staticMethod(); // true

The value of `this` in `User.staticMethod()` call is the class constructor `User` itself (the “object before dot” rule).

Usually, static methods are used to implement functions that belong to the class, but not to any particular object of it.

For instance, we have `Article` objects and need a function to compare them. A natural solution would be to add `Article.compare` method, like this:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Article {
      constructor(title, date) {
        this.title = title;
        this.date = date;
      }

      static compare(articleA, articleB) {
        return articleA.date - articleB.date;
      }
    }

    // usage
    let articles = [
      new Article("HTML", new Date(2019, 1, 1)),
      new Article("CSS", new Date(2019, 0, 1)),
      new Article("JavaScript", new Date(2019, 11, 1))
    ];

    articles.sort(Article.compare);

    alert( articles[0].title ); // CSS

Here `Article.compare` stands “above” articles, as a means to compare them. It’s not a method of an article, but rather of the whole class.

Another example would be a so-called “factory” method. Imagine, we need few ways to create an article:

1.  Create by given parameters (`title`, `date` etc).
2.  Create an empty article with today’s date.
3.  …or else somehow.

The first way can be implemented by the constructor. And for the second one we can make a static method of the class.

Like `Article.createTodays()` here:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Article {
      constructor(title, date) {
        this.title = title;
        this.date = date;
      }

      static createTodays() {
        // remember, this = Article
        return new this("Today's digest", new Date());
      }
    }

    let article = Article.createTodays();

    alert( article.title ); // Today's digest

Now every time we need to create a today’s digest, we can call `Article.createTodays()`. Once again, that’s not a method of an article, but a method of the whole class.

Static methods are also used in database-related classes to search/save/remove entries from the database, like this:

    // assuming Article is a special class for managing articles
    // static method to remove the article:
    Article.remove({id: 12345});

## <a href="static-properties-methods.html#static-properties" id="static-properties" class="main__anchor">Static properties</a>

<span class="important__type">A recent addition</span>

This is a recent addition to the language. Examples work in the recent Chrome.

Static properties are also possible, they look like regular class properties, but prepended by `static`:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Article {
      static publisher = "Ilya Kantor";
    }

    alert( Article.publisher ); // Ilya Kantor

That is the same as a direct assignment to `Article`:

    Article.publisher = "Ilya Kantor";

## <a href="static-properties-methods.html#statics-and-inheritance" id="statics-and-inheritance" class="main__anchor">Inheritance of static properties and methods</a>

Static properties and methods are inherited.

For instance, `Animal.compare` and `Animal.planet` in the code below are inherited and accessible as `Rabbit.compare` and `Rabbit.planet`:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Animal {
      static planet = "Earth";

      constructor(name, speed) {
        this.speed = speed;
        this.name = name;
      }

      run(speed = 0) {
        this.speed += speed;
        alert(`${this.name} runs with speed ${this.speed}.`);
      }

      static compare(animalA, animalB) {
        return animalA.speed - animalB.speed;
      }

    }

    // Inherit from Animal
    class Rabbit extends Animal {
      hide() {
        alert(`${this.name} hides!`);
      }
    }

    let rabbits = [
      new Rabbit("White Rabbit", 10),
      new Rabbit("Black Rabbit", 5)
    ];

    rabbits.sort(Rabbit.compare);

    rabbits[0].run(); // Black Rabbit runs with speed 5.

    alert(Rabbit.planet); // Earth

Now when we call `Rabbit.compare`, the inherited `Animal.compare` will be called.

How does it work? Again, using prototypes. As you might have already guessed, `extends` gives `Rabbit` the `[[Prototype]]` reference to `Animal`.

<figure><img src="article/static-properties-methods/animal-rabbit-static.svg" width="461" height="316" /></figure>So, `Rabbit extends Animal` creates two `[[Prototype]]` references:

1.  `Rabbit` function prototypally inherits from `Animal` function.
2.  `Rabbit.prototype` prototypally inherits from `Animal.prototype`.

As a result, inheritance works both for regular and static methods.

Here, let’s check that by code:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Animal {}
    class Rabbit extends Animal {}

    // for statics
    alert(Rabbit.__proto__ === Animal); // true

    // for regular methods
    alert(Rabbit.prototype.__proto__ === Animal.prototype); // true

## <a href="static-properties-methods.html#summary" id="summary" class="main__anchor">Summary</a>

Static methods are used for the functionality that belongs to the class “as a whole”. It doesn’t relate to a concrete class instance.

For example, a method for comparison `Article.compare(article1, article2)` or a factory method `Article.createTodays()`.

They are labeled by the word `static` in class declaration.

Static properties are used when we’d like to store class-level data, also not bound to an instance.

The syntax is:

    class MyClass {
      static property = ...;

      static method() {
        ...
      }
    }

Technically, static declaration is the same as assigning to the class itself:

    MyClass.property = ...
    MyClass.method = ...

Static properties and methods are inherited.

For `class B extends A` the prototype of the class `B` itself points to `A`: `B.[[Prototype]] = A`. So if a field is not found in `B`, the search continues in `A`.

## <a href="static-properties-methods.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="static-properties-methods.html#class-extends-object" id="class-extends-object" class="main__anchor">Class extends Object?</a>

<a href="task/class-extend-object.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

As we know, all objects normally inherit from `Object.prototype` and get access to “generic” object methods like `hasOwnProperty` etc.

For instance:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit {
      constructor(name) {
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    // hasOwnProperty method is from Object.prototype
    alert( rabbit.hasOwnProperty('name') ); // true

But if we spell it out explicitly like `"class Rabbit extends Object"`, then the result would be different from a simple `"class Rabbit"`?

What’s the difference?

Here’s an example of such code (it doesn’t work – why? fix it?):

    class Rabbit extends Object {
      constructor(name) {
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    alert( rabbit.hasOwnProperty('name') ); // Error

solution

First, let’s see why the latter code doesn’t work.

The reason becomes obvious if we try to run it. An inheriting class constructor must call `super()`. Otherwise `"this"` won’t be “defined”.

So here’s the fix:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {
      constructor(name) {
        super(); // need to call the parent constructor when inheriting
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    alert( rabbit.hasOwnProperty('name') ); // true

But that’s not all yet.

Even after the fix, there’s still important difference in `"class Rabbit extends Object"` versus `class Rabbit`.

As we know, the “extends” syntax sets up two prototypes:

1.  Between `"prototype"` of the constructor functions (for methods).
2.  Between the constructor functions themselves (for static methods).

In our case, for `class Rabbit extends Object` it means:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {}

    alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
    alert( Rabbit.__proto__ === Object ); // (2) true

So `Rabbit` now provides access to static methods of `Object` via `Rabbit`, like this:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {}

    // normally we call Object.getOwnPropertyNames
    alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b

But if we don’t have `extends Object`, then `Rabbit.__proto__` is not set to `Object`.

Here’s the demo:

<a href="static-properties-methods.html#"
<a href="static-properties-methods.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit {}

    alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
    alert( Rabbit.__proto__ === Object ); // (2) false (!)
    alert( Rabbit.__proto__ === Function.prototype ); // as any function by default

    // error, no such function in Rabbit
    alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error

So `Rabbit` doesn’t provide access to static methods of `Object` in that case.

By the way, `Function.prototype` has “generic” function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.

Here’s the picture:

<figure><img src="task/class-extend-object/rabbit-extends-object.svg" width="458" height="344" /></figure>So, to put it short, there are two differences:

<table><thead><tr class="header"><th>class Rabbit</th><th>class Rabbit extends Object</th></tr></thead><tbody><tr class="odd"><td>–</td><td>needs to call <code>super()</code> in constructor</td></tr><tr class="even"><td><code>Rabbit.__proto__ === Function.prototype</code></td><td><code>Rabbit.__proto__ === Object</code></td></tr></tbody></table>

<a href="class-inheritance.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="private-protected-properties-methods.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fstatic-properties-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstatic-properties-methods" </a>

<a href="tutorial/map.html" class="map">

## <a href="static-properties-methods.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="classes.html" class="sidebar__link">Classes</a>

#### Lesson navigation

- <a href="static-properties-methods.html#static-properties" class="sidebar__link">Static properties</a>
- <a href="static-properties-methods.html#statics-and-inheritance" class="sidebar__link">Inheritance of static properties and methods</a>
- <a href="static-properties-methods.html#summary" class="sidebar__link">Summary</a>

- <a href="static-properties-methods.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="static-properties-methods.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fstatic-properties-methods" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fstatic-properties-methods" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/09-classes/03-static-properties-methods" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
