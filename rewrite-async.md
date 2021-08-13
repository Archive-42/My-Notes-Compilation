rewrite-async.html"
rewrite-async"

rewrite-asyncrewrite-async"

<!-- -->

rewrite-async"
ewrite-async"
rewrite-async"
rewrite-async"

k%2Frewrite-async"

<a href="../async.html" Promises, async/await</span></a>

Async/await</span></a>

<a href="../async-await.html"

## Rewrite using async/await

Rewrite this example code from the chapter [Promises chaining](../promise-chaining.html) using `async/await` instead of `.then/catch`:

<a href="rewrite-async.html#"
<a href="rewrite-async.html#"

    function loadJson(url) {
      return fetch(url)
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        });
    }

    loadJson('no-such-user.json')
      .catch(alert); // Error: 404

solution

The notes are below the code:

<a href="rewrite-async.html#"
<a href="rewrite-async.html#"

    async function loadJson(url) { // (1)
      let response = await fetch(url); // (2)

      if (response.status == 200) {
        let json = await response.json(); // (3)
        return json;
      }

      throw new Error(response.status);
    }

    loadJson('no-such-user.json')
      .catch(alert); // Error: 404 (4)

Notes:

1.  The function `loadJson` becomes `async`.

2.  All `.then` inside are replaced with `await`.

3.  We can `return response.json()` instead of awaiting for it, like this:

        if (response.status == 200) {
          return response.json(); // (3)
        }

    Then the outer code would have to `await` for that promise to resolve. In our case it doesn’t matter.

4.  The error thrown from `loadJson` is handled by `.catch`. We can’t use `await loadJson(…)` there, because we’re not in an `async` function.
