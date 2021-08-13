calculator"

- <a href="calculator.html"
  calculator"
  /calculator"
  calculatorcalculator"

<!-- -->

calculator"
/calculator"
/calculator"
ask/calculator"k%2Fcalculator"%2Fcalculator" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../object-methods.html" Object methods, "this"</span></a>

<a href="../object-methods.html"

## Create a calculator

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create an object `calculator` with three methods:

- `read()` prompts for two values and saves them as object properties.
- `sum()` returns the sum of saved values.
- `mul()` multiplies saved values and returns the result.

  let calculator = {
  // ... your code ...
  };

  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );

[Run the demo](calculator.html#)

[Open a sandbox with tests.](https://plnkr.co/edit/8rDRJ4cWja4gSda3?p=preview)

solution

<a href="calculator.html#"
<a href="calculator.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let calculator = {
      sum() {
        return this.a + this.b;
      },

      mul() {
        return this.a * this.b;
      },

      read() {
        this.a = +prompt('a?', 0);
        this.b = +prompt('b?', 0);
      }
    };

    calculator.read();
    alert( calculator.sum() );
    alert( calculator.mul() );

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/4PgrcZqUrY5Givw8?p=preview)
