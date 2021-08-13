Legend
======

Default `legend`
----------------

### Example

Default `legend`

No additional styling is added to `legend` elements by default.

### Code

    <fieldset class="bordered">
      <legend>Default <code>legend</code></legend>
      <p>
        No additional styling is added to <code>legend</code> elements by default.
      </p>
    </fieldset>

Legend Variants
---------------

### Example: Highlighted `legend`

Highlighted `legend`

For highlighted `legend` elements, use the `highlighted` class on the `legend` element.

### Code

    <fieldset class="bordered">
      <legend class="highlighted">Highlighted <code>legend</code></legend>
      <p>
        For highlighted <code>legend</code> elements, use the
        <code>highlighted</code> class on the <code>legend</code> element.
      </p>
    </fieldset>

### Example: Emphasized `legend`

Emphasized `legend`

For a non-highlighted but emphasized `legend` use the `emphasized` class on the `legend` element.

### Code

    <fieldset class="bordered">
      <legend class="emphasized">Emphasized <code>legend</code></legend>
      <p>
        For a non-highlighted but emphasized <code>legend</code> use the
        <code>emphasized</code> class on the <code>legend</code> element.
      </p>
    </fieldset>

### Example: Highlighted `legend` with default `fieldset`

Highlighted `legend`

You can use all `legend` styles with, or without, a bordered `fieldset`

#### Code

    <fieldset>
      <legend class="highlighted">Highlighted <code>legend</code></legend>
      <p>
        You can use all <code>legend</code> styles with, or without, a bordered
        <code>fieldset</code>
      </p>
    </fieldset>

### Example: Visually hidden `legend`

In some instances one might, from a design perspective, wish to not visually show the legend. In those instances it is best to visually hide it so that it still available to screen reader users.

Visually hidden legend element

To hide a `legend`, but not negatively impact accessibility, use the `visually-hidden` utility class on the `legend` element. For example, this `fieldset` contains a `legend` with the text content of, “Visually hidden legend element”

#### Code

    <fieldset class="bordered">
      <legend class="visually-hidden">Visually hidden legend element</legend>
      <p>
        To hide a <code>legend</code>, but not negatively impact accessibility, use
        the <code>visually-hidden</code> utility class on the
        <code>legend</code> element. For example, this
        <code>fieldset</code> contains a <code>legend</code> with the text content
        of, "Visually hidden legend element"
      </p>
    </fieldset>
