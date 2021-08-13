tree-info"

- <a href="tree-info.html"
  /tree-info"
  /tree-info"
  tree-info"
  task/tree-info"

<!-- -->

tree-info"
tree-info"

- <a href="https://tr.javascript.info/"
  tree-info"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ftree-info"%2Ftree-info" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../basic-dom-node-properties.html" Node properties: type, tag and contents</span></a>

<a href="../basic-dom-node-properties.html"

## Count descendants

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a tree structured as nested `ul/li`.

Write the code that for each `<li>` shows:

1.  What’s the text inside it (without the subtree)
2.  The number of nested `<li>` – all descendants, including the deeply nested ones.

[Demo in new window](https://en.js.cx/task/tree-info/solution/)

[Open a sandbox for the task.](https://plnkr.co/edit/KQWTwzSfogX1OLJV?p=preview)

solution

Let’s make a loop over `<li>`:

    for (let li of document.querySelectorAll('li')) {
      ...
    }

In the loop we need to get the text inside every `li`.

We can read the text from the first child node of `li`, that is the text node:

    for (let li of document.querySelectorAll('li')) {
      let title = li.firstChild.data;

      // title is the text in <li> before any other nodes
    }

Then we can get the number of descendants as `li.getElementsByTagName('li').length`.

[Open the solution in a sandbox.](https://plnkr.co/edit/JdHPZiU1xL70V3Qw?p=preview)
