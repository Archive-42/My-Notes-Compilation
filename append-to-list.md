EN

- <a href="https://ar.javascript.info/"
- <a href="append-to-list.html"
  append-to-list"
  /append-to-list"
  append-to-listappend-to-list"

<!-- -->

append-to-list"
/append-to-list"
/append-to-list"
ask/append-to-list"k%2Fappend-to-list"%2Fappend-to-list" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../modifying-document.html" Modifying the document</span></a>

<a href="../modifying-document.html"

## Insert the HTML in the list

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code to insert `<li>2</li><li>3</li>` between two `<li>` here:

    <ul id="ul">
      <li id="one">1</li>
      <li id="two">4</li>
    </ul>

solution

When we need to insert a piece of HTML somewhere, `insertAdjacentHTML` is the best fit.

The solution:

    one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
