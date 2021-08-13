EN

- <a href="https://ar.javascript.info/testing-mocha" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span>عربي</span></a>
- <a href="testing-mocha.html" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span>English</span></a>
- <a href="https://es.javascript.info/testing-mocha" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span>Español</span></a>
- <a href="https://fr.javascript.info/testing-mocha" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span>Français</span></a>
- testing-mocha" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span>Italiano</span></a>
- <a href="https://ja.javascript.info/testing-mocha" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span>日本語</span></a>

<!-- -->

- /testing-mocha" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span>한국어</span></a>
- <a href="testing-mocha%22" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span>Русский</span></a>
- <a href="https://tr.javascript.info/testing-mocha" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span>Türkçe</span></a>
- <a href="https://zh.javascript.info/testing-mocha" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span>简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

Search

Search

<span class="share-icons__title">Share</span>2Ftesting-mocha" rel="nofollow" &gt;2Ftesting-mocha" rel="nofollow" &gt;

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="code-quality.html" class="breadcrumbs__link"><span>Code quality</span></a></span>

1st April 2021

# Automated testing with Mocha

Automated testing will be used in further tasks, and it’s also widely used in real projects.

## <a href="testing-mocha.html#why-do-we-need-tests" id="why-do-we-need-tests" class="main__anchor">Why do we need tests?</a>

When we write a function, we can usually imagine what it should do: which parameters give which results.

During development, we can check the function by running it and comparing the outcome with the expected one. For instance, we can do it in the console.

If something is wrong – then we fix the code, run again, check the result – and so on till it works.

But such manual “re-runs” are imperfect.

**When testing a code by manual re-runs, it’s easy to miss something.**

For instance, we’re creating a function `f`. Wrote some code, testing: `f(1)` works, but `f(2)` doesn’t work. We fix the code and now `f(2)` works. Looks complete? But we forgot to re-test `f(1)`. That may lead to an error.

That’s very typical. When we develop something, we keep a lot of possible use cases in mind. But it’s hard to expect a programmer to check all of them manually after every change. So it becomes easy to fix one thing and break another one.

**Automated testing means that tests are written separately, in addition to the code. They run our functions in various ways and compare results with the expected.**

## <a href="testing-mocha.html#behavior-driven-development-bdd" id="behavior-driven-development-bdd" class="main__anchor">Behavior Driven Development (BDD)</a>

Let’s start with a technique named [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) or, in short, BDD.

**BDD is three things in one: tests AND documentation AND examples.**

To understand BDD, we’ll examine a practical case of development.

## <a href="testing-mocha.html#development-of-pow-the-spec" id="development-of-pow-the-spec" class="main__anchor">Development of “pow”: the spec</a>

Let’s say we want to make a function `pow(x, n)` that raises `x` to an integer power `n`. We assume that `n≥0`.

That task is just an example: there’s the `**` operator in JavaScript that can do that, but here we concentrate on the development flow that can be applied to more complex tasks as well.

Before creating the code of `pow`, we can imagine what the function should do and describe it.

Such description is called a _specification_ or, in short, a spec, and contains descriptions of use cases together with tests for them, like this:

    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
      });

    });

A spec has three main building blocks that you can see above:

`describe("title", function() { ... })`  
What functionality we’re describing. In our case we’re describing the function `pow`. Used to group “workers” – the `it` blocks.

`it("use case description", function() { ... })`  
In the title of `it` we _in a human-readable way_ describe the particular use case, and the second argument is a function that tests it.

`assert.equal(value1, value2)`  
The code inside `it` block, if the implementation is correct, should execute without errors.

Functions `assert.*` are used to check whether `pow` works as expected. Right here we’re using one of them – `assert.equal`, it compares arguments and yields an error if they are not equal. Here it checks that the result of `pow(2, 3)` equals `8`. There are other types of comparisons and checks, that we’ll add later.

The specification can be executed, and it will run the test specified in `it` block. We’ll see that later.

## <a href="testing-mocha.html#the-development-flow" id="the-development-flow" class="main__anchor">The development flow</a>

The flow of development usually looks like this:

1.  An initial spec is written, with tests for the most basic functionality.
2.  An initial implementation is created.
3.  To check whether it works, we run the testing framework [Mocha](http://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4.  Now we have a working initial implementation with tests.
5.  We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6.  Go to 3, update the implementation till tests give no errors.
7.  Repeat steps 3-6 till the functionality is ready.

So, the development is _iterative_. We write the spec, implement it, make sure tests pass, then write more tests, make sure they work etc. At the end we have both a working implementation and tests for it.

Let’s see this development flow in our practical case.

The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let’s use few JavaScript libraries to run the tests, just to see that they are working (they will all fail).

## <a href="testing-mocha.html#the-spec-in-action" id="the-spec-in-action" class="main__anchor">The spec in action</a>

Here in the tutorial we’ll be using the following JavaScript libraries for tests:

- [Mocha](http://mochajs.org/) – the core framework: it provides common testing functions including `describe` and `it` and the main function that runs tests.
- [Chai](http://chaijs.com) – the library with many assertions. It allows to use a lot of different assertions, for now we need only `assert.equal`.
- [Sinon](http://sinonjs.org/) – a library to spy over functions, emulate built-in functions and more, we’ll need it much later.

These libraries are suitable for both in-browser and server-side testing. Here we’ll consider the browser variant.

The full HTML page with these frameworks and `pow` spec:

    <!DOCTYPE html>
    <html>
    <head>
      <!-- add mocha css, to show results -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
      <!-- add mocha framework code -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
      <script>
        mocha.setup('bdd'); // minimal setup
      </script>
      <!-- add chai -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
      <script>
        // chai has a lot of stuff, let's make assert global
        let assert = chai.assert;
      </script>
    </head>

    <body>

      <script>
        function pow(x, n) {
          /* function code is to be written, empty now */
        }
      </script>

      <!-- the script with tests (describe, it...) -->
      <script src="test.js"></script>

      <!-- the element with id="mocha" will contain test results -->
      <div id="mocha"></div>

      <!-- run tests! -->
      <script>
        mocha.run();
      </script>
    </body>

    </html>

The page can be divided into five parts:

1.  The `<head>` – add third-party libraries and styles for tests.
2.  The `<script>` with the function to test, in our case – with the code for `pow`.
3.  The tests – in our case an external script `test.js` that has `describe("pow", ...)` from above.
4.  The HTML element `<div id="mocha">` will be used by Mocha to output results.
5.  The tests are started by the command `mocha.run()`.

The result:

<a href="https://plnkr.co/edit/y5w66a4VW3X9KV5A?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

As of now, the test fails, there’s an error. That’s logical: we have an empty function code in `pow`, so `pow(2,3)` returns `undefined` instead of `8`.

For the future, let’s note that there are more high-level test-runners, like [karma](https://karma-runner.github.io/) and others, that make it easy to autorun many different tests.

## <a href="testing-mocha.html#initial-implementation" id="initial-implementation" class="main__anchor">Initial implementation</a>

Let’s make a simple implementation of `pow`, for tests to pass:

    function pow(x, n) {
      return 8; // :) we cheat!
    }

Wow, now it works!

<a href="https://plnkr.co/edit/qVIjYT9VuGDJKxeI?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

## <a href="testing-mocha.html#improving-the-spec" id="improving-the-spec" class="main__anchor">Improving the spec</a>

What we’ve done is definitely a cheat. The function does not work: an attempt to calculate `pow(3,4)` would give an incorrect result, but tests pass.

…But the situation is quite typical, it happens in practice. Tests pass, but the function works wrong. Our spec is imperfect. We need to add more use cases to it.

Let’s add one more test to check that `pow(3, 4) = 81`.

We can select one of two ways to organize the test here:

1.  The first variant – add one more `assert` into the same `it`:

        describe("pow", function() {

          it("raises to n-th power", function() {
            assert.equal(pow(2, 3), 8);
            assert.equal(pow(3, 4), 81);
          });

        });

2.  The second – make two tests:

        describe("pow", function() {

          it("2 raised to power 3 is 8", function() {
            assert.equal(pow(2, 3), 8);
          });

          it("3 raised to power 4 is 81", function() {
            assert.equal(pow(3, 4), 81);
          });

        });

The principal difference is that when `assert` triggers an error, the `it` block immediately terminates. So, in the first variant if the first `assert` fails, then we’ll never see the result of the second `assert`.

Making tests separate is useful to get more information about what’s going on, so the second variant is better.

And besides that, there’s one more rule that’s good to follow.

**One test checks one thing.**

If we look at the test and see two independent checks in it, it’s better to split it into two simpler ones.

So let’s continue with the second variant.

The result:

<a href="https://plnkr.co/edit/JBHJdDtWFz7iNVf4?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `81`.

## <a href="testing-mocha.html#improving-the-implementation" id="improving-the-implementation" class="main__anchor">Improving the implementation</a>

Let’s write something more real for tests to pass:

    function pow(x, n) {
      let result = 1;

      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

To be sure that the function works well, let’s test it for more values. Instead of writing `it` blocks manually, we can generate them in `for`:

    describe("pow", function() {

      function makeTest(x) {
        let expected = x * x * x;
        it(`${x} in the power 3 is ${expected}`, function() {
          assert.equal(pow(x, 3), expected);
        });
      }

      for (let x = 1; x <= 5; x++) {
        makeTest(x);
      }

    });

The result:

<a href="https://plnkr.co/edit/FhsRBrUakNc0mvxg?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

## <a href="testing-mocha.html#nested-describe" id="nested-describe" class="main__anchor">Nested describe</a>

We’re going to add even more tests. But before that let’s note that the helper function `makeTest` and `for` should be grouped together. We won’t need `makeTest` in other tests, it’s needed only in `for`: their common task is to check how `pow` raises into the given power.

Grouping is done with a nested `describe`:

    describe("pow", function() {

      describe("raises x to power 3", function() {

        function makeTest(x) {
          let expected = x * x * x;
          it(`${x} in the power 3 is ${expected}`, function() {
            assert.equal(pow(x, 3), expected);
          });
        }

        for (let x = 1; x <= 5; x++) {
          makeTest(x);
        }

      });

      // ... more tests to follow here, both describe and it can be added
    });

The nested `describe` defines a new “subgroup” of tests. In the output we can see the titled indentation:

<a href="https://plnkr.co/edit/4Vp2QYY2pSgBqbig?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

In the future we can add more `it` and `describe` on the top level with helper functions of their own, they won’t see `makeTest`.

<span class="important__type">`before/after` and `beforeEach/afterEach`</span>

We can setup `before/after` functions that execute before/after running tests, and also `beforeEach/afterEach` functions that execute before/after _every_ `it`.

For instance:

    describe("test", function() {

      before(() => alert("Testing started – before all tests"));
      after(() => alert("Testing finished – after all tests"));

      beforeEach(() => alert("Before a test – enter a test"));
      afterEach(() => alert("After a test – exit a test"));

      it('test 1', () => alert(1));
      it('test 2', () => alert(2));

    });

The running sequence will be:

    Testing started – before all tests (before)
    Before a test – enter a test (beforeEach)
    1
    After a test – exit a test   (afterEach)
    Before a test – enter a test (beforeEach)
    2
    After a test – exit a test   (afterEach)
    Testing finished – after all tests (after)

<a href="https://plnkr.co/edit/dzTS0YboAN3Wqke4?p=preview" class="edit">Open the example in the sandbox.</a>

Usually, `beforeEach/afterEach` and `before/after` are used to perform initialization, zero out counters or do something else between the tests (or test groups).

## <a href="testing-mocha.html#extending-the-spec" id="extending-the-spec" class="main__anchor">Extending the spec</a>

The basic functionality of `pow` is complete. The first iteration of the development is done. When we’re done celebrating and drinking champagne – let’s go on and improve it.

As it was said, the function `pow(x, n)` is meant to work with positive integer values `n`.

To indicate a mathematical error, JavaScript functions usually return `NaN`. Let’s do the same for invalid values of `n`.

Let’s first add the behavior to the spec(!):

    describe("pow", function() {

      // ...

      it("for negative n the result is NaN", function() {
        assert.isNaN(pow(2, -1));
      });

      it("for non-integer n the result is NaN", function() {
        assert.isNaN(pow(2, 1.5));
      });

    });

The result with new tests:

<a href="https://plnkr.co/edit/KxDVZWZey2rkHo8d?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

The newly added tests fail, because our implementation does not support them. That’s how BDD is done: first we write failing tests, and then make an implementation for them.

<span class="important__type">Other assertions</span>

Please note the assertion `assert.isNaN`: it checks for `NaN`.

There are other assertions in [Chai](http://chaijs.com) as well, for instance:

- `assert.equal(value1, value2)` – checks the equality `value1 == value2`.
- `assert.strictEqual(value1, value2)` – checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` – inverse checks to the ones above.
- `assert.isTrue(value)` – checks that `value === true`
- `assert.isFalse(value)` – checks that `value === false`
- …the full list is in the [docs](http://chaijs.com/api/assert/)

So we should add a couple of lines to `pow`:

    function pow(x, n) {
      if (n < 0) return NaN;
      if (Math.round(n) != n) return NaN;

      let result = 1;

      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

Now it works, all tests pass:

<a href="https://plnkr.co/edit/8OgvvBpZI90lA1If?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

<a href="https://plnkr.co/edit/8OgvvBpZI90lA1If?p=preview" class="edit">Open the full final example in the sandbox.</a>

## <a href="testing-mocha.html#summary" id="summary" class="main__anchor">Summary</a>

In BDD, the spec goes first, followed by implementation. At the end we have both the spec and the code.

The spec can be used in three ways:

1.  As **Tests** – they guarantee that the code works correctly.
2.  As **Docs** – the titles of `describe` and `it` tell what the function does.
3.  As **Examples** – the tests are actually working examples showing how a function can be used.

With the spec, we can safely improve, change, even rewrite the function from scratch and make sure it still works right.

That’s especially important in large projects when a function is used in many places. When we change such a function, there’s just no way to manually check if every place that uses it still works right.

Without tests, people have two ways:

1.  To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2.  Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there’s just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.

**Besides, a well-tested code has better architecture.**

Naturally, that’s because auto-tested code is easier to modify and improve. But there’s also another reason.

To write tests, the code should be organized in such a way that every function has a clearly described task, well-defined input and output. That means a good architecture from the beginning.

In real life that’s sometimes not that easy. Sometimes it’s difficult to write a spec before the actual code, because it’s not yet clear how it should behave. But in general writing tests makes development faster and more stable.

Later in the tutorial you will meet many tasks with tests baked-in. So you’ll see more practical examples.

Writing tests requires good JavaScript knowledge. But we’re just starting to learn it. So, to settle down everything, as of now you’re not required to write tests, but you should already be able to read them even if they are a little bit more complex than in this chapter.

## <a href="testing-mocha.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="testing-mocha.html#what-s-wrong-in-the-test" id="what-s-wrong-in-the-test" class="main__anchor">What's wrong in the test?</a>

<a href="task/pow-test-wrong.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What’s wrong in the test of `pow` below?

    it("Raises x to the power n", function() {
      let x = 5;

      let result = x;
      assert.equal(pow(x, 1), result);

      result *= x;
      assert.equal(pow(x, 2), result);

      result *= x;
      assert.equal(pow(x, 3), result);
    });

P.S. Syntactically the test is correct and passes.

solution

The test demonstrates one of the temptations a developer meets when writing tests.

What we have here is actually 3 tests, but layed out as a single function with 3 asserts.

Sometimes it’s easier to write this way, but if an error occurs, it’s much less obvious what went wrong.

If an error happens in the middle of a complex execution flow, then we’ll have to figure out the data at that point. We’ll actually have to _debug the test_.

It would be much better to break the test into multiple `it` blocks with clearly written inputs and outputs.

Like this:

    describe("Raises x to power n", function() {
      it("5 in the power of 1 equals 5", function() {
        assert.equal(pow(5, 1), 5);
      });

      it("5 in the power of 2 equals 25", function() {
        assert.equal(pow(5, 2), 25);
      });

      it("5 in the power of 3 equals 125", function() {
        assert.equal(pow(5, 3), 125);
      });
    });

We replaced the single `it` with `describe` and a group of `it` blocks. Now if something fails we would see clearly what the data was.

Also we can isolate a single test and run it in standalone mode by writing `it.only` instead of `it`:

    describe("Raises x to power n", function() {
      it("5 in the power of 1 equals 5", function() {
        assert.equal(pow(5, 1), 5);
      });

      // Mocha will run only this block
      it.only("5 in the power of 2 equals 25", function() {
        assert.equal(pow(5, 2), 25);
      });

      it("5 in the power of 3 equals 125", function() {
        assert.equal(pow(5, 3), 125);
      });
    });

<a href="ninja-code.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="polyfills.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Ftesting-mocha" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftesting-mocha" class="share share_fb"></a>

<a href="tutorial/map.html" class="map"><span class="map__text">Tutorial map</span></a>

<a href="testing-mocha.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

- <a href="code-quality.html" class="sidebar__link">Code quality</a>

#### Lesson navigation

testing-mocha.html\#why-do-we-need-tests" &gt;Why do we need tests?

testing-mocha.html\#behavior-driven-development-bdd" &gt;Behavior Driven Development (BDD)

testing-mocha.html\#development-of-pow-the-spec" &gt;Development of “pow”: the spec

testing-mocha.html\#the-development-flow" &gt;The development flow

testing-mocha.html\#the-spec-in-action" &gt;The spec in action

testing-mocha.html\#initial-implementation" &gt;Initial implementation

testing-mocha.html\#improving-the-spec" &gt;Improving the spec

testing-mocha.html\#improving-the-implementation" &gt;Improving the implementation

testing-mocha.html\#nested-describe" &gt;Nested describe

testing-mocha.html\#extending-the-spec" &gt;Extending the spec

<a href="testing-mocha.html%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/ul%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/nav%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cnav%20class=" class="sidebar__link"></a>

- <a href="testing-mocha.html#tasks" class="sidebar__link">Tasks (1)</a>
- testing-mocha.html\#comments" &gt;Comments

<a s%3A%2F%2Fjavascript.info%2Ftesting-mocha" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftesting-mocha" class="share share_fb sidebar**share"></a> <a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/03-code-quality/05-testing-mocha" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
