repeat-until-correct"

- <a href="repeat-until-correct.html"
  /repeat-until-correct"
  /repeat-until-correct"
  repeat-until-correctrepeat-until-correct"

<!-- -->

repeat-until-correct"
repeat-until-correct"
/repeat-until-correct"
repeat-until-correct"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frepeat-until-correct"%2Frepeat-until-correct" </a>

<a href="../while-for.html" Loops: while and for</span></a>

<a href="../while-for.html"

## Repeat until the input is correct

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a loop which prompts for a number greater than `100`. If the visitor enters another number – ask them to input again.

The loop must ask for a number until either the visitor enters a number greater than `100` or cancels the input/enters an empty line.

Here we can assume that the visitor only inputs numbers. There’s no need to implement a special handling for a non-numeric input in this task.

[Run the demo](repeat-until-correct.html#)

solution

<a href="repeat-until-correct.html#"
<a href="repeat-until-correct.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let num;

    do {
      num = prompt("Enter a number greater than 100?", 0);
    } while (num <= 100 && num);

The loop `do..while` repeats while both checks are truthy:

1.  The check for `num <= 100` – that is, the entered value is still not greater than `100`.
2.  The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.

P.S. If `num` is `null` then `num <= 100` is `true`, so without the 2nd check the loop wouldn’t stop if the user clicks CANCEL. Both checks are required.
