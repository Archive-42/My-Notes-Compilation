EN

- <a href="https://ar.javascript.info/date"
- <a href="date.html"
- <a href="https://es.javascript.info/date"
- <a href="https://fr.javascript.info/date"
- date"
  date"

<!-- -->

- /date"
- <a href=date"
- <a href="https://tr.javascript.info/date"
- <a href="https://zh.javascript.info/date"
  [Help to translate](translate.html) the content of this tutorial to your language!

<a href="index.html" class="sitetoolbar__link sitetoolbar__link_logo"><img src="img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" width="200" /><img src="img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" width="70" /></a>

<a href="ebook.html" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

tutorial/map.html" class="map">

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdate" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdate" </a>

عربي English Español Français Italiano 日本語 한국어 Русский Türkçe 简体中文

1.  <a href="index.html" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="js.html" The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="data-types.html" Data types</span></a></span>

17th March 2021

# Date and time

Let’s meet a new built-in object: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). It stores the date, time and provides methods for date/time management.

For instance, we can use it to store creation/modification times, to measure time, or just to print out the current date.

## <a href="date.html#creation" id="creation" class="main__anchor">Creation</a>

To create a new `Date` object call `new Date()` with one of the following arguments:

`new Date()`  
Without arguments – create a `Date` object for the current date and time:

<a href="date.html#"
<a href="date.html#"

    let now = new Date();
    alert( now ); // shows current date/time

`new Date(milliseconds)`  
Create a `Date` object with the time equal to number of milliseconds (1/1000 of a second) passed after the Jan 1st of 1970 UTC+0.

<a href="date.html#"
<a href="date.html#"

    // 0 means 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // now add 24 hours, get 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );

An integer number representing the number of milliseconds that has passed since the beginning of 1970 is called a _timestamp_.

It’s a lightweight numeric representation of a date. We can always create a date from a timestamp using `new Date(timestamp)` and convert the existing `Date` object to a timestamp using the `date.getTime()` method (see below).

Dates before 01.01.1970 have negative timestamps, e.g.:

<a href="date.html#"
<a href="date.html#"

    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );

`new Date(datestring)`  
If there is a single argument, and it’s a string, then it is parsed automatically. The algorithm is the same as `Date.parse` uses, we’ll cover it later.

<a href="date.html#"
<a href="date.html#"

    let date = new Date("2017-01-26");
    alert(date);
    // The time is not set, so it's assumed to be midnight GMT and
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

`new Date(year, month, date, hours, minutes, seconds, ms)`  
Create the date with the given components in the local time zone. Only the first two arguments are obligatory.

- The `year` must have 4 digits: `2013` is okay, `98` is not.
- The `month` count starts with `0` (Jan), up to `11` (Dec).
- The `date` parameter is actually the day of month, if absent then `1` is assumed.
- If `hours/minutes/seconds/ms` is absent, they are assumed to be equal `0`.

For instance:

    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // the same, hours etc are 0 by default

The maximal precision is 1 ms (1/1000 sec):

<a href="date.html#"
<a href="date.html#"

    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567

## <a href="date.html#access-date-components" id="access-date-components" class="main__anchor">Access date components</a>

There are methods to access the year, month and so on from the `Date` object:

[getFullYear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)  
Get the year (4 digits)

[getMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)  
Get the month, **from 0 to 11**.

[getDate()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)  
Get the day of month, from 1 to 31, the name of the method does look a little bit strange.

[getHours()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours), [getMinutes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes), [getSeconds()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds), [getMilliseconds()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds)  
Get the corresponding time components.

<span class="important__type">Not `getYear()`, but `getFullYear()`</span>

Many JavaScript engines implement a non-standard method `getYear()`. This method is deprecated. It returns 2-digit year sometimes. Please never use it. There is `getFullYear()` for the year.

Additionally, we can get a day of week:

[getDay()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)  
Get the day of week, from `0` (Sunday) to `6` (Saturday). The first day is always Sunday, in some countries that’s not so, but can’t be changed.

**All the methods above return the components relative to the local time zone.**

There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0: [getUTCFullYear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear), [getUTCMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth), [getUTCDay()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay). Just insert the `"UTC"` right after `"get"`.

If your local time zone is shifted relative to UTC, then the code below shows different hours:

<a href="date.html#"
<a href="date.html#"

    // current date
    let date = new Date();

    // the hour in your current time zone
    alert( date.getHours() );

    // the hour in UTC+0 time zone (London time without daylight savings)
    alert( date.getUTCHours() );

Besides the given methods, there are two special ones that do not have a UTC-variant:

[getTime()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)  
Returns the timestamp for the date – a number of milliseconds passed from the January 1st of 1970 UTC+0.

[getTimezoneOffset()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)  
Returns the difference between UTC and the local time zone, in minutes:

<a href="date.html#"
<a href="date.html#"

    // if you are in timezone UTC-1, outputs 60
    // if you are in timezone UTC+3, outputs -180
    alert( new Date().getTimezoneOffset() );

## <a href="date.html#setting-date-components" id="setting-date-components" class="main__anchor">Setting date components</a>

The following methods allow to set date/time components:

- [`setFullYear(year, [month], [date])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)
- [`setMonth(month, [date])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)
- [`setDate(date)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)
- [`setSeconds(sec, [ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds)
- [`setMilliseconds(ms)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds)
- [`setTime(milliseconds)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime) (sets the whole date by milliseconds since 01.01.1970 UTC)

Every one of them except `setTime()` has a UTC-variant, for instance: `setUTCHours()`.

As we can see, some methods can set multiple components at once, for example `setHours`. The components that are not mentioned are not modified.

For instance:

<a href="date.html#"
<a href="date.html#"

    let today = new Date();

    today.setHours(0);
    alert(today); // still today, but the hour is changed to 0

    today.setHours(0, 0, 0, 0);
    alert(today); // still today, now 00:00:00 sharp.

## <a href="date.html#autocorrection" id="autocorrection" class="main__anchor">Autocorrection</a>

The _autocorrection_ is a very handy feature of `Date` objects. We can set out-of-range values, and it will auto-adjust itself.

For instance:

<a href="date.html#"
<a href="date.html#"

    let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
    alert(date); // ...is 1st Feb 2013!

Out-of-range date components are distributed automatically.

Let’s say we need to increase the date “28 Feb 2016” by 2 days. It may be “2 Mar” or “1 Mar” in case of a leap-year. We don’t need to think about it. Just add 2 days. The `Date` object will do the rest:

<a href="date.html#"
<a href="date.html#"

    let date = new Date(2016, 1, 28);
    date.setDate(date.getDate() + 2);

    alert( date ); // 1 Mar 2016

That feature is often used to get the date after the given period of time. For instance, let’s get the date for “70 seconds after now”:

<a href="date.html#"
<a href="date.html#"

    let date = new Date();
    date.setSeconds(date.getSeconds() + 70);

    alert( date ); // shows the correct date

We can also set zero or even negative values. For example:

<a href="date.html#"
<a href="date.html#"

    let date = new Date(2016, 0, 2); // 2 Jan 2016

    date.setDate(1); // set day 1 of month
    alert( date );

    date.setDate(0); // min day is 1, so the last day of the previous month is assumed
    alert( date ); // 31 Dec 2015

## <a href="date.html#date-to-number-date-diff" id="date-to-number-date-diff" class="main__anchor">Date to number, date diff</a>

When a `Date` object is converted to number, it becomes the timestamp same as `date.getTime()`:

<a href="date.html#"
<a href="date.html#"

    let date = new Date();
    alert(+date); // the number of milliseconds, same as date.getTime()

The important side effect: dates can be subtracted, the result is their difference in ms.

That can be used for time measurements:

<a href="date.html#"
<a href="date.html#"

    let start = new Date(); // start measuring time

    // do the job
    for (let i = 0; i < 100000; i++) {
      let doSomething = i * i * i;
    }

    let end = new Date(); // end measuring time

    alert( `The loop took ${end - start} ms` );

## <a href="date.html#date-now" id="date-now" class="main__anchor">Date.now()</a>

If we only want to measure time, we don’t need the `Date` object.

There’s a special method `Date.now()` that returns the current timestamp.

It is semantically equivalent to `new Date().getTime()`, but it doesn’t create an intermediate `Date` object. So it’s faster and doesn’t put pressure on garbage collection.

It is used mostly for convenience or when performance matters, like in games in JavaScript or other specialized applications.

So this is probably better:

<a href="date.html#"
<a href="date.html#"

    let start = Date.now(); // milliseconds count from 1 Jan 1970

    // do the job
    for (let i = 0; i < 100000; i++) {
      let doSomething = i * i * i;
    }

    let end = Date.now(); // done

    alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates

## <a href="date.html#benchmarking" id="benchmarking" class="main__anchor">Benchmarking</a>

If we want a reliable benchmark of CPU-hungry function, we should be careful.

For instance, let’s measure two functions that calculate the difference between two dates: which one is faster?

Such performance measurements are often called “benchmarks”.

    // we have date1 and date2, which function faster returns their difference in ms?
    function diffSubtract(date1, date2) {
      return date2 - date1;
    }

    // or
    function diffGetTime(date1, date2) {
      return date2.getTime() - date1.getTime();
    }

These two do exactly the same thing, but one of them uses an explicit `date.getTime()` to get the date in ms, and the other one relies on a date-to-number transform. Their result is always the same.

So, which one is faster?

The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it at least 100000 times.

Let’s measure:

<a href="date.html#"
<a href="date.html#"

    function diffSubtract(date1, date2) {
      return date2 - date1;
    }

    function diffGetTime(date1, date2) {
      return date2.getTime() - date1.getTime();
    }

    function bench(f) {
      let date1 = new Date(0);
      let date2 = new Date();

      let start = Date.now();
      for (let i = 0; i < 100000; i++) f(date1, date2);
      return Date.now() - start;
    }

    alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
    alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );

Wow! Using `getTime()` is so much faster! That’s because there’s no type conversion, it is much easier for engines to optimize.

Okay, we have something. But that’s not a good benchmark yet.

Imagine that at the time of running `bench(diffSubtract)` CPU was doing something in parallel, and it was taking resources. And by the time of running `bench(diffGetTime)` that work has finished.

A pretty real scenario for a modern multi-process OS.

As a result, the first benchmark will have less CPU resources than the second. That may lead to wrong results.

**For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.**

For example, like this:

<a href="date.html#"
<a href="date.html#"

    function diffSubtract(date1, date2) {
      return date2 - date1;
    }

    function diffGetTime(date1, date2) {
      return date2.getTime() - date1.getTime();
    }

    function bench(f) {
      let date1 = new Date(0);
      let date2 = new Date();

      let start = Date.now();
      for (let i = 0; i < 100000; i++) f(date1, date2);
      return Date.now() - start;
    }

    let time1 = 0;
    let time2 = 0;

    // run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
    for (let i = 0; i < 10; i++) {
      time1 += bench(diffSubtract);
      time2 += bench(diffGetTime);
    }

    alert( 'Total time for diffSubtract: ' + time1 );
    alert( 'Total time for diffGetTime: ' + time2 );

Modern JavaScript engines start applying advanced optimizations only to “hot code” that executes many times (no need to optimize rarely executed things). So, in the example above, first executions are not well-optimized. We may want to add a heat-up run:

    // added for "heating up" prior to the main loop
    bench(diffSubtract);
    bench(diffGetTime);

    // now benchmark
    for (let i = 0; i < 10; i++) {
      time1 += bench(diffSubtract);
      time2 += bench(diffGetTime);
    }

<span class="important__type">Be careful doing microbenchmarking</span>

Modern JavaScript engines perform many optimizations. They may tweak results of “artificial tests” compared to “normal usage”, especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won’t need microbenchmarks at all.

The great pack of articles about V8 can be found at <http://mrale.ph>.

## <a href="date.html#date-parse-from-a-string" id="date-parse-from-a-string" class="main__anchor">Date.parse from a string</a>

The method [Date.parse(str)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can read a date from a string.

The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:

- `YYYY-MM-DD` – is the date: year-month-day.
- The character `"T"` is used as the delimiter.
- `HH:mm:ss.sss` – is the time: hours, minutes, seconds and milliseconds.
- The optional `'Z'` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` would mean UTC+0.

Shorter variants are also possible, like `YYYY-MM-DD` or `YYYY-MM` or even `YYYY`.

The call to `Date.parse(str)` parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns `NaN`.

For instance:

<a href="date.html#"
<a href="date.html#"

    let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

    alert(ms); // 1327611110417  (timestamp)

We can instantly create a `new Date` object from the timestamp:

<a href="date.html#"
<a href="date.html#"

    let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

    alert(date);

## <a href="date.html#summary" id="summary" class="main__anchor">Summary</a>

- Date and time in JavaScript are represented with the [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object. We can’t create “only date” or “only time”: `Date` objects always carry both.
- Months are counted from zero (yes, January is a zero month).
- Days of week in `getDay()` are also counted from zero (that’s Sunday).
- `Date` auto-corrects itself when out-of-range components are set. Good for adding/subtracting days/months/hours.
- Dates can be subtracted, giving their difference in milliseconds. That’s because a `Date` becomes the timestamp when converted to a number.
- Use `Date.now()` to get the current timestamp fast.

Note that unlike many other systems, timestamps in JavaScript are in milliseconds, not in seconds.

Sometimes we need more precise time measurements. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has [performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):

<a href="date.html#"
<a href="date.html#"

    alert(`Loading started ${performance.now()}ms ago`);
    // Something like: "Loading started 34731.26000000001ms ago"
    // .26 is microseconds (260 microseconds)
    // more than 3 digits after the decimal point are precision errors, only the first 3 are correct

Node.js has `microtime` module and other ways. Technically, almost any device and environment allows to get more precision, it’s just not in `Date`.

## <a href="date.html#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="date.html#create-a-date" id="create-a-date" class="main__anchor">Create a date</a>

<a href="task/new-date.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a `Date` object for the date: Feb 20, 2012, 3:12am. The time zone is local.

Show it using `alert`.

solution

The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.

Here’s an example with numbers as date components:

<a href="date.html#"
<a href="date.html#"

    //new Date(year, month, date, hour, minute, second, millisecond)
    let d1 = new Date(2012, 1, 20, 3, 12);
    alert( d1 );

We could also create a date from a string, like this:

<a href="date.html#"
<a href="date.html#"

    //new Date(datastring)
    let d2 = new Date("February 20, 2012 03:12:00");
    alert( d2 );

### <a href="date.html#show-a-weekday" id="show-a-weekday" class="main__anchor">Show a weekday</a>

<a href="task/get-week-day.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `getWeekDay(date)` to show the weekday in short format: ‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’.

For instance:

    let date = new Date(2012, 0, 3);  // 3 Jan 2012
    alert( getWeekDay(date) );        // should output "TU"

[Open a sandbox with tests.](https://plnkr.co/edit/bd9XQlnFOJLQ4Wh9?p=preview)

solution

The method `date.getDay()` returns the number of the weekday, starting from sunday.

Let’s make an array of weekdays, so that we can get the proper day name by its number:

<a href="date.html#"
<a href="date.html#"

    function getWeekDay(date) {
      let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

      return days[date.getDay()];
    }

    let date = new Date(2014, 0, 3); // 3 Jan 2014
    alert( getWeekDay(date) ); // FR

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/IIuaHoSmPHom96FF?p=preview)

### <a href="date.html#european-weekday" id="european-weekday" class="main__anchor">European weekday</a>

<a href="task/weekday.html" class="task__open-link"></a>

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

### <a href="date.html#which-day-of-month-was-many-days-ago" id="which-day-of-month-was-many-days-ago" class="main__anchor">Which day of month was many days ago?</a>

<a href="task/get-date-ago.html" class="task__open-link"></a>

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

<a href="date.html#"
<a href="date.html#"

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

### <a href="date.html#last-day-of-month" id="last-day-of-month" class="main__anchor">Last day of month?</a>

<a href="task/last-day-of-month.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `getLastDayOfMonth(year, month)` that returns the last day of month. Sometimes it is 30th, 31st or even 28/29th for Feb.

Parameters:

- `year` – four-digits year, for instance 2012.
- `month` – month, from 0 to 11.

For instance, `getLastDayOfMonth(2012, 1) = 29` (leap year, Feb).

[Open a sandbox with tests.](https://plnkr.co/edit/V3dNLDkdoiLzIfS3?p=preview)

solution

Let’s create a date using the next month, but pass zero as the day:

<a href="date.html#"
<a href="date.html#"

    function getLastDayOfMonth(year, month) {
      let date = new Date(year, month + 1, 0);
      return date.getDate();
    }

    alert( getLastDayOfMonth(2012, 0) ); // 31
    alert( getLastDayOfMonth(2012, 1) ); // 29
    alert( getLastDayOfMonth(2013, 1) ); // 28

Normally, dates start from 1, but technically we can pass any number, the date will autoadjust itself. So when we pass 0, then it means “one day before 1st day of the month”, in other words: “the last day of the previous month”.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/g51svTU2CLxnXQ6k?p=preview)

### <a href="date.html#how-many-seconds-have-passed-today" id="how-many-seconds-have-passed-today" class="main__anchor">How many seconds have passed today?</a>

<a href="task/get-seconds-today.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `getSecondsToday()` that returns the number of seconds from the beginning of today.

For instance, if now were `10:00 am`, and there was no daylight savings shift, then:

    getSecondsToday() == 36000 // (3600 * 10)

The function should work in any day. That is, it should not have a hard-coded value of “today”.

solution

To get the number of seconds, we can generate a date using the current day and time 00:00:00, then substract it from “now”.

The difference is the number of milliseconds from the beginning of the day, that we should divide by 1000 to get seconds:

<a href="date.html#"
<a href="date.html#"

    function getSecondsToday() {
      let now = new Date();

      // create an object using the current day/month/year
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      let diff = now - today; // ms difference
      return Math.round(diff / 1000); // make seconds
    }

    alert( getSecondsToday() );

An alternative solution would be to get hours/minutes/seconds and convert them to seconds:

<a href="date.html#"
<a href="date.html#"

    function getSecondsToday() {
      let d = new Date();
      return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    }

    alert( getSecondsToday() );

### <a href="date.html#how-many-seconds-till-tomorrow" id="how-many-seconds-till-tomorrow" class="main__anchor">How many seconds till tomorrow?</a>

<a href="task/get-seconds-to-tomorrow.html" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `getSecondsToTomorrow()` that returns the number of seconds till tomorrow.

For instance, if now is `23:00`, then:

    getSecondsToTomorrow() == 3600

P.S. The function should work at any day, the “today” is not hardcoded.

solution

To get the number of milliseconds till tomorrow, we can from “tomorrow 00:00:00” substract the current date.

First, we generate that “tomorrow”, and then do it:

<a href="date.html#"
<a href="date.html#"

    function getSecondsToTomorrow() {
      let now = new Date();

      // tomorrow date
      let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

      let diff = tomorrow - now; // difference in ms
      return Math.round(diff / 1000); // convert to seconds
    }

Alternative solution:

<a href="date.html#"
<a href="date.html#"

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

### <a href="date.html#format-the-relative-date" id="format-the-relative-date" class="main__anchor">Format the relative date</a>

<a href="task/format-date-relative.html" class="task__open-link"></a>

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

<a href="date.html#"
<a href="date.html#"

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

<a href="date.html#"
<a href="date.html#"

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

<a href="destructuring-assignment.html" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="json.html" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a s%3A%2F%2Fjavascript.info%2Fdate" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdate" </a>

<a href="tutorial/map.html" class="map">

## <a href="date.html#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="tutorial/map.html" class="map"></a>

#### Chapter

- <a href="data-types.html" class="sidebar__link">Data types</a>

#### Lesson navigation

- <a href="date.html#creation" class="sidebar__link">Creation</a>
- <a href="date.html#access-date-components" class="sidebar__link">Access date components</a>
- <a href="date.html#setting-date-components" class="sidebar__link">Setting date components</a>
- <a href="date.html#autocorrection" class="sidebar__link">Autocorrection</a>
- <a href="date.html#date-to-number-date-diff" class="sidebar__link">Date to number, date diff</a>
- <a href="date.html#date-now" class="sidebar__link">Date.now()</a>
- <a href="date.html#benchmarking" class="sidebar__link">Benchmarking</a>
- <a href="date.html#date-parse-from-a-string" class="sidebar__link">Date.parse from a string</a>
- <a href="date.html#summary" class="sidebar__link">Summary</a>

- <a href="date.html#tasks" class="sidebar__link">Tasks (8)</a>
- <a href="date.html#comments" class="sidebar__link">Comments</a><a s%3A%2F%2Fjavascript.info%2Fdate" class="share share_tw sidebar**share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fdate" class="share share_fb sidebar**share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/05-data-types/11-date" class="sidebar__link">Edit on GitHub</a>

- <a href="about.html" class="page-footer__link">about the project</a>
- <a href="about.html#contact-us" class="page-footer__link">contact us</a>
- <a href="terms.html" class="page-footer__link">terms of usage</a>
- <a href="privacy.html" class="page-footer__link">privacy policy</a>
