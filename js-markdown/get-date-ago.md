get-date-ago"

- <a href="get-date-ago.html"
  /get-date-ago"
  /get-date-ago"
  get-date-agoget-date-ago"

<!-- -->

get-date-ago"
get-date-ago"
/get-date-ago"
get-date-ago"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fget-date-ago"%2Fget-date-ago" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../date.html" Date and time</span></a>

<a href="../date.html"

## Which day of month was many days ago?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Create a function `getDateAgo(date, days)` to return the day of month `days` ago from the `date`.

For instance, if today is 20th, then `getDateAgo(new Date(), 1)` should be 19th and `getDateAgo(new Date(), 2)` should be 18th.

Should work reliably for `days=365` or more:

    let date = new Date(2015, 0, 2);

    alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
    alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
    alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)

P.S. The function should not modify the given `date`.

[Open a sandbox with tests.](https://plnkr.co/edit/JogMR3esB6Sl8Xme?p=preview)

solution

The idea is simple: to substract given number of days from `date`:

    function getDateAgo(date, days) {
      date.setDate(date.getDate() - days);
      return date.getDate();
    }

…But the function should not change `date`. That’s an important thing, because the outer code which gives us the date does not expect it to change.

To implement it let’s clone the date, like this:

<a href="get-date-ago.html#"
<a href="get-date-ago.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getDateAgo(date, days) {
      let dateCopy = new Date(date);

      dateCopy.setDate(date.getDate() - days);
      return dateCopy.getDate();
    }

    let date = new Date(2015, 0, 2);

    alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
    alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
    alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/e9YXEeEDmGiuit3w?p=preview)
