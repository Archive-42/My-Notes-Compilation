get-user-attribute"

- <a href="get-user-attribute.html"
  /get-user-attribute"
  /get-user-attribute"
  get-user-attributeget-user-attribute"

<!-- -->

get-user-attribute"
get-user-attribute"

- <a href="https://tr.javascript.info/"
  get-user-attribute"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fget-user-attribute"%2Fget-user-attribute" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../dom-attributes-and-properties.html" Attributes and properties</span></a>

<a href="../dom-attributes-and-properties.html"

## Get the attribute

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code to select the element with `data-widget-name` attribute from the document and to read its value.

<a href="get-user-attribute.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="get-user-attribute.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <!DOCTYPE html>
    <html>
    <body>

      <div data-widget-name="menu">Choose the genre</div>

      <script>
        /* your code */
      </script>
    </body>
    </html>

solution

<a href="get-user-attribute.html#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="get-user-attribute.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <!DOCTYPE html>
    <html>
    <body>

      <div data-widget-name="menu">Choose the genre</div>

      <script>
        // getting it
        let elem = document.querySelector('[data-widget-name]');

        // reading the value
        alert(elem.dataset.widgetName);
        // or
        alert(elem.getAttribute('data-widget-name'));
      </script>
    </body>
    </html>
