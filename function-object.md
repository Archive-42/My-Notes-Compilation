EN

- <a href="https://ar.javascript.info/function-object"
- <a href="function-object.html"
- <a href="https://es.javascript.info/function-object"
- <a href="https://fr.javascript.info/function-object"
- <a href="https://it.javascript.info/function-object"
  function-object"

<!-- -->

- <a href="https://ko.javascript.info/function-object"
- <a href=function-object"
- <a href="https://tr.javascript.info/function-object"
- <a href="https://zh.javascript.info/function-object"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffunction-object" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-object" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" Advanced working with functions</span></a></span>

24th March 2021

# Function object, NFE

As we already know, a function in JavaScript is a value.

Every value in JavaScript has a type. What type is a function?

In JavaScript, functions are objects.

A good way to imagine functions is as callable “action objects”. We can not only call them, but also treat them as objects: add/remove properties, pass by reference etc.

## <a href="function-object.html#the-name-property" id="the-name-property" class="main__anchor">The “name” property</a>

Function objects contain some useable properties.

For instance, a function’s name is accessible as the “name” property:

<a href="function-object.html#"
<a href="function-object.html#"

    function sayHi() {
      alert("Hi");
    }

    alert(sayHi.name); // sayHi

What’s kind of funny, the name-assigning logic is smart. It also assigns the correct name to a function even if it’s created without one, and then immediately assigned:

<a href="function-object.html#"
<a href="function-object.html#"

    let sayHi = function() {
      alert("Hi");
    };

    alert(sayHi.name); // sayHi (there's a name!)

It also works if the assignment is done via a default value:

<a href="function-object.html#"
<a href="function-object.html#"

    function f(sayHi = function() {}) {
      alert(sayHi.name); // sayHi (works!)
    }

    f();

In the specification, this feature is called a “contextual name”. If the function does not provide one, then in an assignment it is figured out from the context.

Object methods have names too:

<a href="function-object.html#"
<a href="function-object.html#"

    let user = {

      sayHi() {
        // ...
      },

      sayBye: function() {
        // ...
      }

    }

    alert(user.sayHi.name); // sayHi
    alert(user.sayBye.name); // sayBye

There’s no magic though. There are cases when there’s no way to figure out the right name. In that case, the name property is empty, like here:

<a href="function-object.html#"
<a href="function-object.html#"

    // function created inside array
    let arr = [function() {}];

    alert( arr[0].name ); // <empty string>
    // the engine has no way to set up the right name, so there is none

In practice, however, most functions do have a name.

## <a href="function-object.html#the-length-property" id="the-length-property" class="main__anchor">The “length” property</a>

There is another built-in property “length” that returns the number of function parameters, for instance:

<a href="function-object.html#"
<a href="function-object.html#"

    function f1(a) {}
    function f2(a, b) {}
    function many(a, b, ...more) {}

    alert(f1.length); // 1
    alert(f2.length); // 2
    alert(many.length); // 2

Here we can see that rest parameters are not counted.

The `length` property is sometimes used for [introspection](https://en.wikipedia.org/wiki/Type_introspection) in functions that operate on other functions.

For instance, in the code below the `ask` function accepts a `question` to ask and an arbitrary number of `handler` functions to call.

Once a user provides their answer, the function calls the handlers. We can pass two kinds of handlers:

- A zero-argument function, which is only called when the user gives a positive answer.
- A function with arguments, which is called in either case and returns an answer.

To call `handler` the right way, we examine the `handler.length` property.

The idea is that we have a simple, no-arguments handler syntax for positive cases (most frequent variant), but are able to support universal handlers as well:

<a href="function-object.html#"
<a href="function-object.html#"

    function ask(question, ...handlers) {
      let isYes = confirm(question);

      for(let handler of handlers) {
        if (handler.length == 0) {
          if (isYes) handler();
        } else {
          handler(isYes);
        }
      }

    }

    // for positive answer, both handlers are called
    // for negative answer, only the second one
    ask("Question?", () => alert('You said yes'), result => alert(result));

This is a particular case of so-called [polymorphism](<https://en.wikipedia.org/wiki/Polymorphism_(computer_science)>) – treating arguments differently depending on their type or, in our case depending on the `length`. The idea does have a use in JavaScript libraries.

## <a href="function-object.html#custom-properties" id="custom-properties" class="main__anchor">Custom properties</a>

We can also add properties of our own.

Here we add the `counter` property to track the total calls count:

<a href="function-object.html#"
<a href="function-object.html#"

    function sayHi() {
      alert("Hi");

      // let's count how many times we run
      sayHi.counter++;
    }
    sayHi.counter = 0; // initial value

    sayHi(); // Hi
    sayHi(); // Hi

    alert( `Called ${sayHi.counter} times` ); // Called 2 times

<span class="important__type">A property is not a variable</span>

A property assigned to a function like `sayHi.counter = 0` does _not_ define a local variable `counter` inside it. In other words, a property `counter` and a variable `let counter` are two unrelated things.

We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables are not function properties and vice versa. These are just parallel worlds.

Function properties can replace closures sometimes. For instance, we can rewrite the counter function example from the chapter [Variable scope, closure](closure.html) to use a function property:

<a href="function-object.html#"
<a href="function-object.html#"

    function makeCounter() {
      // instead of:
      // let count = 0

      function counter() {
        return counter.count++;
      };

      counter.count = 0;

      return counter;
    }

    let counter = makeCounter();
    alert( counter() ); // 0
    alert( counter() ); // 1

The `count` is now stored in the function directly, not in its outer Lexical Environment.

Is it better or worse than using a closure?

The main difference is that if the value of `count` lives in an outer variable, then external code is unable to access it. Only nested functions may modify it. And if it’s bound to a function, then such a thing is possible:

<a href="function-object.html#"
<a href="function-object.html#"

    function makeCounter() {

      function counter() {
        return counter.count++;
      };

      counter.count = 0;

      return counter;
    }

    let counter = makeCounter();

    counter.count = 10;
    alert( counter() ); // 10

So the choice of implementation depends on our aims.

## <a href="function-object.html#named-function-expression" id="named-function-expression" class="main__anchor">Named Function Expression</a>

Named Function Expression, or NFE, is a term for Function Expressions that have a name.

For instance, let’s take an ordinary Function Expression:

    let sayHi = function(who) {
      alert(`Hello, ${who}`);
    };

And add a name to it:

    let sayHi = function func(who) {
      alert(`Hello, ${who}`);
    };

Did we achieve anything here? What’s the purpose of that additional `"func"` name?

First let’s note, that we still have a Function Expression. Adding the name `"func"` after `function` did not make it a Function Declaration, because it is still created as a part of an assignment expression.

Adding such a name also did not break anything.

The function is still available as `sayHi()`:

<a href="function-object.html#"
<a href="function-object.html#"

    let sayHi = function func(who) {
      alert(`Hello, ${who}`);
    };

    sayHi("John"); // Hello, John

There are two special things about the name `func`, that are the reasons for it:

1.  It allows the function to reference itself internally.
2.  It is not visible outside of the function.

For instance, the function `sayHi` below calls itself again with `"Guest"` if no `who` is provided:

<a href="function-object.html#"
<a href="function-object.html#"

    let sayHi = function func(who) {
      if (who) {
        alert(`Hello, ${who}`);
      } else {
        func("Guest"); // use func to re-call itself
      }
    };

    sayHi(); // Hello, Guest

    // But this won't work:
    func(); // Error, func is not defined (not visible outside of the function)

Why do we use `func`? Maybe just use `sayHi` for the nested call?

Actually, in most cases we can:

    let sayHi = function(who) {
      if (who) {
        alert(`Hello, ${who}`);
      } else {
        sayHi("Guest");
      }
    };

The problem with that code is that `sayHi` may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors:

<a href="function-object.html#"
<a href="function-object.html#"

    let sayHi = function(who) {
      if (who) {
        alert(`Hello, ${who}`);
      } else {
        sayHi("Guest"); // Error: sayHi is not a function
      }
    };

    let welcome = sayHi;
    sayHi = null;

    welcome(); // Error, the nested sayHi call doesn't work any more!

That happens because the function takes `sayHi` from its outer lexical environment. There’s no local `sayHi`, so the outer variable is used. And at the moment of the call that outer `sayHi` is `null`.

The optional name which we can put into the Function Expression is meant to solve exactly these kinds of problems.

Let’s use it to fix our code:

<a href="function-object.html#"
<a href="function-object.html#"

    let sayHi = function func(who) {
      if (who) {
        alert(`Hello, ${who}`);
      } else {
        func("Guest"); // Now all fine
      }
    };

    let welcome = sayHi;
    sayHi = null;

    welcome(); // Hello, Guest (nested call works)

Now it works, because the name `"func"` is function-local. It is not taken from outside (and not visible there). The specification guarantees that it will always reference the current function.

The outer code still has its variable `sayHi` or `welcome`. And `func` is an “internal function name”, how the function can call itself internally.

<span class="important__type">There’s no such thing for Function Declaration</span>

The “internal name” feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an “internal” name.

Sometimes, when we need a reliable internal name, it’s the reason to rewrite a Function Declaration to Named Function Expression form.

## <a href="function-object.html#summary" id="summary" class="main__anchor">Summary</a>

Functions are objects.

Here we covered their properties:

- `name` – the function name. Usually taken from the function definition, but if there’s none, JavaScript tries to guess it from the context (e.g. an assignment).
- `length` – the number of arguments in the function definition. Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript libraries make great use of this feature.

They create a “main” function and attach many other “helper” functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.

So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.

## <a href="function-object.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="function-object.html#set-and-decrease-for-counter" id="set-and-decrease-for-counter" class="main__anchor">Set and decrease for counter</a>

<a href="task/counter-inc-dec.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Modify the code of `makeCounter()` so that the counter can also decrease and set the number:

- `counter()` should return the next number (as before).
- `counter.set(value)` should set the counter to `value`.
- `counter.decrease()` should decrease the counter by 1.

See the sandbox code for the complete usage example.

P.S. You can use either a closure or the function property to keep the current count. Or write both variants.

[Open a sandbox with tests.](https://plnkr.co/edit/HBAN4ld5Safqp4RC?p=preview)

solution

The solution uses `count` in the local variable, but addition methods are written right into the `counter`. They share the same outer lexical environment and also can access the current `count`.

    function makeCounter() {
      let count = 0;

      function counter() {
        return count++;
      }

      counter.set = value => count = value;

      counter.decrease = () => count--;

      return counter;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/lR5zyNZWB0tPaHWk?p=preview)

### <a href="function-object.html#sum-with-an-arbitrary-amount-of-brackets" id="sum-with-an-arbitrary-amount-of-brackets" class="main__anchor">Sum with an arbitrary amount of brackets</a>

<a href="task/sum-many-brackets.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Write function `sum` that would work like this:

    sum(1)(2) == 3; // 1 + 2
    sum(1)(2)(3) == 6; // 1 + 2 + 3
    sum(5)(-1)(2) == 6
    sum(6)(-1)(-2)(-3) == 0
    sum(0)(1)(2)(3)(4)(5) == 15

P.S. Hint: you may need to setup custom object to primitive conversion for your function.

[Open a sandbox with tests.](https://plnkr.co/edit/kVNFxRy62DeMwhnX?p=preview)

solution

1.  For the whole thing to work _anyhow_, the result of `sum` must be function.
2.  That function must keep in memory the current value between calls.
3.  According to the task, the function must become the number when used in `==`. Functions are objects, so the conversion happens as described in the chapter [Object to primitive conversion](object-toprimitive.html), and we can provide our own method that returns the number.

Now the code:

<a href="function-object.html#"
<a href="function-object.html#"

    function sum(a) {

      let currentSum = a;

      function f(b) {
        currentSum += b;
        return f;
      }

      f.toString = function() {
        return currentSum;
      };

      return f;
    }

    alert( sum(1)(2) ); // 3
    alert( sum(5)(-1)(2) ); // 6
    alert( sum(6)(-1)(-2)(-3) ); // 0
    alert( sum(0)(1)(2)(3)(4)(5) ); // 15

Please note that the `sum` function actually works only once. It returns function `f`.

Then, on each subsequent call, `f` adds its parameter to the sum `currentSum`, and returns itself.

**There is no recursion in the last line of `f`.**

Here is what recursion looks like:

    function f(b) {
      currentSum += b;
      return f(); // <-- recursive call
    }

And in our case, we just return the function, without calling it:

    function f(b) {
      currentSum += b;
      return f; // <-- does not call itself, returns itself
    }

This `f` will be used in the next call, again return itself, as many times as needed. Then, when used as a number or a string – the `toString` returns the `currentSum`. We could also use `Symbol.toPrimitive` or `valueOf` here for the conversion.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/XFpaXCfIlo3c6IwB?p=preview)

<a href="global-object.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="new-function.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffunction-object" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-object" </a>

<a href="tutorial/map.html" class="map">

## <a href="function-object.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

- <a href="function-object.html#the-name-property" class="sidebar__link">The “name” property</a>
- <a href="function-object.html#the-length-property" class="sidebar__link">The “length” property</a>
- <a href="function-object.html#custom-properties" class="sidebar__link">Custom properties</a>
- <a href="function-object.html#named-function-expression" class="sidebar__link">Named Function Expression</a>
- <a href="function-object.html#summary" class="sidebar__link">Summary</a>

- <a href="function-object.html#tasks" class="sidebar__link">Tasks (2)</a>
- <a href="function-object.html#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffunction-object" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-object" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/06-function-object" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
