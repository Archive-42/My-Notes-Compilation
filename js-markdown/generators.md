EN

- <a href="https://ar.javascript.info/generators"
- <a href="generators.html"
- <a href="https://es.javascript.info/generators"
- <a href="https://fr.javascript.info/generators"
- generators"
  generators"

<!-- -->

- <a href="https://ko.javascript.info/generators"
- <a href=generators"
- <a href="https://tr.javascript.info/generators"
- <a href="https://zh.javascript.info/generators"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fgenerators" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fgenerators" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="generators-iterators.html" Generators, advanced iteration</span></a></span>

27th June 2021

# Generators

Regular functions return only one, single value (or nothing).

Generators can return (“yield”) multiple values, one after another, on-demand. They work great with [iterables](iterable.html), allowing to create data streams with ease.

## <a href="generators.html#generator-functions" id="generator-functions" class="main__anchor">Generator functions</a>

To create a generator, we need a special syntax construct: `function*`, so-called “generator function”.

It looks like this:

    function* generateSequence() {
      yield 1;
      yield 2;
      return 3;
    }

Generator functions behave differently from regular ones. When such function is called, it doesn’t run its code. Instead it returns a special object, called “generator object”, to manage the execution.

Here, take a look:

<a href="generators.html#"
<a href="generators.html#"

    function* generateSequence() {
      yield 1;
      yield 2;
      return 3;
    }

    // "generator function" creates "generator object"
    let generator = generateSequence();
    alert(generator); // [object Generator]

The function code execution hasn’t started yet:

<figure><img src="article/generators/generateSequence-1.svg" width="353" height="150" /></figure>The main method of a generator is `next()`. When called, it runs the execution until the nearest `yield <value>` statement (`value` can be omitted, then it’s `undefined`). Then the function execution pauses, and the yielded `value` is returned to the outer code.

The result of `next()` is always an object with two properties:

- `value`: the yielded value.
- `done`: `true` if the function code has finished, otherwise `false`.

For instance, here we create the generator and get its first yielded value:

<a href="generators.html#"
<a href="generators.html#"

    function* generateSequence() {
      yield 1;
      yield 2;
      return 3;
    }

    let generator = generateSequence();

    let one = generator.next();

    alert(JSON.stringify(one)); // {value: 1, done: false}

As of now, we got the first value only, and the function execution is on the second line:

<figure><img src="article/generators/generateSequence-2.svg" width="519" height="150" /></figure>Let’s call `generator.next()` again. It resumes the code execution and returns the next `yield`:

    let two = generator.next();

    alert(JSON.stringify(two)); // {value: 2, done: false}

<figure><img src="article/generators/generateSequence-3.svg" width="519" height="150" /></figure>And, if we call it a third time, the execution reaches the `return` statement that finishes the function:

    let three = generator.next();

    alert(JSON.stringify(three)); // {value: 3, done: true}

<figure><img src="article/generators/generateSequence-4.svg" width="519" height="150" /></figure>Now the generator is done. We should see it from `done:true` and process `value:3` as the final result.

New calls to `generator.next()` don’t make sense any more. If we do them, they return the same object: `{done: true}`.

<span class="important__type">`function* f(…)` or `function *f(…)`?</span>

Both syntaxes are correct.

But usually the first syntax is preferred, as the star `*` denotes that it’s a generator function, it describes the kind, not the name, so it should stick with the `function` keyword.

## <a href="generators.html#generators-are-iterable" id="generators-are-iterable" class="main__anchor">Generators are iterable</a>

As you probably already guessed looking at the `next()` method, generators are [iterable](iterable.html).

We can loop over their values using `for..of`:

<a href="generators.html#"
<a href="generators.html#"

    function* generateSequence() {
      yield 1;
      yield 2;
      return 3;
    }

    let generator = generateSequence();

    for(let value of generator) {
      alert(value); // 1, then 2
    }

Looks a lot nicer than calling `.next().value`, right?

…But please note: the example above shows `1`, then `2`, and that’s all. It doesn’t show `3`!

It’s because `for..of` iteration ignores the last `value`, when `done: true`. So, if we want all results to be shown by `for..of`, we must return them with `yield`:

<a href="generators.html#"
<a href="generators.html#"

    function* generateSequence() {
      yield 1;
      yield 2;
      yield 3;
    }

    let generator = generateSequence();

    for(let value of generator) {
      alert(value); // 1, then 2, then 3
    }

As generators are iterable, we can call all related functionality, e.g. the spread syntax `...`:

<a href="generators.html#"
<a href="generators.html#"

    function* generateSequence() {
      yield 1;
      yield 2;
      yield 3;
    }

    let sequence = [0, ...generateSequence()];

    alert(sequence); // 0, 1, 2, 3

In the code above, `...generateSequence()` turns the iterable generator object into an array of items (read more about the spread syntax in the chapter [Rest parameters and spread syntax](rest-parameters-spread.html#spread-syntax))

## <a href="generators.html#using-generators-for-iterables" id="using-generators-for-iterables" class="main__anchor">Using generators for iterables</a>

Some time ago, in the chapter [Iterables](iterable.html) we created an iterable `range` object that returns values `from..to`.

Here, let’s remember the code:

<a href="generators.html#"
<a href="generators.html#"

    let range = {
      from: 1,
      to: 5,

      // for..of range calls this method once in the very beginning
      [Symbol.iterator]() {
        // ...it returns the iterator object:
        // onward, for..of works only with that object, asking it for next values
        return {
          current: this.from,
          last: this.to,

          // next() is called on each iteration by the for..of loop
          next() {
            // it should return the value as an object {done:.., value :...}
            if (this.current <= this.last) {
              return { done: false, value: this.current++ };
            } else {
              return { done: true };
            }
          }
        };
      }
    };

    // iteration over range returns numbers from range.from to range.to
    alert([...range]); // 1,2,3,4,5

We can use a generator function for iteration by providing it as `Symbol.iterator`.

Here’s the same `range`, but much more compact:

<a href="generators.html#"
<a href="generators.html#"

    let range = {
      from: 1,
      to: 5,

      *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
        for(let value = this.from; value <= this.to; value++) {
          yield value;
        }
      }
    };

    alert( [...range] ); // 1,2,3,4,5

That works, because `range[Symbol.iterator]()` now returns a generator, and generator methods are exactly what `for..of` expects:

- it has a `.next()` method
- that returns values in the form `{value: ..., done: true/false}`

That’s not a coincidence, of course. Generators were added to JavaScript language with iterators in mind, to implement them easily.

The variant with a generator is much more concise than the original iterable code of `range`, and keeps the same functionality.

<span class="important__type">Generators may generate values forever</span>

In the examples above we generated finite sequences, but we can also make a generator that yields values forever. For instance, an unending sequence of pseudo-random numbers.

That surely would require a `break` (or `return`) in `for..of` over such generator. Otherwise, the loop would repeat forever and hang.

## <a href="generators.html#generator-composition" id="generator-composition" class="main__anchor">Generator composition</a>

Generator composition is a special feature of generators that allows to transparently “embed” generators in each other.

For instance, we have a function that generates a sequence of numbers:

    function* generateSequence(start, end) {
      for (let i = start; i <= end; i++) yield i;
    }

Now we’d like to reuse it to generate a more complex sequence:

- first, digits `0..9` (with character codes 48…57),
- followed by uppercase alphabet letters `A..Z` (character codes 65…90)
- followed by lowercase alphabet letters `a..z` (character codes 97…122)

We can use this sequence e.g. to create passwords by selecting characters from it (could add syntax characters as well), but let’s generate it first.

In a regular function, to combine results from multiple other functions, we call them, store the results, and then join at the end.

For generators, there’s a special `yield*` syntax to “embed” (compose) one generator into another.

The composed generator:

<a href="generators.html#"
<a href="generators.html#"

    function* generateSequence(start, end) {
      for (let i = start; i <= end; i++) yield i;
    }

    function* generatePasswordCodes() {

      // 0..9
      yield* generateSequence(48, 57);

      // A..Z
      yield* generateSequence(65, 90);

      // a..z
      yield* generateSequence(97, 122);

    }

    let str = '';

    for(let code of generatePasswordCodes()) {
      str += String.fromCharCode(code);
    }

    alert(str); // 0..9A..Za..z

The `yield*` directive _delegates_ the execution to another generator. This term means that `yield* gen` iterates over the generator `gen` and transparently forwards its yields outside. As if the values were yielded by the outer generator.

The result is the same as if we inlined the code from nested generators:

<a href="generators.html#"
<a href="generators.html#"

    function* generateSequence(start, end) {
      for (let i = start; i <= end; i++) yield i;
    }

    function* generateAlphaNum() {

      // yield* generateSequence(48, 57);
      for (let i = 48; i <= 57; i++) yield i;

      // yield* generateSequence(65, 90);
      for (let i = 65; i <= 90; i++) yield i;

      // yield* generateSequence(97, 122);
      for (let i = 97; i <= 122; i++) yield i;

    }

    let str = '';

    for(let code of generateAlphaNum()) {
      str += String.fromCharCode(code);
    }

    alert(str); // 0..9A..Za..z

A generator composition is a natural way to insert a flow of one generator into another. It doesn’t use extra memory to store intermediate results.

## <a href="generators.html#yield-is-a-two-way-street" id="yield-is-a-two-way-street" class="main__anchor">“yield” is a two-way street</a>

Until this moment, generators were similar to iterable objects, with a special syntax to generate values. But in fact they are much more powerful and flexible.

That’s because `yield` is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.

To do so, we should call `generator.next(arg)`, with an argument. That argument becomes the result of `yield`.

Let’s see an example:

<a href="generators.html#"
<a href="generators.html#"

    function* gen() {
      // Pass a question to the outer code and wait for an answer
      let result = yield "2 + 2 = ?"; // (*)

      alert(result);
    }

    let generator = gen();

    let question = generator.next().value; // <-- yield returns the value

    generator.next(4); // --> pass the result into the generator

<figure><img src="article/generators/genYield2.svg" width="559" height="216" /></figure>1.  The first call `generator.next()` should be always made without an argument (the argument is ignored if passed). It starts the execution and returns the result of the first `yield "2+2=?"`. At this point the generator pauses the execution, while staying on the line `(*)`.
2.  Then, as shown at the picture above, the result of `yield` gets into the `question` variable in the calling code.
3.  On `generator.next(4)`, the generator resumes, and `4` gets in as the result: `let result = 4`.

Please note, the outer code does not have to immediately call `next(4)`. It may take time. That’s not a problem: the generator will wait.

For instance:

    // resume the generator after some time
    setTimeout(() => generator.next(4), 1000);

As we can see, unlike regular functions, a generator and the calling code can exchange results by passing values in `next/yield`.

To make things more obvious, here’s another example, with more calls:

<a href="generators.html#"
<a href="generators.html#"

    function* gen() {
      let ask1 = yield "2 + 2 = ?";

      alert(ask1); // 4

      let ask2 = yield "3 * 3 = ?"

      alert(ask2); // 9
    }

    let generator = gen();

    alert( generator.next().value ); // "2 + 2 = ?"

    alert( generator.next(4).value ); // "3 * 3 = ?"

    alert( generator.next(9).done ); // true

The execution picture:

<figure><img src="article/generators/genYield2-2.svg" width="461" height="258" /></figure>1.  The first `.next()` starts the execution… It reaches the first `yield`.
2.  The result is returned to the outer code.
3.  The second `.next(4)` passes `4` back to the generator as the result of the first `yield`, and resumes the execution.
4.  …It reaches the second `yield`, that becomes the result of the generator call.
5.  The third `next(9)` passes `9` into the generator as the result of the second `yield` and resumes the execution that reaches the end of the function, so `done: true`.

It’s like a “ping-pong” game. Each `next(value)` (excluding the first one) passes a value into the generator, that becomes the result of the current `yield`, and then gets back the result of the next `yield`.

## <a href="generators.html#generator-throw" id="generator-throw" class="main__anchor">generator.throw</a>

As we observed in the examples above, the outer code may pass a value into the generator, as the result of `yield`.

…But it can also initiate (throw) an error there. That’s natural, as an error is a kind of result.

To pass an error into a `yield`, we should call `generator.throw(err)`. In that case, the `err` is thrown in the line with that `yield`.

For instance, here the yield of `"2 + 2 = ?"` leads to an error:

<a href="generators.html#"
<a href="generators.html#"

    function* gen() {
      try {
        let result = yield "2 + 2 = ?"; // (1)

        alert("The execution does not reach here, because the exception is thrown above");
      } catch(e) {
        alert(e); // shows the error
      }
    }

    let generator = gen();

    let question = generator.next().value;

    generator.throw(new Error("The answer is not found in my database")); // (2)

The error, thrown into the generator at line `(2)` leads to an exception in line `(1)` with `yield`. In the example above, `try..catch` catches it and shows it.

If we don’t catch it, then just like any exception, it “falls out” the generator into the calling code.

The current line of the calling code is the line with `generator.throw`, labelled as `(2)`. So we can catch it here, like this:

<a href="generators.html#"
<a href="generators.html#"

    function* generate() {
      let result = yield "2 + 2 = ?"; // Error in this line
    }

    let generator = generate();

    let question = generator.next().value;

    try {
      generator.throw(new Error("The answer is not found in my database"));
    } catch(e) {
      alert(e); // shows the error
    }

If we don’t catch the error there, then, as usual, it falls through to the outer calling code (if any) and, if uncaught, kills the script.

## <a href="generators.html#generator-return" id="generator-return" class="main__anchor">generator.return</a>

`generator.return(value)` finishes the generator execution and return the given `value`.

    function* gen() {
      yield 1;
      yield 2;
      yield 3;
    }

    const g = gen();

    g.next();        // { value: 1, done: false }
    g.return('foo'); // { value: "foo", done: true }
    g.next();        // { value: undefined, done: true }

If we again use `generator.return()` in a completed generator, it will return that value again ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)).

Often we don’t use it, as most of time we want to get all returning values, but it can be useful when we want to stop generator in a specific condition.

## <a href="generators.html#summary" id="summary" class="main__anchor">Summary</a>

- Generators are created by generator functions `function* f(…) {…}`.
- Inside generators (only) there exists a `yield` operator.
- The outer code and the generator may exchange results via `next/yield` calls.

In modern JavaScript, generators are rarely used. But sometimes they come in handy, because the ability of a function to exchange data with the calling code during the execution is quite unique. And, surely, they are great for making iterable objects.

Also, in the next chapter we’ll learn async generators, which are used to read streams of asynchronously generated data (e.g paginated fetches over a network) in `for await ... of` loops.

In web-programming we often work with streamed data, so that’s another very important use case.

## <a href="generators.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="generators.html#pseudo-random-generator" id="pseudo-random-generator" class="main__anchor">Pseudo-random generator</a>

<a href="task/pseudo-random-generator.html" class="task__open-link"></a>

There are many areas where we need random data.

One of them is testing. We may need random data: text, numbers, etc. to test things out well.

In JavaScript, we could use `Math.random()`. But if something goes wrong, we’d like to be able to repeat the test, using exactly the same data.

For that, so called “seeded pseudo-random generators” are used. They take a “seed”, the first value, and then generate the next ones using a formula so that the same seed yields the same sequence, and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.

An example of such formula, that generates somewhat uniformly distributed values:

    next = previous * 16807 % 2147483647

If we use `1` as the seed, the values will be:

1.  `16807`
2.  `282475249`
3.  `1622650073`
4.  …and so on…

The task is to create a generator function `pseudoRandom(seed)` that takes `seed` and creates the generator with this formula.

Usage example:

    let generator = pseudoRandom(1);

    alert(generator.next().value); // 16807
    alert(generator.next().value); // 282475249
    alert(generator.next().value); // 1622650073

[Open a sandbox with tests.](https://plnkr.co/edit/kOtrsvIqz7nbmz2b?p=preview)

solution

<a href="generators.html#"
<a href="generators.html#"

    function* pseudoRandom(seed) {
      let value = seed;

      while(true) {
        value = value * 16807 % 2147483647
        yield value;
      }

    };

    let generator = pseudoRandom(1);

    alert(generator.next().value); // 16807
    alert(generator.next().value); // 282475249
    alert(generator.next().value); // 1622650073

Please note, the same can be done with a regular function, like this:

<a href="generators.html#"
<a href="generators.html#"

    function pseudoRandom(seed) {
      let value = seed;

      return function() {
        value = value * 16807 % 2147483647;
        return value;
      }
    }

    let generator = pseudoRandom(1);

    alert(generator()); // 16807
    alert(generator()); // 282475249
    alert(generator()); // 1622650073

That also works. But then we lose ability to iterate with `for..of` and to use generator composition, that may be useful elsewhere.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/TeK9a1txAdOhsWUb?p=preview)

<a href="generators-iterators.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="async-iterators-generators.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fgenerators" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fgenerators" </a>

<a href="tutorial/map.html" class="map">

## <a href="generators.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="generators-iterators.html" class="sidebar__link">Generators, advanced iteration</a>

#### Lesson navigation

- <a href="generators.html#generator-functions" class="sidebar__link">Generator functions</a>
- <a href="generators.html#generators-are-iterable" class="sidebar__link">Generators are iterable</a>
- <a href="generators.html#using-generators-for-iterables" class="sidebar__link">Using generators for iterables</a>
- <a href="generators.html#generator-composition" class="sidebar__link">Generator composition</a>
- <a href="generators.html#yield-is-a-two-way-street" class="sidebar__link">“yield” is a two-way street</a>
- <a href="generators.html#generator-throw" class="sidebar__link">generator.throw</a>
- <a href="generators.html#generator-return" class="sidebar__link">generator.return</a>
- <a href="generators.html#summary" class="sidebar__link">Summary</a>

- <a href="generators.html#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="generators.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fgenerators" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fgenerators" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/12-generators-iterators/1-generators" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
