EN

- <a href="add-select-option.html"
  add-select-option"

add-select-optionadd-select-option"

<!-- -->

add-select-option"
/add-select-option"
/add-select-option"
ask/add-select-option"k%2Fadd-select-option"%2Fadd-select-option" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../forms-controls.html" Forms, controls</span></a>

<a href="../form-elements.html" Form properties and methods</span></a>

<a href="../form-elements.html"

## Add an option to select

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a `<select>`:

    <select id="genres">
      <option value="rock">Rock</option>
      <option value="blues" selected>Blues</option>
    </select>

Use JavaScript to:

1.  Show the value and the text of the selected option.
2.  Add an option: `<option value="classic">Classic</option>`.
3.  Make it selected.

Note, if you’ve done everything right, your alert should show `blues`.

solution

The solution, step by step:

<a href="add-select-option.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="add-select-option.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <select id="genres">
      <option value="rock">Rock</option>
      <option value="blues" selected>Blues</option>
    </select>

    <script>
      // 1)
      let selectedOption = genres.options[genres.selectedIndex];
      alert( selectedOption.value );

      // 2)
      let newOption = new Option("Classic", "classic");
      genres.append(newOption);

      // 3)
      newOption.selected = true;
    </script>
