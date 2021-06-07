# Field notes

Field notes as used when you need to provide additional information to a user about a specific form field.

## Example

            <label for="website">Website</label>
            <input type="url" id="website" name="website" />
            <p class="field-note">Please enter your company website url</p>
        </div>
    </fieldset>

## Code

    <form name="tester" action="" method="post">
      <fieldset>
        <div class="field-group">
          <label for="website">Website</label>
          <input type="url" id="website" name="website" />
          <p class="field-note">Please enter your company website url</p>
        </div>
      </fieldset>
    </form>
