EN

- <a href="https://ar.javascript.info/operators"
- <a href="https://javascript.info/operators"
- <a href="https://es.javascript.info/operators"
- <a href="https://fr.javascript.info/operators"
- operators"
  operators"

<!-- -->

- /operators"
- <a href=operators"
- <a href="https://tr.javascript.info/operators"
- <a href="https://zh.javascript.info/operators"

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Foperators" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Foperators" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/first-steps" JavaScript Fundamentals</span></a></span>

8th June 2021

# Basic operators, maths

We know many operators from school. They are things like addition `+`, multiplication `*`, subtraction `-`, and so on.

In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.

## <a href="#terms-unary-binary-operand" id="terms-unary-binary-operand" class="main__anchor">Terms: “unary”, “binary”, “operand”</a>

Before we move on, let’s grasp some common terminology.

- _An operand_ – is what operators are applied to. For instance, in the multiplication of `5 * 2` there are two operands: the left operand is `5` and the right operand is `2`. Sometimes, people call these “arguments” instead of “operands”.

- An operator is _unary_ if it has a single operand. For example, the unary negation `-` reverses the sign of a number:

  <a href="#"
  <a href="#"

      let x = 1;

      x = -x;
      alert( x ); // -1, unary negation was applied

- An operator is _binary_ if it has two operands. The same minus exists in binary form as well:

  <a href="#"
  <a href="#"

      let x = 1, y = 3;
      alert( y - x ); // 2, binary minus subtracts values

  Formally, in the examples above we have two different operators that share the same symbol: the negation operator, a unary operator that reverses the sign, and the subtraction operator, a binary operator that subtracts one number from another.

## <a href="#maths" id="maths" class="main__anchor">Maths</a>

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### <a href="#remainder" id="remainder" class="main__anchor">Remainder %</a>

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

<a href="#"
<a href="#"

    alert( 5 % 2 ); // 1, a remainder of 5 divided by 2
    alert( 8 % 3 ); // 2, a remainder of 8 divided by 3

### <a href="#exponentiation" id="exponentiation" class="main__anchor">Exponentiation \*\*</a>

The exponentiation operator `a ** b` raises `a` to the power of `b`.

In school maths, we write that as a<sup>b</sup>.

For instance:

<a href="#"
<a href="#"

    alert( 2 ** 2 ); // 2² = 4
    alert( 2 ** 3 ); // 2³ = 8
    alert( 2 ** 4 ); // 2⁴ = 16

Just like in maths, the exponentiation operator is defined for non-integer numbers as well.

For example, a square root is an exponentiation by ½:

<a href="#"
<a href="#"

    alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
    alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)

## <a href="#string-concatenation-with-binary" id="string-concatenation-with-binary" class="main__anchor">String concatenation with binary +</a>

Let’s meet features of JavaScript operators that are beyond school arithmetics.

Usually, the plus operator `+` sums numbers.

But, if the binary `+` is applied to strings, it merges (concatenates) them:

    let s = "my" + "string";
    alert(s); // mystring

Note that if any of the operands is a string, then the other one is converted to a string too.

For example:

<a href="#"
<a href="#"

    alert( '1' + 2 ); // "12"
    alert( 2 + '1' ); // "21"

See, it doesn’t matter whether the first operand is a string or the second one.

Here’s a more complex example:

<a href="#"
<a href="#"

    alert(2 + 2 + '1' ); // "41" and not "221"

Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it’s like `4 + '1' = '41'`.

<a href="#"
<a href="#"

    alert('1' + 2 + 2); // "122" and not "14"

Here, the first operand is a string, the compiler treats the other two operands as strings too. The `2` gets concatenated to `'1'`, so it’s like `'1' + 2 = "12"` and `"12" + 2 = "122"`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here’s the demo for subtraction and division:

<a href="#"
<a href="#"

    alert( 6 - '2' ); // 4, converts '2' to a number
    alert( '6' / '2' ); // 3, converts both operands to numbers

## <a href="#numeric-conversion-unary" id="numeric-conversion-unary" class="main__anchor">Numeric conversion, unary +</a>

The plus `+` exists in two forms: the binary form that we used above and the unary form.

The unary plus or, in other words, the plus operator `+` applied to a single value, doesn’t do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.

For example:

<a href="#"
<a href="#"

    // No effect on numbers
    let x = 1;
    alert( +x ); // 1

    let y = -2;
    alert( +y ); // -2

    // Converts non-numbers
    alert( +true ); // 1
    alert( +"" );   // 0

It actually does the same thing as `Number(...)`, but is shorter.

The need to convert strings to numbers arises very often. For example, if we are getting values from HTML form fields, they are usually strings. What if we want to sum them?

The binary plus would add them as strings:

<a href="#"
<a href="#"

    let apples = "2";
    let oranges = "3";

    alert( apples + oranges ); // "23", the binary plus concatenates strings

If we want to treat them as numbers, we need to convert and then sum them:

<a href="#"
<a href="#"

    let apples = "2";
    let oranges = "3";

    // both values converted to numbers before the binary plus
    alert( +apples + +oranges ); // 5

    // the longer variant
    // alert( Number(apples) + Number(oranges) ); // 5

From a mathematician’s standpoint, the abundance of pluses may seem strange. But from a programmer’s standpoint, there’s nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

Why are unary pluses applied to values before the binary ones? As we’re going to see, that’s because of their _higher precedence_.

## <a href="#operator-precedence" id="operator-precedence" class="main__anchor">Operator precedence</a>

If an expression has more than one operator, the execution order is defined by their _precedence_, or, in other words, the default priority order of operators.

From school, we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That’s exactly the precedence thing. The multiplication is said to have _a higher precedence_ than the addition.

Parentheses override any precedence, so if we’re not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.

There are many operators in JavaScript. Every operator has a corresponding precedence number. The one with the larger number executes first. If the precedence is the same, the execution order is from left to right.

Here’s an extract from the [precedence table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (you don’t need to remember this, but note that unary operators are higher than corresponding binary ones):

<table><thead><tr class="header"><th>Precedence</th><th>Name</th><th>Sign</th></tr></thead><tbody><tr class="odd"><td>…</td><td>…</td><td>…</td></tr><tr class="even"><td>17</td><td>unary plus</td><td><code>+</code></td></tr><tr class="odd"><td>17</td><td>unary negation</td><td><code>-</code></td></tr><tr class="even"><td>16</td><td>exponentiation</td><td><code>**</code></td></tr><tr class="odd"><td>15</td><td>multiplication</td><td><code>*</code></td></tr><tr class="even"><td>15</td><td>division</td><td><code>/</code></td></tr><tr class="odd"><td>13</td><td>addition</td><td><code>+</code></td></tr><tr class="even"><td>13</td><td>subtraction</td><td><code>-</code></td></tr><tr class="odd"><td>…</td><td>…</td><td>…</td></tr><tr class="even"><td>3</td><td>assignment</td><td><code>=</code></td></tr><tr class="odd"><td>…</td><td>…</td><td>…</td></tr></tbody></table>

As we can see, the “unary plus” has a priority of `17` which is higher than the `13` of “addition” (binary plus). That’s why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.

## <a href="#assignment" id="assignment" class="main__anchor">Assignment</a>

Let’s note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `3`.

That’s why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.

    let x = 2 * 2 + 1;

    alert( x ); // 5

### <a href="#assignment-returns-a-value" id="assignment-returns-a-value" class="main__anchor">Assignment = returns a value</a>

The fact of `=` being an operator, not a “magical” language construct has an interesting implication.

All operators in JavaScript return a value. That’s obvious for `+` and `-`, but also true for `=`.

The call `x = value` writes the `value` into `x` _and then returns it_.

Here’s a demo that uses an assignment as part of a more complex expression:

<a href="#"
<a href="#"

    let a = 1;
    let b = 2;

    let c = 3 - (a = b + 1);

    alert( a ); // 3
    alert( c ); // 0

In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn’t it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don’t write the code like that. Such tricks definitely don’t make code clearer or readable.

### <a href="#chaining-assignments" id="chaining-assignments" class="main__anchor">Chaining assignments</a>

Another interesting feature is the ability to chain assignments:

<a href="#"
<a href="#"

    let a, b, c;

    a = b = c = 2 + 2;

    alert( a ); // 4
    alert( b ); // 4
    alert( c ); // 4

Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it’s better to split such code into few lines:

    c = 2 + 2;
    b = c;
    a = c;

That’s easier to read, especially when eye-scanning the code fast.

## <a href="#modify-in-place" id="modify-in-place" class="main__anchor">Modify-in-place</a>

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

    let n = 2;
    n = n + 5;
    n = n * 2;

This notation can be shortened using the operators `+=` and `*=`:

<a href="#"
<a href="#"

    let n = 2;
    n += 5; // now n = 7 (same as n = n + 5)
    n *= 2; // now n = 14 (same as n = n * 2)

    alert( n ); // 14

Short “modify-and-assign” operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

<a href="#"
<a href="#"

    let n = 2;

    n *= 3 + 5;

    alert( n ); // 16  (right part evaluated first, same as n *= 8)

## <a href="#increment-decrement" id="increment-decrement" class="main__anchor">Increment/decrement</a>

Increasing or decreasing a number by one is among the most common numerical operations.

So, there are special operators for it:

- **Increment** `++` increases a variable by 1:

  <a href="#"
  <a href="#"

      let counter = 2;
      counter++;        // works the same as counter = counter + 1, but is shorter
      alert( counter ); // 3

- **Decrement** `--` decreases a variable by 1:

  <a href="#"
  <a href="#"

      let counter = 2;
      counter--;        // works the same as counter = counter - 1, but is shorter
      alert( counter ); // 1

<span class="important__type">Important:</span>

Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in “postfix form”: `counter++`.
- The “prefix form” is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.

Is there any difference? Yes, but we can only see it if we use the returned value of `++/--`.

Let’s clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here’s an example:

<a href="#"
<a href="#"

    let counter = 1;
    let a = ++counter; // (*)

    alert(a); // 2

In the line `(*)`, the _prefix_ form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let’s use the postfix form:

<a href="#"
<a href="#"

    let counter = 1;
    let a = counter++; // (*) changed ++counter to counter++

    alert(a); // 1

In the line `(*)`, the _postfix_ form `counter++` also increments `counter` but returns the _old_ value (prior to increment). So, the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, there is no difference in which form to use:

  <a href="#"
  <a href="#"

      let counter = 0;
      counter++;
      ++counter;
      alert( counter ); // 2, the lines above did the same

- If we’d like to increase a value _and_ immediately use the result of the operator, we need the prefix form:

  <a href="#"
  <a href="#"

      let counter = 0;
      alert( ++counter ); // 1

- If we’d like to increment a value but use its previous value, we need the postfix form:

  <a href="#"
  <a href="#"

      let counter = 0;
      alert( counter++ ); // 0

<span class="important__type">Increment/decrement among other operators</span>

The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.

For instance:

<a href="#"
<a href="#"

    let counter = 1;
    alert( 2 * ++counter ); // 4

Compare with:

<a href="#"
<a href="#"

    let counter = 1;
    alert( 2 * counter++ ); // 2, because counter++ returns the "old" value

Though technically okay, such notation usually makes code less readable. One line does multiple things – not good.

While reading code, a fast “vertical” eye-scan can easily miss something like `counter++` and it won’t be obvious that the variable increased.

We advise a style of “one line – one action”:

<a href="#"
<a href="#"

    let counter = 1;
    alert( 2 * counter );
    counter++;

## <a href="#bitwise-operators" id="bitwise-operators" class="main__anchor">Bitwise operators</a>

Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won’t need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) chapter on MDN when a need arises.

## <a href="#comma" id="comma" class="main__anchor">Comma</a>

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it’s used to write shorter code, so we need to know it in order to understand what’s going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:

<a href="#"
<a href="#"

    let a = (1 + 2, 3 + 4);

    alert( a ); // 7 (the result of 3 + 4)

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

<span class="important__type">Comma has a very low precedence</span>

Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It’s like `(a = 1 + 2), 3 + 4`.

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

    // three operations in one line
    for (a = 1, b = 3, c = a * b; a < 10; a++) {
     ...
    }

Such tricks are used in many JavaScript frameworks. That’s why we’re mentioning them. But usually they don’t improve code readability so we should think well before using them.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#the-postfix-and-prefix-forms" id="the-postfix-and-prefix-forms" class="main__anchor">The postfix and prefix forms</a>

<a href="/task/increment-order" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What are the final values of all variables `a`, `b`, `c` and `d` after the code below?

    let a = 1, b = 1;

    let c = ++a; // ?
    let d = b++; // ?

solution

The answer is:

- `a = 2`
- `b = 2`
- `c = 2`
- `d = 1`

<a href="#"
<a href="#"

    let a = 1, b = 1;

    alert( ++a ); // 2, prefix form returns the new value
    alert( b++ ); // 1, postfix form returns the old value

    alert( a ); // 2, incremented once
    alert( b ); // 2, incremented once

### <a href="#assignment-result" id="assignment-result" class="main__anchor">Assignment result</a>

<a href="/task/assignment-result" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

What are the values of `a` and `x` after the code below?

    let a = 2;

    let x = 1 + (a *= 2);

solution

The answer is:

- `a = 4` (multiplied by 2)
- `x = 5` (calculated as 1 + 4)

### <a href="#type-conversions" id="type-conversions" class="main__anchor">Type conversions</a>

<a href="/task/primitive-conversions-questions" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What are results of these expressions?

    "" + 1 + 0
    "" - 1 + 0
    true + false
    6 / "3"
    "2" * "3"
    4 + 5 + "px"
    "$" + 4 + 5
    "4" - 2
    "4px" - 2
    "  -9  " + 5
    "  -9  " - 5
    null + 1
    undefined + 1
    " \t \n" - 2

Think well, write down and then compare with the answer.

solution

    "" + 1 + 0 = "10" // (1)
    "" - 1 + 0 = -1 // (2)
    true + false = 1
    6 / "3" = 2
    "2" * "3" = 6
    4 + 5 + "px" = "9px"
    "$" + 4 + 5 = "$45"
    "4" - 2 = 2
    "4px" - 2 = NaN
    "  -9  " + 5 = "  -9  5" // (3)
    "  -9  " - 5 = -14 // (4)
    null + 1 = 1 // (5)
    undefined + 1 = NaN // (6)
    " \t \n" - 2 = -2 // (7)

1.  The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2.  The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3.  The addition with a string appends the number `5` to the string.
4.  The subtraction always converts to numbers, so it makes `" -9 "` a number `-9` (ignoring spaces around it).
5.  `null` becomes `0` after the numeric conversion.
6.  `undefined` becomes `NaN` after the numeric conversion.
7.  Space characters, are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a “regular” space between them. So, similarly to an empty string, it becomes `0`.

### <a href="#fix-the-addition" id="fix-the-addition" class="main__anchor">Fix the addition</a>

<a href="/task/fix-prompt" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here’s a code that asks the user for two numbers and shows their sum.

It works incorrectly. The output in the example below is `12` (for default prompt values).

Why? Fix it. The result should be `3`.

<a href="#"
<a href="#"

    let a = prompt("First number?", 1);
    let b = prompt("Second number?", 2);

    alert(a + b); // 12

solution

The reason is that prompt returns user input as a string.

So variables have values `"1"` and `"2"` respectively.

<a href="#"
<a href="#"

    let a = "1"; // prompt("First number?", 1);
    let b = "2"; // prompt("Second number?", 2);

    alert(a + b); // 12

What we should do is to convert strings to numbers before `+`. For example, using `Number()` or prepending them with `+`.

For example, right before `prompt`:

<a href="#"
<a href="#"

    let a = +prompt("First number?", 1);
    let b = +prompt("Second number?", 2);

    alert(a + b); // 3

Or in the `alert`:

<a href="#"
<a href="#"

    let a = prompt("First number?", 1);
    let b = prompt("Second number?", 2);

    alert(+a + +b); // 3

Using both unary and binary `+` in the latest code. Looks funny, doesn’t it?

<a href="/type-conversions" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/comparison" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Foperators" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Foperators" </a>

<a href="/tutorial/map" class="map">

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/first-steps" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="#terms-unary-binary-operand" class="sidebar__link">Terms: “unary”, “binary”, “operand”</a>
- <a href="#maths" class="sidebar__link">Maths</a>
- <a href="#string-concatenation-with-binary" class="sidebar__link">String concatenation with binary +</a>
- <a href="#numeric-conversion-unary" class="sidebar__link">Numeric conversion, unary +</a>
- <a href="#operator-precedence" class="sidebar__link">Operator precedence</a>
- <a href="#assignment" class="sidebar__link">Assignment</a>
- <a href="#modify-in-place" class="sidebar__link">Modify-in-place</a>
- <a href="#increment-decrement" class="sidebar__link">Increment/decrement</a>
- <a href="#bitwise-operators" class="sidebar__link">Bitwise operators</a>
- <a href="#comma" class="sidebar__link">Comma</a>

- <a href="#tasks" class="sidebar__link">Tasks (4)</a>
- <a href="#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Foperators" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Foperators" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/08-operators" class="sidebar__link">Edit on GitHub</a>

- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
