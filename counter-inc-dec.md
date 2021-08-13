counter-inc-dec"

- <a href="counter-inc-dec.html"
  /counter-inc-dec"
  /counter-inc-dec"
  counter-inc-deccounter-inc-dec"

<!-- -->

counter-inc-dec"
counter-inc-dec"
/counter-inc-dec"
counter-inc-dec"

k%2Fcounter-inc-dec"%2Fcounter-inc-dec" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../function-object.html" Function object, NFE</span></a>

<a href="../function-object.html"

## Set and decrease for counter

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Modify the code of `makeCounter()` so that the counter can also decrease and set the number:

- `counter()` should return the next number (as before).
- `counter.set(value)` should set the counter to `value`.
- `counter.decrease()` should decrease the counter by 1.

See the sandbox code for the complete usage example.

P.S. You can use either a closure or the function property to keep the current count. Or write both variants.

[Open a sandbox with tests.](https://plnkr.co/edit/HBAN4ld5Safqp4RC?p=preview)

solution

The solution uses `count` in the local variable, but addition methods are written right into the `counter`. They share the same outer lexical environment and also can access the current `count`.

    function makeCounter() {
      let count = 0;

      function counter() {
        return count++;
      }

      counter.set = value => count = value;

      counter.decrease = () => count--;

      return counter;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/lR5zyNZWB0tPaHWk?p=preview)
