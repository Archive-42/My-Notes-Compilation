EN

- <a href="https://ar.javascript.info/prototype-inheritance"
- <a href="prototype-inheritance.html"
- <a href="https://es.javascript.info/prototype-inheritance"
- <a href="https://fr.javascript.info/prototype-inheritance"
- prototype-inheritance"
  prototype-inheritance"

<!-- -->

- /prototype-inheritance"
- <a href=prototype-inheritance"
- <a href="https://tr.javascript.info/prototype-inheritance"
- <a href="https://zh.javascript.info/prototype-inheritance"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fprototype-inheritance" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprototype-inheritance" </a>

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="prototypes.html" Prototypes, inheritance</span></a></span>

24th April 2021

# Prototypal inheritance

In programming, we often want to take something and extend it.

For instance, we have a `user` object with its properties and methods, and want to make `admin` and `guest` as slightly modified variants of it. We’d like to reuse what we have in `user`, not copy/reimplement its methods, just build a new object on top of it.

_Prototypal inheritance_ is a language feature that helps in that.

## <a href="prototype-inheritance.html#prototype" id="prototype" class="main__anchor">[[Prototype]]</a>

In JavaScript, objects have a special hidden property `[[Prototype]]` (as named in the specification), that is either `null` or references another object. That object is called “a prototype”:

<figure><img src="article/prototype-inheritance/object-prototype-empty.svg" width="191" height="150" /></figure>When we read a property from `object`, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”. And soon we’ll study many examples of such inheritance, as well as cooler language features built upon it.

The property `[[Prototype]]` is internal and hidden, but there are many ways to set it.

One of them is to use the special name `__proto__`, like this:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let animal = {
      eats: true
    };
    let rabbit = {
      jumps: true
    };

    rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

Now if we read a property from `rabbit`, and it’s missing, JavaScript will automatically take it from `animal`.

For instance:

    let animal = {
      eats: true
    };
    let rabbit = {
      jumps: true
    };

    rabbit.__proto__ = animal; // (*)

    // we can find both properties in rabbit now:
    alert( rabbit.eats ); // true (**)
    alert( rabbit.jumps ); // true

Here the line `(*)` sets `animal` to be a prototype of `rabbit`.

Then, when `alert` tries to read property `rabbit.eats` `(**)`, it’s not in `rabbit`, so JavaScript follows the `[[Prototype]]` reference and finds it in `animal` (look from the bottom up):

<figure><img src="article/prototype-inheritance/proto-animal-rabbit.svg" width="191" height="150" /></figure>Here we can say that "`animal` is the prototype of `rabbit`" or "`rabbit` prototypically inherits from `animal`".

So if `animal` has a lot of useful properties and methods, then they become automatically available in `rabbit`. Such properties are called “inherited”.

If we have a method in `animal`, it can be called on `rabbit`:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let animal = {
      eats: true,
      walk() {
        alert("Animal walk");
      }
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    // walk is taken from the prototype
    rabbit.walk(); // Animal walk

The method is automatically taken from the prototype, like this:

<figure><img src="article/prototype-inheritance/proto-animal-rabbit-walk.svg" width="205" height="173" /></figure>The prototype chain can be longer:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let animal = {
      eats: true,
      walk() {
        alert("Animal walk");
      }
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    let longEar = {
      earLength: 10,
      __proto__: rabbit
    };

    // walk is taken from the prototype chain
    longEar.walk(); // Animal walk
    alert(longEar.jumps); // true (from rabbit)

<figure><img src="article/prototype-inheritance/proto-animal-rabbit-chain.svg" width="206" height="258" /></figure>Now if we read something from `longEar`, and it’s missing, JavaScript will look for it in `rabbit`, and then in `animal`.

There are only two limitations:

1.  The references can’t go in circles. JavaScript will throw an error if we try to assign `__proto__` in a circle.
2.  The value of `__proto__` can be either an object or `null`. Other types are ignored.

Also it may be obvious, but still: there can be only one `[[Prototype]]`. An object may not inherit from two others.

<span class="important__type">`__proto__` is a historical getter/setter for `[[Prototype]]`</span>

It’s a common mistake of novice developers not to know the difference between these two.

Please note that `__proto__` is _not the same_ as the internal `[[Prototype]]` property. It’s a getter/setter for `[[Prototype]]`. Later we’ll see situations where it matters, for now let’s just keep it in mind, as we build our understanding of JavaScript language.

The `__proto__` property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use `Object.getPrototypeOf/Object.setPrototypeOf` functions instead that get/set the prototype. We’ll also cover these functions later.

By the specification, `__proto__` must only be supported by browsers. In fact though, all environments including server-side support `__proto__`, so we’re quite safe using it.

As the `__proto__` notation is a bit more intuitively obvious, we use it in the examples.

## <a href="prototype-inheritance.html#writing-doesn-t-use-prototype" id="writing-doesn-t-use-prototype" class="main__anchor">Writing doesn’t use prototype</a>

The prototype is only used for reading properties.

Write/delete operations work directly with the object.

In the example below, we assign its own `walk` method to `rabbit`:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let animal = {
      eats: true,
      walk() {
        /* this method won't be used by rabbit */
      }
    };

    let rabbit = {
      __proto__: animal
    };

    rabbit.walk = function() {
      alert("Rabbit! Bounce-bounce!");
    };

    rabbit.walk(); // Rabbit! Bounce-bounce!

From now on, `rabbit.walk()` call finds the method immediately in the object and executes it, without using the prototype:

<figure><img src="article/prototype-inheritance/proto-animal-rabbit-walk-2.svg" width="202" height="173" /></figure>Accessor properties are an exception, as assignment is handled by a setter function. So writing to such a property is actually the same as calling a function.

For that reason `admin.fullName` works correctly in the code below:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let user = {
      name: "John",
      surname: "Smith",

      set fullName(value) {
        [this.name, this.surname] = value.split(" ");
      },

      get fullName() {
        return `${this.name} ${this.surname}`;
      }
    };

    let admin = {
      __proto__: user,
      isAdmin: true
    };

    alert(admin.fullName); // John Smith (*)

    // setter triggers!
    admin.fullName = "Alice Cooper"; // (**)

    alert(admin.fullName); // Alice Cooper, state of admin modified
    alert(user.fullName); // John Smith, state of user protected

Here in the line `(*)` the property `admin.fullName` has a getter in the prototype `user`, so it is called. And in the line `(**)` the property has a setter in the prototype, so it is called.

## <a href="prototype-inheritance.html#the-value-of-this" id="the-value-of-this" class="main__anchor">The value of “this”</a>

An interesting question may arise in the example above: what’s the value of `this` inside `set fullName(value)`? Where are the properties `this.name` and `this.surname` written: into `user` or `admin`?

The answer is simple: `this` is not affected by prototypes at all.

**No matter where the method is found: in an object or its prototype. In a method call, `this` is always the object before the dot.**

So, the setter call `admin.fullName=` uses `admin` as `this`, not `user`.

That is actually a super-important thing, because we may have a big object with many methods, and have objects that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object.

For instance, here `animal` represents a “method storage”, and `rabbit` makes use of it.

The call `rabbit.sleep()` sets `this.isSleeping` on the `rabbit` object:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    // animal has methods
    let animal = {
      walk() {
        if (!this.isSleeping) {
          alert(`I walk`);
        }
      },
      sleep() {
        this.isSleeping = true;
      }
    };

    let rabbit = {
      name: "White Rabbit",
      __proto__: animal
    };

    // modifies rabbit.isSleeping
    rabbit.sleep();

    alert(rabbit.isSleeping); // true
    alert(animal.isSleeping); // undefined (no such property in the prototype)

The resulting picture:

<figure><img src="article/prototype-inheritance/proto-animal-rabbit-walk-3.svg" width="206" height="190" /></figure>If we had other objects, like `bird`, `snake`, etc., inheriting from `animal`, they would also gain access to methods of `animal`. But `this` in each method call would be the corresponding object, evaluated at the call-time (before dot), not `animal`. So when we write data into `this`, it is stored into these objects.

As a result, methods are shared, but the object state is not.

## <a href="prototype-inheritance.html#for-in-loop" id="for-in-loop" class="main__anchor">for…in loop</a>

The `for..in` loop iterates over inherited properties too.

For instance:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let animal = {
      eats: true
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    // Object.keys only returns own keys
    alert(Object.keys(rabbit)); // jumps

    // for..in loops over both own and inherited keys
    for(let prop in rabbit) alert(prop); // jumps, then eats

If that’s not what we want, and we’d like to exclude inherited properties, there’s a built-in method [obj.hasOwnProperty(key)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.

So we can filter out inherited properties (or do something else with them):

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let animal = {
      eats: true
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    for(let prop in rabbit) {
      let isOwn = rabbit.hasOwnProperty(prop);

      if (isOwn) {
        alert(`Our: ${prop}`); // Our: jumps
      } else {
        alert(`Inherited: ${prop}`); // Inherited: eats
      }
    }

Here we have the following inheritance chain: `rabbit` inherits from `animal`, that inherits from `Object.prototype` (because `animal` is a literal object `{...}`, so it’s by default), and then `null` above it:

<figure><img src="article/prototype-inheritance/rabbit-animal-object.svg" width="233" height="344" /></figure>Note, there’s one funny thing. Where is the method `rabbit.hasOwnProperty` coming from? We did not define it. Looking at the chain we can see that the method is provided by `Object.prototype.hasOwnProperty`. In other words, it’s inherited.

…But why does `hasOwnProperty` not appear in the `for..in` loop like `eats` and `jumps` do, if `for..in` lists inherited properties?

The answer is simple: it’s not enumerable. Just like all other properties of `Object.prototype`, it has `enumerable:false` flag. And `for..in` only lists enumerable properties. That’s why it and the rest of the `Object.prototype` properties are not listed.

<span class="important__type">Almost all other key/value-getting methods ignore inherited properties</span>

Almost all other key/value-getting methods, such as `Object.keys`, `Object.values` and so on ignore inherited properties.

They only operate on the object itself. Properties from the prototype are _not_ taken into account.

## <a href="prototype-inheritance.html#summary" id="summary" class="main__anchor">Summary</a>

- In JavaScript, all objects have a hidden `[[Prototype]]` property that’s either another object or `null`.
- We can use `obj.__proto__` to access it (a historical getter/setter, there are other ways, to be covered soon).
- The object referenced by `[[Prototype]]` is called a “prototype”.
- If we want to read a property of `obj` or call a method, and it doesn’t exist, then JavaScript tries to find it in the prototype.
- Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).
- If we call `obj.method()`, and the `method` is taken from the prototype, `this` still references `obj`. So methods always work with the current object even if they are inherited.
- The `for..in` loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.

## <a href="prototype-inheritance.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="prototype-inheritance.html#working-with-prototype" id="working-with-prototype" class="main__anchor">Working with prototype</a>

<a href="task/property-after-delete.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here’s the code that creates a pair of objects, then modifies them.

Which values are shown in the process?

    let animal = {
      jumps: null
    };
    let rabbit = {
      __proto__: animal,
      jumps: true
    };

    alert( rabbit.jumps ); // ? (1)

    delete rabbit.jumps;

    alert( rabbit.jumps ); // ? (2)

    delete animal.jumps;

    alert( rabbit.jumps ); // ? (3)

There should be 3 answers.

solution

1.  `true`, taken from `rabbit`.
2.  `null`, taken from `animal`.
3.  `undefined`, there’s no such property any more.

### <a href="prototype-inheritance.html#searching-algorithm" id="searching-algorithm" class="main__anchor">Searching algorithm</a>

<a href="task/search-algorithm.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The task has two parts.

Given the following objects:

    let head = {
      glasses: 1
    };

    let table = {
      pen: 3
    };

    let bed = {
      sheet: 1,
      pillow: 2
    };

    let pockets = {
      money: 2000
    };

1.  Use `__proto__` to assign prototypes in a way that any property lookup will follow the path: `pockets` → `bed` → `table` → `head`. For instance, `pockets.pen` should be `3` (found in `table`), and `bed.glasses` should be `1` (found in `head`).
2.  Answer the question: is it faster to get `glasses` as `pockets.glasses` or `head.glasses`? Benchmark if needed.

solution

1.  Let’s add `__proto__`:

    <a href="prototype-inheritance.html#"
    <a href="prototype-inheritance.html#"

        let head = {
          glasses: 1
        };

        let table = {
          pen: 3,
          __proto__: head
        };

        let bed = {
          sheet: 1,
          pillow: 2,
          __proto__: table
        };

        let pockets = {
          money: 2000,
          __proto__: bed
        };

        alert( pockets.pen ); // 3
        alert( bed.glasses ); // 1
        alert( table.money ); // undefined

2.  In modern engines, performance-wise, there’s no difference whether we take a property from an object or its prototype. They remember where the property was found and reuse it in the next request.

    For instance, for `pockets.glasses` they remember where they found `glasses` (in `head`), and next time will search right there. They are also smart enough to update internal caches if something changes, so that optimization is safe.

### <a href="prototype-inheritance.html#where-does-it-write" id="where-does-it-write" class="main__anchor">Where does it write?</a>

<a href="task/proto-and-this.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have `rabbit` inheriting from `animal`.

If we call `rabbit.eat()`, which object receives the `full` property: `animal` or `rabbit`?

    let animal = {
      eat() {
        this.full = true;
      }
    };

    let rabbit = {
      __proto__: animal
    };

    rabbit.eat();

solution

**The answer: `rabbit`.**

That’s because `this` is an object before the dot, so `rabbit.eat()` modifies `rabbit`.

Property lookup and execution are two different things.

The method `rabbit.eat` is first found in the prototype, then executed with `this=rabbit`.

### <a href="prototype-inheritance.html#why-are-both-hamsters-full" id="why-are-both-hamsters-full" class="main__anchor">Why are both hamsters full?</a>

<a href="task/hamster-proto.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have two hamsters: `speedy` and `lazy` inheriting from the general `hamster` object.

When we feed one of them, the other one is also full. Why? How can we fix it?

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let hamster = {
      stomach: [],

      eat(food) {
        this.stomach.push(food);
      }
    };

    let speedy = {
      __proto__: hamster
    };

    let lazy = {
      __proto__: hamster
    };

    // This one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // This one also has it, why? fix please.
    alert( lazy.stomach ); // apple

solution

Let’s look carefully at what’s going on in the call `speedy.eat("apple")`.

1.  The method `speedy.eat` is found in the prototype (`=hamster`), then executed with `this=speedy` (the object before the dot).

2.  Then `this.stomach.push()` needs to find `stomach` property and call `push` on it. It looks for `stomach` in `this` (`=speedy`), but nothing found.

3.  Then it follows the prototype chain and finds `stomach` in `hamster`.

4.  Then it calls `push` on it, adding the food into _the stomach of the prototype_.

So all hamsters share a single stomach!

Both for `lazy.stomach.push(...)` and `speedy.stomach.push()`, the property `stomach` is found in the prototype (as it’s not in the object itself), then the new data is pushed into it.

Please note that such thing doesn’t happen in case of a simple assignment `this.stomach=`:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let hamster = {
      stomach: [],

      eat(food) {
        // assign to this.stomach instead of this.stomach.push
        this.stomach = [food];
      }
    };

    let speedy = {
       __proto__: hamster
    };

    let lazy = {
      __proto__: hamster
    };

    // Speedy one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // Lazy one's stomach is empty
    alert( lazy.stomach ); // <nothing>

Now all works fine, because `this.stomach=` does not perform a lookup of `stomach`. The value is written directly into `this` object.

Also we can totally avoid the problem by making sure that each hamster has their own stomach:

<a href="prototype-inheritance.html#"
<a href="prototype-inheritance.html#"

    let hamster = {
      stomach: [],

      eat(food) {
        this.stomach.push(food);
      }
    };

    let speedy = {
      __proto__: hamster,
      stomach: []
    };

    let lazy = {
      __proto__: hamster,
      stomach: []
    };

    // Speedy one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // Lazy one's stomach is empty
    alert( lazy.stomach ); // <nothing>

As a common solution, all properties that describe the state of a particular object, like `stomach` above, should be written into that object. That prevents such problems.

<a href="prototypes.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="function-prototype.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fprototype-inheritance" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprototype-inheritance" </a>

<a href="tutorial/map.html" class="map">

## <a href="prototype-inheritance.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="prototypes.html" class="sidebar__link">Prototypes, inheritance</a>

#### Lesson navigation

- <a href="prototype-inheritance.html#prototype" class="sidebar__link">[[Prototype]]</a>
- <a href="prototype-inheritance.html#writing-doesn-t-use-prototype" class="sidebar__link">Writing doesn’t use prototype</a>
- <a href="prototype-inheritance.html#the-value-of-this" class="sidebar__link">The value of “this”</a>
- <a href="prototype-inheritance.html#for-in-loop" class="sidebar__link">for…in loop</a>
- <a href="prototype-inheritance.html#summary" class="sidebar__link">Summary</a>

- <a href="prototype-inheritance.html#tasks" class="sidebar__link">Tasks (4)</a>
- <a href="prototype-inheritance.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fprototype-inheritance" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fprototype-inheritance" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/08-prototypes/01-prototype-inheritance" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
