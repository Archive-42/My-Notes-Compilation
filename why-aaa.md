why-aaa"

- <a href="why-aaa.html"
  /why-aaa"
  /why-aaa"
  why-aaa"
  task/why-aaa"

<!-- -->

why-aaa"
why-aaa"
/why-aaa"
why-aaa"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fwhy-aaa"%2Fwhy-aaa" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../modifying-document.html" Modifying the document</span></a>

<a href="../modifying-document.html"

## Why does "aaa" remain?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 1</span>

In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?

<a href="why-aaa.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="why-aaa.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <table id="table">
      aaa
      <tr>
        <td>Test</td>
      </tr>
    </table>

    <script>
      alert(table); // the table, as it should be

      table.remove();
      // why there's still aaa in the document?
    </script>

solution

The HTML in the task is incorrect. That’s the reason of the odd thing.

The browser has to fix it automatically. But there may be no text inside the `<table>`: according to the spec only table-specific tags are allowed. So the browser shows `"aaa"` _before_ the `<table>`.

Now it’s obvious that when we remove the table, it remains.

The question can be easily answered by exploring the DOM using the browser tools. You’ll see `"aaa"` before the `<table>`.

The HTML standard specifies in detail how to process bad HTML, and such behavior of the browser is correct.
