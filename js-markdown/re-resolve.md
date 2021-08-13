EN

langs\_\_title">عربي</span></a>

- <a href="re-resolve.html"
  /re-resolve"
  /re-resolve"
  re-resolvere-resolve"

<!-- -->

re-resolve"
re-resolve"
/re-resolve"
re-resolve"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fre-resolve"%2Fre-resolve" </a>

<a href="../async.html" Promises, async/await</span></a>

<a href="../promise-basics.html" Promise</span></a>

<a href="../promise-basics.html"

## Re-resolve a promise?

What’s the output of the code below?

    let promise = new Promise(function(resolve, reject) {
      resolve(1);

      setTimeout(() => resolve(2), 1000);
    });

    promise.then(alert);

solution

The output is: `1`.

The second call to `resolve` is ignored, because only the first call of `reject/resolve` is taken into account. Further calls are ignored.
