EN

langs\_\_title">عربي</span></a>

- <a href="lazy-greedy.html"
  /lazy-greedy"
  /lazy-greedy"
  lazy-greedylazy-greedy"

<!-- -->

- /"
  lazy-greedy"
- <a href="https://tr.javascript.info/"
  lazy-greedy"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Flazy-greedy"%2Flazy-greedy" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-greedy-and-lazy.html" Greedy and lazy quantifiers</span></a>

<a href="../regexp-greedy-and-lazy.html"

## A match for /d+? d+?/

What’s the match here?

    alert( "123 456".match(/\d+? \d+?/g) ); // ?

solution

The result is: `123 4`.

First the lazy `\d+?` tries to take as little digits as it can, but it has to reach the space, so it takes `123`.

Then the second `\d+?` takes only one digit, because that’s enough.
