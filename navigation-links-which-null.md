EN

langs\_\_title">عربي</span></a>

- <a href="navigation-links-which-null.html"
  /navigation-links-which-null"
  /navigation-links-which-null"
  navigation-links-which-nullnavigation-links-which-null"

<!-- -->

navigation-links-which-null"
navigation-links-which-null"
/navigation-links-which-null"
navigation-links-which-null"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fnavigation-links-which-null"%2Fnavigation-links-which-null" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../dom-navigation.html" Walking the DOM</span></a>

<a href="../dom-navigation.html"

## The sibling question

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

If `elem` – is an arbitrary DOM element node…

- Is it true that `elem.lastChild.nextSibling` is always `null`?
- Is it true that `elem.children[0].previousSibling` is always `null` ?

solution

1.  Yes, true. The element `elem.lastChild` is always the last one, it has no `nextSibling`.
2.  No, wrong, because `elem.children[0]` is the first child _among elements_. But there may exist non-element nodes before it. So `previousSibling` may be a text node.

Please note: for both cases if there are no children, then there will be an error.

If there are no children, `elem.lastChild` is `null`, so we can’t access `elem.lastChild.nextSibling`. And the collection `elem.children` is empty (like an empty array `[]`).
