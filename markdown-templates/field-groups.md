# Field groups

When a form contains multiple input fields, you can group them using a `div` element with the `field-group` class. This is a block level container with appropriate spacing when multiple groups are stacked.

    <label for="name">Name</label>
    <input type="text" id="name" name="name" />

    <label for="website">Website</label>
    <input type="url" id="website" name="website" />
    <p class="field-note">Please enter your company website url</p>

## Code

    <div class="field-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" />
    </div>
    <div class="field-group">
      <label for="website">Website</label>
      <input type="url" id="website" name="website" />
      <p class="field-note">Please enter your company website url</p>
    </div>

## Inline field groups

To have two field groups line up horizontally, add the class `inline` to the field group element.

    <label for="username">Username</label>
    <input type="text" id="username" name="username" />

    <label for="email">Email</label>
    <input type="text" id="email" name="email" />

### Code

    <div class="field-group inline">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" />
    </div>
    <div class="field-group inline">
      <label for="email">Email</label>
      <input type="text" id="email" name="email" />
    </div>
