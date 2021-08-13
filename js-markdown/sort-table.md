EN

langs\_\_title">عربي</span></a>

- <a href="sort-table.html"
  /sort-table"
  /sort-table"
  sort-tablesort-table"

<!-- -->

sort-table"
sort-table"
/sort-table"
sort-table"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsort-table"%2Fsort-table" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../modifying-document.html" Modifying the document</span></a>

<a href="../modifying-document.html"

## Sort the table

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a table:

<a href="sort-table.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="sort-table.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <table>
    <thead>
      <tr>
        <th>Name</th><th>Surname</th><th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td><td>Smith</td><td>10</td>
      </tr>
      <tr>
        <td>Pete</td><td>Brown</td><td>15</td>
      </tr>
      <tr>
        <td>Ann</td><td>Lee</td><td>5</td>
      </tr>
      <tr>
        <td>...</td><td>...</td><td>...</td>
      </tr>
    </tbody>
    </table>

There may be more rows in it.

Write the code to sort it by the `"name"` column.

[Open a sandbox for the task.](https://plnkr.co/edit/f1KNlHsEaWriLawH?p=preview)

solution

The solution is short, yet may look a bit tricky, so here I provide it with extensive comments:

    let sortedRows = Array.from(table.tBodies[0].rows) // 1
      .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

    table.tBodies[0].append(...sortedRows); // (3)

The step-by-step algorthm:

1.  Get all `<tr>`, from `<tbody>`.
2.  Then sort them comparing by the content of the first `<td>` (the name field).
3.  Now insert nodes in the right order by `.append(...sortedRows)`.

We don’t have to remove row elements, just “re-insert”, they leave the old place automatically.

P.S. In our case, there’s an explicit `<tbody>` in the table, but even if HTML table doesn’t have `<tbody>`, the DOM structure always has it.

[Open the solution in a sandbox.](https://plnkr.co/edit/5xHStBMfV5AVtoxR?p=preview)

ass="page-footer\_\_link">about the project</a>
