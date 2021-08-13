EN

langs\_\_title">عربي</span></a>

- <a href="settimeout-result.html"
  /settimeout-result"
  /settimeout-result"
  settimeout-resultsettimeout-result"

<!-- -->

settimeout-result"
settimeout-result"
/settimeout-result"
settimeout-result"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsettimeout-result"%2Fsettimeout-result" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../settimeout-setinterval.html" Scheduling: setTimeout and setInterval</span></a>

<a href="../settimeout-setinterval.html"

## What will setTimeout show?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In the code below there’s a `setTimeout` call scheduled, then a heavy calculation is run, that takes more than 100ms to finish.

When will the scheduled function run?

1.  After the loop.
2.  Before the loop.
3.  In the beginning of the loop.

What is `alert` going to show?

    let i = 0;

    setTimeout(() => alert(i), 100); // ?

    // assume that the time to execute this function is >100ms
    for(let j = 0; j < 100000000; j++) {
      i++;
    }

solution

Any `setTimeout` will run only after the current code has finished.

The `i` will be the last one: `100000000`.

<a href="settimeout-result.html#"
<a href="settimeout-result.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let i = 0;

    setTimeout(() => alert(i), 100); // 100000000

    // assume that the time to execute this function is >100ms
    for(let j = 0; j < 100000000; j++) {
      i++;
    }
