EN

- <a href="https://ar.javascript.info/"
- <a href="sortable-table.html"
  /sortable-table"
  /sortable-table"
  sortable-table"
  task/sortable-table"

<!-- -->

- /"
  sortable-table"
- <a href="https://tr.javascript.info/"
  sortable-table"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fsortable-table"%2Fsortable-table" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../events.html" Introduction to Events</span></a>

<a href="../event-delegation.html" Event delegation</span></a>

<a href="../event-delegation.html"

## Sortable table

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Make the table sortable: clicks on `<th>` elements should sort it by corresponding column.

Each `<th>` has the type in the attribute, like this:

    <table id="grid">
      <thead>
        <tr>
          <th data-type="number">Age</th>
          <th data-type="string">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>5</td>
          <td>John</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Ann</td>
        </tr>
        ...
      </tbody>
    </table>

In the example above the first column has numbers, and the second one – strings. The sorting function should handle sort according to the type.

Only `"string"` and `"number"` types should be supported.

The working example:

P.S. The table can be big, with any number of rows and columns.

[Open a sandbox for the task.](https://plnkr.co/edit/Xy6bIm1THcPADrDN?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/Rj3l3JQZitAV3wPm?p=preview)
