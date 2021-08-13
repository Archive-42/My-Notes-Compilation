EN

- <a href="https://ar.javascript.info/"
- <a href="animate-circle-promise.html"
  animate-circle-promise"
  /animate-circle-promise"
- <a href="https://it.javascript.info/animate-circle-promise"

<!-- -->

animate-circle-promise"
/animate-circle-promise"
/animate-circle-promise"
ask/animate-circle-promise"k%2Fanimate-circle-promise"%2Fanimate-circle-promise" </a>

<a href="../async.html" Promises, async/await</span></a>

<a href="../promise-basics.html" Promise</span></a>

<a href="../promise-basics.html"

## Animated circle with promise

Rewrite the `showCircle` function in the solution of the task [Animated circle with callback](animate-circle-callback.html) so that it returns a promise instead of accepting a callback.

The new usage:

    showCircle(150, 150, 100).then(div => {
      div.classList.add('message-ball');
      div.append("Hello, world!");
    });

Take the solution of the task [Animated circle with callback](animate-circle-callback.html) as the base.

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/Q1jyGXvy9INMRG3Y?p=preview)
