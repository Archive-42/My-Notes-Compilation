EN

- <a href="https://ar.javascript.info/"
- <a href="calendar-table.html"
  calendar-table"
  /calendar-table"
  calendar-tablecalendar-table"

<!-- -->

calendar-table"
/calendar-table"
/calendar-table"
ask/calendar-table"k%2Fcalendar-table"%2Fcalendar-table" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../modifying-document.html" Modifying the document</span></a>

<a href="../modifying-document.html"

## Create a calendar

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write a function `createCalendar(elem, year, month)`.

The call should create a calendar for the given year/month and put it inside `elem`.

The calendar should be a table, where a week is `<tr>`, and a day is `<td>`. The table top should be `<th>` with weekday names: the first day should be Monday, and so on till Sunday.

For instance, `createCalendar(cal, 2012, 9)` should generate in element `cal` the following calendar:

P.S. For this task it’s enough to generate the calendar, should not yet be clickable.

[Open a sandbox for the task.](https://plnkr.co/edit/HMGrxDjPkb7TmppV?p=preview)

solution

We’ll create the table as a string: `"<table>...</table>"`, and then assign it to `innerHTML`.

The algorithm:

1.  Create the table header with `<th>` and weekday names.
2.  Create the date object `d = new Date(year, month-1)`. That’s the first day of `month` (taking into account that months in JavaScript start from `0`, not `1`).
3.  First few cells till the first day of the month `d.getDay()` may be empty. Let’s fill them in with `<td></td>`.
4.  Increase the day in `d`: `d.setDate(d.getDate()+1)`. If `d.getMonth()` is not yet the next month, then add the new cell `<td>` to the calendar. If that’s a Sunday, then add a newline `“</tr><tr>”`.
5.  If the month has finished, but the table row is not yet full, add empty `<td>` into it, to make it square.

[Open the solution in a sandbox.](https://plnkr.co/edit/8TutdHGPz06kKUQS?p=preview)
