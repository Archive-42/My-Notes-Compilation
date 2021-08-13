array-input-sum"

- <a href="array-input-sum.html"
  array-input-sum"
  /array-input-sum"
  array-input-sumarray-input-sum"

<!-- -->

array-input-sum"
/array-input-sum"
/array-input-sum"
ask/array-input-sum"k%2Farray-input-sum"%2Farray-input-sum" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array.html" Arrays</span></a>

<a href="../array.html"

## Sum input numbers

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write the function `sumInput()` that:

- Asks the user for values using `prompt` and stores the values in the array.
- Finishes asking when the user enters a non-numeric value, an empty string, or presses “Cancel”.
- Calculates and returns the sum of array items.

P.S. A zero `0` is a valid number, please don’t stop the input on zero.

[Run the demo](array-input-sum.html#)

solution

Please note the subtle, but important detail of the solution. We don’t convert `value` to number instantly after `prompt`, because after `value = +value` we would not be able to tell an empty string (stop sign) from the zero (valid number). We do it later instead.

<a href="array-input-sum.html#"
<a href="array-input-sum.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sumInput() {

      let numbers = [];

      while (true) {

        let value = prompt("A number please?", 0);

        // should we cancel?
        if (value === "" || value === null || !isFinite(value)) break;

        numbers.push(+value);
      }

      let sum = 0;
      for (let number of numbers) {
        sum += number;
      }
      return sum;
    }

    alert( sumInput() );
