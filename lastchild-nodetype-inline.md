lastchild-nodetype-inline"

- <a href="lastchild-nodetype-inline.html"
  /lastchild-nodetype-inline"
  /lastchild-nodetype-inline"
  lastchild-nodetype-inlinelastchild-nodetype-inline"

<!-- -->

lastchild-nodetype-inline"
lastchild-nodetype-inline"

- <a href="https://tr.javascript.info/"
  lastchild-nodetype-inline"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Flastchild-nodetype-inline"%2Flastchild-nodetype-inline" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../basic-dom-node-properties.html" Node properties: type, tag and contents</span></a>

<a href="../basic-dom-node-properties.html"

## What's in the nodeType?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What does the script show?

    <html>

    <body>
      <script>
        alert(document.body.lastChild.nodeType);
      </script>
    </body>

    </html>

solution

There’s a catch here.

At the time of `<script>` execution the last DOM node is exactly `<script>`, because the browser did not process the rest of the page yet.

So the result is `1` (element node).

<a href="lastchild-nodetype-inline.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="lastchild-nodetype-inline.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <html>

    <body>
      <script>
        alert(document.body.lastChild.nodeType);
      </script>
    </body>

    </html>
