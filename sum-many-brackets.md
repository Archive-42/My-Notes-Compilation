sum-many-brackets"

- <a href="sum-many-brackets.html"
  /sum-many-brackets"
  /sum-many-brackets"
  sum-many-brackets"
  task/sum-many-brackets"

<!-- -->

sum-many-brackets"
sum-many-brackets"
/sum-many-brackets"
sum-many-brackets"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsum-many-brackets"%2Fsum-many-brackets" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../function-object.html" Function object, NFE</span></a>

<a href="../function-object.html"

## Sum with an arbitrary amount of brackets

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
3.  According to the task, the function must become the number when used in `==`. Functions are objects, so the conversion happens as described in the chapter [Object to primitive conversion](../object-toprimitive.html), and we can provide our own method that returns the number.

Now the code:

<a href="sum-many-brackets.html#"
<a href="sum-many-brackets.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

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
