EN

- <a href="https://ar.javascript.info/"
- <a href="accumulator.html"
  accumulator"
  /accumulator"
  accumulatoraccumulator"

<!-- -->

accumulator"
/accumulator"
/accumulator"
ask/accumulator"k%2Faccumulator"%2Faccumulator" </a>

<a href="../object-basics.html" Objects: the basics</span></a>

<a href="../constructor-new.html" Constructor, operator "new"</span></a>

<a href="../constructor-new.html"

## Create new Accumulator

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a constructor function `Accumulator(startingValue)`.

Object that it creates should:

- Store the “current value” in the property `value`. The starting value is set to the argument of the constructor `startingValue`.
- The `read()` method should use `prompt` to read a new number and add it to `value`.

In other words, the `value` property is the sum of all user-entered values with the initial value `startingValue`.

Here’s the demo of the code:

    let accumulator = new Accumulator(1); // initial value 1

    accumulator.read(); // adds the user-entered value
    accumulator.read(); // adds the user-entered value

    alert(accumulator.value); // shows the sum of these values

[Run the demo](accumulator.html#)

[Open a sandbox with tests.](https://plnkr.co/edit/uuDv6NABOHIU6hgU?p=preview)

solution

<a href="accumulator.html#"
<a href="accumulator.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function Accumulator(startingValue) {
      this.value = startingValue;

      this.read = function() {
        this.value += +prompt('How much to add?', 0);
      };

    }

    let accumulator = new Accumulator(1);
    accumulator.read();
    accumulator.read();
    alert(accumulator.value);

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/4izv43LoZxeOmEa0?p=preview)
