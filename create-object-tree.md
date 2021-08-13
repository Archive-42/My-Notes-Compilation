EN

- <a href="https://ar.javascript.info/"
- <a href="create-object-tree.html"
  /create-object-tree"
  /create-object-tree"
  create-object-treecreate-object-tree"

<!-- -->

create-object-tree"
create-object-tree"
/create-object-tree"
create-object-tree"

k%2Fcreate-object-tree"%2Fcreate-object-tree" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../modifying-document.html" Modifying the document</span></a>

<a href="../modifying-document.html"

## Create a tree from the object

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `createTree` that creates a nested `ul/li` list from the nested object.

For instance:

    let data = {
      "Fish": {
        "trout": {},
        "salmon": {}
      },

      "Tree": {
        "Huge": {
          "sequoia": {},
          "oak": {}
        },
        "Flowering": {
          "apple tree": {},
          "magnolia": {}
        }
      }
    };

The syntax:

    let container = document.getElementById('container');
    createTree(container, data); // creates the tree in the container

The result (tree) should look like this:

Choose one of two ways of solving this task:

1.  Create the HTML for the tree and then assign to `container.innerHTML`.
2.  Create tree nodes and append with DOM methods.

Would be great if you could do both.

P.S. The tree should not have “extra” elements like empty `<ul></ul>` for the leaves.

[Open a sandbox for the task.](https://plnkr.co/edit/uHTfYBC1WYrve75I?p=preview)

solution

The easiest way to walk the object is to use recursion.

1.  [The solution with innerHTML](https://plnkr.co/edit/PzjPAk9yKHeKkT36?p=preview).
2.  [The solution with DOM](https://plnkr.co/edit/e3TEVqQrm7ZqZkn6?p=preview).
