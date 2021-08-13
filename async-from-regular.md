async-from-regular"

- <a href="async-from-regular.html"
  async-from-regular"

async-from-regularasync-from-regular"

<!-- -->

async-from-regular"
/async-from-regular"
/async-from-regular"
ask/async-from-regular"k%2Fasync-from-regular"%2Fasync-from-regular" </a>

<a href="../async.html" Promises, async/await</span></a>

<a href="../async-await.html" Async/await</span></a>

<a href="../async-await.html"

## Call async from non-async

We have a “regular” function called `f`. How can you call the `async` function `wait()` and use its result inside of `f`?

    async function wait() {
      await new Promise(resolve => setTimeout(resolve, 1000));

      return 10;
    }

    function f() {
      // ...what should you write here?
      // we need to call async wait() and wait to get 10
      // remember, we can't use "await"
    }

P.S. The task is technically very simple, but the question is quite common for developers new to async/await.

solution

That’s the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:

<a href="async-from-regular.html#"
<a href="async-from-regular.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    async function wait() {
      await new Promise(resolve => setTimeout(resolve, 1000));

      return 10;
    }

    function f() {
      // shows 10 after 1 second
      wait().then(result => alert(result));
    }

    f();
