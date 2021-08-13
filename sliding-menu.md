EN

langs\_\_title">عربي</span></a>

- <a href="sliding-menu.html"
  /sliding-menu"

sliding-menusliding-menu"

<!-- -->

- <a href="https://ko.javascript.info/"
  sliding-menu"
- <a href="https://tr.javascript.info/"
  sliding-menu"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsliding-menu"%2Fsliding-menu" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../introduction-browser-events.html" Introduction to browser events</span></a>

<a href="../introduction-browser-events.html"

## Create a sliding menu

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a menu that opens/collapses on click:

P.S. HTML/CSS of the source document is to be modified.

[Open a sandbox for the task.](https://plnkr.co/edit/sDzWgqYxeNrla3Kz?p=preview)

solution

HTML/CSS

#### HTML/CSS

First let’s create HTML/CSS.

A menu is a standalone graphical component on the page, so it’s better to put it into a single DOM element.

A list of menu items can be laid out as a list `ul/li`.

Here’s the example structure:

    <div class="menu">
      <span class="title">Sweeties (click me)!</span>
      <ul>
        <li>Cake</li>
        <li>Donut</li>
        <li>Honey</li>
      </ul>
    </div>

We use `<span>` for the title, because `<div>` has an implicit `display:block` on it, and it will occupy 100% of the horizontal width.

Like this:

    <div style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</div>

So if we set `onclick` on it, then it will catch clicks to the right of the text.

As `<span>` has an implicit `display: inline`, it occupies exactly enough place to fit all the text:

    <span style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</span>

Toggling the menu

#### Toggling the menu

Toggling the menu should change the arrow and show/hide the menu list.

All these changes are perfectly handled by CSS. In JavaScript we should label the current state of the menu by adding/removing the class `.open`.

Without it, the menu will be closed:

    .menu ul {
      margin: 0;
      list-style: none;
      padding-left: 20px;
      display: none;
    }

    .menu .title::before {
      content: '▶ ';
      font-size: 80%;
      color: green;
    }

…And with `.open` the arrow changes and the list shows up:

    .menu.open .title::before {
      content: '▼ ';
    }

    .menu.open ul {
      display: block;
    }

[Open the solution in a sandbox.](https://plnkr.co/edit/bO5pDSqsI4AbQzbL?p=preview)
