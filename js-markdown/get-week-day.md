get-week-day"

- <a href="get-week-day.html"
  /get-week-day"
  /get-week-day"
  get-week-dayget-week-day"

<!-- -->

get-week-day"
get-week-day"
/get-week-day"
get-week-day"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fget-week-day"%2Fget-week-day" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../date.html" Date and time</span></a>

<a href="../date.html"

## Show a weekday

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `getWeekDay(date)` to show the weekday in short format: ‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’.

For instance:

    let date = new Date(2012, 0, 3);  // 3 Jan 2012
    alert( getWeekDay(date) );        // should output "TU"

[Open a sandbox with tests.](https://plnkr.co/edit/bd9XQlnFOJLQ4Wh9?p=preview)

solution

The method `date.getDay()` returns the number of the weekday, starting from sunday.

Let’s make an array of weekdays, so that we can get the proper day name by its number:

<a href="get-week-day.html#"
<a href="get-week-day.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getWeekDay(date) {
      let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

      return days[date.getDay()];
    }

    let date = new Date(2014, 0, 3); // 3 Jan 2014
    alert( getWeekDay(date) ); // FR

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/IIuaHoSmPHom96FF?p=preview)
