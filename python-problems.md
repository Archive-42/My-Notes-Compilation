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

```

## 

**Power**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Prime Fatrorization**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Reverse String**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Reverse String Bug**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Run Length Encoding**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Search Tree**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Second Smallest**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Smallest in Rotated Array**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Square Root**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Unique Tuples**

\*\*\*\*

\*\*\*\*

```python

```

## 

**Walking Robot**

\*\*\*\*

\*\*\*\*

```python

```



```python
<========================================()===========================================>
```

## Medium

**Best Average Grade**

\*\*\*\*

```python

```



## 

**Decimal Conversion**

\*\*\*\*

```python

```



## 

**Distance between strings**

\*\*\*\*

```python

```



## 

**Largest Tree**

\*\*\*\*

```python

```



## 

**Longest Word**

\*\*\*\*

```python

```



## 

**Optimal Path**

\*\*\*\*

```python

```



## 

**Snow Pack**

\*\*\*\*

```python

```



## 

**Subarray exceeding sum**

\*\*\*\*

```python

```



## 

**Train Map**

\*\*\*\*

```python

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

```



## 

**KnightProbability**

\*\*\*\*

```python

```



## 

**Lowest Price**

\*\*\*\*

```python

```



## 

**Prefix Search**

\*\*\*\*

```python

```



## 

**Sort Segments**

\*\*\*\*

```python

```



## **END**

≡



