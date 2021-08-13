counter-independent"

- <a href="counter-independent.html"
  /counter-independent"
  /counter-independent"
  counter-independentcounter-independent"

<!-- -->

counter-independent"
counter-independent"
/counter-independent"
counter-independent"

k%2Fcounter-independent"%2Fcounter-independent" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Are counters independent?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here we make two counters: `counter` and `counter2` using the same `makeCounter` function.

Are they independent? What is the second counter going to show? `0,1` or `2,3` or something else?

    function makeCounter() {
      let count = 0;

      return function() {
        return count++;
      };
    }

    let counter = makeCounter();
    let counter2 = makeCounter();

    alert( counter() ); // 0
    alert( counter() ); // 1

    alert( counter2() ); // ?
    alert( counter2() ); // ?

solution

The answer: **0,1.**

Functions `counter` and `counter2` are created by different invocations of `makeCounter`.

So they have independent outer Lexical Environments, each one has its own `count`.
