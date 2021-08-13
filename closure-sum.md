closure-sum"

- <a href="closure-sum.html"
  closure-sum"
  /closure-sum"
  closure-sumclosure-sum"

<!-- -->

closure-sum"
/closure-sum"
/closure-sum"
closure-sum"

k%2Fclosure-sum"%2Fclosure-sum" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Sum with closures

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write function `sum` that works like this: `sum(a)(b) = a+b`.

Yes, exactly this way, using double parentheses (not a mistype).

For instance:

    sum(1)(2) = 3
    sum(5)(-1) = 4

solution

For the second parentheses to work, the first ones must return a function.

Like this:

<a href="closure-sum.html#"
<a href="closure-sum.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sum(a) {

      return function(b) {
        return a + b; // takes "a" from the outer lexical environment
      };

    }

    alert( sum(1)(2) ); // 3
    alert( sum(5)(-1) ); // 4
