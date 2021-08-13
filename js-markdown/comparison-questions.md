comparison-questions"

- <a href="comparison-questions.html"
  /comparison-questions"
  /comparison-questions"
  comparison-questionscomparison-questions"

<!-- -->

comparison-questions"
/comparison-questions"
/comparison-questions"
comparison-questions"

k%2Fcomparison-questions"%2Fcomparison-questions" </a>

<a href="../comparison.html" Comparisons</span></a>

<a href="../comparison.html"

## Comparisons

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What will be the result for these expressions?

    5 > 4
    "apple" > "pineapple"
    "2" > "12"
    undefined == null
    undefined === null
    null == "\n0\n"
    null === +"\n0\n"

solution

    5 > 4 → true
    "apple" > "pineapple" → false
    "2" > "12" → true
    undefined == null → true
    undefined === null → false
    null == "\n0\n" → false
    null === +"\n0\n" → false

Some of the reasons:

1.  Obviously, true.
2.  Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3.  Again, dictionary comparison, first char `"2"` is greater than the first char `"1"`.
4.  Values `null` and `undefined` equal each other only.
5.  Strict equality is strict. Different types from both sides lead to false.
6.  Similar to `(4)`, `null` only equals `undefined`.
7.  Strict equality of different types.
