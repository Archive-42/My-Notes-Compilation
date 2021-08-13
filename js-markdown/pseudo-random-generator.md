pseudo-random-generator"

- <a href="pseudo-random-generator.html"
  /pseudo-random-generator"
  /pseudo-random-generator"
- pseudo-random-generator"

<!-- -->

pseudo-random-generator"
pseudo-random-generator"
/pseudo-random-generator"
pseudo-random-generator"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Fpseudo-random-generator"%2Fpseudo-random-generator" </a>

<a href="../generators-iterators.html" Generators, advanced iteration</span></a>

<a href="../generators.html" Generators</span></a>

<a href="../generators.html"

## Pseudo-random generator

There are many areas where we need random data.

One of them is testing. We may need random data: text, numbers, etc. to test things out well.

In JavaScript, we could use `Math.random()`. But if something goes wrong, we’d like to be able to repeat the test, using exactly the same data.

For that, so called “seeded pseudo-random generators” are used. They take a “seed”, the first value, and then generate the next ones using a formula so that the same seed yields the same sequence, and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.

An example of such formula, that generates somewhat uniformly distributed values:

    next = previous * 16807 % 2147483647

If we use `1` as the seed, the values will be:

1.  `16807`
2.  `282475249`
3.  `1622650073`
4.  …and so on…

The task is to create a generator function `pseudoRandom(seed)` that takes `seed` and creates the generator with this formula.

Usage example:

    let generator = pseudoRandom(1);

    alert(generator.next().value); // 16807
    alert(generator.next().value); // 282475249
    alert(generator.next().value); // 1622650073

[Open a sandbox with tests.](https://plnkr.co/edit/kOtrsvIqz7nbmz2b?p=preview)

solution

<a href="pseudo-random-generator.html#"
<a href="pseudo-random-generator.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function* pseudoRandom(seed) {
      let value = seed;

      while(true) {
        value = value * 16807 % 2147483647
        yield value;
      }

    };

    let generator = pseudoRandom(1);

    alert(generator.next().value); // 16807
    alert(generator.next().value); // 282475249
    alert(generator.next().value); // 1622650073

Please note, the same can be done with a regular function, like this:

<a href="pseudo-random-generator.html#"
<a href="pseudo-random-generator.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function pseudoRandom(seed) {
      let value = seed;

      return function() {
        value = value * 16807 % 2147483647;
        return value;
      }
    }

    let generator = pseudoRandom(1);

    alert(generator()); // 16807
    alert(generator()); // 282475249
    alert(generator()); // 1622650073

That also works. But then we lose ability to iterate with `for..of` and to use generator composition, that may be useful elsewhere.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/TeK9a1txAdOhsWUb?p=preview)
