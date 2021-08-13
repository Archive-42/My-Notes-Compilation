which-value-for"

- <a href="which-value-for.html"
  /which-value-for"
  /which-value-for"
  which-value-for"
  task/which-value-for"

<!-- -->

which-value-for"
which-value-for"
/which-value-for"
which-value-for"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fwhich-value-for"%2Fwhich-value-for" </a>

<a href="../while-for.html" Loops: while and for</span></a>

<a href="../while-for.html"

## Which values get shown by the "for" loop?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

For each loop write down which values it is going to show. Then compare with the answer.

Both loops `alert` same values or not?

1.  The postfix form:

        for (let i = 0; i < 5; i++) alert( i );

2.  The prefix form:

        for (let i = 0; i < 5; ++i) alert( i );

solution

**The answer: from `0` to `4` in both cases.**

<a href="which-value-for.html#"
<a href="which-value-for.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    for (let i = 0; i < 5; ++i) alert( i );

    for (let i = 0; i < 5; i++) alert( i );

That can be easily deducted from the algorithm of `for`:

1.  Execute once `i = 0` before everything (begin).
2.  Check the condition `i < 5`
3.  If `true` – execute the loop body `alert(i)`, and then `i++`

The increment `i++` is separated from the condition check (2). That’s just another statement.

The value returned by the increment is not used here, so there’s no difference between `i++` and `++i`.
