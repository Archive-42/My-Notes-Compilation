weekday"

- <a href="weekday.html"
  /weekday"
  /weekday"
  weekday"
  task/weekday"

<!-- -->

weekday"
weekday"
/weekday"
weekday"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fweekday"%2Fweekday" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../date.html" Date and time</span></a>

<a href="../date.html"

## European weekday

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

European countries have days of week starting with Monday (number 1), then Tuesday (number 2) and till Sunday (number 7). Write a function `getLocalDay(date)` that returns the “European” day of week for `date`.

    let date = new Date(2012, 0, 3);  // 3 Jan 2012
    alert( getLocalDay(date) );       // tuesday, should show 2

[Open a sandbox with tests.](https://plnkr.co/edit/Jy06up1tNLMWXmcg?p=preview)

solution

    function getLocalDay(date) {

      let day = date.getDay();

      if (day == 0) { // weekday 0 (sunday) is 7 in european
        day = 7;
      }

      return day;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/aH2e7hODH65QAfcw?p=preview)
