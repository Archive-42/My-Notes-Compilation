# Input fields

With input fields, note that the `label` element is _always_ associated with its `input` element via the `for` attribute.

## Example

A text input field A password field An email input field in invalid state

## Code

    <label for="name">A text input field</label>
    <input type="text" id="name" name="name" />

    <label for="password">A password field</label>
    <input type="password" id="password" name="password" />

    <label for="email">An email input field in invalid state</label>
    <input type="email" id="email" name="email" placeholder="me@example.com" />
