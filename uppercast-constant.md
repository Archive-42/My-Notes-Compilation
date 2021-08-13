uppercast-constant"

- <a href="uppercast-constant.html"
  /uppercast-constant"
  /uppercast-constant"
  uppercast-constant"
  task/uppercast-constant"

<!-- -->

uppercast-constant"
uppercast-constant"
/uppercast-constant"
uppercast-constant"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fuppercast-constant"%2Fuppercast-constant" </a>

<a href="../variables.html" Variables</span></a>

<a href="../variables.html"

## Uppercase const?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Examine the following code:

    const birthday = '18.04.1982';

    const age = someCode(birthday);

Here we have a constant `birthday` date and the `age` is calculated from `birthday` with the help of some code (it is not provided for shortness, and because details don’t matter here).

Would it be right to use upper case for `birthday`? For `age`? Or even for both?

    const BIRTHDAY = '18.04.1982'; // make uppercase?

    const AGE = someCode(BIRTHDAY); // make uppercase?

solution

We generally use upper case for constants that are “hard-coded”. Or, in other words, when the value is known prior to execution and directly written into the code.

In this code, `birthday` is exactly like that. So we could use the upper case for it.

In contrast, `age` is evaluated in run-time. Today we have one age, a year after we’ll have another one. It is constant in a sense that it does not change through the code execution. But it is a bit “less of a constant” than `birthday`: it is calculated, so we should keep the lower case for it.
