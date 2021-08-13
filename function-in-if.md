function-in-if"

- <a href="function-in-if.html"
  /function-in-if"
  /function-in-if"
  function-in-iffunction-in-if"

<!-- -->

function-in-if"
function-in-if"
/function-in-if"
function-in-if"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffunction-in-if"%2Ffunction-in-if" </a>

<a href="../advanced-functions.html" Advanced working with functions</span></a>

<a href="../closure.html" Variable scope, closure</span></a>

<a href="../closure.html"

## Function in if

Look at the code. What will be the result of the call at the last line?

<a href="function-in-if.html#"
<a href="function-in-if.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let phrase = "Hello";

    if (true) {
      let user = "John";

      function sayHi() {
        alert(`${phrase}, ${user}`);
      }
    }

    sayHi();

solution

The result is **an error**.

The function `sayHi` is declared inside the `if`, so it only lives inside it. There is no `sayHi` outside.
