EN

langs\_\_title">عربي</span></a>

- <a href="pow-test-wrong.html"
  /pow-test-wrong"
  /pow-test-wrong"
  pow-test-wrongpow-test-wrong"

<!-- -->

pow-test-wrong"
pow-test-wrong"
/pow-test-wrong"
pow-test-wrong"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fpow-test-wrong"%2Fpow-test-wrong" </a>

<a href="../code-quality.html" Code quality</span></a>

<a href="../testing-mocha.html" Automated testing with Mocha</span></a>

<a href="../testing-mocha.html"

## What's wrong in the test?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What’s wrong in the test of `pow` below?

    it("Raises x to the power n", function() {
      let x = 5;

      let result = x;
      assert.equal(pow(x, 1), result);

      result *= x;
      assert.equal(pow(x, 2), result);

      result *= x;
      assert.equal(pow(x, 3), result);
    });

P.S. Syntactically the test is correct and passes.

solution

The test demonstrates one of the temptations a developer meets when writing tests.

What we have here is actually 3 tests, but layed out as a single function with 3 asserts.

Sometimes it’s easier to write this way, but if an error occurs, it’s much less obvious what went wrong.

If an error happens in the middle of a complex execution flow, then we’ll have to figure out the data at that point. We’ll actually have to _debug the test_.

It would be much better to break the test into multiple `it` blocks with clearly written inputs and outputs.

Like this:

    describe("Raises x to power n", function() {
      it("5 in the power of 1 equals 5", function() {
        assert.equal(pow(5, 1), 5);
      });

      it("5 in the power of 2 equals 25", function() {
        assert.equal(pow(5, 2), 25);
      });

      it("5 in the power of 3 equals 125", function() {
        assert.equal(pow(5, 3), 125);
      });
    });

We replaced the single `it` with `describe` and a group of `it` blocks. Now if something fails we would see clearly what the data was.

Also we can isolate a single test and run it in standalone mode by writing `it.only` instead of `it`:

    describe("Raises x to power n", function() {
      it("5 in the power of 1 equals 5", function() {
        assert.equal(pow(5, 1), 5);
      });

      // Mocha will run only this block
      it.only("5 in the power of 2 equals 25", function() {
        assert.equal(pow(5, 2), 25);
      });

      it("5 in the power of 3 equals 125", function() {
        assert.equal(pow(5, 3), 125);
      });
    });
