EN

langs\_\_title">عربي</span></a>

- <a href="parse-expression.html"
  /parse-expression"

parse-expressionparse-expression"

<!-- -->

- <a href="https://ko.javascript.info/"
  parse-expression"
- <a href="https://tr.javascript.info/"
- <a href="https://zh.javascript.info/"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fparse-expression"%2Fparse-expression" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-groups.html" Capturing groups</span></a>

<a href="../regexp-groups.html"

## Parse an expression

An arithmetical expression consists of 2 numbers and an operator between them, for instance:

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

The operator is one of: `"+"`, `"-"`, `"*"` or `"/"`.

There may be extra spaces at the beginning, at the end or between the parts.

Create a function `parse(expr)` that takes an expression and returns an array of 3 items:

1.  The first number.
2.  The operator.
3.  The second number.

For example:

    let [a, op, b] = parse("1.2 * 3.4");

    alert(a); // 1.2
    alert(op); // *
    alert(b); // 3.4

solution

A regexp for a number is: `-?\d+(\.\d+)?`. We created it in the previous task.

An operator is `[-+*/]`. The hyphen `-` goes first in the square brackets, because in the middle it would mean a character range, while we just want a character `-`.

The slash `/` should be escaped inside a JavaScript regexp `/.../`, we’ll do that later.

We need a number, an operator, and then another number. And optional spaces between them.

The full regular expression: `-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

It has 3 parts, with `\s*` between them:

1.  `-?\d+(\.\d+)?` – the first number,
2.  `[-+*/]` – the operator,
3.  `-?\d+(\.\d+)?` – the second number.

To make each of these parts a separate element of the result array, let’s enclose them in parentheses: `(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

In action:

<a href="parse-expression.html#"
<a href="parse-expression.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

    alert( "1.2 + 12".match(regexp) );

The result includes:

- `result[0] == "1.2 + 12"` (full match)
- `result[1] == "1.2"` (first group `(-?\d+(\.\d+)?)` – the first number, including the decimal part)
- `result[2] == ".2"` (second group`(\.\d+)?` – the first decimal part)
- `result[3] == "+"` (third group `([-+*\/])` – the operator)
- `result[4] == "12"` (forth group `(-?\d+(\.\d+)?)` – the second number)
- `result[5] == undefined` (fifth group `(\.\d+)?` – the last decimal part is absent, so it’s undefined)

We only want the numbers and the operator, without the full match or the decimal parts, so let’s “clean” the result a bit.

The full match (the arrays first item) can be removed by shifting the array `result.shift()`.

Groups that contain decimal parts (number 2 and 4) `(.\d+)` can be excluded by adding `?:` to the beginning: `(?:\.\d+)?`.

The final solution:

<a href="parse-expression.html#"
<a href="parse-expression.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function parse(expr) {
      let regexp = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

      let result = expr.match(regexp);

      if (!result) return [];
      result.shift();

      return result;
    }

    alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
