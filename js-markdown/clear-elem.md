EN

- <a href="https://ar.javascript.info/"
- <a href="clear-elem.html"
  clear-elem"
  /clear-elem"
  clear-elemclear-elem"

<!-- -->

clear-elem"
/clear-elem"
/clear-elem"
clear-elem"k%2Fclear-elem"%2Fclear-elem" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../modifying-document.html" Modifying the document</span></a>

<a href="../modifying-document.html"

## Clear the element

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `clear(elem)` that removes everything from the element.

<a href="clear-elem.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="clear-elem.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <ol id="elem">
      <li>Hello</li>
      <li>World</li>
    </ol>

    <script>
      function clear(elem) { /* your code */ }

      clear(elem); // clears the list
    </script>

solution

First, let’s see how _not_ to do it:

    function clear(elem) {
      for (let i=0; i < elem.childNodes.length; i++) {
          elem.childNodes[i].remove();
      }
    }

That won’t work, because the call to `remove()` shifts the collection `elem.childNodes`, so elements start from the index `0` every time. But `i` increases, and some elements will be skipped.

The `for..of` loop also does the same.

The right variant could be:

    function clear(elem) {
      while (elem.firstChild) {
        elem.firstChild.remove();
      }
    }

And also there’s a simpler way to do the same:

    function clear(elem) {
      elem.innerHTML = '';
    }
