rewrite-switch-if-else"

- <a href="rewrite-switch-if-else.html"
  /rewrite-switch-if-else"
  /rewrite-switch-if-else"
  rewrite-switch-if-elserewrite-switch-if-else"

<!-- -->

rewrite-switch-if-else"
rewrite-switch-if-else"
/rewrite-switch-if-else"
rewrite-switch-if-else"

k%2Frewrite-switch-if-else"%2Frewrite-switch-if-else"

<a href="../switch.html" The "switch" statement</span></a>

<a href="../switch.html"

## Rewrite the "switch" into an "if"

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code using `if..else` which would correspond to the following `switch`:

    switch (browser) {
      case 'Edge':
        alert( "You've got the Edge!" );
        break;

      case 'Chrome':
      case 'Firefox':
      case 'Safari':
      case 'Opera':
        alert( 'Okay we support these browsers too' );
        break;

      default:
        alert( 'We hope that this page looks ok!' );
    }

solution

To precisely match the functionality of `switch`, the `if` must use a strict comparison `'==='`.

For given strings though, a simple `'=='` works too.

    if(browser == 'Edge') {
      alert("You've got the Edge!");
    } else if (browser == 'Chrome'
     || browser == 'Firefox'
     || browser == 'Safari'
     || browser == 'Opera') {
      alert( 'Okay we support these browsers too' );
    } else {
      alert( 'We hope that this page looks ok!' );
    }

Please note: the construct `browser == 'Chrome' || browser == 'Firefox' …` is split into multiple lines for better readability.

But the `switch` construct is still cleaner and more descriptive.
