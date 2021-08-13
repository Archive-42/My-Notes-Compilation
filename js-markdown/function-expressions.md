EN

- <a href="https://ar.javascript.info/function-expressions"
- <a href="function-expressions.html"
- <a href="https://es.javascript.info/function-expressions"
- <a href="https://fr.javascript.info/function-expressions"
- function-expressions"
  function-expressions"

<!-- -->

- /function-expressions"
- <a href=function-expressions"
- <a href="https://tr.javascript.info/function-expressions"
- <a href="https://zh.javascript.info/function-expressions"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffunction-expressions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-expressions" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="first-steps.html" JavaScript Fundamentals</span></a></span>

2nd May 2020

# Function expressions

In JavaScript, a function is not a “magical language structure”, but a special kind of value.

The syntax that we used before is called a _Function Declaration_:

    function sayHi() {
      alert( "Hello" );
    }

There is another syntax for creating a function that is called a _Function Expression_.

It looks like this:

    let sayHi = function() {
      alert( "Hello" );
    };

Here, the function is created and assigned to the variable explicitly, like any other value. No matter how the function is defined, it’s just a value stored in the variable `sayHi`.

The meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".

We can even print out that value using `alert`:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    function sayHi() {
      alert( "Hello" );
    }

    alert( sayHi ); // shows the function code

Please note that the last line does not run the function, because there are no parentheses after `sayHi`. There are programming languages where any mention of a function name causes its execution, but JavaScript is not like that.

In JavaScript, a function is a value, so we can deal with it as a value. The code above shows its string representation, which is the source code.

Surely, a function is a special value, in the sense that we can call it like `sayHi()`.

But it’s still a value. So we can work with it like with other kinds of values.

We can copy a function to another variable:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    function sayHi() {   // (1) create
      alert( "Hello" );
    }

    let func = sayHi;    // (2) copy

    func(); // Hello     // (3) run the copy (it works)!
    sayHi(); // Hello    //     this still works too (why wouldn't it)

Here’s what happens above in detail:

1.  The Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
2.  Line `(2)` copies it into the variable `func`. Please note again: there are no parentheses after `sayHi`. If there were, then `func = sayHi()` would write _the result of the call_ `sayHi()` into `func`, not _the function_ `sayHi` itself.
3.  Now the function can be called as both `sayHi()` and `func()`.

Note that we could also have used a Function Expression to declare `sayHi`, in the first line:

    let sayHi = function() {
      alert( "Hello" );
    };

    let func = sayHi;
    // ...

Everything would work the same.

<span class="important__type">Why is there a semicolon at the end?</span>

You might wonder, why does Function Expression have a semicolon `;` at the end, but Function Declaration does not:

    function sayHi() {
      // ...
    }

    let sayHi = function() {
      // ...
    };

The answer is simple:

- There’s no need for `;` at the end of code blocks and syntax structures that use them like `if { ... }`, `for { }`, `function f { }` etc.
- A Function Expression is used inside the statement: `let sayHi = ...;`, as a value. It’s not a code block, but rather an assignment. The semicolon `;` is recommended at the end of statements, no matter what the value is. So the semicolon here is not related to the Function Expression itself, it just terminates the statement.

## <a href="function-expressions.html#callback-functions" id="callback-functions" class="main__anchor">Callback functions</a>

Let’s look at more examples of passing functions as values and using function expressions.

We’ll write a function `ask(question, yes, no)` with three parameters:

`question`  
Text of the question

`yes`  
Function to run if the answer is “Yes”

`no`  
Function to run if the answer is “No”

The function should ask the `question` and, depending on the user’s answer, call `yes()` or `no()`:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    function ask(question, yes, no) {
      if (confirm(question)) yes()
      else no();
    }

    function showOk() {
      alert( "You agreed." );
    }

    function showCancel() {
      alert( "You canceled the execution." );
    }

    // usage: functions showOk, showCancel are passed as arguments to ask
    ask("Do you agree?", showOk, showCancel);

In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such function usually draws a nice-looking question window. But that’s another story.

**The arguments `showOk` and `showCancel` of `ask` are called _callback functions_ or just _callbacks_.**

The idea is that we pass a function and expect it to be “called back” later if necessary. In our case, `showOk` becomes the callback for “yes” answer, and `showCancel` for “no” answer.

We can use Function Expressions to write the same function much shorter:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    function ask(question, yes, no) {
      if (confirm(question)) yes()
      else no();
    }

    ask(
      "Do you agree?",
      function() { alert("You agreed."); },
      function() { alert("You canceled the execution."); }
    );

Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called _anonymous_. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that’s just what we want here.

Such code appears in our scripts very naturally, it’s in the spirit of JavaScript.

<span class="important__type">A function is a value representing an “action”</span>

Regular values like strings or numbers represent the _data_.

A function can be perceived as an _action_.

We can pass it between variables and run when we want.

## <a href="function-expressions.html#function-expression-vs-function-declaration" id="function-expression-vs-function-declaration" class="main__anchor">Function Expression vs Function Declaration</a>

Let’s formulate the key differences between Function Declarations and Expressions.

First, the syntax: how to differentiate between them in the code.

- _Function Declaration:_ a function, declared as a separate statement, in the main code flow.

      // Function Declaration
      function sum(a, b) {
        return a + b;
      }

- _Function Expression:_ a function, created inside an expression or inside another syntax construct. Here, the function is created at the right side of the “assignment expression” `=`:

      // Function Expression
      let sum = function(a, b) {
        return a + b;
      };

The more subtle difference is _when_ a function is created by the JavaScript engine.

**A Function Expression is created when the execution reaches it and is usable only from that moment.**

Once the execution flow passes to the right side of the assignment `let sum = function…` – here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That’s due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an “initialization stage”.

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

For example, this works:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    sayHi("John"); // Hello, John

    function sayHi(name) {
      alert( `Hello, ${name}` );
    }

The Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.

…If it were a Function Expression, then it wouldn’t work:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    sayHi("John"); // error!

    let sayHi = function(name) {  // (*) no magic any more
      alert( `Hello, ${name}` );
    };

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.

Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it’s visible everywhere inside that block. But not outside of it.**

For instance, let’s imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won’t work as intended:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    let age = prompt("What is your age?", 18);

    // conditionally declare a function
    if (age < 18) {

      function welcome() {
        alert("Hello!");
      }

    } else {

      function welcome() {
        alert("Greetings!");
      }

    }

    // ...use it later
    welcome(); // Error: welcome is not defined

That’s because a Function Declaration is only visible inside the code block in which it resides.

Here’s another example:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    let age = 16; // take 16 as an example

    if (age < 18) {
      welcome();               // \   (runs)
                               //  |
      function welcome() {     //  |
        alert("Hello!");       //  |  Function Declaration is available
      }                        //  |  everywhere in the block where it's declared
                               //  |
      welcome();               // /   (runs)

    } else {

      function welcome() {
        alert("Greetings!");
      }
    }

    // Here we're out of curly braces,
    // so we can not see Function Declarations made inside of them.

    welcome(); // Error: welcome is not defined

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    let age = prompt("What is your age?", 18);

    let welcome;

    if (age < 18) {

      welcome = function() {
        alert("Hello!");
      };

    } else {

      welcome = function() {
        alert("Greetings!");
      };

    }

    welcome(); // ok now

Or we could simplify it even further using a question mark operator `?`:

<a href="function-expressions.html#"
<a href="function-expressions.html#"

    let age = prompt("What is your age?", 18);

    let welcome = (age < 18) ?
      function() { alert("Hello!"); } :
      function() { alert("Greetings!"); };

    welcome(); // ok now

<span class="important__type">When to choose Function Declaration versus Function Expression?</span>

As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That’s also better for readability, as it’s easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more “eye-catching”.

…But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we’ve just seen an example), then Function Expression should be used.

## <a href="function-expressions.html#summary" id="summary" class="main__anchor">Summary</a>

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that’s called a “Function Declaration”.
- If the function is created as a part of an expression, it’s called a “Function Expression”.
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We’ve seen a couple of examples of that in this chapter, and will see more in the future.

<a href="function-basics.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="arrow-functions-basics.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ffunction-expressions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-expressions" </a>

<a href="tutorial/map.html" class="map">

## <a href="function-expressions.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="first-steps.html" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="function-expressions.html#callback-functions" class="sidebar__link">Callback functions</a>
- <a href="function-expressions.html#function-expression-vs-function-declaration" class="sidebar__link">Function Expression vs Function Declaration</a>
- <a href="function-expressions.html#summary" class="sidebar__link">Summary</a>

- <a href="function-expressions.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Ffunction-expressions" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffunction-expressions" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/16-function-expressions" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
