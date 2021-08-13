where-document-in-hierarchy"

- <a href="where-document-in-hierarchy.html"
  /where-document-in-hierarchy"
  /where-document-in-hierarchy"
  where-document-in-hierarchy"
  task/where-document-in-hierarchy"

<!-- -->

where-document-in-hierarchy"
where-document-in-hierarchy"
/where-document-in-hierarchy"
where-document-in-hierarchy"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fwhere-document-in-hierarchy"%2Fwhere-document-in-hierarchy" </a>

<a href="../ui.html" Browser: Document, Events, Interfaces</span></a>

<a href="../document.html" Document</span></a>

<a href="../basic-dom-node-properties.html" Node properties: type, tag and contents</span></a>

<a href="../basic-dom-node-properties.html"

## Where's the "document" in the hierarchy?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Which class does the `document` belong to?

What’s its place in the DOM hierarchy?

Does it inherit from `Node` or `Element`, or maybe `HTMLElement`?

solution

We can see which class it belongs by outputting it, like:

<a href="where-document-in-hierarchy.html#"
<a href="where-document-in-hierarchy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert(document); // [object HTMLDocument]

Or:

<a href="where-document-in-hierarchy.html#"
<a href="where-document-in-hierarchy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert(document.constructor.name); // HTMLDocument

So, `document` is an instance of `HTMLDocument` class.

What’s its place in the hierarchy?

Yeah, we could browse the specification, but it would be faster to figure out manually.

Let’s traverse the prototype chain via `__proto__`.

As we know, methods of a class are in the `prototype` of the constructor. For instance, `HTMLDocument.prototype` has methods for documents.

Also, there’s a reference to the constructor function inside the `prototype`:

<a href="where-document-in-hierarchy.html#"
<a href="where-document-in-hierarchy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert(HTMLDocument.prototype.constructor === HTMLDocument); // true

To get a name of the class as a string, we can use `constructor.name`. Let’s do it for the whole `document` prototype chain, till class `Node`:

<a href="where-document-in-hierarchy.html#"
<a href="where-document-in-hierarchy.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
    alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
    alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node

That’s the hierarchy.

We also could examine the object using `console.dir(document)` and see these names by opening `__proto__`. The console takes them from `constructor` internally.
