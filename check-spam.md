check-spam"

- <a href="check-spam.html"
  check-spam"
  /check-spam"
  check-spamcheck-spam"

<!-- -->

check-spam"
/check-spam"
/check-spam"
ask/check-spam"

k%2Fcheck-spam"%2Fcheck-spam" </a>

<a href="../data-types.html" Data types</span></a>

<a href="../string.html" Strings</span></a>

<a href="../string.html"

## Check for spam

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `checkSpam(str)` that returns `true` if `str` contains ‘viagra’ or ‘XXX’, otherwise `false`.

The function must be case-insensitive:

    checkSpam('buy ViAgRA now') == true
    checkSpam('free xxxxx') == true
    checkSpam("innocent rabbit") == false

[Open a sandbox with tests.](https://plnkr.co/edit/RSypLyR88aYE9A7X?p=preview)

solution

To make the search case-insensitive, let’s bring the string to lower case and then search:

<a href="check-spam.html#"
<a href="check-spam.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function checkSpam(str) {
      let lowerStr = str.toLowerCase();

      return lowerStr.includes('viagra') || lowerStr.includes('xxx');
    }

    alert( checkSpam('buy ViAgRA now') );
    alert( checkSpam('free xxxxx') );
    alert( checkSpam("innocent rabbit") );

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/Ud93b74dcRFgYA0l?p=preview)
