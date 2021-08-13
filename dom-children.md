EN

- <a href="https://ar.javascript.info/"
- <a href="dom-children.html"
  /dom-children"
  /dom-children"
  dom-childrendom-children"

<!-- -->

dom-children"
dom-children"
/dom-children"
dom-children"

k%2Fdom-children"%2Fdom-children" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../dom-navigation.html" Walking the DOM</span></a>

<a href="../dom-navigation.html"

## DOM children

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Look at this page:

    <html>
    <body>
      <div>Users:</div>
      <ul>
        <li>John</li>
        <li>Pete</li>
      </ul>
    </body>
    </html>

For each of the following, give at least one way of how to access them:

- The `<div>` DOM node?
- The `<ul>` DOM node?
- The second `<li>` (with Pete)?

solution

There are many ways, for instance:

The `<div>` DOM node:

    document.body.firstElementChild
    // or
    document.body.children[0]
    // or (the first node is space, so we take 2nd)
    document.body.childNodes[1]

The `<ul>` DOM node:

    document.body.lastElementChild
    // or
    document.body.children[1]

The second `<li>` (with Pete):

    // get <ul>, and then get its last element child
    document.body.lastElementChild.lastElementChild
