EN

langs\_\_title">عربي</span></a>

- <a href="find-time-2-formats.html"
  /find-time-2-formats"
  /find-time-2-formats"
  find-time-2-formatsfind-time-2-formats"

<!-- -->

- /"
  find-time-2-formats"
- <a href="https://tr.javascript.info/"
  find-time-2-formats"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffind-time-2-formats"%2Ffind-time-2-formats" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-character-sets-and-ranges.html" Sets and ranges [...]</span></a>

<a href="../regexp-character-sets-and-ranges.html"

## Find the time as hh:mm or hh-mm

The time can be in the format `hours:minutes` or `hours-minutes`. Both hours and minutes have 2 digits: `09:00` or `21-30`.

Write a regexp to find time:

    let regexp = /your regexp/g;
    alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30

P.S. In this task we assume that the time is always correct, there’s no need to filter out bad strings like “45:67”. Later we’ll deal with that too.

solution

Answer: `\d\d[-:]\d\d`.

<a href="find-time-2-formats.html#"
<a href="find-time-2-formats.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /\d\d[-:]\d\d/g;
    alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30

Please note that the dash `'-'` has a special meaning in square brackets, but only between other characters, not when it’s in the beginning or at the end, so we don’t need to escape it.
