camelcase"

- <a href="camelcase.html"
  camelcase"
  /camelcase"
  camelcasecamelcase"

<!-- -->

camelcase"
/camelcase"
/camelcase"
ask/camelcase"k%2Fcamelcase"%2Fcamelcase" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../array-methods.html" Array methods</span></a>

<a href="../array-methods.html"

## Translate border-left-width to borderLeftWidth

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the function `camelize(str)` that changes dash-separated words like “my-short-string” into camel-cased “myShortString”.

That is: removes all dashes, each word after dash becomes uppercased.

Examples:

    camelize("background-color") == 'backgroundColor';
    camelize("list-style-image") == 'listStyleImage';
    camelize("-webkit-transition") == 'WebkitTransition';

P.S. Hint: use `split` to split the string into an array, transform it and `join` back.

[Open a sandbox with tests.](https://plnkr.co/edit/ngiOSON8bvsEnRyY?p=preview)

solution

    function camelize(str) {
      return str
        .split('-') // splits 'my-long-word' into array ['my', 'long', 'word']
        .map(
          // capitalizes first letters of all array items except the first one
          // converts ['my', 'long', 'word'] into ['my', 'Long', 'Word']
          (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
        )
        .join(''); // joins ['my', 'Long', 'Word'] into 'myLongWord'
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/p2yQj2XmkBOr49zc?p=preview)
