check-login"

- <a href="check-login.html"
  check-login"
  /check-login"
  check-logincheck-login"

<!-- -->

check-login"
/check-login"
/check-login"
ask/check-login"k%2Fcheck-login"%2Fcheck-login" </a>

<a href="../logical-operators.html" Logical operators</span></a>

<a href="../logical-operators.html"

## Check the login

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Write the code which asks for a login with `prompt`.

If the visitor enters `"Admin"`, then `prompt` for a password, if the input is an empty line or Esc – show “Canceled”, if it’s another string – then show “I don’t know you”.

The password is checked as follows:

- If it equals “TheMaster”, then show “Welcome!”,
- Another string – show “Wrong password”,
- For an empty string or cancelled input, show “Canceled”

The schema:

<figure><img src="check-login/ifelse_task.svg" width="599" height="493" /></figure>Please use nested `if` blocks. Mind the overall readability of the code.

Hint: passing an empty input to a prompt returns an empty string `''`. Pressing ESC during a prompt returns `null`.

[Run the demo](check-login.html#)

solution

<a href="check-login.html#"
<a href="check-login.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let userName = prompt("Who's there?", '');

    if (userName === 'Admin') {

      let pass = prompt('Password?', '');

      if (pass === 'TheMaster') {
        alert( 'Welcome!' );
      } else if (pass === '' || pass === null) {
        alert( 'Canceled' );
      } else {
        alert( 'Wrong password' );
      }

    } else if (userName === '' || userName === null) {
      alert( 'Canceled' );
    } else {
      alert( "I don't know you" );
    }

Note the vertical indents inside the `if` blocks. They are technically not required, but make the code more readable.
