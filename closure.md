EN

-   <a href="https://ar.javascript.info/closure" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
-   <a href="closure.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
-   <a href="https://es.javascript.info/closure" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
-   <a href="https://it.javascript.info/closure" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
-   <a href="https://ja.javascript.info/closure" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

-   <a href="https://ko.javascript.info/closure" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
-   <a href="closure%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
-   <a href="https://tr.javascript.info/closure" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
-   <a href="https://zh.javascript.info/closure" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<span class="share-icons__title">Share</span>2Fclosure" rel="nofollow" &gt;2Fclosure عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="advanced-functions.html" class="breadcrumbs__link"><span>Advanced working with functions</span></a></span>

26th March 2021

Variable scope, closure
=======================

JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created at any moment, passed as an argument to another function, and then called from a totally different place of code later.

We already know that a function can access variables outside of it (“outer” variables).

But what happens if outer variables change since a function is created? Will the function get newer values or the old ones?

And what if a function is passed along as a parameter and called from another place of code, will it get access to outer variables at the new place?

Let’s expand our knowledge to understand these scenarios and more complex ones.

<span class="important__type">We’ll talk about `let/const` variables here</span>

In JavaScript, there are 3 ways to declare a variable: `let`, `const` (the modern ones), and `var` (the remnant of the past).

-   In this article we’ll use `let` variables in examples.
-   Variables, declared with `const`, behave the same, so this article is about `const` too.
-   The old `var` has some notable differences, they will be covered in the article [The old "var"](var.html).

<a href="closure.html#code-blocks" id="code-blocks" class="main__anchor">Code blocks</a>
----------------------------------------------------------------------------------------

If a variable is declared inside a code block `{...}`, it’s only visible inside that block.

For example:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    {
      // do some job with local variables that should not be seen outside

      let message = "Hello"; // only visible in this block

      alert(message); // Hello
    }

    alert(message); // Error: message is not defined

We can use this to isolate a piece of code that does its own task, with variables that only belong to it:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    {
      // show message
      let message = "Hello";
      alert(message);
    }

    {
      // show another message
      let message = "Goodbye";
      alert(message);
    }

<span class="important__type">There’d be an error without blocks</span>

Please note, without separate blocks there would be an error, if we use `let` with the existing variable name:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // show message
    let message = "Hello";
    alert(message);

    // show another message
    let message = "Goodbye"; // Error: variable already declared
    alert(message);

For `if`, `for`, `while` and so on, variables declared in `{...}` are also only visible inside:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    if (true) {
      let phrase = "Hello!";

      alert(phrase); // Hello!
    }

    alert(phrase); // Error, no such variable!

Here, after `if` finishes, the `alert` below won’t see the `phrase`, hence the error.

That’s great, as it allows us to create block-local variables, specific to an `if` branch.

The similar thing holds true for `for` and `while` loops:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    for (let i = 0; i < 3; i++) {
      // the variable i is only visible inside this for
      alert(i); // 0, then 1, then 2
    }

    alert(i); // Error, no such variable

Visually, `let i` is outside of `{...}`. But the `for` construct is special here: the variable, declared inside it, is considered a part of the block.

<a href="closure.html#nested-functions" id="nested-functions" class="main__anchor">Nested functions</a>
-------------------------------------------------------------------------------------------------------

A function is called “nested” when it is created inside another function.

It is easily possible to do this with JavaScript.

We can use it to organize our code, like this:

    function sayHiBye(firstName, lastName) {

      // helper nested function to use below
      function getFullName() {
        return firstName + " " + lastName;
      }

      alert( "Hello, " + getFullName() );
      alert( "Bye, " + getFullName() );

    }

Here the *nested* function `getFullName()` is made for convenience. It can access the outer variables and so can return the full name. Nested functions are quite common in JavaScript.

What’s much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.

Below, `makeCounter` creates the “counter” function that returns the next number on each invocation:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeCounter() {
      let count = 0;

      return function() {
        return count++;
      };
    }

    let counter = makeCounter();

    alert( counter() ); // 0
    alert( counter() ); // 1
    alert( counter() ); // 2

Despite being simple, slightly modified variants of that code have practical uses, for instance, as a [random number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to generate random values for automated tests.

How does this work? If we create multiple counters, will they be independent? What’s going on with the variables here?

Understanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let’s go a bit in-depth.

<a href="closure.html#lexical-environment" id="lexical-environment" class="main__anchor">Lexical Environment</a>
----------------------------------------------------------------------------------------------------------------

<span class="important__type">Here be dragons!</span>

The in-depth technical explanation lies ahead.

As far as I’d like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.

For clarity, the explanation is split into multiple steps.

### <a href="closure.html#step-1-variables" id="step-1-variables" class="main__anchor">Step 1. Variables</a>

In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the *Lexical Environment*.

The Lexical Environment object consists of two parts:

1.  *Environment Record* – an object that stores all local variables as its properties (and some other information like the value of `this`).
2.  A reference to the *outer lexical environment*, the one associated with the outer code.

**A “variable” is just a property of the special internal object, `Environment Record`. “To get or change a variable” means “to get or change a property of that object”.**

In this simple code without functions, there is only one Lexical Environment:

<figure><img src="article/closure/lexical-environment-global.svg" width="492" height="108" /></figure>This is the so-called *global* Lexical Environment, associated with the whole script.

On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that’s why the arrow points to `null`.

As the code starts executing and goes on, the Lexical Environment changes.

Here’s a little bit longer code:

<figure><img src="article/closure/closure-variable-phrase.svg" width="550" height="150" /></figure>Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:

1.  When the script starts, the Lexical Environment is pre-populated with all declared variables.
    -   Initially, they are in the “Uninitialized” state. That’s a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with `let`. It’s almost the same as if the variable didn’t exist.
2.  Then `let phrase` definition appears. There’s no assignment yet, so its value is `undefined`. We can use the variable from this point forward.
3.  `phrase` is assigned a value.
4.  `phrase` changes the value.

Everything looks simple for now, right?

-   A variable is a property of a special internal object, associated with the currently executing block/function/script.
-   Working with variables is actually working with the properties of that object.

<span class="important__type">Lexical Environment is a specification object</span>

“Lexical Environment” is a specification object: it only exists “theoretically” in the [language specification](https://tc39.es/ecma262/#sec-lexical-environments) to describe how things work. We can’t get this object in our code and manipulate it directly.

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.

### <a href="closure.html#step-2-function-declarations" id="step-2-function-declarations" class="main__anchor">Step 2. Function Declarations</a>

A function is also a value, like a variable.

**The difference is that a Function Declaration is instantly fully initialized.**

When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike `let`, that is unusable till the declaration).

That’s why we can use a function, declared as Function Declaration, even before the declaration itself.

For example, here’s the initial state of the global Lexical Environment when we add a function:

<figure><img src="article/closure/closure-function-declaration.svg" width="678" height="169" /></figure>Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as `let say = function(name)...`.

### <a href="closure.html#step-3-inner-and-outer-lexical-environment" id="step-3-inner-and-outer-lexical-environment" class="main__anchor">Step 3. Inner and outer Lexical Environment</a>

When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.

For instance, for `say("John")`, it looks like this (the execution is at the line, labelled with an arrow):

<figure><img src="article/closure/lexical-environment-simple.svg" width="723" height="150" /></figure>During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

-   The inner Lexical Environment corresponds to the current execution of `say`. It has a single property: `name`, the function argument. We called `say("John")`, so the value of the `name` is `"John"`.
-   The outer Lexical Environment is the global Lexical Environment. It has the `phrase` variable and the function itself.

The inner Lexical Environment has a reference to the `outer` one.

**When the code wants to access a variable – the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.**

If a variable is not found anywhere, that’s an error in strict mode (without `use strict`, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).

In this example the search proceeds as follows:

-   For the `name` variable, the `alert` inside `say` finds it immediately in the inner Lexical Environment.
-   When it wants to access `phrase`, then there is no `phrase` locally, so it follows the reference to the outer Lexical Environment and finds it there.

<figure><img src="article/closure/lexical-environment-simple-lookup.svg" width="711" height="150" /></figure>### <a href="closure.html#step-4-returning-a-function" id="step-4-returning-a-function" class="main__anchor">Step 4. Returning a function</a>

Let’s return to the `makeCounter` example.

    function makeCounter() {
      let count = 0;

      return function() {
        return count++;
      };
    }

    let counter = makeCounter();

At the beginning of each `makeCounter()` call, a new Lexical Environment object is created, to store variables for this `makeCounter` run.

So we have two nested Lexical Environments, just like in the example above:

<figure><img src="article/closure/closure-makecounter.svg" width="711" height="173" /></figure>What’s different is that, during the execution of `makeCounter()`, a tiny nested function is created of only one line: `return count++`. We don’t run it yet, only create.

All functions remember the Lexical Environment in which they were made. Technically, there’s no magic here: all functions have the hidden property named `[[Environment]]`, that keeps the reference to the Lexical Environment where the function was created:

<figure><img src="article/closure/closure-makecounter-environment.svg" width="775" height="172" /></figure>So, `counter.[[Environment]]` has the reference to `{count: 0}` Lexical Environment. That’s how the function remembers where it was created, no matter where it’s called. The `[[Environment]]` reference is set once and forever at function creation time.

Later, when `counter()` is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from `counter.[[Environment]]`:

<figure><img src="article/closure/closure-makecounter-nested-call.svg" width="774" height="210" /></figure>Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where it finds and changes it.

**A variable is updated in the Lexical Environment where it lives.**

Here’s the state after the execution:

<figure><img src="article/closure/closure-makecounter-nested-call-2.svg" width="774" height="222" /></figure>If we call `counter()` multiple times, the `count` variable will be increased to `2`, `3` and so on, at the same place.

<span class="important__type">Closure</span>

There is a general programming term “closure”, that developers generally should know.

A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in [The "new Function" syntax](new-function.html)).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about “what’s a closure?”, a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.

<a href="closure.html#garbage-collection" id="garbage-collection" class="main__anchor">Garbage collection</a>
-------------------------------------------------------------------------------------------------------------

Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That’s because there are no references to it. As any JavaScript object, it’s only kept in memory while it’s reachable.

However, if there’s a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment.

In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.

For example:

    function f() {
      let value = 123;

      return function() {
        alert(value);
      }
    }

    let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
    // of the corresponding f() call

Please note that if `f()` is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. In the code below, all 3 of them:

    function f() {
      let value = Math.random();

      return function() { alert(value); };
    }

    // 3 functions in array, every one of them links to Lexical Environment
    // from the corresponding f() run
    let arr = [f(), f(), f()];

A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there’s at least one nested function referencing it.

In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the `value`) is cleaned from memory:

    function f() {
      let value = 123;

      return function() {
        alert(value);
      }
    }

    let g = f(); // while g function exists, the value stays in memory

    g = null; // ...and now the memory is cleaned up

### <a href="closure.html#real-life-optimizations" id="real-life-optimizations" class="main__anchor">Real-life optimizations</a>

As we’ve seen, in theory while a function is alive, all outer variables are also retained.

But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it’s obvious from the code that an outer variable is not used – it is removed.

**An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.**

Try running the example below in Chrome with the Developer Tools open.

When it pauses, in the console type `alert(value)`.

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function f() {
      let value = Math.random();

      function g() {
        debugger; // in console: type alert(value); No such variable!
      }

      return g;
    }

    let g = f();
    g();

As you could see – there is no such variable! In theory, it should be accessible, but the engine optimized it out.

That may lead to funny (if not such time-consuming) debugging issues. One of them – we can see a same-named outer variable instead of the expected one:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let value = "Surprise!";

    function f() {
      let value = "the closest value";

      function g() {
        debugger; // in console: type alert(value); Surprise!
      }

      return g;
    }

    let g = f();
    g();

This feature of V8 is good to know. If you are debugging with Chrome/Edge/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You can always check for it by running the examples on this page.

<a href="closure.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>
----------------------------------------------------------------------------------------------------------------

### <a href="closure.html#does-a-function-pickup-latest-changes" id="does-a-function-pickup-latest-changes" class="main__anchor">Does a function pickup latest changes?</a>

<a href="task/closure-latest-changes.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The function sayHi uses an external variable name. When the function runs, which value is it going to use?

    let name = "John";

    function sayHi() {
      alert("Hi, " + name);
    }

    name = "Pete";

    sayHi(); // what will it show: "John" or "Pete"?

Such situations are common both in browser and server-side development. A function may be scheduled to execute later than it is created, for instance after a user action or a network request.

So, the question is: does it pick up the latest changes?

solution

The answer is: **Pete**.

A function gets outer variables as they are now, it uses the most recent values.

Old variable values are not saved anywhere. When a function wants a variable, it takes the current value from its own Lexical Environment or the outer one.

### <a href="closure.html#which-variables-are-available" id="which-variables-are-available" class="main__anchor">Which variables are available?</a>

<a href="task/closure-variable-access.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The function `makeWorker` below makes another function and returns it. That new function can be called from somewhere else.

Will it have access to the outer variables from its creation place, or the invocation place, or both?

    function makeWorker() {
      let name = "Pete";

      return function() {
        alert(name);
      };
    }

    let name = "John";

    // create a function
    let work = makeWorker();

    // call it
    work(); // what will it show?

Which value it will show? “Pete” or “John”?

solution

The answer is: **Pete**.

The `work()` function in the code below gets `name` from the place of its origin through the outer lexical environment reference:

<figure><img src="task/closure-variable-access/lexenv-nested-work.svg" width="762" height="225" /></figure>So, the result is `"Pete"` here.

But if there were no `let name` in `makeWorker()`, then the search would go outside and take the global variable as we can see from the chain above. In that case the result would be `"John"`.

### <a href="closure.html#are-counters-independent" id="are-counters-independent" class="main__anchor">Are counters independent?</a>

<a href="task/counter-independent.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here we make two counters: `counter` and `counter2` using the same `makeCounter` function.

Are they independent? What is the second counter going to show? `0,1` or `2,3` or something else?

    function makeCounter() {
      let count = 0;

      return function() {
        return count++;
      };
    }

    let counter = makeCounter();
    let counter2 = makeCounter();

    alert( counter() ); // 0
    alert( counter() ); // 1

    alert( counter2() ); // ?
    alert( counter2() ); // ?

solution

The answer: **0,1.**

Functions `counter` and `counter2` are created by different invocations of `makeCounter`.

So they have independent outer Lexical Environments, each one has its own `count`.

### <a href="closure.html#counter-object" id="counter-object" class="main__anchor">Counter object</a>

<a href="task/counter-object-independent.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here a counter object is made with the help of the constructor function.

Will it work? What will it show?

    function Counter() {
      let count = 0;

      this.up = function() {
        return ++count;
      };
      this.down = function() {
        return --count;
      };
    }

    let counter = new Counter();

    alert( counter.up() ); // ?
    alert( counter.up() ); // ?
    alert( counter.down() ); // ?

solution

Surely it will work just fine.

Both nested functions are created within the same outer Lexical Environment, so they share access to the same `count` variable:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function Counter() {
      let count = 0;

      this.up = function() {
        return ++count;
      };

      this.down = function() {
        return --count;
      };
    }

    let counter = new Counter();

    alert( counter.up() ); // 1
    alert( counter.up() ); // 2
    alert( counter.down() ); // 1

### <a href="closure.html#function-in-if" id="function-in-if" class="main__anchor">Function in if</a>

<a href="task/function-in-if.html" class="task__open-link"></a>

Look at the code. What will be the result of the call at the last line?

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let phrase = "Hello";

    if (true) {
      let user = "John";

      function sayHi() {
        alert(`${phrase}, ${user}`);
      }
    }

    sayHi();

solution

The result is **an error**.

The function `sayHi` is declared inside the `if`, so it only lives inside it. There is no `sayHi` outside.

### <a href="closure.html#sum-with-closures" id="sum-with-closures" class="main__anchor">Sum with closures</a>

<a href="task/closure-sum.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write function `sum` that works like this: `sum(a)(b) = a+b`.

Yes, exactly this way, using double parentheses (not a mistype).

For instance:

    sum(1)(2) = 3
    sum(5)(-1) = 4

solution

For the second parentheses to work, the first ones must return a function.

Like this:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sum(a) {

      return function(b) {
        return a + b; // takes "a" from the outer lexical environment
      };

    }

    alert( sum(1)(2) ); // 3
    alert( sum(5)(-1) ); // 4

### <a href="closure.html#is-variable-visible" id="is-variable-visible" class="main__anchor">Is variable visible?</a>

<a href="task/let-scope.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

What will be the result of this code?

    let x = 1;

    function func() {
      console.log(x); // ?

      let x = 2;
    }

    func();

P.S. There’s a pitfall in this task. The solution is not obvious.

solution

The result is: **error**.

Try running it:

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let x = 1;

    function func() {
      console.log(x); // ReferenceError: Cannot access 'x' before initialization
      let x = 2;
    }

    func();

In this example we can observe the peculiar difference between a “non-existing” and “uninitialized” variable.

As you may have read in the article [Variable scope, closure](closure.html), a variable starts in the “uninitialized” state from the moment when the execution enters a code block (or a function). And it stays uninitalized until the corresponding `let` statement.

In other words, a variable technically exists, but can’t be used before `let`.

The code above demonstrates it.

    function func() {
      // the local variable x is known to the engine from the beginning of the function,
      // but "uninitialized" (unusable) until let ("dead zone")
      // hence the error

      console.log(x); // ReferenceError: Cannot access 'x' before initialization

      let x = 2;
    }

This zone of temporary unusability of a variable (from the beginning of the code block till `let`) is sometimes called the “dead zone”.

### <a href="closure.html#filter-through-function" id="filter-through-function" class="main__anchor">Filter through function</a>

<a href="task/filter-through-function.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have a built-in method `arr.filter(f)` for arrays. It filters all elements through the function `f`. If it returns `true`, then that element is returned in the resulting array.

Make a set of “ready to use” filters:

-   `inBetween(a, b)` – between `a` and `b` or equal to them (inclusively).
-   `inArray([...])` – in the given array.

The usage must be like this:

-   `arr.filter(inBetween(3,6))` – selects only values between 3 and 6.
-   `arr.filter(inArray([1,2,3]))` – selects only elements matching with one of the members of `[1,2,3]`.

For instance:

    /* .. your code for inBetween and inArray */
    let arr = [1, 2, 3, 4, 5, 6, 7];

    alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

    alert( arr.filter(inArray([1, 2, 10])) ); // 1,2

[Open a sandbox with tests.](https://plnkr.co/edit/TYqFVjCctR5V4gpt?p=preview)

solution

Filter inBetween

#### Filter inBetween

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function inBetween(a, b) {
      return function(x) {
        return x >= a && x <= b;
      };
    }

    let arr = [1, 2, 3, 4, 5, 6, 7];
    alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

Filter inArray

#### Filter inArray

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function inArray(arr) {
      return function(x) {
        return arr.includes(x);
      };
    }

    let arr = [1, 2, 3, 4, 5, 6, 7];
    alert( arr.filter(inArray([1, 2, 10])) ); // 1,2

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/qDqXk2C7FrIUTdOP?p=preview)

### <a href="closure.html#sort-by-field" id="sort-by-field" class="main__anchor">Sort by field</a>

<a href="task/sort-by-field.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We’ve got an array of objects to sort:

    let users = [
      { name: "John", age: 20, surname: "Johnson" },
      { name: "Pete", age: 18, surname: "Peterson" },
      { name: "Ann", age: 19, surname: "Hathaway" }
    ];

The usual way to do that would be:

    // by name (Ann, John, Pete)
    users.sort((a, b) => a.name > b.name ? 1 : -1);

    // by age (Pete, Ann, John)
    users.sort((a, b) => a.age > b.age ? 1 : -1);

Can we make it even less verbose, like this?

    users.sort(byField('name'));
    users.sort(byField('age'));

So, instead of writing a function, just put `byField(fieldName)`.

Write the function `byField` that can be used for that.

[Open a sandbox with tests.](https://plnkr.co/edit/0P3dSp25O5mu9Sq7?p=preview)

solution

    function byField(fieldName){
      return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/ivWUfk2TtcWhkXHY?p=preview)

### <a href="closure.html#army-of-functions" id="army-of-functions" class="main__anchor">Army of functions</a>

<a href="task/make-army.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The following code creates an array of `shooters`.

Every function is meant to output its number. But something is wrong…

<a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeArmy() {
      let shooters = [];

      let i = 0;
      while (i < 10) {
        let shooter = function() { // create a shooter function,
          alert( i ); // that should show its number
        };
        shooters.push(shooter); // and add it to the array
        i++;
      }

      // ...and return the array of shooters
      return shooters;
    }

    let army = makeArmy();

    // all shooters show 10 instead of their numbers 0, 1, 2, 3...
    army[0](); // 10 from the shooter number 0
    army[1](); // 10 from the shooter number 1
    army[2](); // 10 ...and so on.

Why do all of the shooters show the same value?

Fix the code so that they work as intended.

[Open a sandbox with tests.](https://plnkr.co/edit/8w4yuF196lp6VlqZ?p=preview)

solution

Let’s examine what exactly happens inside `makeArmy`, and the solution will become obvious.

1.  It creates an empty array `shooters`:

        let shooters = [];

2.  Fills it with functions via `shooters.push(function)` in the loop.

    Every element is a function, so the resulting array looks like this:

        shooters = [
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); },
          function () { alert(i); }
        ];

3.  The array is returned from the function.

    Then, later, the call to any member, e.g. `army[5]()` will get the element `army[5]` from the array (which is a function) and calls it.

    Now why do all such functions show the same value, `10`?

    That’s because there’s no local variable `i` inside `shooter` functions. When such a function is called, it takes `i` from its outer lexical environment.

    Then, what will be the value of `i`?

    If we look at the source:

        function makeArmy() {
          ...
          let i = 0;
          while (i < 10) {
            let shooter = function() { // shooter function
              alert( i ); // should show its number
            };
            shooters.push(shooter); // add function to the array
            i++;
          }
          ...
        }

    We can see that all `shooter` functions are created in the lexical environment of `makeArmy()` function. But when `army[5]()` is called, `makeArmy` has already finished its job, and the final value of `i` is `10` (`while` stops at `i=10`).

    As the result, all `shooter` functions get the same value from the outer lexical environment and that is, the last value, `i=10`.

    <figure><img src="task/make-army/lexenv-makearmy-empty.svg" width="566" height="183" /></figure>As you can see above, on each iteration of a `while {...}` block, a new lexical environment is created. So, to fix this, we can copy the value of `i` into a variable within the `while {...}` block, like this:

    <a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        function makeArmy() {
          let shooters = [];

          let i = 0;
          while (i < 10) {
              let j = i;
              let shooter = function() { // shooter function
                alert( j ); // should show its number
              };
            shooters.push(shooter);
            i++;
          }

          return shooters;
        }

        let army = makeArmy();

        // Now the code works correctly
        army[0](); // 0
        army[5](); // 5

    Here `let j = i` declares an “iteration-local” variable `j` and copies `i` into it. Primitives are copied “by value”, so we actually get an independent copy of `i`, belonging to the current loop iteration.

    The shooters work correctly, because the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds to the current loop iteration:

    <figure><img src="task/make-army/lexenv-makearmy-while-fixed.svg" width="566" height="183" /></figure>Such a problem could also be avoided if we used `for` in the beginning, like this:

    <a href="closure.html#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="closure.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        function makeArmy() {

          let shooters = [];

          for(let i = 0; i < 10; i++) {
            let shooter = function() { // shooter function
              alert( i ); // should show its number
            };
            shooters.push(shooter);
          }

          return shooters;
        }

        let army = makeArmy();

        army[0](); // 0
        army[5](); // 5

    That’s essentially the same, because `for` on each iteration generates a new lexical environment, with its own variable `i`. So `shooter` generated in every iteration references its own `i`, from that very iteration.

    <figure><img src="task/make-army/lexenv-makearmy-for-fixed.svg" width="566" height="183" /></figure>

Now, as you’ve put so much effort into reading this, and the final recipe is so simple – just use `for`, you may wonder – was it worth that?

Well, if you could easily answer the question, you wouldn’t read the solution. So, hopefully this task must have helped you to understand things a bit better.

Besides, there are indeed cases when one prefers `while` to `for`, and other scenarios, where such problems are real.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/moTUxIo7637GFYmE?p=preview)

<a href="rest-parameters-spread.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="var.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fclosure" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclosure" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="closure.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

-   <a href="advanced-functions.html" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

-   <a href="closure.html#code-blocks" class="sidebar__link">Code blocks</a>
-   closure.html\#nested-functions" &gt;Nested functions
-   closure.html\#lexical-environment" &gt;Lexical Environment
-   closure.html\#garbage-collection" &gt;Garbage collection

<!-- -->

-   <a href="closure.html#tasks" class="sidebar__link">Tasks (10)</a>
-   <a href="closure.html#comments" class="sidebar__link">Comments</a>

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fclosure" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclosure" class="share share_fb sidebar__share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/03-closure" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="about.html" class="page-footer__link">about the project</a>
-   <a href="about.html#contact-us" class="page-footer__link">contact us</a>
-   <a href="terms.html" class="page-footer__link">terms of usage</a>
-   <a href="privacy.html" class="page-footer__link">privacy policy</a>
