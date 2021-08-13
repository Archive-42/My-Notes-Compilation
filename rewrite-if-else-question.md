rewrite-if-else-question"

- <a href="rewrite-if-else-question.html"
  /rewrite-if-else-question"
  /rewrite-if-else-question"
  rewrite-if-else-questionrewrite-if-else-question"

<!-- -->

rewrite-if-else-question"
rewrite-if-else-question"
/rewrite-if-else-question"
rewrite-if-else-question"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frewrite-if-else-question"%2Frewrite-if-else-question" </a>

<a href="../ifelse.html" Conditional branching: if, '?'</span></a>

<a href="../ifelse.html"

## Rewrite 'if..else' into '?'

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Rewrite `if..else` using multiple ternary operators `'?'`.

For readability, it’s recommended to split the code into multiple lines.

    let message;

    if (login == 'Employee') {
      message = 'Hello';
    } else if (login == 'Director') {
      message = 'Greetings';
    } else if (login == '') {
      message = 'No login';
    } else {
      message = '';
    }

solution

    let message = (login == 'Employee') ? 'Hello' :
      (login == 'Director') ? 'Greetings' :
      (login == '') ? 'No login' :
      '';
