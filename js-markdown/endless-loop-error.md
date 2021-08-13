endless-loop-error"

- <a href="endless-loop-error.html"
  /endless-loop-error"
  /endless-loop-error"
  endless-loop-errorendless-loop-error"

<!-- -->

- <a href="https://ko.javascript.info/"
  endless-loop-error"
  /endless-loop-error"
  endless-loop-error"

k%2Fendless-loop-error"%2Fendless-loop-error" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../number.html" Numbers</span></a>

<a href="../number.html"

## An occasional infinite loop

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

This loop is infinite. It never ends. Why?

    let i = 0;
    while (i != 10) {
      i += 0.2;
    }

solution

That’s because `i` would never equal `10`.

Run it to see the _real_ values of `i`:

<a href="endless-loop-error.html#"
<a href="endless-loop-error.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let i = 0;
    while (i < 11) {
      i += 0.2;
      if (i > 9.8 && i < 10.2) alert( i );
    }

None of them is exactly `10`.

Such things happen because of the precision losses when adding fractions like `0.2`.

Conclusion: evade equality checks when working with decimal fractions.
