last-day-of-month"

- <a href="last-day-of-month.html"
  /last-day-of-month"
  /last-day-of-month"
  last-day-of-monthlast-day-of-month"

<!-- -->

last-day-of-month"
last-day-of-month"
/last-day-of-month"
last-day-of-month"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Flast-day-of-month"%2Flast-day-of-month" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../date.html" Date and time</span></a>

<a href="../date.html"

## Last day of month?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `getLastDayOfMonth(year, month)` that returns the last day of month. Sometimes it is 30th, 31st or even 28/29th for Feb.

Parameters:

- `year` – four-digits year, for instance 2012.
- `month` – month, from 0 to 11.

For instance, `getLastDayOfMonth(2012, 1) = 29` (leap year, Feb).

[Open a sandbox with tests.](https://plnkr.co/edit/V3dNLDkdoiLzIfS3?p=preview)

solution

Let’s create a date using the next month, but pass zero as the day:

<a href="last-day-of-month.html#"
<a href="last-day-of-month.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getLastDayOfMonth(year, month) {
      let date = new Date(year, month + 1, 0);
      return date.getDate();
    }

    alert( getLastDayOfMonth(2012, 0) ); // 31
    alert( getLastDayOfMonth(2012, 1) ); // 29
    alert( getLastDayOfMonth(2013, 1) ); // 28

Normally, dates start from 1, but technically we can pass any number, the date will autoadjust itself. So when we pass 0, then it means “one day before 1st day of the month”, in other words: “the last day of the previous month”.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/g51svTU2CLxnXQ6k?p=preview)
