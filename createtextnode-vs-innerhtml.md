EN

- <a href="https://ar.javascript.info/"
- <a href="createtextnode-vs-innerhtml.html"
  /createtextnode-vs-innerhtml"
  /createtextnode-vs-innerhtml"
  createtextnode-vs-innerhtmlcreatetextnode-vs-innerhtml"

<!-- -->

createtextnode-vs-innerhtml"
createtextnode-vs-innerhtml"
/createtextnode-vs-innerhtml"
createtextnode-vs-innerhtml"

k%2Fcreatetextnode-vs-innerhtml"%2Fcreatetextnode-vs-innerhtml" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../modifying-document.html" Modifying the document</span></a>

<a href="../modifying-document.html"

## createTextNode vs innerHTML vs textContent

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have an empty DOM element `elem` and a string `text`.

Which of these 3 commands will do exactly the same?

1.  `elem.append(document.createTextNode(text))`
2.  `elem.innerHTML = text`
3.  `elem.textContent = text`

solution

Answer: **1 and 3**.

Both commands result in adding the `text` “as text” into the `elem`.

Here’s an example:

<a href="createtextnode-vs-innerhtml.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="createtextnode-vs-innerhtml.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="elem1"></div>
    <div id="elem2"></div>
    <div id="elem3"></div>
    <script>
      let text = '<b>text</b>';

      elem1.append(document.createTextNode(text));
      elem2.innerHTML = text;
      elem3.textContent = text;
    </script>
