tag-in-comment"

- <a href="tag-in-comment.html"
  /tag-in-comment"
  /tag-in-comment"
  tag-in-comment"
  task/tag-in-comment"

<!-- -->

tag-in-comment"
tag-in-comment"

- <a href="https://tr.javascript.info/"
  tag-in-comment"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ftag-in-comment"%2Ftag-in-comment" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../basic-dom-node-properties.html" Node properties: type, tag and contents</span></a>

<a href="../basic-dom-node-properties.html"

## Tag in comment

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

What does this code show?

    <script>
      let body = document.body;

      body.innerHTML = "<!--" + body.tagName + "-->";

      alert( body.firstChild.data ); // what's here?
    </script>

solution

The answer: **`BODY`**.

<a href="tag-in-comment.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="tag-in-comment.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <script>
      let body = document.body;

      body.innerHTML = "<!--" + body.tagName + "-->";

      alert( body.firstChild.data ); // BODY
    </script>

What’s going on step by step:

1.  The content of `<body>` is replaced with the comment. The comment is `<!--BODY-->`, because `body.tagName == "BODY"`. As we remember, `tagName` is always uppercase in HTML.
2.  The comment is now the only child node, so we get it in `body.firstChild`.
3.  The `data` property of the comment is its contents (inside `<!--...-->`): `"BODY"`.
