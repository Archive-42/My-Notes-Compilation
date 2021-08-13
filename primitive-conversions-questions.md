primitive-conversions-questions"

- <a href="primitive-conversions-questions.html"
  /primitive-conversions-questions"
  /primitive-conversions-questions"
  primitive-conversions-questionsprimitive-conversions-questions"

<!-- -->

primitive-conversions-questions"
primitive-conversions-questions"

- <a href="https://tr.javascript.info/"
  primitive-conversions-questions"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fprimitive-conversions-questions"%2Fprimitive-conversions-questions" </a>

<a href="../operators.html" Basic operators, maths</span></a>

<a href="../operators.html"

## Type conversions

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What are results of these expressions?

    "" + 1 + 0
    "" - 1 + 0
    true + false
    6 / "3"
    "2" * "3"
    4 + 5 + "px"
    "$" + 4 + 5
    "4" - 2
    "4px" - 2
    "  -9  " + 5
    "  -9  " - 5
    null + 1
    undefined + 1
    " \t \n" - 2

Think well, write down and then compare with the answer.

solution

    "" + 1 + 0 = "10" // (1)
    "" - 1 + 0 = -1 // (2)
    true + false = 1
    6 / "3" = 2
    "2" * "3" = 6
    4 + 5 + "px" = "9px"
    "$" + 4 + 5 = "$45"
    "4" - 2 = 2
    "4px" - 2 = NaN
    "  -9  " + 5 = "  -9  5" // (3)
    "  -9  " - 5 = -14 // (4)
    null + 1 = 1 // (5)
    undefined + 1 = NaN // (6)
    " \t \n" - 2 = -2 // (7)

1.  The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2.  The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3.  The addition with a string appends the number `5` to the string.
4.  The subtraction always converts to numbers, so it makes `" -9 "` a number `-9` (ignoring spaces around it).
5.  `null` becomes `0` after the numeric conversion.
6.  `undefined` becomes `NaN` after the numeric conversion.
7.  Space characters, are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a “regular” space between them. So, similarly to an empty string, it becomes `0`.
