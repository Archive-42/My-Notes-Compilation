extract-currency"

- <a href="extract-currency.html"
  /extract-currency"
  /extract-currency"
  extract-currencyextract-currency"

<!-- -->

extract-currency"
extract-currency"
/extract-currency"
extract-currency"

k%2Fextract-currency"%2Fextract-currency" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../string.html" Strings</span></a>

<a href="../string.html"

## Extract the money

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

We have a cost in the form `"$120"`. That is: the dollar sign goes first, and then the number.

Create a function `extractCurrencyValue(str)` that would extract the numeric value from such string and return it.

The example:

    alert( extractCurrencyValue('$120') === 120 ); // true

[Open a sandbox with tests.](https://plnkr.co/edit/ZklwF4wYeaFRV8Bi?p=preview)

solution

    function extractCurrencyValue(str) {
      return +str.slice(1);
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/KnPS7b1ocnPQBfw4?p=preview)
