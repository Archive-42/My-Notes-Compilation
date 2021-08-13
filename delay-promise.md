EN

- <a href="https://ar.javascript.info/"
- <a href="delay-promise.html"
  /delay-promise"
  /delay-promise"
  delay-promisedelay-promise"

<!-- -->

delay-promise"
delay-promise"
/delay-promise"
delay-promise"

k%2Fdelay-promise"%2Fdelay-promise" </a>

<a href="../async.html" Promises, async/await</span></a>

<a href="../promise-basics.html" Promise</span></a>

<a href="../promise-basics.html"

## Delay with a promise

The built-in function `setTimeout` uses callbacks. Create a promise-based alternative.

The function `delay(ms)` should return a promise. That promise should resolve after `ms` milliseconds, so that we can add `.then` to it, like this:

    function delay(ms) {
      // your code
    }

    delay(3000).then(() => alert('runs after 3 seconds'));

solution

<a href="delay-promise.html#"
<a href="delay-promise.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    delay(3000).then(() => alert('runs after 3 seconds'));

Please note that in this task `resolve` is called without arguments. We don’t return any value from `delay`, just ensure the delay.
