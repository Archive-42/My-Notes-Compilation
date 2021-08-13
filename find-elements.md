EN

- <a href="https://ar.javascript.info/"
- <a href="find-elements.html"
  /find-elements"

find-elementsfind-elements"

<!-- -->

find-elements"
find-elements"
/find-elements"
find-elements"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Ffind-elements"%2Ffind-elements" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../searching-elements-dom.html" Searching: getElement*, querySelector*</span></a>

<a href="../searching-elements-dom.html"

## Search for elements

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Here’s the document with the table and form.

How to find?…

1.  The table with `id="age-table"`.
2.  All `label` elements inside that table (there should be 3 of them).
3.  The first `td` in that table (with the word “Age”).
4.  The `form` with `name="search"`.
5.  The first `input` in that form.
6.  The last `input` in that form.

Open the page [table.html](find-elements/table.html) in a separate window and make use of browser tools for that.

solution

There are many ways to do it.

Here are some of them:

    // 1. The table with `id="age-table"`.
    let table = document.getElementById('age-table')

    // 2. All label elements inside that table
    table.getElementsByTagName('label')
    // or
    document.querySelectorAll('#age-table label')

    // 3. The first td in that table (with the word "Age")
    table.rows[0].cells[0]
    // or
    table.getElementsByTagName('td')[0]
    // or
    table.querySelector('td')

    // 4. The form with the name "search"
    // assuming there's only one element with name="search" in the document
    let form = document.getElementsByName('search')[0]
    // or, form specifically
    document.querySelector('form[name="search"]')

    // 5. The first input in that form.
    form.getElementsByTagName('input')[0]
    // or
    form.querySelector('input')

    // 6. The last input in that form
    let inputs = form.querySelectorAll('input') // find all inputs
    inputs[inputs.length-1] // take the last one
