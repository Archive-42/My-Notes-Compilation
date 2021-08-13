EN

langs\_\_title">عربي</span></a>

- <a href="find-time-hh-mm.html"
  /find-time-hh-mm"
  /find-time-hh-mm"
  find-time-hh-mmfind-time-hh-mm"

<!-- -->

- /"
  find-time-hh-mm"
- <a href="https://tr.javascript.info/"
  find-time-hh-mm"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffind-time-hh-mm"%2Ffind-time-hh-mm" </a>

<a href="../regular-expressions.html" Regular expressions</span></a>

<a href="../regexp-boundary.html" Word boundary: \b</span></a>

<a href="../regexp-boundary.html"

## Find the time

The time has a format: `hours:minutes`. Both hours and minutes has two digits, like `09:00`.

Make a regexp to find time in the string: `Breakfast at 09:00 in the room 123:456.`

P.S. In this task there’s no need to check time correctness yet, so `25:99` can also be a valid result.

P.P.S. The regexp shouldn’t match `123:456`.

solution

The answer: `\b\d\d:\d\d\b`.

<a href="find-time-hh-mm.html#"
<a href="find-time-hh-mm.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "Breakfast at 09:00 in the room 123:456.".match( /\b\d\d:\d\d\b/ ) ); // 09:00
