# Python Problems

## Easy

**Add Fractions**

```python
Task:
    Given two fractions, return the fraction which is the result of adding
    the two input fractions. The returned fraction has to be in its simplest form.
    Fraction is represented as a two-element integer sequence - [numerator, denominator].
"""
import unittest
from fractions import Fraction
"""First Solution"""
def calculate_gcd(a, b):
"""Calculates greatest common divisor.
NOTE: there are a few ways to do this. The easiest for the candidate
would be just to use either fractions.gcd (or math.gcd in later Python
versions), instead of hand-coding this from scratch.

Hand-coded versions are fine too, Euclidean algorithm would be a nice
bonus (https://en.wikipedia.org/wiki/Euclidean_algorithm). The version
below is the brute force version, i.e.: just check everything one by one
in a countdown and return when we&#39;ve found one.
&quot;&quot;&quot;
gcd = 1
initial_gcd = min(abs(a), abs(b))
for i in range(initial_gcd, 0, -1):
    if a % i == 0 and b % i == 0:
        gcd = i
        break
return gcd

def add_fractions(fraction_1, fraction_2):
"""Adds two fractions and returns the result.
Given two fractions passed in as two-element int arrays, returns the
result as a two-element int array. The returned fraction has to be
in its simplest form.

Args:
    fraction_1: fraction represented as [numerator, denominator]
    fraction_2: fraction represented as [numerator, denominator]

Returns:
    The sum, also represented as [numerator, denominator]
&quot;&quot;&quot;
# NOTE: validation can be done in a few ways. For example one might enforce
# that fraction_1 and fraction_2 are instances of collections.abc.Sequence,
# instead of just not None
if fraction_1 is None or fraction_2 is None:
    raise TypeError(&quot;Both fractions must not be None&quot;)

if len(fraction_1) != 2 or len(fraction_2) != 2:
    raise ValueError(&quot;Both fractions must be two-element Sequence of form:&quot;
                     &quot; [numerator, denominator]&quot;)

(numerator_1, denominator_1) = fraction_1
(numerator_2, denominator_2) = fraction_2

if denominator_1 == 0 or denominator_2 == 0:
    raise ZeroDivisionError(&quot;Zero denominator is not allowed.&quot;)

result_numerator = (numerator_1 * denominator_2) + (numerator_2 * denominator_1)
result_denominator = denominator_1 * denominator_2

# Obviously this is NOT mentioned in the spec, but worth asking the
# candidate about edge cases like this one. What does he/she want to do
# with the denominator in this case?
if result_numerator == 0:
    return[0, 1]

# Reduce the result to the simplest form. Needs GCD.
gcd = calculate_gcd(result_numerator, result_denominator)
return [result_numerator / gcd, result_denominator / gcd]

class TestAddFractions(unittest.TestCase):
def test_gcd_calculated_correctly(self):
test_data = [
[4, 5, 1],
[0, 2, 1],
[8, 4, 4],
[24, 18, 6],
]
for n1, n2, expected in test_data:
self.assertEqual(calculate_gcd(n1, n2), expected)
def test_valid_fractions_add_correctly(self):
    test_data = [
        [[2, 3],  [1, 2],  [7, 6]],
        [[2, 3],  [2, 2],  [5, 3]],
        [[7, 3],  [1, 3],  [8, 3]],
        [[5, 10], [1, 10], [3, 5]],
        [[3, 4],  [8, 7],  [53, 28]],
    ]
    for fraction_1, fraction_2, expected in test_data:
        self.assertEqual(add_fractions(fraction_1, fraction_2), expected)

def test_invalid_input_raise_exceptions(self):
    test_data = [

        [[],        [],      ValueError],
        [[5, 10],   [1, 0],  ZeroDivisionError],
        [[2, 3],    [10, 0], ZeroDivisionError],
        [None,      None,    TypeError],
        [[None, 5], [4, 5],  TypeError]
    ]
    for fraction_1, fraction_2, expected in test_data:
        with self.assertRaises(expected):
            add_fractions(fraction_1, fraction_2)

"""Second Solution"""
def add_fractions1(fraction_1, fraction_2):
"""Adds two fractions and returns the result.
Given two fractions passed in as two-element int arrays, returns the
result as a two-element int array. The returned fraction has to be
in its simplest form.

Args:
    fraction_1: fraction represented as [numerator, denominator]
    fraction_2: fraction represented as [numerator, denominator]

Returns:
    The sum, also represented as [numerator, denominator]
&quot;&quot;&quot;
added = Fraction(*fraction_1) + Fraction(*fraction_2)
return [added.numerator, added.denominator]

class TestAddFractions1(unittest.TestCase):
def test_valid_fractions_add_correctly(self):
test_data = [
[[2, 3],  [1, 2],  [7, 6]],
[[2, 3],  [2, 2],  [5, 3]],
[[7, 3],  [1, 3],  [8, 3]],
[[5, 10], [1, 10], [3, 5]],
[[3, 4],  [8, 7],  [53, 28]],
[[],      [],      [0, 1]],
]
for fraction_1, fraction_2, expected in test_data:
self.assertEqual(add_fractions1(fraction_1, fraction_2), expected)
def test_invalid_input_raise_exceptions(self):
    test_data = [
        [[5, 10],   [1, 0],  ZeroDivisionError],
        [[2, 3],    [10, 0], ZeroDivisionError],
        [None,      None,    TypeError],
        [[None, 5], [4, 5],  TypeError],
        [[3, 4, 5], [8, 7],  TypeError],
    ]
    for fraction_1, fraction_2, expected in test_data:
        with self.assertRaises(expected):
            add_fractions1(fraction_1, fraction_2)

if name == "main":

unittest.main()
```

**Apache Logs**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Bishop Moves**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Count Length of Cycle**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Deque**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Dot Product**

\*\*\*\*

## 

**Election**

\*\*\*\*

## 

**First Non-Repeating**

\*\*\*\*

## 

**Group Anagrams**

\*\*\*\*

## 

**Power of 10**

\*\*\*\*

## 

**Longest Uniform String**

\*\*\*\*

## 

**Magic Potion**

\*\*\*\*

## 

**Pangram Detector**

\*\*\*\*

## 

**Pascal Triangle**

\*\*\*\*

## 

**Power**

\*\*\*\*

## 

**Prime Fatrorization**

\*\*\*\*

## 

**Reverse String**

\*\*\*\*

## 

**Reverse String Bug**

\*\*\*\*

## 

**Run Length Encoding**

\*\*\*\*

## 

**Search Tree**

\*\*\*\*

## 

**Second Smallest**

\*\*\*\*

## 

**Smallest in Rotated Array**

\*\*\*\*

## 

**Sqaure Root**

\*\*\*\*

## 

**Unique Tuples**

\*\*\*\*

## 

**Walking Robot**

\*\*\*\*



```python
<!------------------------------------------------------------------------------------->
```

## Medium

**Best Average Grade**

## 

**Decimal Conversion**

## 

**Distance between strings**

## 

**Largest Tree**

## 

**Longest Word**

## 

**Optimal Path**

## 

**Snow Pack**

## 

**Subarray exceeding sum**

## 

**Train Map**

## 

\*\*\*\*

```python
<!------------------------------------------------------------------------------------->
```

## 

## Hard

**HashMap**

## 

**KnightProbability**

## 

**Lowest Price**

## 

**Prefix Search**

## 

**Sort Segments**

## **END**

≡



