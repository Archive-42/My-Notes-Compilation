yellow-links"

- <a href="yellow-links.html"
  /yellow-links"
  /yellow-links"
  yellow-links"
  task/yellow-links"

<!-- -->

yellow-links"
yellow-links"

- <a href="https://tr.javascript.info/"
  yellow-links"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fyellow-links"%2Fyellow-links" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../dom-attributes-and-properties.html" Attributes and properties</span></a>

<a href="../dom-attributes-and-properties.html"

## Make external links orange

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Make all external links orange by altering their `style` property.

A link is external if:

- Its `href` has `://` in it
- But doesn’t start with `http://internal.com`.

Example:

<a href="yellow-links.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="yellow-links.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <a name="list">the list</a>
    <ul>
      <li><a href="http://google.com">http://google.com</a></li>
      <li><a href="/tutorial">/tutorial.html</a></li>
      <li><a href="local/path">local/path</a></li>
      <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
      <li><a href="http://nodejs.org">http://nodejs.org</a></li>
      <li><a href="http://internal.com/test">http://internal.com/test</a></li>
    </ul>

    <script>
      // setting style for a single link
      let link = document.querySelector('a');
      link.style.color = 'orange';
    </script>

The result should be:

[Open a sandbox for the task.](https://plnkr.co/edit/P633iMGyfcQ6DCdF?p=preview)

solution

First, we need to find all external references.

There are two ways.

The first is to find all links using `document.querySelectorAll('a')` and then filter out what we need:

    let links = document.querySelectorAll('a');

    for (let link of links) {
      let href = link.getAttribute('href');
      if (!href) continue; // no attribute

      if (!href.includes('://')) continue; // no protocol

      if (href.startsWith('http://internal.com')) continue; // internal

      link.style.color = 'orange';
    }

Please note: we use `link.getAttribute('href')`. Not `link.href`, because we need the value from HTML.

…Another, simpler way would be to add the checks to CSS selector:

    // look for all links that have :// in href
    // but href doesn't start with http://internal.com
    let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
    let links = document.querySelectorAll(selector);

    links.forEach(link => link.style.color = 'orange');

[Open the solution in a sandbox.](https://plnkr.co/edit/zrwKuNxvROq8nxsg?p=preview)
