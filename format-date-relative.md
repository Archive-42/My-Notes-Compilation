format-date-relative"

- <a href="format-date-relative.html"
  /format-date-relative"
  /format-date-relative"
  format-date-relativeformat-date-relative"

<!-- -->

format-date-relative"
format-date-relative"
/format-date-relative"
format-date-relative"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fformat-date-relative"%2Fformat-date-relative" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../date.html" Date and time</span></a>

<a href="../date.html"

## Format the relative date

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write a function `formatDate(date)` that should format `date` as follows:

- If since `date` passed less than 1 second, then `"right now"`.
- Otherwise, if since `date` passed less than 1 minute, then `"n sec. ago"`.
- Otherwise, if less than an hour, then `"m min. ago"`.
- Otherwise, the full date in the format `"DD.MM.YY HH:mm"`. That is: `"day.month.year hours:minutes"`, all in 2-digit format, e.g. `31.12.16 10:00`.

For instance:

    alert( formatDate(new Date(new Date - 1)) ); // "right now"

    alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

    alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

    // yesterday's date like 31.12.16 20:00
    alert( formatDate(new Date(new Date - 86400 * 1000)) );

[Open a sandbox with tests.](https://plnkr.co/edit/Wsp9lIL4pPLoApph?p=preview)

solution

To get the time from `date` till now – let’s substract the dates.

<a href="format-date-relative.html#"
<a href="format-date-relative.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function formatDate(date) {
      let diff = new Date() - date; // the difference in milliseconds

      if (diff < 1000) { // less than 1 second
        return 'right now';
      }

      let sec = Math.floor(diff / 1000); // convert diff to seconds

      if (sec < 60) {
        return sec + ' sec. ago';
      }

      let min = Math.floor(diff / 60000); // convert diff to minutes
      if (min < 60) {
        return min + ' min. ago';
      }

      // format the date
      // add leading zeroes to single-digit day/month/hours/minutes
      let d = date;
      d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
      ].map(component => component.slice(-2)); // take last 2 digits of every component

      // join the components into date
      return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
    }

    alert( formatDate(new Date(new Date - 1)) ); // "right now"

    alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

    alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

    // yesterday's date like 31.12.2016 20:00
    alert( formatDate(new Date(new Date - 86400 * 1000)) );

Alternative solution:

<a href="format-date-relative.html#"
<a href="format-date-relative.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function formatDate(date) {
      let dayOfMonth = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let diffMs = new Date() - date;
      let diffSec = Math.round(diffMs / 1000);
      let diffMin = diffSec / 60;
      let diffHour = diffMin / 60;

      // formatting
      year = year.toString().slice(-2);
      month = month < 10 ? '0' + month : month;
      dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
      hour = hour < 10 ? '0' + hour : hour;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      if (diffSec < 1) {
        return 'right now';
      } else if (diffMin < 1) {
        return `${diffSec} sec. ago`
      } else if (diffHour < 1) {
        return `${diffMin} min. ago`
      } else {
        return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
      }
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/mUc0gvvIUZRqoY27?p=preview)
