# Python Problems

## Easy

**Add Fractions**

```python
"""
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
def find_top_ip_address(lines):
    """ Given an Apache log file, return IP address(es) which accesses the site most often.
    Our log is in this format (Common Log Format). One entry per line and it starts with an IP address which accessed the site,
    followed by a whitespace.

    10.0.0.1 - frank [10/Dec/2000:12:34:56 -0500] &quot;GET /a.gif HTTP/1.0&quot; 200 234

    Log file entries are passed as a list.

    NOTE: In case of tie, this returns a comma-separated list of IP addresses. Tie is not mentioned explicitly in the exercise
    on purpose.
&quot;&quot;&quot;

access_list = {}
for line in lines:
    ip_address = line.split()[0]
    access_list[ip_address] = access_list.get(ip_address, 0) + 1
ip_addresses = [key for key, val in access_list.items()
    if val == max(access_list.values())]
return &#39;,&#39;.join(sorted(ip_addresses))

def do_tests_pass():
"""Returns True if the test passes. Otherwise returns False."""
tests_passed = True
lines = [&quot;10.0.0.1 - frank [10/Dec/2000:12:34:56 -0500] \&quot;GET /a.gif HTTP/1.0\&quot; 200 234&quot;,
         &quot;10.0.0.1 - frank [10/Dec/2000:12:34:57 -0500] \&quot;GET /b.gif HTTP/1.0\&quot; 200 234&quot;,
         &quot;10.0.0.2 - nancy [10/Dec/2000:12:34:58 -0500] \&quot;GET /c.gif HTTP/1.0\&quot; 200 234&quot;
         ]

result = find_top_ip_address(lines)
if result != &quot;10.0.0.1&quot;:
    tests_passed = False

# tie case
lines = [&quot;10.0.0.1 - frank [10/Dec/2000:12:34:56 -0500] \&quot;GET /a.gif HTTP/1.0\&quot; 200 234&quot;,
         &quot;10.0.0.1 - frank [10/Dec/2000:12:34:57 -0500] \&quot;GET /b.gif HTTP/1.0\&quot; 200 234&quot;,
         &quot;10.0.0.2 - nancy [10/Dec/2000:12:34:58 -0500] \&quot;GET /c.gif HTTP/1.0\&quot; 200 234&quot;,
         &quot;10.0.0.2 - nancy [10/Dec/2000:12:34:59 -0500] \&quot;GET /c.gif HTTP/1.0\&quot; 200 234&quot;,
         &quot;10.0.0.3 - logan [10/Dec/2000:12:34:59 -0500] \&quot;GET /d.gif HTTP/1.0\&quot; 200 234&quot;
         ]

result = find_top_ip_address(lines)
if result != &quot;10.0.0.1,10.0.0.2&quot;:
    tests_passed = False

if tests_passed:
    print(&quot;test passed&quot;)
else:
    print(&quot;test failed&quot;)
return tests_passed

if name == "main":

do_tests_pass()
```

##

**Bishop Moves**

\*\*\*\*

\*\*\*\*

```python
"""
  You are shipwrecked on an island. You have lost all your possessions
  save a single standard chess board (8x8) and two soggy playing
  pieces - a bishop and a seashell.
Recall that the bishop is limited to diagonal movement, but has
no restrictions in 1-d distance traveled for each move.
The seashell cannot move once placed. To pass the time you invent
a new chess-like game that works as follows:

Place the seashell at any location on the board.
The shell does not move after being placed.
Place the bishop at any location on the board.
Using only legal moves, capture the seashell using the bishop.

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
if name == "main":

if(doTestsPass()):

print("All tests pass")

else:

print("There are test failures")
```

##

**Count Length of Cycle**

\*\*\*\*

\*\*\*\*

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
TODO: We&#39;ve implement a simple test harness here. Feel free to add
more tests and improve.
&quot;&quot;&quot;

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
    tests_passed &amp;= count_length_of_cycle(test_case[0], test_case[1]) == test_case[2]

if tests_passed:
    print(&quot;Test passed.&quot;)
    return True
else:
    print(&quot;Test failed.&quot;)
    return False

if name == "main":

do_tests_pass()
```

##

**Deque**

\*\*\*\*

\*\*\*\*

```python
import traceback
class Node:
def init(self, data):
self.data = data
self.next = None
self.prev = None
class Deque:
def init(self):
self.first = None
self.last = None
self.size = 0
def addFirst(self, data):
    oldFirst = self.first
    self.first = Node(data)
    if oldFirst == None:
        self.last = self.first
    else:
        self.first.prev = None
        self.first.next = oldFirst
        oldFirst.prev = self.first
    self.size += 1

def addLast(self, data):
    oldLast = self.last
    self.last = Node(data)
    if oldLast == None:
        self.first = self.last
    else:
        self.last.prev = oldLast
        self.last.next = None
        oldLast.next = self.last
    self.size += 1

def removeFirst(self):
    oldFirst = self.first
    if oldFirst == None:
        return None
    else:
        self.first = oldFirst.next
        if self.first == None:
            self.last = self.first
        else:
            self.first.prev = None

    self.size -= 1
    return oldFirst.data

def removeLast(self):
    oldLast = self.last
    if oldLast == None:
        return None
    else:
        self.last = self.last.prev
        if self.last == None:
            self.first = self.last
        else:
            self.last.next = None

    self.size -= 1
    return oldLast.data

def peekFirst(self):
    if self.first == None:
        return None
    else:
        return self.first.data

def peekLast(self):
    if self.last == None:
        return None
    else:
        return self.last.data

def getSize(self):
    return self.size

def assertTrue(condition, message):
if not condition:
raise Exception(message)
def doTestsPass():
#TODO: implement more tests

deque=Deque()

# enqueue
deque.addLast(&quot;a&quot;)
deque.addLast(&quot;b&quot;)

assertTrue(deque.getSize() == 2, &quot;Test failed, getSize should be 2&quot;)

assertTrue(&quot;a&quot; == deque.peekFirst(), &quot;First element should be &#39;a&#39;&quot;)
assertTrue(&quot;b&quot; == deque.peekLast(), &quot;Last element should be &#39;b&#39;&quot;)

# dequeue
assertTrue(&quot;a&quot; == deque.removeFirst(), &quot;Expected element is &#39;a&#39;&quot;)
assertTrue(&quot;b&quot; == deque.removeFirst(), &quot;Expected element is &#39;b&#39;&quot;)

assertTrue(deque.getSize() == 0, &quot;Test failed, getSize should be 0&quot;)
assertTrue(deque.peekFirst() == None, &quot;List is empty, peekFirst() should return null&quot;)
assertTrue(deque.peekLast() == None, &quot;List is empty, peekLast() should return null&quot;)

# push
deque.addFirst(&quot;a&quot;)
deque.addFirst(&quot;b&quot;)

assertTrue(deque.getSize() == 2, &quot;Test failed, getSize should be 2&quot;)

assertTrue(&quot;b&quot; == deque.peekFirst(), &quot;Expected element is &#39;b&#39;&quot;)
assertTrue(&quot;a&quot; == deque.peekLast(), &quot;Expected element is &#39;a&#39;&quot;)

# pop
assertTrue(&quot;b&quot; == deque.removeFirst(), &quot;Expected element is &#39;b&#39;&quot;)
assertTrue(&quot;a&quot; == deque.removeFirst(), &quot;Expected element is &#39;a&#39;&quot;)

assertTrue(deque.getSize() == 0, &quot;Test failed, getSize should be 0&quot;)

try:

doTestsPass()

print("All tests passed")

except:

print("Test failed")

traceback.print_exc()
```

##

**Dot Product**

\*\*\*\*

\*\*\*\*

```python
""" Given two arrays of integers, returns the dot product of the arrays """
def dotProduct( array1, array2 ):
    """ TODO: Implement solution"""
    sum = 0
if( array1 == None or array2 == None ) :
    print( &quot;Null array is not a valid input.&quot; )
    return sum

if( len( array1 ) == 0 or len( array2 ) == 0 ) :
    print( &quot;Empty array is not a valid input.&quot; )
    return sum

if( len( array1 ) != len( array2 ) ) :
    print( &quot;Input arrays should be of equal length.&quot; )
    return sum

for i in range( len( array1 ) ) :
    sum += array1[ i ] * array2[ i ]
return sum

""" Returns 1 if all tests pass. Otherwise returns 0. """
def doTestsPass():
"""# TODO: implement some tests, please
# we've included a trivial boilerplate """
testPassed  = True
array1      = [ 2, 3, 4, 1]
array2      = [ 1, 3, 4, 5]


print( &quot;Running Test #1.&quot; )
result = dotProduct( array1, array2 )
if( result != 32 ):
    print( &quot;Test #1 failed&quot; )
    testPassed = False

print( &quot;Running Test #2.&quot; )
array2 = [ 1, 3, 4, 5, 6, 7 ]
result = dotProduct( array1, array2 )
if( result != 0 ):
    print( &quot;Test #2 failed.&quot; )
    testPassed = False

print( &quot;Running Test #3.&quot; )
array2 = []
result = dotProduct( array1, array2 )
if ( result != 0 ):
    print( &quot;Test #3 failed.&quot; )
    testPassed = False

print( &quot;Running Test #4.&quot; )
array2 = None
result = dotProduct( array1, array2 )
if ( result != 0 ):
    print( &quot;Test #4 failed.&quot; )
    testPassed = False

print( &quot;Running Test #5.&quot; )
array2 = [ -1, 0, 2, -1 ]
result = dotProduct( array1, array2 )
if( result != 5 ):
    print( &quot;Test #5 failed.&quot; )
    testPassed = False

print( &quot;All tests pass.&quot; ) if( testPassed ) else print( &quot;There are test failures.&quot; )

return testPassed

if name == "main":

doTestsPass()
```

##

**Election**

\*\*\*\*

\*\*\*\*

```python
def whoIsElected(n, k):
        """
        A group of students are sitting in a circle. The teacher is electing a new class president.
        The teacher does this by singing a song while walking around the circle. After the song is
        finished the student at which the teacher stopped is removed from the circle.
    Starting at the student next to the one that was just removed, the teacher resumes singing and walking around the circle.
    After the teacher is done singing, the next student is removed. The teacher repeats this until only one student is left.

    A song of length k will result in the teacher walking past k students on each round. The students are numbered 1 to n. The teacher starts at student 1.

    For example, suppose the song length is two (k=2). And there are four students to start with (1,2,3,4). The first
    student to go would be `2`, after that `4`, and after that `3`. Student `1` would be the next president in this example.

    @param n:   the number of students sitting in a circle.
    @param k:   the length (in students) of each song.
    @return:    the number of the student that is elected.
    &quot;&quot;&quot;
    if n == 1:
        return 1;
    return ( whoIsElected(n-1, k) + k - 1) % n +1

def whoIsElected2(n, k):
l = list(range(1, n+1))
while(len(l)>1):
for i in range(1, k):
l.append(l.pop(0))
l.pop(0)
return l.pop()
def doTestsPass():
""" Returns 1 if all tests pass. Otherwise returns 0. """
# todo: implement more tests, please
# feel free to make testing more elegant
testCases = [
[1, 1, 1],
[2, 2, 1],
[4, 2, 1],
[100, 2, 73],
[5, 3, 4],
[6, 4, 5],
[1000, 5, 763]]
    doPass = True

    for [n, k, expected] in testCases:
        answer = whoIsElected(n, k)
        if answer != expected:
            print( &quot;test failed!&quot;)
            doPass = False;

    if doPass:
            print(&quot;All tests pass\n&quot;)

    return doPass

if name == "main":

doTestsPass()
```

##

**First Non-Repeating**

\*\*\*\*

\*\*\*\*

```python
"""
Finds the first character that does not repeat anywhere in the input string
If all characters are repeated, return 0
Given "apple", the answer is "a"
Given "racecars", the answer is "e"
Given "ababdc", the answer is "d"
"""
def findFirst(input):
charFrequency = {}

for c in input:
    charFrequency[c] = charFrequency.pop(c, 0) + 1.

for c in input:
    if(charFrequency[c] == 1):
        return c

return 0

"""
Returns true if all tests pass. Otherwise returns false
"""
def doTestsPass():
tests = {"racecar":'e', "apple":'a', "ababdc":'d', "xxyyzz":0 }
for test in tests.items():
result = findFirst(test[0])
if result != test[1]:
print("Test Failed: " + test[0] + " expected:" + test[1] + " actual: " + result + "\n")
return False
return True

if name == "main":
result = doTestsPass()
if result:
        print(&quot;All tests pass\n&quot;);
else:
        print(&quot;Tests fail\n&quot;);</code></pre></td>

```

##

**Group Anagrams**

\*\*\*\*

\*\*\*\*

```python
"""
Returns a list of sets of anagrams
Args:
words - list of words to process
Example:
Input: ['cat', 'dog', 'god']
Output: [{'cat'}, {'dog', 'god'}]
"""
def group(words):
word_index = {}
for word in words:
    word_key = &quot;&quot;.join(sorted(list(word)))
    word_index.setdefault(word_key, set()).add(word)

anagram_sets = list(word_index.values())
return anagram_sets

""" Returns True if all tests pass. Otherwise returns False. """
def doTestsPass():
words = ['cat', 'dog', 'cat', 'god']
anagram_sets = [{'cat'}, {'dog', 'god'}]
result = group(words)
print(&quot;Result: {}&quot;.format(result))

allTestsPass = True
for anagram_set in anagram_sets:
    if anagram_set not in result:
        allTestsPass = False
        print(&quot;Test Failed! Result missing anagram set: {}&quot;.format(anagram_set))

if( allTestsPass ):
    print( &quot;All tests pass.&quot; )
else:
    print( &quot;There are test failures.&quot; )

return( allTestsPass )

if name == "main":

doTestsPass()
```

##

**Power of 10**

\*\*\*\*

\*\*\*\*

```python
def isPowerOf10(x):
        """ Returns 1 if x is a power-of-10. Otherwise returns 0. """
        # todo: implement here
        i = 1
        if x > 1:
            while i < x:
                i *= 10
        elif x > 0:
            while i > x:
                i /= 10.
    if i == x:
        return True
    return False

def doTestsPass():
""" Returns 1 if all tests pass. Otherwise returns 0. """
# todo: implement more tests, please
# feel free to make testing more elegant
doPass        = True
powersOf10    = [1,10,100,100000, .1, .001]
notPowersOf10 = [5,0,-10,20,110,10100,42]
    for n in powersOf10:
        if not isPowerOf10(n):
            print(&quot;Failed for &quot; + str(n) + &quot;\n&quot;)
            doPass = False


    for n in notPowersOf10:
        if isPowerOf10(n):
            print(&quot;Failed for &quot; + str(n) + &quot;\n&quot;)
            doPass = False

    if doPass:
        print(&quot;All tests pass\n&quot;)

    return doPass

if name == "main":

doTestsPass()
```

##

**Longest Uniform String**

\*\*\*\*

\*\*\*\*

```python
"""
This function should return a tuple that correctly identifies the location
     of the longest uniform substring within the input string.
 e.g.
     - for the input: &quot;abbbccda&quot; the longest uniform substring is &quot;bbb&quot; (which starts at index 1 and is 3 characters long).
     - the tuple returned from the function call would be (1, 3)
"""
def longest_uniform_substring(input):
longest_start = -1
longest = 0

ix = 1
length = len(input)
while ix &lt; length:
    start = ix - 1
    current_length = 1
    while ix &lt; length and input[ix] == input[ix - 1]:
        ix += 1
        current_length += 1

    if current_length &gt; longest:
        longest_start = start
        longest = current_length

    ix += 1

return (longest_start, longest)

def do_tests_pass():
"""Returns True if the test passes. Otherwise returns False."""
# todo: implement more tests
test_cases = {
    &quot;&quot;: (-1, 0 ),
    &quot;10000111&quot;: (1, 4),
    &quot;aabbbbbCdAA&quot;: (2, 5)
}

passed = True
for input, result in test_cases.items():
    start, length = longest_uniform_substring(input)
    passed = passed and start == result[0] and length == result[1]

return passed

if name == "main":

if do_tests_pass():

print("All tests pass!")

else:

print("At least one failure!")
```

##

**Magic Potion**

\*\*\*\*

\*\*\*\*

```python
"""
Question:
Hermione is preparing a cheat-sheet for her final exam in Potions class.
To create a potion, one must combine ingredients in a specific order, any of which may be repeated.
As an example, consider the following potion which uses 4 distinct ingredients
(A,B,C,D) in 11 steps: A, B, A, B, C, A, B, A, B, C, D
Hermione realizes she can save tremendous space on her cheat-sheet by introducing a
special instruction, '*', which means "repeat from the beginning".
Using these optimizations, Hermione is able to encode the potion above using only 6 characters: A,B,,C,,D
Your job is to write a function that takes as input an un-encoded potion and returns the
minimum number of characters required to encode the potion on Hermione's Cheat Sheet.

"""
import sys
Function to return the minimal number of steps
def minimal_steps( ingredients ):
n = len( ingredients )
if n == 0:
return 0
dp = [ sys.maxsize ] * n
dp[0] = 1
for i in range(1, n):
    dp[ i ] = min(dp[ i ], dp[ i - 1 ] + 1)

    # If the string can be replicated, we need to update at (2*i + 1)
    if ingredients[ 0: i + 1 ] == ingredients[ i + 1: 2*i + 2 ]:
        dp[ 2*i + 1 ] = dp[ i ] + 1

return dp[ n - 1 ]

"""
Returns true if all tests pass. Otherwise returns false.
TODO: implement some tests. We've included a trivial boilerplate
"""
def do_tests_pass():
return minimal_steps( "ABCDABCE" ) == 8 and minimal_steps( "ABCABCE" ) == 5 and
minimal_steps("AAAAAA") == 4 and minimal_steps("AAAABBBB") == 7 and
minimal_steps("ABABCABABCD") == 6
if name == "main":
result = do_tests_pass()
if result:
    print( &quot;All tests passed&quot; )
else:
    print( &quot;Tests failed&quot; )</code></pre></td>

```

##

**Pangram Detector**

\*\*\*\*

\*\*\*\*

```python
"""
Pangram Detector
The sentence "The quick brown fox jumps over the lazy dog" contains
every single letter in the alphabet. Such sentences are called pangrams.
Write a function findMissingLetters, which takes a string sentence,
and returns all the letters it is missing (which prevent it from
being a pangram). You should ignore the case of the letters in sentence,
and your return should be all lower case letters, in alphabetical order.
You should also ignore all non US-ASCII characters.
"""
ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
TODO: complete this function stub
def FindMissingLetters(sentence):
alphabet = set(ALPHABET)
s = set(sentence.lower())
missing = alphabet - s
return &#39;&#39;.join(sorted(missing))

Test Cases
def runTests():
success = (
'' == FindMissingLetters("The quick brown fox jumps over the lazy dog") and
'bfgjkvz' == FindMissingLetters("The slow purple oryx meanders past the quiescent canine") and
'cdfjklmopqruvxyz' == FindMissingLetters("We hates Bagginses!") and
'abcdefghijklmnopqrstuvwxyz' == FindMissingLetters("")
)
return success

if name == "main":

if runTests():

print("All tests passed")

else:

print("At least one test failed.")
```

##

**Pascal Triangle**

\*\*\*\*

\*\*\*\*

```python
/*
**  The below pattern of numbers are called Pascals Triangle.
**
**  Pascals Triangle exhibits the following behaviour:
**
**  The first and last numbers of each row in the triangle are 1
**  Each number in the triangle is the sum of the two numbers above it.
**
**  Example:
**    1
**    1 1
**    1 2 1
**    1 3 3 1
**
**  Please Complete the 'pascal' function below so that given a
**  col and a row it will return the value in that positon.
**
**  Example, pascal(1,2) should return 2
**
*/
"""
pascalDictionary = {}
def pascal(col, row):
if col == 0 or col == row:
return 1
elif (col, row ) in pascalDictionary:
return pascalDictionary[col, row]
else:
pascalValue = (pascal(col, row-1) + pascal(col-1, row-1))
pascalDictionary[col,row] = pascalValue
return pascalValue
def doTestsPass():
""" Returns 1 if all tests pass. Otherwise returns 0. """
doPass = True
pascalColRowValues = {(0,0):1, (1,2): 2, (5,6): 6, (6,6):1, (4,8): 70, (6,6):1}
for key, val in pascalColRowValues.items():
    if pascal(key[0],key[1]) != val:
        doPass = False
        print(&quot;Failed for %s and %s \n&quot;, key, val)

if doPass:
    print(&quot;All tests pass\n&quot;)

return doPass

if name == "main":

doTestsPass()
```

##

**Power**

\*\*\*\*

\*\*\*\*

```python
""" Given base and integer exponent, compute value of base raised to the power of exponent.
    Can you implement a solution faster than O(exp)? """
def power(base, exp):
    if base == 0:
        return 0
    if exp == 0:
        return 1
    if exp == 1:
        return base
    positiveExp = exp * (-1) if exp < 0 else exp
    result = power(base * base, positiveExp / 2) if (positiveExp % 2 == 0) else (base * power(base * base, (positiveExp - 1) / 2))
    return 1.0 / result if exp < 0 else result
""" Returns True if all tests pass. Otherwise returns False """
def doTestsPass():
testBase = [ 6, 5, 0, 2, 2.2 ]
testExp =  [0, 1, 2, -3, 30 ]
tolerance = 0.0001
allTestsPass = True;
for i in range(len(testBase)):
actual = power(testBase[i], testExp[i])
expected = pow(testBase[i], testExp[i])
if not (abs(actual - expected) < tolerance):
print("Test failed for power(" + str(testBase[i]) + "," + str(testExp[i]) + ") expected:" + str(expected) + " actual:" + str(actual));
allTestsPass = False
return allTestsPass
if name == "main":

if(doTestsPass()):

print("All tests pass")

else:

print("There are test failures")
```

##

**Prime Factorization**

\*\*\*\*

\*\*\*\*

```python
"""
 Return an array containing prime numbers whose product is x
  Examples:
  primeFactorization(6) == [2,3]
  primeFactorization(5) == [5]
  primeFactorization(12) == [2,2,3]
"""
def primeFactorization(x):
if x < 1:
return
factors = []

i = 2
while i &lt;= x:
    while x % i == 0:
        x /= i
        factors.append(i)

    i += 1

return factors

def doTestsPass():
""" Returns True if all tests pass. Otherwise returns False. """
testVals = [6, 5, 12, 1, -1]
testAnswers = [[2, 3], [5], [2, 2, 3], [], None]
for value, answer in zip(testVals, testAnswers):
    if primeFactorization(value) != answer:
        print (&quot;Test failed for %d&quot; % value)
        return False

return True

if name == "main":

if doTestsPass():

print ("All tests pass")

else:

print ("Not all tests pass")
```

##

**Reverse String**

\*\*\*\*

\*\*\*\*

```python
"""
Takes str and returns a string such that the characters
are in reversed order.
Example: reverseStr(str) where str is "abcd" returns "dcba".
"""
def reverseStr(str):
    revStr = ""
    for i in range(len(str)-1,-1,-1):
        revStr += str[i]
    return revStr
#more pythonic approach
#return str[::-1]

"""
Returns true if all tests pass. Otherwise returns false
"""
def doTestsPass():
# todo: implement more tests
if reverseStr("abcd") != "dcba":
return False
if reverseStr(&quot;odd abcde&quot;) != &quot;edcba ddo&quot;:
    return False

if reverseStr(&quot;even abcde&quot;) != &quot;edcba neve&quot;:
    return False

if reverseStr(reverseStr(&quot;no change&quot;)) != &quot;no change&quot;:
    return False

if reverseStr(&quot;&quot;) != &quot;&quot;:
    return False

return True

if name == "main":
result = doTestsPass()
if result:
        print(&quot;All tests pass\n&quot;);
else:
        print(&quot;Tests fail\n&quot;);</code></pre></td>

```

##

**Reverse String Bug**

\*\*\*\*

\*\*\*\*

```python
"""
Takes str and returns a string such that the characters
are in reversed order.
Example: reverseStr(str) where str is "abcd" returns "dcba".
"""
def reverseStr(str):
    revStr = ""
    for i in range(len(str)-1,-1,-1):
        revStr += str[i]
    return revStr
#more pythonic approach
#return str[::-1]

"""
Returns true if all tests pass. Otherwise returns false
"""
def doTestsPass():
# todo: implement more tests
if reverseStr("abcd") != "dcba":
return False
if reverseStr(&quot;odd abcde&quot;) != &quot;edcba ddo&quot;:
    return False

if reverseStr(&quot;even abcde&quot;) != &quot;edcba neve&quot;:
    return False

if reverseStr(reverseStr(&quot;no change&quot;)) != &quot;no change&quot;:
    return False

if reverseStr(&quot;&quot;) != &quot;&quot;:
    return False

return True

if name == "main":
result = doTestsPass()
if result:
        print(&quot;All tests pass\n&quot;);
else:
        print(&quot;Tests fail\n&quot;);</code></pre></td>

```

##

**Run Length Encoding**

\*\*\*\*

\*\*\*\*

```python
"""
   Implement a run length encoding function.
For a string input the function returns output encoded as follows:
"a"     -> "a1"
"aa"    -> "a2"
"aabbb" -> "a2b3"
"aabbbaa" -> "a2b3a2"
"""
def rle(testString):
if(len(testString) == 0):
return ""
lastseen = &quot;&quot;
result = &quot;&quot;
counter = 1
for let in testString:
    if( lastseen == let):
        counter += 1
    else:
        if lastseen != &quot;&quot;:
            result = &quot;%s%s%d&quot; % (result, lastseen, counter)
        counter = 1
        lastseen = let
result = &quot;%s%s%d&quot; % (result, lastseen, counter)
return result

def Assert(actual,expected, message):
if(actual ==  expected):
print("PASSED: ", message, "Actual %s == Expected %s" % (actual, expected));
else:
print("FAILED: ", message, "Actual %s != Expected %s" % (actual, expected));
def doTestsPass():
Assert(rle(""),           "",                  "Example 1" );
Assert(rle("a"),          "a1",                "Example 2" );
Assert(rle("aaa"),        "a3",                "Example 3" );
Assert(rle("aaabbbaad"),  "a3b3a2d1",          "Example 3" );
if name == "main":

doTestsPass()
```

##

**Search Tree**

\*\*\*\*

```python
import unittest
class BST(object):
def init(self):
self.root = Node()
def put(self, value):
    self._put(value, self.root)

def _put(self, value, node):
    if node.value is None:
        node.value = value
    else:
        if value &lt; node.value:
            if node.left is None:
                node.left = Node()
            self._put(value, node.left)
        else:
            if node.right is None:
                node.right = Node()
            self._put(value, node.right)

def contains(self, value):
    return self._contains(value, self.root)

def _contains(self, value, node):
    if node is None or node.value is None:
        return False
    else:
        if value == node.value:
            return True
        elif value &lt; node.value:
            return self._contains(value, node.left)
        else:
            return self._contains(value, node.right)

def in_order_traversal(self):
    acc = list()
    self._in_order_traversal(self.root, acc)
    return acc

def _in_order_traversal(self, node, acc):
    if node is None or node.value is None:
        return
    self._in_order_traversal(node.left, acc)
    acc.append(node.value)
    self._in_order_traversal(node.right, acc)

class Node(object):
def init(self, value=None, left=None, right=None):
self.value = value
self.left = left
self.right = right
class TestBST(unittest.TestCase):
def setUp(self):
self.search_tree = BST()
def test_bst(self):
    self.search_tree.put(3)
    self.search_tree.put(1)
    self.search_tree.put(2)
    self.search_tree.put(5)
    self.assertFalse(self.search_tree.contains(0))
    self.assertTrue(self.search_tree.contains(1))
    self.assertTrue(self.search_tree.contains(2))
    self.assertTrue(self.search_tree.contains(3))
    self.assertFalse(self.search_tree.contains(4))
    self.assertTrue(self.search_tree.contains(5))
    self.assertFalse(self.search_tree.contains(6))

    self.assertEqual(self.search_tree.in_order_traversal(), [1,2,3,5])

def test_empty(self):
    self.assertEqual(self.search_tree.in_order_traversal(), [])

def test_negative(self):
    self.search_tree.put(-1)
    self.search_tree.put(11)
    self.search_tree.put(-10)
    self.search_tree.put(50)
    self.assertTrue(self.search_tree.contains(-1))
    self.assertTrue(self.search_tree.contains(11))
    self.assertTrue(self.search_tree.contains(-10))
    self.assertTrue(self.search_tree.contains(50))

    self.assertEqual(self.search_tree.in_order_traversal(), [-10,-1,11,50])

def test_dupes(self):
    self.search_tree.put(1)
    self.search_tree.put(2)
    self.search_tree.put(1)
    self.search_tree.put(2)
    self.assertTrue(self.search_tree.contains(1))
    self.assertTrue(self.search_tree.contains(2))

    self.assertEqual(self.search_tree.in_order_traversal(), [1,1,2,2])

def test_none(self):
    self.search_tree.put(None)
    self.assertFalse(self.search_tree.contains(None))

    self.assertEqual(self.search_tree.in_order_traversal(), [])

if name == 'main':

unittest.main()
```

##

**Second Smallest**

\*\*\*\*

\*\*\*\*

```python
def secondSmallest(x):
        """ Returns second smallest integer in the array x. Returns nothing if array has less than 2 elements. """
        # First check if array is large enough
        if len( x ) < 2:
            return
    Smallest = float(&quot;inf&quot;)
    SecSmallest = float(&quot;inf&quot;)
    for i in x:
        if i &lt; Smallest:
            SecSmallest = Smallest
            Smallest = i
        elif i &lt; SecSmallest:
            SecSmallest = i

    return SecSmallest

def doTestsPass():
""" Returns 1 if all tests pass. Otherwise returns 0. """
testArrays    = [ [], [0], [0,1], [-1,0,1,-2,2], [1,1,2] ]
testAnswers   = [ None, None, 1, -1, 1 ]
    for i in range( len( testArrays ) ):
        if not ( secondSmallest( testArrays[i] ) == testAnswers[i] ):
            return False

    return True

if name == "main":

if( doTestsPass() ):

print( "All tests pass" )

else:

print( "Not all tests pass" )
```

##

**Smallest in Rotated Array**

\*\*\*\*

\*\*\*\*

```python
"""
 Given an array of integers that is sorted but rotated find the smallest element in the array
 For example {3, 5, 6, 1, 2} returns 1.
 Assume that the array does not have any duplicates.
"""
def findMin(input):
    if len(input) < 1:
        return
return findMinInArray(input,0,len(input)-1)

def findMinInArray(input,left,right):
if left == right:
return input[left]
if left &gt; right:
    return input[0]

mid = int((left + right)/2)

if mid&lt;right and input[mid]&gt;input[mid+1]:
    return input[mid+1]
if mid&gt;left and input[mid-1]&gt;input[mid]:
    return input[mid]

if input[right]&gt;input[mid]:
    return findMinInArray(input,left,mid-1)

return findMinInArray(input,mid+1,right)

"""
Returns true if all tests pass. Otherwise returns false
"""
def doTestsPass():
ok = True
tests = [
(1, [3,4,5,6,2,1]),
(1, [2,1]),
(1, [1]),
(1, [1,2,3,4,5,6]),
(1, [4,1,2,3]),
(None,[])
]
for (expected,testInput) in tests:
    result = findMin(testInput)
    if result == expected:
        print(&quot;Test passed for&quot;, testInput, &quot;got&quot;, result, &quot;for&quot;, expected,&quot;\n&quot;)
    else:
        print(&quot;Test failed for&quot;, testInput, &quot;got&quot;, result, &quot;instead of&quot;, expected, &quot;\n&quot;)
        ok = False
return ok

if name == "main":
result = doTestsPass()
if result:
    print(&quot;All tests pass\n&quot;)
else:
    print(&quot;Tests fail\n&quot;)</code></pre></td>

```

##

**Square Root**

\*\*\*\*

\*\*\*\*

```python
 * This is **NOT** a math problem. You are required to code up a simple mathematical technique to find the square root of a number.
  * The Newton-Raphson method can be used to find the square root of a number N as follows
      ** Make an initial guess
      ** Update the guess using the below formula
      ** New Estimate = Current Estimate - ( F(Current Estimate) / F'(Current Estimate) ), where
         F(Current Estimate) = Current Estimate * Current Estimate - N
         F'(Current Estimate) = 2*Current Estimate
      ** Repeat till you are close enough
  * Run this code in the REPL to observe its behaviour. The
     execution entry point is main().
  * Consider adding some additional tests in doTestsPass
"""
def squareRoot(x):
""" Returns the square root of x """
max_iter = 1000
threshold = 0.001
guess = x/2.0
while( max_iter > 0 and abs(guessguess-x) > threshold ):
guess = guess - ((guessguess - x )/(2.0*guess ))
max_iter -= 1
return guess
def doTestsPass():
""" Returns True if all tests pass. Otherwise returns False """
doPass = True
inputs = [ 4, 100, 2 ]
expected_values = [ 2, 10, 1.41421 ]
threshold = 0.001
for i in range(0, len( inputs ) ) :
if abs( squareRoot( inputs[i] ) - expected_values[i] ) > threshold:
print( "Failed for %f - expected = %f, found = %f" % ( inputs[i], expected_values[i], squareRoot( inputs[i] ) ) )
doPass = False
if doPass:
print( "All tests pass\n" )
return doPass
if name == "main":

doTestsPass()
```

##

**Unique Tuples**

\*\*\*\*

\*\*\*\*

```python
"""Given a string and size of the tuples, extracts all unique tuples(substrings) of the given size."""
def uniqueTuples( input, size ):
    """ TODO: Implement solution"""
if( input == None or len( input ) == 0 ):
    print( &quot;Input string cannot be null or of zero length.&quot; )
    return None

if( size &lt;= 0 ):
    print( &quot;Length of tuples must be greater than zero. &quot;)
    return None

inputLength = len(input)
if( size &gt; inputLength ):
    print( &quot;Length of the tuple cannot be more than the length of the source string.&quot; )
    return None

result = set()
for i in range( inputLength - size + 1 ):
    result.add( input[ i : i + size ] )

return result

""" Returns 1 if all tests pass. Otherwise returns 0. """
def doTestsPass():
"""# TODO: implement some tests, please
# we've included a trivial boilerplate """
testPassed  = True
result      = set()


print( &quot;Running Test #1.&quot; )
result = uniqueTuples( &quot;&quot;, 2 )
if( result != None ):
    print( &quot;Test #1 failed&quot; )
    testPassed = False

print( &quot;Running Test #2.&quot; )
result = uniqueTuples( None, 2 )
if( result != None ):
    print( &quot;Test #2 failed.&quot; )
    testPassed = False

print( &quot;Running Test #3.&quot; )
result = uniqueTuples( &quot;Anything&quot;, 0 )
if( result != None ):
    print( &quot;Test #3 failed.&quot; )
    testPassed = False

print( &quot;Running Test #4.&quot; )
result = uniqueTuples( &quot;1234&quot;, 5)
if( result != None ):
    print( &quot;Test #4 failed.&quot; )
    testPassed = False

print( &quot;Running Test #5.&quot; )
result     = uniqueTuples( &quot;abbccde&quot;, 2 )
goodResult = set()
goodResult.add( &quot;ab&quot; )
goodResult.add( &quot;bb&quot; )
goodResult.add( &quot;bc&quot; )
goodResult.add( &quot;cc&quot; )
goodResult.add( &quot;cd&quot; )
goodResult.add( &quot;de&quot; )

if( result == None  or
    len( result ) != 6 or
    result.symmetric_difference_update( goodResult ) != None ):
    print( &quot;Test #5 failed.&quot; )
    testPassed = False


print( &quot;All tests pass.&quot; ) if( testPassed ) else print( &quot;There are test failures.&quot; )

return testPassed

if name == "main":

doTestsPass()
```

##

**Walking Robot**

\*\*\*\*

\*\*\*\*

```python
# 2. Implement the 'walk' method. This method takes in a string, path,
#    where each character in the string corresponds to a potential movement
#    of the robot. The robot can move up, down, left, and right represented
#    by the characters 'U', 'D', 'L', and 'R' respectively. All other
#    characters may be ignored. Assume the robot's initial position
#    is at (0,0). The output of this method is the robot's final x and y
#    coordinates relative to the initial position.
# 3. Consider adding more test cases
def walk( path ):
ret = [0,0]
directions = { &quot;U&quot; : [ 0, 1],
               &quot;D&quot; : [ 0,-1],
               &quot;L&quot; : [-1, 0],
               &quot;R&quot; : [ 1, 0]
             }

for char in path:
    ret = [ a + b for a, b in zip( ret, directions.get( char, [0,0] ) ) ]

return( ret )

def do_tests_pass():
""" Returns True if all tests pass. Otherwise returns False. """
"""# TODO: implement some tests, please
# we've included a trivial boilerplate """
#   path, expected
test_cases = [
    [ &quot;UUU&quot;,            [0, 3] ],
    [ &quot;ULDR&quot;,           [0, 0] ],
    [ &quot;ULLLDUDUURLRLR&quot;, [-2,2] ],
    [ &quot;UP LEFT 2xDOWN DOWN RIGHT RIGHT UP UP&quot;, [1,1] ],
]

result = True
for test in test_cases:
    result = result and ( walk( test[0] ) == test[1] )

if result:
    print(&quot;Test passed.&quot;)
    return True
else:
    print(&quot;Test failed.&quot;)
    return False

if name == "main":

do_tests_pass()
```

```python
<========================================()===========================================>
```

## Medium

**Best Average Grade**

\*\*\*\*

```python
"""
  Instructions:
Given a list of student test scores, find the best average grade.
Each student may have more than one test score in the list.
Complete the bestAverageGrade function in the editor below.
It has one parameter, scores, which is an array of student test scores.
Each element in the array is a two-element array of the form [student name, test score]
e.g. [ "Bobby", "87" ].
Test scores may be positive or negative integers.
If you end up with an average grade that is not an integer, you should
use a floor function to return the largest integer less than or equal to the average.
Return 0 for an empty input.
Example:
Input:
[ [ "Bobby", "87" ],
[ "Charles", "100" ],
[ "Eric", "64" ],
[ "Charles", "22" ] ].
Expected output: 87
Explanation: The average scores are 87, 61, and 64 for Bobby, Charles, and Eric,
respectively. 87 is the highest.
"""
import math
""" Find the best average grade. """
def bestAverageGrade(scores):
# check for empty list
if(len(scores) == 0):
return 0
# Build dictionary of students to tuple of running average and count
scoresByStudent = {}
for scoreRow in scores:
    # check for well formed entry
    if len(scoreRow) != 2:
        return 0

    student = scoreRow[0]
    score   = int(scoreRow[1])

    currentAvg = scoresByStudent.get(student,(0, 0))
    newAvg = (currentAvg[0] * currentAvg[1] + score) / (currentAvg[1] + 1)
    scoresByStudent[student] = (newAvg, currentAvg[1] + 1)

scoresOnly = scoresByStudent.values()

averages = map(lambda x: x[0], scoresOnly)

return int(math.floor(max(averages)))

def doTestsPass():
""" Returns true if the tests pass. Otherwise, returns false """
testCases = [
    # example
    ([ [ &quot;Bobby&quot;, &quot;87&quot; ],
        [ &quot;Charles&quot;, &quot;100&quot; ],
        [ &quot;Eric&quot;, &quot;64&quot; ],
        [ &quot;Charles&quot;, &quot;22&quot; ] ],
     87),
    # empty
    ([],
     0),
    # multiple scores each
    ([ [ &quot;Sarah&quot;, &quot;91&quot; ],
       [ &quot;Goldie&quot;, &quot;92&quot; ],
       [ &quot;Elaine&quot;, &quot;93&quot; ],
       [ &quot;Elaine&quot;, &quot;95&quot; ],
       [ &quot;Goldie&quot;, &quot;94&quot; ],
       [ &quot;Sarah&quot;, &quot;93&quot; ] ],
     94),
    # negatives and zeros
    ([ [ &quot;Janie&quot;, &quot;-66&quot; ],
       [ &quot;Janie&quot;, &quot;0&quot; ],
       [ &quot;Gina&quot;, &quot;-88&quot; ],
       [ &quot;Bobby&quot;, &quot;0&quot; ],
       [ &quot;Gina&quot;, &quot;44&quot; ],
       [ &quot;Bobby&quot;, &quot;0&quot; ],
       [ &quot;Bobby&quot;, &quot;-6&quot; ] ],
     -2),
    # same value and average
    ([ [ &quot;Alpha&quot;, &quot;99&quot; ],
       [ &quot;Bravo&quot;, &quot;99&quot; ],
       [ &quot;Charlie&quot;, &quot;99&quot; ],
       [ &quot;Delta&quot;, &quot;99&quot; ],
       [ &quot;Echo&quot;, &quot;99&quot; ],
       [ &quot;Foxtrot&quot;, &quot;99&quot; ],
       [ &quot;Foxtrot&quot;, &quot;99&quot; ] ],
     99),
    # non-integer average
    ([ [ &quot;Gerald&quot;, &quot;91&quot; ],
       [ &quot;Gerald&quot;, &quot;92&quot; ] ],
     91),
    # negative non-integer average
    ([ [ &quot;Barry&quot;, &quot;-66&quot; ],
       [ &quot;Barry&quot;, &quot;-65&quot; ],
       [ &quot;Alfred&quot;, &quot;-122&quot;] ],
     -66),
]

passed = True
for tc, expected in testCases:
    actual = bestAverageGrade(tc)
    if actual != expected:
        passed = False
        print(&quot;Failed for case &quot;, tc, &quot;\n  expected &quot;, expected, &quot;, actual &quot;, actual)

return passed

if name == "main":
result = doTestsPass()
if result:
    print(&quot;All tests pass\n&quot;);
else:
    print(&quot;Tests fail\n&quot;);</code></pre></td>
```

##

**Decimal Conversion**

\*\*\*\*

```python
def vulgarToDecimal(numerator, denominator) :
    if denominator == 0:
        return "NaN"
    integer = str(int(numerator / denominator))
    rest = int(numerator) % denominator
    if rest == 0: return integer
afterDot = &quot;&quot;
numeratorToPos = dict()
cyclePos = int(-1)
while rest != 0:
    numerator = rest * 10
    if numerator in numeratorToPos:
        cyclePos = numeratorToPos[numerator] - 1
        break

    digit = str(int(numerator / denominator))
    afterDot += digit
    numeratorToPos[numerator] = len(afterDot)
    rest = numerator % denominator

if cyclePos &gt; -1:
    afterDot = afterDot[:cyclePos] + &quot;(&quot; + afterDot[cyclePos:] + &quot;)&quot;
return integer + &quot;.&quot; + afterDot

Implement the method that provided numerator and denominator will return a string representing fraction's decimal form.
Some fractions in decimal form have cyclic decimal points.

Examples:
1/2 = 0.5
1/3 = 0.(3)
def doTestsPass():
testsPassed = True
testsPassed &= vulgarToDecimal(1, 0) == "NaN"
testsPassed &= vulgarToDecimal(1, 2) == "0.5"
testsPassed &= vulgarToDecimal(1, 3) == "0.(3)"
testsPassed &= vulgarToDecimal(1, 56) == "0.017(857142)"
if testsPassed:
    print(&quot;Tests passed&quot;)
    return 0

print(&quot;Tests failed&quot;)
return 1

doTestsPass()
Returns 0 if all tests pass. Otherwise 1

Consider adding more tests.
if name == "main":

doTestsPass()
```

##

**Distance between strings**

\*\*\*\*

```python
import math
import re
"""
== Instructions ==
Debug why the included test cases aren&#39;t succeeding and account for them in the code

A description of the expected behaviour is given below

Missing enhancements:
 *  Support case insensitivity (comparing word to word1 or word2)
 *  Account for punctuation (allow multiple separators in the split)
 *  Account for the split char in the total length between words (i.e. index += word.length() + 1 )
 *  Allow for words in either order (math.fabs(word1Loc - word2Loc))
 *  Handle case where either word is not present

"""
def shortestDistance(document, word1, word2):
""" Given two words returns the shortest distance between their two midpoints in number of characters.
Words can appear multiple times in any order and should be case insensitive.
        E.g. for the document=&quot;This is a sample document we just made up&quot;
        shortestDistance( document, &quot;we&quot;, &quot;just&quot; ) == 4
        shortestDistance( document, &quot;is&quot;, &quot;a&quot; ) == 2.5
        shortestDistance( document, &quot;is&quot;, &quot;not&quot; ) == -1
    &quot;&quot;&quot;
    # todo: determine why tests are failing

    words = re.split(&quot;[,. ]&quot;, document)
    index = 0
    shortest = len(document)
    word1Loc = 0
    word2Loc = 0
    for word in words:
        if word.lower() == word1.lower():
            word1Loc = index + (len(word)/2.0)
        elif word.lower() == word2.lower():
            word2Loc = index + (len(word)/2.0)

        if word1Loc &gt; 0 and word2Loc &gt; 0:
            current = math.fabs(word1Loc - word2Loc)
            if current &lt; shortest:
                shortest = current

        index += len(word) + 1

    if word1Loc == 0 or word2Loc == 0:
        return -1


    return shortest;

def doTestsPass():
""" Returns 1 if all tests pass. Otherwise returns 0. """
# todo: implement more tests, please
# feel free to make testing more elegant
doPass = shortestDistance(document, "and", "graphic") == 6;
doPass = doPass and shortestDistance(document, "transfer", "it") == 14;
doPass = doPass and shortestDistance(document, "layout", "It" ) == 6;
doPass = doPass and shortestDistance(document, "Design", "filler" ) == 25;
doPass = doPass and shortestDistance(document, "It", "transfer") == 14;
doPass = doPass and math.fabs(shortestDistance(document, "of", "lorem") - 4.5) < 0.000001;
doPass = doPass and shortestDistance(document, "thiswordisnotthere", "lorem") == -1;
if doPass:
        print(&quot;All tests pass\n&quot;)
else:
        print(&quot;There are test failures\n&quot;)

return doPass

document =  "In publishing and graphic design, lorem ipsum is a filler text commonly used to demonstrate the graphic elements";
document += " of a document or visual presentation. Replacing meaningful content that could be distracting with placeholder text";
document += " may allow viewers to focus on graphic aspects such as font, typography, and page layout. It also reduces the need";
document += " for the designer to come up with meaningful text, as they can instead use hastily generated lorem ipsum text. The";
document += " lorem ipsum text is typically a scrambled section of De finibus bonorum et malorum, a 1st-century BC Latin text by";
document += " Cicero, with words altered, added, and removed to make it nonsensical, improper Latin. A variation of the ordinary";
document += " lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements";
document += " for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s by Aldus Corporation, which";
document += " employed it in graphics and word processing templates for its desktop publishing program, PageMaker, for the Apple";
document += " Macintosh. A common form of lorem ipsum reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do";
document += " eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";
document += " ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit";
document += " esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui";
document += " officia deserunt mollit anim id est laborum.";
if name == "main":

doTestsPass()
```

##

**Largest Tree**

\*\*\*\*

```python
"""
**  Instructions:
**
**  Given a forest ( one or more disconnected trees ), find the root of largest tree
**  and return its Id. If there are multiple such roots, return the smallest Id of them.
**
**  Complete the largestTree function in the editor below.
**  It has one parameter, immediateParent, which is a map containing key-value pair indicating
**  child -> parent relationship. The key is child and value is the corresponding
**  immediate parent.
**  Constraints
**    - Child cannot have more than one immediate parent.
**    - Parent can have more than one immediate child.
**    - The given key-value pair forms a well-formed forest ( a tree of n nodes will have n-1 edges )
**
**  Example:
**
**  Input:
**  { { 1 -> 2 }, { 3 -> 4} }
**
**  Expected output: 2
**  Explanation: There are two trees one having root of Id 2 and another having root of Id 4.
**  Both trees have size 2. The smaller number of 2 and 4 is 2. Hence the answer is 2.
"""
def getTreeSize(parentToChild, rootIndex):
result = 0
stack = []
stack.append(rootIndex)
while(len(stack)>0):
index = stack.pop()
result = result + 1
if index in parentToChild:
for childIndex in parentToChild[index]:
stack.append(childIndex)
return result
""" Find the largest tree. """
def largestTree(immediateParent):
maxTreeSize = 0
minRootId = 0
rootIndexes = []
parentToChild = dict()
for childIndex, parentIndex in immediateParent.items():
parentToChild.setdefault(parentIndex, []).append(childIndex)
if not parentIndex in immediateParent:
rootIndexes.append(parentIndex)
for rootIndex in rootIndexes:
treeSize = getTreeSize(parentToChild, rootIndex)
if treeSize > maxTreeSize:
maxTreeSize = treeSize
minRootId = rootIndex
elif treeSize == maxTreeSize:
minRootId = min (minRootId, rootIndex)
return minRootId

def doTestsPass():
""" Returns true if the tests pass. Otherwise, returns false """
testCases = [
    # example
    (dict({1:2, 3:4}),
     2),

    # More than two trees
    (dict({2:3, 7:8, 12:15, 3:1, 13:15, 11:15, 9:8, 5:12}),
     15),

    # really large index values
    (dict({
      200000000:300000000,
      500000000:200000000,
      700000000:300000000,
      600000000:700000000,
      900000000:400000000,
      100000000:400000000,
      800000000:400000000,
      1000000000:400000000}),
     300000000),

   # two trees of same size
   ( dict( {
     9:4, 1:4, 5:2, 8:4, 7:3, 2:3, 6:7, 10:4
   } ), 3 ),

   # tree sizes differ by one
   ( dict( {
     35:33, 33:28, 31:22, 28:25, 34:31, 29:27, 21:23, 25:21, 22:29
   } ), 23 ),
]

passed = True
for tc, expected in testCases:
    actual = largestTree(tc)
    if actual != expected:
        passed = False
        print(&quot;Failed for case &quot;, tc, &quot;\n  expected &quot;, expected, &quot;, actual &quot;, actual)

return passed

if name == "main":
result = doTestsPass()
if result:
    print(&quot;All tests pass\n&quot;);
else:
    print(&quot;Tests fail\n&quot;);</code></pre></td>

```

##

**Longest Word**

\*\*\*\*

```python
"""
Instructions to candidate.
 1) Given a a string of letters and a dictionary, the function longestWord should
    find the longest word or words in the dictionary that can be made from the letters
    Input: letters = "oet", dictionary = {"to","toe","toes"}
    Output: {"toe"}
    Only lowercase letters will occur in the dictionary and the letters
    The length of letters will be between 1 and 10 characters
    The solution should work well for a dictionary of over 100,000 words
 2) Run this code in the REPL to observe its behaviour. The
    execution entry point is main.
 3) Consider adding some additional tests in doTestsPass().
 4) Implement the longestWord() method correctly.
 5) If time permits, introduce '?' which can represent any letter.  "to?" could match to "toe", "ton" etc
"""
class Dictionary:
# Pre-process dictionary so we have list of dictionary entries stored against a sorted string
# e.g. "dgo"-> {"dog", "god"}
def init(self, entries):
self.sortedLetters2Words = {}
for word in entries:
sortedLetters = ''.join(sorted(word))
self.sortedLetters2Words.setdefault(sortedLetters, [])
self.sortedLetters2Words[sortedLetters].append(word)
def getEntriesForSortedLetters(self, sortedLetters):
    return self.sortedLetters2Words.get(sortedLetters, None);

For each string in set return a new set with all possibilities with 1 char dropped from lettersCombinations
def combinationsDroppingOneLetter(letterCombinations):
oneLetterLessSet = set()
for letters in letterCombinations:
if (len(letters) > 1):
for i in range(len(letters)):
oneLetterLessSet.add(letters[0:i] + letters[i+1:])
return oneLetterLessSet
def longestWord(letters, dictionary):
# To support ? wild card could expand all possibilites here.  A better solution would be Tree/Trie based
# Set with one entry of letters sorted
considerLettersSet = {''.join(sorted(letters))}
while len(considerLettersSet) > 0:
# Get list of words in dictionary that match any of the set of sorted letters
allFoundInDict = [dictionary.getEntriesForSortedLetters(item) for item in considerLettersSet]
allFoundInDict = [word for sublist in allFoundInDict if sublist for word in sublist]
if (len(allFoundInDict)>0):
return allFoundInDict
#Next time round loop will consider combinations of sorted letters with one less character
considerLettersSet = combinationsDroppingOneLetter(considerLettersSet)
return []
words = ('to', 'toe', 'toes', 'doe', 'dog', 'god', 'dogs', 'book', 'banana')
dictionary = Dictionary(words)
def doTestsPass():
result = {'ab', 'bc', 'ac'} == combinationsDroppingOneLetter({'abc'})
result = result and {'ab', 'bb'} == combinationsDroppingOneLetter({'abb'})
result = result and {'a', 'b'} == combinationsDroppingOneLetter({'ab','bb'})
result = result and set() == combinationsDroppingOneLetter({'a','b'})
result = result and set() == combinationsDroppingOneLetter({})
result = result and [&#39;toe&#39;] == longestWord(&#39;toe&#39;, dictionary)
result = result and {&#39;toes&#39;,&#39;dogs&#39;} == set(longestWord(&#39;osetdg&#39;, dictionary))
result = result and {&quot;doe&quot;,&#39;toe&#39;,&#39;dog&#39;,&#39;god&#39;} == set(longestWord(&#39;oetdg&#39;, dictionary))
result = result and [&#39;book&#39;] == longestWord(&#39;obokt&#39;, dictionary)
result = result and [&#39;banana&#39;] == longestWord(&#39;nanabaook&#39;, dictionary)
result = result and [] == longestWord(&#39;a&#39;, dictionary)

if(result):
    print(&#39;All tests pass&#39;)
else:
    print(&#39;There are test failures&#39;)

if name == "main":

doTestsPass()
```

##

**Optimal Path**

\*\*\*\*

```python
"""
 1) You are an avid rock collector who lives in southern California. Some rare
     and desirable rocks just became available in New York, so you are planning
     a cross-country road trip. There are several other rare rocks that you could
     pick up along the way.
 You have been given a grid filled with numbers, representing the number of
 rare rocks available in various cities across the country.  Your objective
 is to find the optimal path from So_Cal to New_York that would allow you to
 accumulate the most rocks along the way.

 Note: You can only travel either north (up) or east (right).


Consider adding some additional tests in doTestsPass().
Implement optimalPath() correctly.
Here is an example:
^
[[0,0,0,0,5], New_York (finish)           N
[0,1,1,1,0],                         < W   E >
So_Cal (start) [2,0,0,0,0]]                             S
v
The total for this example would be 10 (2+0+1+1+1+0+5).
"""

def optimal_path(grid):
if len(grid) == 0 or len(grid[0]) == 0:
return 0
for row in range(len(grid)-1, -1, -1):
for col in range(0, len(grid[0])):
if row < len(grid)-1 and col > 0:
grid[row][col] += max(grid[row+1][col], grid[row][col-1])
elif row < len(grid)-1:
grid[row][col] += grid[row+1][col]
elif col > 0:
grid[row][col] += grid[row][col-1]
result = grid[0][len(grid[0])-1]
print(result)
return result
def do_tests_pass():
""" Returns True if all tests pass. Otherwise returns False. """
test_inputs = [# Base test case
[[0, 0, 0, 0, 5],
[0, 1, 1, 1, 0],
[2, 0, 0, 0, 0]],
# Random numbers
[[1, 3, 2, 0, 2, 1, 8],
[3, 4, 1, 2, 0, 1, 1],
[1, 1, 1, 2, 3, 2, 1],
[1, 0, 1, 1, 4, 2, 1]],
# All 0's
[[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0]],
# Many optimal paths
[[1, 1, 1, 1, 1],
[1, 0, 1, 0, 1],
[1, 0, 1, 0, 1],
[1, 1, 1, 1, 1]],
# Empty grid
[[]]]
test_answers = [10, 25, 0, 8, 0]
for test_input, test_answer in zip(test_inputs, test_answers):
    if optimal_path(test_input) != test_answer:
        return False

return True

if name == "main":

if do_tests_pass():

print("All tests pass")

else:

print("Not all tests pass")
```

##

**Snow Pack**

\*\*\*\*

```python
"""
 Instructions to candidate.
  1) Given an array of non-negative integers representing the elevations
     from the vertical cross section of a range of hills, determine how
     many units of snow could be captured between the hills.
 See the example array and elevation map below.
                             ___
         ___                |   |        ___
        |   |        ___    |   |___    |   |
     ___|   |    ___|   |   |   |   |   |   |
 ___|___|___|___|___|___|___|___|___|___|___|___
 [0,  1,  3,  0,  1,  2,  0,  4,  2,  0,  3,  0]
                             ___
         ___                |   |        ___
        |   | *   *  _*_  * |   |_*_  * |   |
     ___|   | *  _*_|   | * |   |   | * |   |
 ___|___|___|_*_|___|___|_*_|___|___|_*_|___|___
 [0,  1,  3,  0,  1,  2,  0,  4,  2,  0,  3,  0]

 Solution: In this example 13 units of snow (*) could be captured.


Consider adding some additional tests in doTestsPass().
Implement computeSnowpack() correctly.
"""

def computeSnowpack(arr):
# Check for empty array
if(len(arr) == 0):
return 0;
total = 0
left_highest = [0 for i in range(len(arr))]
left_max = 0
for i in range(len(arr)):
    if arr[i] &gt; left_max:
        left_max = arr[i]
    left_highest[i] = left_max

right_max = 0
for i in reversed(range(len(arr))):
    if arr[i] &gt; right_max:
        right_max = arr[i]
    if min(right_max, left_highest[i]) &gt; arr[i]:
        total += min(right_max, left_highest[i]) - arr[i]
print(arr, total)
return total

def doTestsPass():
""" Returns True if all tests pass. Otherwise returns False. """
tests = [[[0,1,3,0,1,2,0,4,2,0,3,0], 13],
[[1,0,0,0,0,0,0,0,0,0,0,1], 10],
[[0,0,0,0,0], 0],
[[0,0,1,0,0], 0],
[[1], 0],
[[], 0]]
for test in tests:
    if not (computeSnowpack(test[0]) == test[1]):
        return False
return True

if name == "main":

if( doTestsPass() ):

print( "All tests pass" )

else:

print( "Not all tests pass" )
```

##

**Subarray exceeding sum**

\*\*\*\*

```python
1) Your task is ultimately to implement a function that takes in an array and a integer.
     You want to return the *LENGTH* of the shortest subarray whose sum is at least the integer,
     and -1 if no such sum exists.
  2) Run this code in the REPL to observe its behaviour. The
     execution entry point is main().
  3) Consider adding some additional tests in doTestsPass().
  4) Implement subArrayExceedsSum() correctly.
  5) If time permits, some possible follow-ups.
"""
def subArrayExceedsSum(arr, target):
i = j = 0
length = float('inf')
if target &lt;= 0:
    return 0
if len(arr) &lt; 1:
    return -1

currsum = arr[ 0 ]
while True:
    if currsum &gt;= target:
        if i == j:
            return 1
        else:
            length = min(length, j - i + 1)
            currsum -= arr[i]
            i = i + 1
    else:
        j = j + 1
        if j == len(arr):
            break
        else:
            currsum += arr[j]

return -1 if length == float(&#39;inf&#39;) else length

def doTestsPass():
""" Returns 1 if all tests pass. Otherwise returns 0. """
testArrays    = [[[ 1, 2, 3, 4 ], 6], [[1, 2 , 3, 4], 12], [[1, 2, 3, 4], 10], [[1, 2 , 3, 4], 4], [[], 1], [[], 0]]
testAnswers   = [2, -1, 4, 1, -1, 0]
for i in range( len( testArrays ) ):
    if not ( subArrayExceedsSum( testArrays[i][ 0 ], testArrays[i][ 1 ] ) == testAnswers[i] ):
        return False

return True

if name == "main":

if( doTestsPass() ):

print( "All tests pass" )

else:

print( "Not all tests pass" )
```

##

**Train Map**

\*\*\*\*

```python
/**
 *      Visual representation of the Train map used
 *
 *      King's Cross St Pancras --- Angel ---- Old Street
 *      |                   \                            |
 *      |                    \                            |
 *      |                     \                            |
 *      Russell Square         Farringdon --- Barbican --- Moorgate
 *      |                                                  /
 *      |                                                 /
 *      |                                                /
 *      Holborn --- Chancery Lane --- St Paul's --- Bank
 */
"""
from functools import reduce
from collections import deque
"""
/**


class Station



Respresents Station in the rail network. Each station is identified by


unique name. Station is connected with other stations - this information


is stored in the 'neighbours' field. Two station objects with the same name are


equal therefore they are considered to be same station.
*/
"""
class Station:
def init(self, name):
self._name = name
self._neighbours = []
def getName(self):
return self._name
def addNeighbour(self, station):
self._neighbours.append(station)
def getNeighbours(self):
return self._neighbours
def eq(self, other):
return isinstance(other, Station) and self._name == other.getName()
def hash(self):
return hash((self._name))


"""
/**


class TrainMap



Respresents whole rail network - consists of number of the Station objects.


Stations in the map are bi-directionally connected. Distance between any 2 stations


is of same constant distance unit. This implies that shortest distance between any


2 stations depends only on number of stations in between
*/
"""
class TrainMap:
def init(self):
self._stations = {}
def addStation(self, stationName):
self._stations[stationName] = Station(stationName)
return self
def getStation(self, stationName):
return self._stations[stationName]
def connectStations(self, fromStation, toStation):
fromStation.addNeighbour(toStation)
toStation.addNeighbour(fromStation)
return self
def convertPathToString(self, path):
if(len(path) == 0):
return ""
else:
return reduce(lambda s1, s2: s1 + "->" + s2, map(lambda station: station.getName(), path))
def shortestPath(self, fromStationName, toStationName):
fromStation = self.getStation(fromStationName)
toStation = self.getStation(toStationName)
searchSpace = deque()
parentOfNode = {}
visited = set()
searchSpace.append(fromStation)

while(len(searchSpace) != 0):
    curr = searchSpace.popleft()
    if(curr not in visited):
        visited.add(curr)
        if(curr == toStation):
            break
        else:
            for neighbour in curr.getNeighbours():
                searchSpace.append(neighbour)
                if (neighbour not in parentOfNode):
                    parentOfNode[neighbour] = curr

parent = parentOfNode[toStation]
path = [toStation, parent]
while(parent != fromStation):
    parent = parentOfNode[parent]
    path.append(parent)
path.reverse()
return path



def doTestsPass():
# todo: implement more tests, please
# feel free to make testing more elegant
trainMap = TrainMap()
trainMap.addStation("King's Cross St Pancras").addStation("Angel").addStation("Old Street").addStation("Moorgate")
.addStation("Farringdon").addStation("Barbican").addStation("Russel Square").addStation("Holborn")
.addStation("Chancery Lane").addStation("St Paul's").addStation("Bank")
trainMap.connectStations(trainMap.getStation(&quot;King&#39;s Cross St Pancras&quot;), trainMap.getStation(&quot;Angel&quot;))\
.connectStations(trainMap.getStation(&quot;King&#39;s Cross St Pancras&quot;), trainMap.getStation(&quot;Farringdon&quot;))\
.connectStations(trainMap.getStation(&quot;King&#39;s Cross St Pancras&quot;), trainMap.getStation(&quot;Russel Square&quot;))\
.connectStations(trainMap.getStation(&quot;Russel Square&quot;), trainMap.getStation(&quot;Holborn&quot;))\
.connectStations(trainMap.getStation(&quot;Holborn&quot;), trainMap.getStation(&quot;Chancery Lane&quot;))\
.connectStations(trainMap.getStation(&quot;Chancery Lane&quot;), trainMap.getStation(&quot;St Paul&#39;s&quot;))\
.connectStations(trainMap.getStation(&quot;St Paul&#39;s&quot;), trainMap.getStation(&quot;Bank&quot;))\
.connectStations(trainMap.getStation(&quot;Angel&quot;), trainMap.getStation(&quot;Old Street&quot;))\
.connectStations(trainMap.getStation(&quot;Old Street&quot;), trainMap.getStation(&quot;Moorgate&quot;))\
.connectStations(trainMap.getStation(&quot;Moorgate&quot;), trainMap.getStation(&quot;Bank&quot;))\
.connectStations(trainMap.getStation(&quot;Farringdon&quot;), trainMap.getStation(&quot;Barbican&quot;))\
.connectStations(trainMap.getStation(&quot;Barbican&quot;), trainMap.getStation(&quot;Moorgate&quot;))

solution = &quot;King&#39;s Cross St Pancras-&gt;Russel Square-&gt;Holborn-&gt;Chancery Lane-&gt;St Paul&#39;s&quot;
return solution == trainMap.convertPathToString(trainMap.shortestPath(&quot;King&#39;s Cross St Pancras&quot;, &quot;St Paul&#39;s&quot;))

if name == "main":

if(doTestsPass()):

print("All Tests Pass")

else:

print("Some tests fail")
```

##

\*\*\*\*

```python
<========================================()===========================================>

```

## Hard

**HashMap**

\*\*\*\*

```python
/**
 * class MyHashMap
 *
 * Associates a key-value pair in memory such that lookups
 * and inserts can be performed in O(1) time for a reasonably
 * small set of data, and scales linearly (at worst) for larger
 * sets of key-value pairs.
 *
 * Each unique key is associated with one single value.
 */
"""
"""
/**

Instructions to candidate.


Run this code in the REPL to observe its behaviour. The



execution entry point is main().




Consider adding some additional tests in doTestsPass().




Implement MyHashMap correctly.




If time permits, some possible follow-ups.
*/



/**

class MyHashMap

Associates a key-value pair in memory such that lookups
and inserts can be performed in O(1) time for a reasonably
small set of data, and scales linearly (at worst) for larger
sets of key-value pairs.

Each unique key is associated with one single value.
*/

"""
class Hashmap:
buckets = []
def init(self):
# poulate the buckets, start with an initial size of 10
for i in range(10):
self.buckets.append([])
def put(self, key, val):
    hashIdx = hash(key) % len(self.buckets)
    bucket = self.buckets[hashIdx]

    for i, b in enumerate(bucket):
        if b[0] == key:
            bucket[i] = (key, val)
            return None

    bucket.append((key, val))

def get(self, key):
    hashIdx = hash(key) % len(self.buckets)
    bucket = self.buckets[hashIdx]

    for i, b in enumerate(bucket):
        if b[0] == key:
            return b[1]

def doTestsPass():
intList = [(1,2), (3,4), (5,6), (1,8)]
strList = [("one", "two"), ("three", "four"), ("one", "five")]
passed = True

intMap = Hashmap()
for key, value in intList:
    intMap.put(key, value)

    if intMap.get(key) != value:
        passed = False
        print(&quot;Test case failed [&quot;, key, &quot;,&quot;, value, &quot;]&quot;)

strMap = Hashmap()
for key, value in strList:
    strMap.put(key, value)

    if strMap.get(key) != value:
        passed = False
        print(&quot;Test case failed [&quot;, key, &quot;,&quot;, value, &quot;]&quot;)

if (passed):
    print(&quot;All tests passed.&quot;)

if name == "main":

doTestsPass()
```

##

**KnightProbability**

\*\*\*\*

```python
Given an empty chessboard (8x8 grid), a knight is placed
 on one of the squares. The knight 'K' at position (3, 3)
 and it's possible movements 'X' are shown in the example
 below:
* * * * * * * *
* * X * X * * *
* X * * * X * *
* * * K * * * *
* X * * * X * *
* * X * X * * *
* * * * * * * *
* * * * * * * *

Depending on the knight's position on the board, 0-6 of
the 8 possible movements may cause the knight to leave
the chess board.
If the knight moves n times, each time choosing one of
the 8 possible moves uniformly at random, determine the
probability that the knight is still on the board after
making n random moves. After the knight has left the
board, it may not reenter.
Please implement the method probability which given a
start position x, y, and a number of moves n,
returns the probability a knight remains on the board
as described above.
"""
def probability(x, y, n):
board_size = 8
#Define an 8x8 grid
board = [[0.0 for r in range(board_size)] for r in range(board_size)]
#Set the starting position
board[x][y] = 1.0
for i in range(n):
next_board = [[0.0 for r in range(board_size)] for r in range(board_size)]
#Fill in probabilties for every square on the previous board
for current_x in range(board_size):
for current_y in range(board_size):
#Check all the board positions that could have lead here
for move in [(-2, -1), (-2, 1), (2, -1), (2, 1),
(-1, -2), (-1, 2), (1, -2), (1, 2)]:
previous_x = current_x + move[0]
previous_y = current_y + move[1]
if 0 <= previous_x < board_size and 0 <= previous_y < board_size:
#Probability of getting to x, y is 1/8 * probability it was on previous square
if board[previous_x][previous_y] > 0:
next_board[current_x][current_y] += board[previous_x][previous_y] / 8
board = next_board
#Returns sum of all probabilities on the board
return sum(sum(s) for s in board)
def do_tests_pass():
#Returns True if the tests pass. Otherwise, returns False
test_cases = {
#Start in a corner, no moves
(0, 0, 0): 1.0,
#Start in the middle, one move
(3, 3, 1): 1.0,
#Start in a corner, one move
(0, 0, 1): 0.25,
(0, 0, 2): 0.1875,
(1, 2, 10): 0.0522148497402668,
}
#todo: feel free to enhance or add more test cases
for case, expected in test_cases.items():
if probability(case[0], case[1], case[2]) != expected:
return False
return True
if name == "main":

if do_tests_pass():

print("All tests pass")

else:

print("Tests fail")
```

##

**Lowest Price**

\*\*\*\*

```python
Question:
A popular online retailer allows vendors to specify different prices in advance
for the same item throughout the day. We now need to design an algorithm that
helps identify the lowest price for the item at any point of the day.
Assumptions:


For the algorithm, assume all vendors are selling the same product
and there is only one product being sold. Given a list that has
vendor information - ( start_time, end_time, price ) of the deal,
return a sorted list with different possible intervals and
the least price of the product during the interval.


The interval is inclusive of start and end time.


All the 3 values passed by the vendor are integers.
"""


from collections import namedtuple
Interval = namedtuple( "Interval", "start_time end_time price" )
Class to store node level data in the binary search tree
class Node( object ):
def init( self, data ):
self.data = data
self.left = self.right = None  # left and right pointers
Binary Search Tree implementation
class BinarySearchTree( object ):
def init( self ):
self._root = None
self._sorted_intervals = []
# Actual function to insert node into the tree
def _insert( self, node, interval ):
    # Excess to the left - trim and push
    if interval.start_time &lt; node.data.start_time:
        new_interval = Interval( interval.start_time,
                                 min( interval.end_time, node.data.start_time ),
                                 interval.price )
        if node.left:
            self._insert( node.left, new_interval )
        else:
            node.left = Node( new_interval )

    # Excess to the right - trim and push
    if interval.end_time &gt; node.data.end_time:
        new_interval = Interval( max( interval.start_time, node.data.end_time ),
                                 interval.end_time,
                                 interval.price )
        if node.right:
            self._insert( node.right, new_interval )
        else:
            node.right = Node( new_interval )

# Actual recursive function to do inorder traversal
def _inorder( self, node ):
    if not node:
        return()

    if node.left:
        self._inorder( node.left )
    self._sorted_intervals.append( node.data )
    if node.right:
        self._inorder( node.right )

# Public function to insert node into the tree
def add_to_node( self, interval ):
    if not self._root:
        self._root = Node( interval )
    else:
        self._insert( self._root, interval )

# Public function to return all non-overlapping intervals (sorted on start )
def start_inorder( self ):
    self._sorted_intervals = []
    self._inorder( self._root )
    return( self._sorted_intervals )

def get_lowest_prices( input_intervals ):
if not input_intervals:
raise Exception( "input_intervals has 0 elements" )
for each_interval in input_intervals:
    if not each_interval:
        raise Exception( &quot;input_intervals has a Null element&quot; )
    if each_interval.start_time &gt;= each_interval.end_time:
        raise Exception( &quot;start_time greater than or equal to end_time for an interval&quot; )
    if each_interval.start_time &lt; 0 or each_interval.end_time &lt; 0 or each_interval.price &lt; 0:
        raise Exception( &quot;vendor information has negative values&quot; )

input_intervals = sorted( input_intervals, key = lambda x: x.price )
bst = BinarySearchTree()
for each_interval in input_intervals:
    bst.add_to_node( each_interval )

return( bst.start_inorder() )

"""
Prints Success if all tests pass. Otherwise returns Failure.
TODO: implement some tests. We've included a trivial boilerplate
Additional Test Cases:
Input : ( 1, 20 13 ), ( 7, 10, 8 ), ( 3, 8, 15 ), ( 1, 5, 20 )
Output: ( 1, 7, 13 ), ( 7, 10, 8 ), ( 10, 20, 13 )
Input : ( 7, 10, 8 ), ( 3, 8, 15 ), ( 1, 5, 20 ), ( 1, 20, 4 )
Output: ( 1, 20, 4 )
Input : ( 3, 6, 2 ), ( 1, 9, 3 ), ( 5, 8, 1 )
Output: ( 1, 3, 3 ), ( 3, 5, 2 ), ( 5, 8, 1 ), ( 8, 9, 3 )
"""
def do_tests_pass():
input_intervals = [ Interval( 1, 5, 20 ), Interval( 3, 8, 15 ), Interval( 7, 10, 8 ) ]
expected_output = [ Interval( 1, 3, 20 ), Interval( 3, 7, 15 ), Interval( 7, 10, 8 ) ]
output_intervals = get_lowest_prices( input_intervals )

if output_intervals == expected_output:
    print( &quot;All tests passed&quot; )
else:
    print( &quot;Tests failed&quot; )

if name == "main":

do_tests_pass()
```

##

**Prefix Search**

\*\*\*\*

```python
class MyTrie:
    def __init__(self, char):
        self.char = char
        self.nodes = {}
        self.data = []
def add(self, word, loc):
    if self.char is not None:
        self.data.append(loc);
    if len(word) &gt; 0:
        c = word[0]
        if c not in self.nodes:
            self.nodes[c] = MyTrie(c)
        node = self.nodes[c]
        node.add(word[1:], loc)

def get(self, prefix):
    if len(prefix) == 0:
        ret = self.data
    else:
        c = prefix[0]
        if c in self.nodes:
            ret =  self.nodes[c].get(prefix[1:])
        else:
            ret =  []
    return ret

def pprint(self, level=0):
    print(&#39;-&#39; * level + str(self.char))
    for c, node in self.nodes.items():
        node.pprint(level+1)

class MyPrefixSearch:
"""
Note: Any indexed solution should be more performant on repeat calls.
Trade-offs arise on how to store the index efficiently while maintaining fast lookup.
This solution is indexed using a trie, which is also space efficient for certain use cases.
For a light discussion on tries and other alternative implementations see:
https://www.toptal.com/java/the-trie-a-neglected-data-structure
"""
def init(self, document):
self.index = MyTrie(None)
self.build_index(document)
def build_index(self, document):
    words = document.lower().split();
    loc = 0
    for word in words:
        clean = &#39;&#39;.join(ch for ch in word if ch.isalnum())
        self.index.add(clean, loc)
        loc += len(word) + 1
    #self.index.pprint()

def find_all(self, prefix):
    return self.index.get(prefix)

###########  Tests  ###########
DOCUMENT = ("In publishing and graphic design, lorem ipsum is a "
"filler text commonly used to demonstrate the graphic elements of a "
"document or visual presentation. Replacing meaningful content that "
"could be distracting with placeholder text may allow viewers to focus "
"on graphic aspects such as font, typography, and page layout. It also "
"reduces the need for the designer to come up with meaningful text, as "
"they can instead use hastily generated lorem ipsum text. The lorem "
"ipsum text is typically a scrambled section of De finibus bonorum et "
"malorum, a 1st-century BC Latin text by Cicero, with words altered, "
"added, and removed to make it nonsensical, improper Latin. A variation "
"of the ordinary lorem ipsum text has been used in typesetting since "
"the 1960s or earlier, when it was popularized by advertisements for "
"Letraset transfer sheets. It was introduced to the Information Age in "
"the mid-1980s by Aldus Corporation, which employed it in graphics and "
"word processing templates for its desktop publishing program, "
"PageMaker, for the Apple Macintosh. A common form of lorem ipsum "
"reads: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do "
"eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad "
"minim veniam, quis nostrud exercitation ullamco laboris nisi ut "
"aliquip ex ea commodo consequat. Duis aute irure dolor in "
"reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla "
"pariatur. Excepteur sint occaecat cupidatat non proident, sunt in "
"culpa qui officia deserunt mollit anim id est laborum.")
"""
Validate that the prefix search returns the correct results for the sample document.
"""
def do_tests_pass():
prefix_search = MyPrefixSearch(DOCUMENT);
if (prefix_search.find_all(&quot;demonstrate&quot;)  == [ 80 ]
  and prefix_search.find_all(&quot;pub&quot;)        == [ 3, 988 ]
  and prefix_search.find_all(&quot;publishing&quot;) == [ 3, 988 ]
  and prefix_search.find_all(&quot;lab&quot;)     == [ 1173, 1263, 1517 ]
  and prefix_search.find_all(&quot;laborum&quot;) == [ 1517 ]
  and prefix_search.find_all(&quot;in&quot;) == [ 0, 404, 717, 839, 857, 873, 930, 1159, 1334, 1351, 1468]
  and prefix_search.find_all(&quot;lor&quot;)== [ 34, 434, 456, 686, 1061, 1080 ]
  and prefix_search.find_all(&quot;l&quot;)  == [ 34, 309, 434, 456, 557, 651, 686, 806, 1061, 1080, 1173, 1263, 1517]
  and prefix_search.find_all(&quot;hamburger&quot;)   == []
  and prefix_search.find_all(&quot;&quot;)   == []):
    print(&quot;All Tests Pass&quot;)
else:
    print(&quot;Test Fails&quot;)

if name == "main":

do_tests_pass()
```

##

**Sort Segments**

\*\*\*\*

```python
import unittest
from collections import deque
from random import shuffle
def sort_segments(segments):
"""
Given a jumbled collection of segments, each of which is represented as
a tuple (start_point, end_point), this function sorts the segments to
make a continuous path.
A few assumptions you can make:
1. Each particular segment goes in one direction only, i.e.: if you
   see (1, 2), you will not see (2, 1).
2. Each starting point only have one way to the end point, i.e.: if
   you see (6, 5), you will not see (6, 10), (6, 3), etc.

&gt;&gt;&gt; jumbled_segments = [(4, 5), (9, 4), (5, 1), (11, 9)]
&gt;&gt;&gt; continuous_path = sort_segments(jumbled_segments)
&gt;&gt;&gt; print(continuous_path)
[(11, 9), (9, 4), (4, 5), (5, 1)]

Args:
    segments: collection of segments, each represented by a tuple (m, n).

Returns:
    The sorted segments such that they form a continuous path.

Raises:
    ValueError: if there is no way to create one continuous path from all
    the segments passed into this function.
&quot;&quot;&quot;

# naive solution - will fail the complexity test before 10000 segments
# if not segments:
#     return []
#
# # make defensive shallow copy of the list
# copied_segments = list(segments)
#
# sorted_segments = deque()
# sorted_segments.append(copied_segments.pop(0))
#
# while len(copied_segments):
#     seg_size = len(copied_segments)
#     for i in range(seg_size - 1, -1, -1):
#         start_point = sorted_segments[0]
#         end_point = sorted_segments[-1]
#         segment = copied_segments[i]
#         if start_point[0] == segment[1]:
#             sorted_segments.appendleft(segment)
#             del copied_segments[i]
#         elif end_point[1] == segment[0]:
#             sorted_segments.append(segment)
#             del copied_segments[i]
#     if seg_size == len(copied_segments):
#         raise ValueError(&quot;Could not use all segments to form a continuous path&quot;)
#
# return list(sorted_segments)

# much faster solution - can pass complexity test with 1 million segments
if not segments:
    return []

start_dict = {segment[0]: segment for segment in segments}
end_dict = {segment[1]: segment for segment in segments}
sorted_segments = deque()

segment = segments[0]
sorted_segments.append(segment)
start_point = segment[0]
end_point = segment[1]

while True:
    next_segment = start_dict.get(end_point)
    if next_segment:
        sorted_segments.append(next_segment)
    prev_segment = end_dict.get(start_point)
    if prev_segment:
        sorted_segments.appendleft(prev_segment)
    if not next_segment and not prev_segment:
        break
    start_point = sorted_segments[0][0]
    end_point = sorted_segments[-1][1]

if len(segments) != len(sorted_segments):
    raise ValueError(&quot;Could not use all segments to form a continuous path&quot;)

return list(sorted_segments)

def generate_random_segments(n):
points = list(range(n + 1))
shuffle(points)
segments = [pair for pair in zip(points[:-1], points[1:])]
continuous_segments = list(segments)
shuffle(segments)
return continuous_segments, segments
class TestSortSegments(unittest.TestCase):
def test_basic_sort(self):
jumbled_segments = [(4, 5), (9, 4), (5, 1), (11, 9)]
continuous_path = sort_segments(jumbled_segments)
self.assertEqual(continuous_path, [(11, 9), (9, 4), (4, 5), (5, 1)])
def test_sort_complexity(self):
    from time import process_time
    continuous_segs, jumbled_segments = generate_random_segments(1000000)
    start = process_time()
    sorted_segs = sort_segments(jumbled_segments)
    sort_time = process_time() - start
    self.assertEqual(continuous_segs, sorted_segs)
    # without CoderPad support for timeout, we have to resort to
    # picking a timeout value that probably will be enough for
    # a fast algorithm, but not too large that a slow algorithm
    # can complete anyway within the time limit.
    self.assertLessEqual(sort_time, 2)

def test_empty(self):
    empty_segments = []
    continuous_path = sort_segments(empty_segments)
    self.assertEqual(continuous_path, [])

def test_none(self):
    continuous_path = sort_segments(None)
    self.assertEqual(continuous_path, [])

def test_missing_segment(self):
    missing_segments = [(1, 2), (2, 3), (4, 5), (5, 6)]
    self.assertRaises(ValueError, sort_segments, missing_segments)

def test_duplicate(self):
    duplicate_segments = [(1, 2), (2, 3), (1, 2)]
    self.assertRaises(ValueError, sort_segments, duplicate_segments)

unittest.main(exit=False)
```

## **END**

≡
