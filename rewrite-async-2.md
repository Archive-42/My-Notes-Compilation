rewrite-async-2"

- <a href="rewrite-async-2.html"
  /rewrite-async-2"

rewrite-async-2rewrite-async-2"

<!-- -->

rewrite-async-2"
rewrite-async-2"
/rewrite-async-2"
rewrite-async-2"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frewrite-async-2"%2Frewrite-async-2" </a>

<a href="../async.html" Promises, async/await</span></a>

<a href="../async-await.html" Async/await</span></a>

<a href="../async-await.html"

## Rewrite "rethrow" with async/await

Below you can find the “rethrow” example. Rewrite it using `async/await` instead of `.then/catch`.

And get rid of the recursion in favour of a loop in `demoGithubUser`: with `async/await` that becomes easy to do.

<a href="rewrite-async-2.html#"
<a href="rewrite-async-2.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class HttpError extends Error {
      constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
      }
    }

    function loadJson(url) {
      return fetch(url)
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            throw new HttpError(response);
          }
        });
    }

    // Ask for a user name until github returns a valid user
    function demoGithubUser() {
      let name = prompt("Enter a name?", "iliakan");

      return loadJson(`https://api.github.com/users/${name}`)
        .then(user => {
          alert(`Full name: ${user.name}.`);
          return user;
        })
        .catch(err => {
          if (err instanceof HttpError && err.response.status == 404) {
            alert("No such user, please reenter.");
            return demoGithubUser();
          } else {
            throw err;
          }
        });
    }

    demoGithubUser();

solution

There are no tricks here. Just replace `.catch` with `try..catch` inside `demoGithubUser` and add `async/await` where needed:

<a href="rewrite-async-2.html#"
<a href="rewrite-async-2.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class HttpError extends Error {
      constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
      }
    }

    async function loadJson(url) {
      let response = await fetch(url);
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    }

    // Ask for a user name until github returns a valid user
    async function demoGithubUser() {

      let user;
      while(true) {
        let name = prompt("Enter a name?", "iliakan");

        try {
          user = await loadJson(`https://api.github.com/users/${name}`);
          break; // no error, exit loop
        } catch(err) {
          if (err instanceof HttpError && err.response.status == 404) {
            // loop continues after the alert
            alert("No such user, please reenter.");
          } else {
            // unknown error, rethrow
            throw err;
          }
        }
      }


      alert(`Full name: ${user.name}.`);
      return user;
    }

    demoGithubUser();
