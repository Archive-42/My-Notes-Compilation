EN

- <a href="https://ar.javascript.info/number"
- <a href="number.html"
- <a href="https://es.javascript.info/number"
- <a href="https://fr.javascript.info/number"
- number"
  number"

<!-- -->

- /number"
- <a href=number"
- <a href="https://tr.javascript.info/number"
- <a href="https://zh.javascript.info/number"

We want to make this open-source project available for people all around the world.

[Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fnumber" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnumber" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

13th June 2021

# Numbers

In modern JavaScript, there are two types of numbers:

1.  Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), also known as “double precision floating point numbers”. These are numbers that we’re using most of the time, and we’ll talk about them in this chapter.

2.  BigInt numbers, to represent integers of arbitrary length. They are sometimes needed, because a regular number can’t exceed `253` or be less than `-253`. As bigints are used in few special areas, we devote them a special chapter [BigInt](bigint.html).

So here we’ll talk about regular numbers. Let’s expand our knowledge of them.

## <a href="number.html#more-ways-to-write-a-number" id="more-ways-to-write-a-number" class="main__anchor">More ways to write a number</a>

Imagine we need to write 1 billion. The obvious way is:

    let billion = 1000000000;

We also can use underscore `_` as the separator:

    let billion = 1_000_000_000;

Here the underscore `_` plays the role of the “syntactic sugar”, it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it’s exactly the same one billion as above.

In real life though, we try to avoid writing long sequences of zeroes. We’re too lazy for that. We’ll try to write something like `"1bn"` for a billion or `"7.3bn"` for 7 billion 300 million. The same is true for most large numbers.

In JavaScript, we can shorten a number by appending the letter `"e"` to it and specifying the zeroes count:

<a href="number.html#"
<a href="number.html#"

    let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes

    alert( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)

In other words, `e` multiplies the number by `1` with the given zeroes count.

    1e3 === 1 * 1000; // e3 means *1000
    1.23e6 === 1.23 * 1000000; // e6 means *1000000

Now let’s write something very small. Say, 1 microsecond (one millionth of a second):

    let ms = 0.000001;

Just like before, using `"e"` can help. If we’d like to avoid writing the zeroes explicitly, we could say the same as:

    let ms = 1e-6; // six zeroes to the left from 1

If we count the zeroes in `0.000001`, there are 6 of them. So naturally it’s `1e-6`.

In other words, a negative number after `"e"` means a division by 1 with the given number of zeroes:

    // -3 divides by 1 with 3 zeroes
    1e-3 === 1 / 1000; // 0.001

    // -6 divides by 1 with 6 zeroes
    1.23e-6 === 1.23 / 1000000; // 0.00000123

### <a href="number.html#hex-binary-and-octal-numbers" id="hex-binary-and-octal-numbers" class="main__anchor">Hex, binary and octal numbers</a>

[Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) numbers are widely used in JavaScript to represent colors, encode characters, and for many other things. So naturally, there exists a shorter way to write them: `0x` and then the number.

For instance:

<a href="number.html#"
<a href="number.html#"

    alert( 0xff ); // 255
    alert( 0xFF ); // 255 (the same, case doesn't matter)

Binary and octal numeral systems are rarely used, but also supported using the `0b` and `0o` prefixes:

<a href="number.html#"
<a href="number.html#"

    let a = 0b11111111; // binary form of 255
    let b = 0o377; // octal form of 255

    alert( a == b ); // true, the same number 255 at both sides

There are only 3 numeral systems with such support. For other numeral systems, we should use the function `parseInt` (which we will see later in this chapter).

## <a href="number.html#tostring-base" id="tostring-base" class="main__anchor">toString(base)</a>

The method `num.toString(base)` returns a string representation of `num` in the numeral system with the given `base`.

For example:

<a href="number.html#"
<a href="number.html#"

    let num = 255;

    alert( num.toString(16) );  // ff
    alert( num.toString(2) );   // 11111111

The `base` can vary from `2` to `36`. By default it’s `10`.

Common use cases for this are:

- **base=16** is used for hex colors, character encodings etc, digits can be `0..9` or `A..F`.

- **base=2** is mostly for debugging bitwise operations, digits can be `0` or `1`.

- **base=36** is the maximum, digits can be `0..9` or `A..Z`. The whole latin alphabet is used to represent a number. A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example to make a short url. Can simply represent it in the numeral system with base `36`:

  <a href="number.html#"
  <a href="number.html#"

      alert( 123456..toString(36) ); // 2n9c

<span class="important__type">Two dots to call a method</span>

Please note that two dots in `123456..toString(36)` is not a typo. If we want to call a method directly on a number, like `toString` in the example above, then we need to place two dots `..` after it.

If we placed a single dot: `123456.toString(36)`, then there would be an error, because JavaScript syntax implies the decimal part after the first dot. And if we place one more dot, then JavaScript knows that the decimal part is empty and now goes the method.

Also could write `(123456).toString(36)`.

## <a href="number.html#rounding" id="rounding" class="main__anchor">Rounding</a>

One of the most used operations when working with numbers is rounding.

There are several built-in functions for rounding:

`Math.floor`  
Rounds down: `3.1` becomes `3`, and `-1.1` becomes `-2`.

`Math.ceil`  
Rounds up: `3.1` becomes `4`, and `-1.1` becomes `-1`.

`Math.round`  
Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`, the middle case: `3.5` rounds up to `4` too.

`Math.trunc` (not supported by Internet Explorer)  
Removes anything after the decimal point without rounding: `3.1` becomes `3`, `-1.1` becomes `-1`.

Here’s the table to summarize the differences between them:

<table><thead><tr class="header"><th></th><th><code>Math.floor</code></th><th><code>Math.ceil</code></th><th><code>Math.round</code></th><th><code>Math.trunc</code></th></tr></thead><tbody><tr class="odd"><td><code>3.1</code></td><td><code>3</code></td><td><code>4</code></td><td><code>3</code></td><td><code>3</code></td></tr><tr class="even"><td><code>3.6</code></td><td><code>3</code></td><td><code>4</code></td><td><code>4</code></td><td><code>3</code></td></tr><tr class="odd"><td><code>-1.1</code></td><td><code>-2</code></td><td><code>-1</code></td><td><code>-1</code></td><td><code>-1</code></td></tr><tr class="even"><td><code>-1.6</code></td><td><code>-2</code></td><td><code>-1</code></td><td><code>-2</code></td><td><code>-1</code></td></tr></tbody></table>

These functions cover all of the possible ways to deal with the decimal part of a number. But what if we’d like to round the number to `n-th` digit after the decimal?

For instance, we have `1.2345` and want to round it to 2 digits, getting only `1.23`.

There are two ways to do so:

1.  Multiply-and-divide.

    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100` (or a bigger power of 10), call the rounding function and then divide it back.

    <a href="number.html#"
    <a href="number.html#"

        let num = 1.23456;

        alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23

2.  The method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rounds the number to `n` digits after the point and returns a string representation of the result.

    <a href="number.html#"
    <a href="number.html#"

        let num = 12.34;
        alert( num.toFixed(1) ); // "12.3"

    This rounds up or down to the nearest value, similar to `Math.round`:

    <a href="number.html#"
    <a href="number.html#"

        let num = 12.36;
        alert( num.toFixed(1) ); // "12.4"

    Please note that result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:

    <a href="number.html#"
    <a href="number.html#"

        let num = 12.34;
        alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits

    We can convert it to a number using the unary plus or a `Number()` call: `+num.toFixed(5)`.

## <a href="number.html#imprecise-calculations" id="imprecise-calculations" class="main__anchor">Imprecise calculations</a>

Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point (they are zero for integer numbers), and 1 bit is for the sign.

If a number is too big, it would overflow the 64-bit storage, potentially giving an infinity:

<a href="number.html#"
<a href="number.html#"

    alert( 1e500 ); // Infinity

What may be a little less obvious, but happens quite often, is the loss of precision.

Consider this (falsy!) test:

<a href="number.html#"
<a href="number.html#"

    alert( 0.1 + 0.2 == 0.3 ); // false

That’s right, if we check whether the sum of `0.1` and `0.2` is `0.3`, we get `false`.

Strange! What is it then if not `0.3`?

<a href="number.html#"
<a href="number.html#"

    alert( 0.1 + 0.2 ); // 0.30000000000000004

Ouch! There are more consequences than an incorrect comparison here. Imagine you’re making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.

But why does this happen?

A number is stored in memory in its binary form, a sequence of bits – ones and zeroes. But fractions like `0.1`, `0.2` that look simple in the decimal numeric system are actually unending fractions in their binary form.

In other words, what is `0.1`? It is one divided by ten `1/10`, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.

So, division by powers `10` is guaranteed to work well in the decimal system, but division by `3` is not. For the same reason, in the binary numeral system, the division by powers of `2` is guaranteed to work, but `1/10` becomes an endless binary fraction.

There’s just no way to store _exactly 0.1_ or _exactly 0.2_ using the binary system, just like there is no way to store one-third as a decimal fraction.

The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don’t allow us to see that “tiny precision loss”, but it exists.

We can see this in action:

<a href="number.html#"
<a href="number.html#"

    alert( 0.1.toFixed(20) ); // 0.10000000000000000555

And when we sum two numbers, their “precision losses” add up.

That’s why `0.1 + 0.2` is not exactly `0.3`.

<span class="important__type">Not only JavaScript</span>

The same issue exists in many other programming languages.

PHP, Java, C, Perl, Ruby give exactly the same result, because they are based on the same numeric format.

Can we work around the problem? Sure, the most reliable method is to round the result with the help of a method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

<a href="number.html#"
<a href="number.html#"

    let sum = 0.1 + 0.2;
    alert( sum.toFixed(2) ); // 0.30

Please note that `toFixed` always returns a string. It ensures that it has 2 digits after the decimal point. That’s actually convenient if we have an e-shopping and need to show `$0.30`. For other cases, we can use the unary plus to coerce it into a number:

<a href="number.html#"
<a href="number.html#"

    let sum = 0.1 + 0.2;
    alert( +sum.toFixed(2) ); // 0.3

We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into integers, do the maths, and then divide back. Then, as we’re doing maths with integers, the error somewhat decreases, but we still get it on division:

<a href="number.html#"
<a href="number.html#"

    alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
    alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001

So, multiply/divide approach reduces the error, but doesn’t remove it totally.

Sometimes we could try to evade fractions at all. Like if we’re dealing with a shop, then we can store prices in cents instead of dollars. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely possible. Just round them to cut “tails” when needed.

<span class="important__type">The funny thing</span>

Try running this:

<a href="number.html#"
<a href="number.html#"

    // Hello! I'm a self-increasing number!
    alert( 9999999999999999 ); // shows 10000000000000000

This suffers from the same issue: a loss of precision. There are 64 bits for the number, 52 of them can be used to store digits, but that’s not enough. So the least significant digits disappear.

JavaScript doesn’t trigger an error in such events. It does its best to fit the number into the desired format, but unfortunately, this format is not big enough.

<span class="important__type">Two zeroes</span>

Another funny consequence of the internal representation of numbers is the existence of two zeroes: `0` and `-0`.

That’s because a sign is represented by a single bit, so it can be set or not set for any number including a zero.

In most cases the distinction is unnoticeable, because operators are suited to treat them as the same.

## <a href="number.html#tests-isfinite-and-isnan" id="tests-isfinite-and-isnan" class="main__anchor">Tests: isFinite and isNaN</a>

Remember these two special numeric values?

- `Infinity` (and `-Infinity`) is a special numeric value that is greater (less) than anything.
- `NaN` represents an error.

They belong to the type `number`, but are not “normal” numbers, so there are special functions to check for them:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`:

  <a href="number.html#"
  <a href="number.html#"

      alert( isNaN(NaN) ); // true
      alert( isNaN("str") ); // true

  But do we need this function? Can’t we just use the comparison `=== NaN`? Sorry, but the answer is no. The value `NaN` is unique in that it does not equal anything, including itself:

  <a href="number.html#"
  <a href="number.html#"

      alert( NaN === NaN ); // false

- `isFinite(value)` converts its argument to a number and returns `true` if it’s a regular number, not `NaN/Infinity/-Infinity`:

  <a href="number.html#"
  <a href="number.html#"

      alert( isFinite("15") ); // true
      alert( isFinite("str") ); // false, because a special value: NaN
      alert( isFinite(Infinity) ); // false, because a special value: Infinity

Sometimes `isFinite` is used to validate whether a string value is a regular number:

<a href="number.html#"
<a href="number.html#"

    let num = +prompt("Enter a number", '');

    // will be true unless you enter Infinity, -Infinity or not a number
    alert( isFinite(num) );

Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.

<span class="important__type">Compare with `Object.is`</span>

There is a special built-in method [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) that compares values like `===`, but is more reliable for two edge cases:

1.  It works with `NaN`: `Object.is(NaN, NaN) === true`, that’s a good thing.
2.  Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that’s true, because internally the number has a sign bit that may be different even if all other bits are zeroes.

In all other cases, `Object.is(a, b)` is the same as `a === b`.

This way of comparison is often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).

## <a href="number.html#parseint-and-parsefloat" id="parseint-and-parsefloat" class="main__anchor">parseInt and parseFloat</a>

Numeric conversion using a plus `+` or `Number()` is strict. If a value is not exactly a number, it fails:

<a href="number.html#"
<a href="number.html#"

    alert( +"100px" ); // NaN

The sole exception is spaces at the beginning or at the end of the string, as they are ignored.

But in real life we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.

That’s what `parseInt` and `parseFloat` are for.

They “read” a number from a string until they can’t. In case of an error, the gathered number is returned. The function `parseInt` returns an integer, whilst `parseFloat` will return a floating-point number:

<a href="number.html#"
<a href="number.html#"

    alert( parseInt('100px') ); // 100
    alert( parseFloat('12.5em') ); // 12.5

    alert( parseInt('12.3') ); // 12, only the integer part is returned
    alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading

There are situations when `parseInt/parseFloat` will return `NaN`. It happens when no digits could be read:

<a href="number.html#"
<a href="number.html#"

    alert( parseInt('a123') ); // NaN, the first symbol stops the process

<span class="important__type">The second argument of `parseInt(str, radix)`</span>

The `parseInt()` function has an optional second parameter. It specifies the base of the numeral system, so `parseInt` can also parse strings of hex numbers, binary numbers and so on:

<a href="number.html#"
<a href="number.html#"

    alert( parseInt('0xff', 16) ); // 255
    alert( parseInt('ff', 16) ); // 255, without 0x also works

    alert( parseInt('2n9c', 36) ); // 123456

## <a href="number.html#other-math-functions" id="other-math-functions" class="main__anchor">Other math functions</a>

JavaScript has a built-in [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object which contains a small library of mathematical functions and constants.

A few examples:

`Math.random()`  
Returns a random number from 0 to 1 (not including 1).

<a href="number.html#"
<a href="number.html#"

    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (any random numbers)

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`  
Returns the greatest/smallest from the arbitrary number of arguments.

<a href="number.html#"
<a href="number.html#"

    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1

`Math.pow(n, power)`  
Returns `n` raised to the given power.

<a href="number.html#"
<a href="number.html#"

    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024

There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## <a href="number.html#summary" id="summary" class="main__anchor">Summary</a>

To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).

For different numeral systems:

- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.

For converting values like `12pt` and `100px` to a number:

- Use `parseInt/parseFloat` for the “soft” conversion, which reads a number from a string and then returns the value they could read before the error.

For fractions:

- Round using `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` or `num.toFixed(precision)`.
- Make sure to remember there’s a loss of precision when working with fractions.

More mathematical functions:

- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small, but can cover basic needs.

## <a href="number.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="number.html#sum-numbers-from-the-visitor" id="sum-numbers-from-the-visitor" class="main__anchor">Sum numbers from the visitor</a>

<a href="task/sum-interface.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a script that prompts the visitor to enter two numbers and then shows their sum.

[Run the demo](number.html#)

P.S. There is a gotcha with types.

solution

<a href="number.html#"
<a href="number.html#"

    let a = +prompt("The first number?", "");
    let b = +prompt("The second number?", "");

    alert( a + b );

Note the unary plus `+` before `prompt`. It immediately converts the value to a number.

Otherwise, `a` and `b` would be string their sum would be their concatenation, that is: `"1" + "2" = "12"`.

### <a href="number.html#why-6-35-tofixed-1-6-3" id="why-6-35-tofixed-1-6-3" class="main__anchor">Why 6.35.toFixed(1) == 6.3?</a>

<a href="task/why-rounded-down.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

According to the documentation `Math.round` and `toFixed` both round to the nearest number: `0..4` lead down while `5..9` lead up.

For instance:

<a href="number.html#"
<a href="number.html#"

    alert( 1.35.toFixed(1) ); // 1.4

In the similar example below, why is `6.35` rounded to `6.3`, not `6.4`?

<a href="number.html#"
<a href="number.html#"

    alert( 6.35.toFixed(1) ); // 6.3

How to round `6.35` the right way?

solution

Internally the decimal fraction `6.35` is an endless binary. As always in such cases, it is stored with a precision loss.

Let’s see:

<a href="number.html#"
<a href="number.html#"

    alert( 6.35.toFixed(20) ); // 6.34999999999999964473

The precision loss can cause both increase and decrease of a number. In this particular case the number becomes a tiny bit less, that’s why it rounded down.

And what’s for `1.35`?

<a href="number.html#"
<a href="number.html#"

    alert( 1.35.toFixed(20) ); // 1.35000000000000008882

Here the precision loss made the number a little bit greater, so it rounded up.

**How can we fix the problem with `6.35` if we want it to be rounded the right way?**

We should bring it closer to an integer prior to rounding:

<a href="number.html#"
<a href="number.html#"

    alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000

Note that `63.5` has no precision loss at all. That’s because the decimal part `0.5` is actually `1/2`. Fractions divided by powers of `2` are exactly represented in the binary system, now we can round it:

<a href="number.html#"
<a href="number.html#"

    alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(rounded) -> 6.4

### <a href="number.html#repeat-until-the-input-is-a-number" id="repeat-until-the-input-is-a-number" class="main__anchor">Repeat until the input is a number</a>

<a href="task/repeat-until-number.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `readNumber` which prompts for a number until the visitor enters a valid numeric value.

The resulting value must be returned as a number.

The visitor can also stop the process by entering an empty line or pressing “CANCEL”. In that case, the function should return `null`.

[Run the demo](number.html#)

[Open a sandbox with tests.](https://plnkr.co/edit/LzwmUerxmztxOayh?p=preview)

solution

<a href="number.html#"
<a href="number.html#"

    function readNumber() {
      let num;

      do {
        num = prompt("Enter a number please?", 0);
      } while ( !isFinite(num) );

      if (num === null || num === '') return null;

      return +num;
    }

    alert(`Read: ${readNumber()}`);

The solution is a little bit more intricate that it could be because we need to handle `null`/empty lines.

So we actually accept the input until it is a “regular number”. Both `null` (cancel) and empty line also fit that condition, because in numeric form they are `0`.

After we stopped, we need to treat `null` and empty line specially (return `null`), because converting them to a number would return `0`.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/NlVuXD5RDaj7Lsj8?p=preview)

### <a href="number.html#an-occasional-infinite-loop" id="an-occasional-infinite-loop" class="main__anchor">An occasional infinite loop</a>

<a href="task/endless-loop-error.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

This loop is infinite. It never ends. Why?

    let i = 0;
    while (i != 10) {
      i += 0.2;
    }

solution

That’s because `i` would never equal `10`.

Run it to see the _real_ values of `i`:

<a href="number.html#"
<a href="number.html#"

    let i = 0;
    while (i < 11) {
      i += 0.2;
      if (i > 9.8 && i < 10.2) alert( i );
    }

None of them is exactly `10`.

Such things happen because of the precision losses when adding fractions like `0.2`.

Conclusion: evade equality checks when working with decimal fractions.

### <a href="number.html#a-random-number-from-min-to-max" id="a-random-number-from-min-to-max" class="main__anchor">A random number from min to max</a>

<a href="task/random-min-max.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

The built-in function `Math.random()` creates a random value from `0` to `1` (not including `1`).

Write the function `random(min, max)` to generate a random floating-point number from `min` to `max` (not including `max`).

Examples of its work:

    alert( random(1, 5) ); // 1.2345623452
    alert( random(1, 5) ); // 3.7894332423
    alert( random(1, 5) ); // 4.3435234525

solution

We need to “map” all values from the interval 0…1 into values from `min` to `max`.

That can be done in two stages:

1.  If we multiply a random number from 0…1 by `max-min`, then the interval of possible values increases `0..1` to `0..max-min`.
2.  Now if we add `min`, the possible interval becomes from `min` to `max`.

The function:

<a href="number.html#"
<a href="number.html#"

    function random(min, max) {
      return min + Math.random() * (max - min);
    }

    alert( random(1, 5) );
    alert( random(1, 5) );
    alert( random(1, 5) );

### <a href="number.html#a-random-integer-from-min-to-max" id="a-random-integer-from-min-to-max" class="main__anchor">A random integer from min to max</a>

<a href="task/random-int-min-max.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Create a function `randomInteger(min, max)` that generates a random _integer_ number from `min` to `max` including both `min` and `max` as possible values.

Any number from the interval `min..max` must appear with the same probability.

Examples of its work:

    alert( randomInteger(1, 5) ); // 1
    alert( randomInteger(1, 5) ); // 3
    alert( randomInteger(1, 5) ); // 5

You can use the solution of the [previous task](task/random-min-max.html) as the base.

solution

The simple but wrong solution

#### The simple but wrong solution

The simplest, but wrong solution would be to generate a value from `min` to `max` and round it:

<a href="number.html#"
<a href="number.html#"

    function randomInteger(min, max) {
      let rand = min + Math.random() * (max - min);
      return Math.round(rand);
    }

    alert( randomInteger(1, 3) );

The function works, but it is incorrect. The probability to get edge values `min` and `max` is two times less than any other.

If you run the example above many times, you would easily see that `2` appears the most often.

That happens because `Math.round()` gets random numbers from the interval `1..3` and rounds them as follows:

    values from 1    ... to 1.4999999999  become 1
    values from 1.5  ... to 2.4999999999  become 2
    values from 2.5  ... to 2.9999999999  become 3

Now we can clearly see that `1` gets twice less values than `2`. And the same with `3`.

The correct solution

#### The correct solution

There are many correct solutions to the task. One of them is to adjust interval borders. To ensure the same intervals, we can generate values from `0.5 to 3.5`, thus adding the required probabilities to the edges:

<a href="number.html#"
<a href="number.html#"

    function randomInteger(min, max) {
      // now rand is from  (min-0.5) to (max+0.5)
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }

    alert( randomInteger(1, 3) );

An alternative way could be to use `Math.floor` for a random number from `min` to `max+1`:

<a href="number.html#"
<a href="number.html#"

    function randomInteger(min, max) {
      // here rand is from min to (max+1)
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    alert( randomInteger(1, 3) );

Now all intervals are mapped this way:

    values from 1  ... to 1.9999999999  become 1
    values from 2  ... to 2.9999999999  become 2
    values from 3  ... to 3.9999999999  become 3

All intervals have the same length, making the final distribution uniform.

<a href="primitives-methods.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="string.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fnumber" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnumber" </a>

<a href="tutorial/map.html" class="map">

## <a href="number.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="number.html#more-ways-to-write-a-number" class="sidebar__link">More ways to write a number</a>
- <a href="number.html#tostring-base" class="sidebar__link">toString(base)</a>
- <a href="number.html#rounding" class="sidebar__link">Rounding</a>
- <a href="number.html#imprecise-calculations" class="sidebar__link">Imprecise calculations</a>
- <a href="number.html#tests-isfinite-and-isnan" class="sidebar__link">Tests: isFinite and isNaN</a>
- <a href="number.html#parseint-and-parsefloat" class="sidebar__link">parseInt and parseFloat</a>
- <a href="number.html#other-math-functions" class="sidebar__link">Other math functions</a>
- <a href="number.html#summary" class="sidebar__link">Summary</a>

- <a href="number.html#tasks" class="sidebar__link">Tasks (6)</a>
- <a href="number.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fnumber" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnumber" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/02-number" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
