rewrite-arrow"

- <a href="rewrite-arrow.html"
  /rewrite-arrow"
  /rewrite-arrow"
  rewrite-arrowrewrite-arrow"

<!-- -->

rewrite-arrow"
rewrite-arrow"
/rewrite-arrow"
rewrite-arrow"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Frewrite-arrow"%2Frewrite-arrow" </a>

<a href="../arrow-functions-basics.html" Arrow functions, the basics</span></a>

<a href="../arrow-functions-basics.html"

## Rewrite with arrow functions

Replace Function Expressions with arrow functions in the code below:

<a href="rewrite-arrow.html#"
<a href="rewrite-arrow.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function ask(question, yes, no) {
      if (confirm(question)) yes();
      else no();
    }

    ask(
      "Do you agree?",
      function() { alert("You agreed."); },
      function() { alert("You canceled the execution."); }
    );

solution

<a href="rewrite-arrow.html#"
<a href="rewrite-arrow.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function ask(question, yes, no) {
      if (confirm(question)) yes();
      else no();
    }

    ask(
      "Do you agree?",
      () => alert("You agreed."),
      () => alert("You canceled the execution.")
    );

Looks short and clean, right?
