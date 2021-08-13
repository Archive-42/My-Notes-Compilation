list-primes"

- <a href="list-primes.html"
  /list-primes"
  /list-primes"
  list-primeslist-primes"

<!-- -->

list-primes"
list-primes"
/list-primes"
list-primes"

We want to make this open-source project available for people all around the world.

Search

Searchk%2Flist-primes"%2Flist-primes" </a>

<a href="../while-for.html" Loops: while and for</span></a>

<a href="../while-for.html"

## Output prime numbers

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

An integer number greater than `1` is called a [prime](https://en.wikipedia.org/wiki/Prime_number) if it cannot be divided without a remainder by anything except `1` and itself.

In other words, `n > 1` is a prime if it can’t be evenly divided by anything except `1` and `n`.

For example, `5` is a prime, because it cannot be divided without a remainder by `2`, `3` and `4`.

**Write the code which outputs prime numbers in the interval from `2` to `n`.**

For `n = 10` the result will be `2,3,5,7`.

P.S. The code should work for any `n`, not be hard-tuned for any fixed value.

solution

There are many algorithms for this task.

Let’s use a nested loop:

    For each i in the interval {
      check if i has a divisor from 1..i
      if yes => the value is not a prime
      if no => the value is a prime, show it
    }

The code using a label:

<a href="list-primes.html#"
<a href="list-primes.html#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let n = 10;

    nextPrime:
    for (let i = 2; i <= n; i++) { // for each i...

      for (let j = 2; j < i; j++) { // look for a divisor..
        if (i % j == 0) continue nextPrime; // not a prime, go next i
      }

      alert( i ); // a prime
    }

There’s a lot of space to optimize it. For instance, we could look for the divisors from `2` to square root of `i`. But anyway, if we want to be really efficient for large intervals, we need to change the approach and rely on advanced maths and complex algorithms like [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
