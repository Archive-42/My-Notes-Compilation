rewrite-if-switch"

- <a href="rewrite-if-switch.html"
  /rewrite-if-switch"
  /rewrite-if-switch"
  rewrite-if-switchrewrite-if-switch"

<!-- -->

rewrite-if-switch"
rewrite-if-switch"
/rewrite-if-switch"
rewrite-if-switch"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frewrite-if-switch"%2Frewrite-if-switch" </a>

<a href="../switch.html" The "switch" statement</span></a>

<a href="../switch.html"

## Rewrite "if" into "switch"

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Rewrite the code below using a single `switch` statement:

<a href="rewrite-if-switch.html#"
<a href="rewrite-if-switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = +prompt('a?', '');

    if (a == 0) {
      alert( 0 );
    }
    if (a == 1) {
      alert( 1 );
    }

    if (a == 2 || a == 3) {
      alert( '2,3' );
    }

solution

The first two checks turn into two `case`. The third check is split into two cases:

<a href="rewrite-if-switch.html#"
<a href="rewrite-if-switch.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = +prompt('a?', '');

    switch (a) {
      case 0:
        alert( 0 );
        break;

      case 1:
        alert( 1 );
        break;

      case 2:
      case 3:
        alert( '2,3' );
        break;
    }

Please note: the `break` at the bottom is not required. But we put it to make the code future-proof.

In the future, there is a chance that we’d want to add one more `case`, for example `case 4`. And if we forget to add a break before it, at the end of `case 3`, there will be an error. So that’s a kind of self-insurance.
