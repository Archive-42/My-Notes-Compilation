if-question"

- <a href="if-question.html"
  /if-question"
  /if-question"
  if-questionif-question"

<!-- -->

if-question"
if-question"
/if-question"
if-question"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fif-question"%2Fif-question" </a>

<a href="../logical-operators.html" Logical operators</span></a>

<a href="../logical-operators.html"

## A question about "if"

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Which of these `alert`s are going to execute?

What will the results of the expressions be inside `if(...)`?

    if (-1 || 0) alert( 'first' );
    if (-1 && 0) alert( 'second' );
    if (null || -1 && 1) alert( 'third' );

solution

The answer: the first and the third will execute.

Details:

<a href="if-question.html#"
<a href="if-question.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // Runs.
    // The result of -1 || 0 = -1, truthy
    if (-1 || 0) alert( 'first' );

    // Doesn't run
    // -1 && 0 = 0, falsy
    if (-1 && 0) alert( 'second' );

    // Executes
    // Operator && has a higher precedence than ||
    // so -1 && 1 executes first, giving us the chain:
    // null || -1 && 1  ->  null || 1  ->  1
    if (null || -1 && 1) alert( 'third' );
