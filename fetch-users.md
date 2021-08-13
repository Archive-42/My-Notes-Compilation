EN

- <a href="https://ar.javascript.info/"
- <a href="fetch-users.html"
  /fetch-users"
  /fetch-users"
  fetch-usersfetch-users"

<!-- -->

fetch-users"
fetch-users"

- <a href="https://tr.javascript.info/"
  fetch-users"

k%2Ffetch-users"%2Ffetch-users" </a>

<a href="../network.html" Network requests</span></a>

<a href="../fetch.html" Fetch</span></a>

<a href="../fetch.html"

## Fetch users from GitHub

Create an async function `getUsers(names)`, that gets an array of GitHub logins, fetches the users from GitHub and returns an array of GitHub users.

The GitHub url with user information for the given `USERNAME` is: `https://api.github.com/users/USERNAME`.

There’s a test example in the sandbox.

Important details:

1.  There should be one `fetch` request per user.
2.  Requests shouldn’t wait for each other. So that the data arrives as soon as possible.
3.  If any request fails, or if there’s no such user, the function should return `null` in the resulting array.

[Open a sandbox with tests.](https://plnkr.co/edit/joLEhbz23gKnOfNb?p=preview)

solution

To fetch a user we need: `fetch('https://api.github.com/users/USERNAME')`.

If the response has status `200`, call `.json()` to read the JS object.

Otherwise, if a `fetch` fails, or the response has non-200 status, we just return `null` in the resulting array.

So here’s the code:

    async function getUsers(names) {
      let jobs = [];

      for(let name of names) {
        let job = fetch(`https://api.github.com/users/${name}`).then(
          successResponse => {
            if (successResponse.status != 200) {
              return null;
            } else {
              return successResponse.json();
            }
          },
          failResponse => {
            return null;
          }
        );
        jobs.push(job);
      }

      let results = await Promise.all(jobs);

      return results;
    }

Please note: `.then` call is attached directly to `fetch`, so that when we have the response, it doesn’t wait for other fetches, but starts to read `.json()` immediately.

If we used `await Promise.all(names.map(name => fetch(...)))`, and call `.json()` on the results, then it would wait for all fetches to respond. By adding `.json()` directly to each `fetch`, we ensure that individual fetches start reading data as JSON without waiting for each other.

That’s an example of how low-level Promise API can still be useful even if we mainly use `async/await`.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/iecdfMfnlmOOspS6?p=preview)
