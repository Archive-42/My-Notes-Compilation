# Python Problems

### Add Fractions

```python
“””

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
    in a countdown and return when we've found one.
    """
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
    """
    # NOTE: validation can be done in a few ways. For example one might enforce
    # that fraction_1 and fraction_2 are instances of collections.abc.Sequence,
    # instead of just not None
    if fraction_1 is None or fraction_2 is None:
        raise TypeError("Both fractions must not be None")
 
    if len(fraction_1) != 2 or len(fraction_2) != 2:
        raise ValueError("Both fractions must be two-element Sequence of form:"
                         " [numerator, denominator]")
 
    (numerator_1, denominator_1) = fraction_1
    (numerator_2, denominator_2) = fraction_2
 
    if denominator_1 == 0 or denominator_2 == 0:
        raise ZeroDivisionError("Zero denominator is not allowed.")
 
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
    """
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
 
if __name__ == "__main__":
    unittest.main()

```

### Apache Logs

```python
def find_top_ip_address(lines):
    """ Given an Apache log file, return IP address(es) which accesses the site most often.
 
        Our log is in this format (Common Log Format). One entry per line and it starts with an IP address which accessed the site,
        followed by a whitespace.
      
        10.0.0.1 - frank [10/Dec/2000:12:34:56 -0500] "GET /a.gif HTTP/1.0" 200 234
 
        Log file entries are passed as a list.
         
        NOTE: In case of tie, this returns a comma-separated list of IP addresses. Tie is not mentioned explicitly in the exercise
        on purpose.
    """
 
    access_list = {}
    for line in lines:
        ip_address = line.split()[0]
        access_list[ip_address] = access_list.get(ip_address, 0) + 1
    ip_addresses = [key for key, val in access_list.items()
        if val == max(access_list.values())]
    return ','.join(sorted(ip_addresses))
     
 
def do_tests_pass():
    """Returns True if the test passes. Otherwise returns False."""
 
    tests_passed = True
    lines = ["10.0.0.1 - frank [10/Dec/2000:12:34:56 -0500] \"GET /a.gif HTTP/1.0\" 200 234",
             "10.0.0.1 - frank [10/Dec/2000:12:34:57 -0500] \"GET /b.gif HTTP/1.0\" 200 234",
             "10.0.0.2 - nancy [10/Dec/2000:12:34:58 -0500] \"GET /c.gif HTTP/1.0\" 200 234"
             ]
 
    result = find_top_ip_address(lines)
    if result != "10.0.0.1":
        tests_passed = False
 
    # tie case
    lines = ["10.0.0.1 - frank [10/Dec/2000:12:34:56 -0500] \"GET /a.gif HTTP/1.0\" 200 234",
             "10.0.0.1 - frank [10/Dec/2000:12:34:57 -0500] \"GET /b.gif HTTP/1.0\" 200 234",
             "10.0.0.2 - nancy [10/Dec/2000:12:34:58 -0500] \"GET /c.gif HTTP/1.0\" 200 234",
             "10.0.0.2 - nancy [10/Dec/2000:12:34:59 -0500] \"GET /c.gif HTTP/1.0\" 200 234",
             "10.0.0.3 - logan [10/Dec/2000:12:34:59 -0500] \"GET /d.gif HTTP/1.0\" 200 234"
             ]
 
    result = find_top_ip_address(lines)
    if result != "10.0.0.1,10.0.0.2":
        tests_passed = False
 
    if tests_passed:    
        print("test passed")
    else:
        print("test failed")
    return tests_passed
 
 
if __name__ == "__main__":
    do_tests_pass()

```

### Bishop Moves

```python
"""
  You are shipwrecked on an island. You have lost all your possessions
  save a single standard chess board (8x8) and two soggy playing
  pieces - a bishop and a seashell.
 
  Recall that the bishop is limited to diagonal movement, but has
  no restrictions in 1-d distance traveled for each move.
  The seashell cannot move once placed. To pass the time you invent
  a new chess-like game that works as follows:
 
  1. Place the seashell at any location on the board.
     The shell does not move after being placed.
  2. Place the bishop at any location on the board.
  3. Using only legal moves, capture the seashell using the bishop.
 
  Write a function that takes as input the coordinates of the
  seashell and the bishop, with 1-8 labeling rows and A-H labeling columns
  and returns the number of moves { 0, 1, 2, ... } it takes to capture
  the seashell using the bishop. Return -1 if this is not possible.
"""
def bishop_moves(src, dest):
    if( src == dest ):
        return 0
    if(abs(ord(src[0])-ord(dest[0]))==abs(ord(src[1])-ord(dest[1]))):
        return 1
    if((ord(src[0])+ord(src[1]))%2 ==(ord(dest[0])+ord(dest[1]))%2):
        return 2
    return -1
 
""" Returns True if all tests pass. Otherwise returns False """
def doTestsPass():
    test = [
        [ "A1", "C3" ],
        [ "A1", "D6" ]
    ]
    solutions = [ 1, 2 ]
    allTestsPass = True;
    for i in range(len(test)):
        print("Running test", i+1 )
        actual = solutions[i]
        expected = bishop_moves(test[i][0], test[i][1])
        allTestsPass = allTestsPass and (actual == expected)
        if actual != expected:
            print("Failed on test", i+1)
    return allTestsPass
 
if __name__ == "__main__":
    if(doTestsPass()):
        print("All tests pass")
    else:
        print("There are test failures")

```

### Count Length Of Cycle

```python
"""
countLengthOfCycle(arr, start_index)
 
You are given an integer array of size N.
Every element of the array is greater than or equal to 0.
Starting from arr[start_index], follow each element to the index it points to.
Continue to do this until you find a cycle.
Return the length of the cycle. If no cycle is found return -1
 
Examples:
countLengthOfCycle([1, 0], 0) == 2
countLengthOfCycle([1, 2, 0], 0) == 3
"""
def count_length_of_cycle(arr, start_index):
    visited = {}
    count = 1
    index = start_index
    while(visited.get(index) is None):
        if(arr[index] > len(arr)):
            return -1
        visited[index] = count;
        count+=1
        index = arr[index];
    return count - visited[index];
     
def do_tests_pass():
    """ Returns True if all tests pass. Otherwise returns False.
     
    TODO: We've implement a simple test harness here. Feel free to add
    more tests and improve.
    """
 
    test_cases = [
        [[1, 0], 0, 2],
        [[1, 2, 0], 0,  3],
        #additional test cases
        # [[1, 1], 0, 1 ],
        # [[1, 3, 0, 1], 0, 2],
        # [[7], 0, -1],
        # [[1, 2, 4], 0, -1]
    ]
    tests_passed = True
     
    for test_case in test_cases:
        tests_passed &= count_length_of_cycle(test_case[0], test_case[1]) == test_case[2]
     
    if tests_passed:
        print("Test passed.")
        return True
    else:
        print("Test failed.")
        return False
 
 
if __name__ == "__main__":
    do_tests_pass()

```

