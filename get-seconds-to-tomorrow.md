get-seconds-to-tomorrow"

- <a href="get-seconds-to-tomorrow.html"
  /get-seconds-to-tomorrow"
  /get-seconds-to-tomorrow"
  get-seconds-to-tomorrowget-seconds-to-tomorrow"

<!-- -->

get-seconds-to-tomorrow"
get-seconds-to-tomorrow"
/get-seconds-to-tomorrow"
get-seconds-to-tomorrow"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fget-seconds-to-tomorrow"%2Fget-seconds-to-tomorrow" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../date.html" Date and time</span></a>

<a href="../date.html"

## How many seconds till tomorrow?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `getSecondsToTomorrow()` that returns the number of seconds till tomorrow.

For instance, if now is `23:00`, then:

    getSecondsToTomorrow() == 3600

P.S. The function should work at any day, the “today” is not hardcoded.

solution

To get the number of milliseconds till tomorrow, we can from “tomorrow 00:00:00” substract the current date.

First, we generate that “tomorrow”, and then do it:

<a href="get-seconds-to-tomorrow.html#"
<a href="get-seconds-to-tomorrow.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getSecondsToTomorrow() {
      let now = new Date();

      // tomorrow date
      let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

      let diff = tomorrow - now; // difference in ms
      return Math.round(diff / 1000); // convert to seconds
    }

Alternative solution:

<a href="get-seconds-to-tomorrow.html#"
<a href="get-seconds-to-tomorrow.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getSecondsToTomorrow() {
      let now = new Date();
      let hour = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
      let totalSecondsInADay = 86400;

      return totalSecondsInADay - totalSecondsToday;
    }

Please note that many countries have Daylight Savings Time (DST), so there may be days with 23 or 25 hours. We may want to treat such days separately.
