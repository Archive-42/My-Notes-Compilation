EN

- <a href="https://ar.javascript.info/"
- <a href="edit-td-click.html"
- <a href="https://es.javascript.info/"
  /edit-td-click"
  edit-td-clickedit-td-click"

<!-- -->

edit-td-click"
edit-td-click"

- <a href="https://tr.javascript.info/"
  edit-td-click"

k%2Fedit-td-click"%2Fedit-td-click" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../forms-controls.html" Forms, controls</span></a>

<a href="../focus-blur.html" Focusing: focus/blur</span></a>

<a href="../focus-blur.html"

## Edit TD on click

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Make table cells editable on click.

- On click – the cell should become “editable” (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in “edit mode”, clicks on other cells are ignored.
- The table may have many cells. Use event delegation.

The demo:

[Open a sandbox for the task.](https://plnkr.co/edit/8svbkXOrvh6EAMhR?p=preview)

solution

1.  On click – replace `innerHTML` of the cell by `<textarea>` with same sizes and no border. Can use JavaScript or CSS to set the right size.
2.  Set `textarea.value` to `td.innerHTML`.
3.  Focus on the textarea.
4.  Show buttons OK/CANCEL under the cell, handle clicks on them.

[Open the solution in a sandbox.](https://plnkr.co/edit/GJlVn2ir1dhNilFc?p=preview)
