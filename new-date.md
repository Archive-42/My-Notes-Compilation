new-date"

- <a href="new-date.html"
  /new-date"
  /new-date"
  new-datenew-date"

<!-- -->

new-date"
new-date"
/new-date"
new-date"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fnew-date"%2Fnew-date" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../date.html" Date and time</span></a>

<a href="../date.html"

## Create a date

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a `Date` object for the date: Feb 20, 2012, 3:12am. The time zone is local.

Show it using `alert`.

solution

The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.

Here’s an example with numbers as date components:

<a href="new-date.html#"
<a href="new-date.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    //new Date(year, month, date, hour, minute, second, millisecond)
    let d1 = new Date(2012, 1, 20, 3, 12);
    alert( d1 );

We could also create a date from a string, like this:

<a href="new-date.html#"
<a href="new-date.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    //new Date(datastring)
    let d2 = new Date("February 20, 2012 03:12:00");
    alert( d2 );
