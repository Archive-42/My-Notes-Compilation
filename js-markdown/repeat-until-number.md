repeat-until-number"

- <a href="repeat-until-number.html"
  /repeat-until-number"
  /repeat-until-number"
  repeat-until-numberrepeat-until-number"

<!-- -->

repeat-until-number"
repeat-until-number"
/repeat-until-number"
repeat-until-number"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frepeat-until-number"%2Frepeat-until-number" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../number.html" Numbers</span></a>

<a href="../number.html"

## Repeat until the input is a number

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `readNumber` which prompts for a number until the visitor enters a valid numeric value.

The resulting value must be returned as a number.

The visitor can also stop the process by entering an empty line or pressing “CANCEL”. In that case, the function should return `null`.

[Run the demo](repeat-until-number.html#)

[Open a sandbox with tests.](https://plnkr.co/edit/LzwmUerxmztxOayh?p=preview)

solution

<a href="repeat-until-number.html#"
<a href="repeat-until-number.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function readNumber() {
      let num;

      do {
        num = prompt("Enter a number please?", 0);
      } while ( !isFinite(num) );

      if (num === null || num === '') return null;

      return +num;
    }

    alert(`Read: ${readNumber()}`);

The solution is a little bit more intricate that it could be because we need to handle `null`/empty lines.

So we actually accept the input until it is a “regular number”. Both `null` (cancel) and empty line also fit that condition, because in numeric form they are `0`.

After we stopped, we need to treat `null` and empty line specially (return `null`), because converting them to a number would return `0`.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/NlVuXD5RDaj7Lsj8?p=preview)
