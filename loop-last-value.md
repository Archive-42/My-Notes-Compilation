loop-last-value"

- <a href="loop-last-value.html"
  /loop-last-value"
  /loop-last-value"
  loop-last-valueloop-last-value"

<!-- -->

loop-last-value"
loop-last-value"
/loop-last-value"
loop-last-value"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Floop-last-value"%2Floop-last-value" </a>

<a href="../while-for.html" Loops: while and for</span></a>

<a href="../while-for.html"

## Last loop value

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

What is the last value alerted by this code? Why?

    let i = 3;

    while (i) {
      alert( i-- );
    }

solution

The answer: `1`.

<a href="loop-last-value.html#"
<a href="loop-last-value.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let i = 3;

    while (i) {
      alert( i-- );
    }

Every loop iteration decreases `i` by `1`. The check `while(i)` stops the loop when `i = 0`.

Hence, the steps of the loop form the following sequence (“loop unrolled”):

    let i = 3;

    alert(i--); // shows 3, decreases i to 2

    alert(i--) // shows 2, decreases i to 1

    alert(i--) // shows 1, decreases i to 0

    // done, while(i) check stops the loop
