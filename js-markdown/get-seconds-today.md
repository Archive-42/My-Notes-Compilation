get-seconds-today"

- <a href="get-seconds-today.html"
  /get-seconds-today"
  /get-seconds-today"
  get-seconds-todayget-seconds-today"

<!-- -->

get-seconds-today"
get-seconds-today"
/get-seconds-today"
get-seconds-today"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fget-seconds-today"%2Fget-seconds-today" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../date.html" Date and time</span></a>

<a href="../date.html"

## How many seconds have passed today?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `getSecondsToday()` that returns the number of seconds from the beginning of today.

For instance, if now were `10:00 am`, and there was no daylight savings shift, then:

    getSecondsToday() == 36000 // (3600 * 10)

The function should work in any day. That is, it should not have a hard-coded value of “today”.

solution

To get the number of seconds, we can generate a date using the current day and time 00:00:00, then substract it from “now”.

The difference is the number of milliseconds from the beginning of the day, that we should divide by 1000 to get seconds:

<a href="get-seconds-today.html#"
<a href="get-seconds-today.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getSecondsToday() {
      let now = new Date();

      // create an object using the current day/month/year
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      let diff = now - today; // ms difference
      return Math.round(diff / 1000); // make seconds
    }

    alert( getSecondsToday() );

An alternative solution would be to get hours/minutes/seconds and convert them to seconds:

<a href="get-seconds-today.html#"
<a href="get-seconds-today.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getSecondsToday() {
      let d = new Date();
      return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    }

    alert( getSecondsToday() );
