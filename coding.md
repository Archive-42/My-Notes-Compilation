### 1 You are given a two-digit integer n. Return the sum of its digits.

Example

For n = 29, the output should be addTwoDigits(n) = 11.

Input/Output

\[execution time limit\] 4 seconds (py3)

\[input\] integer n

A positive two-digit integer.

Guaranteed constraints: 10 ≤ n ≤ 99.

\[output\] integer

The sum of the first and second digits of the input number.

---

### 2 Implement a function to calculate the average distance between three points in a single plane where the coordinates of these points are (x1, y1), (x2, y2), and (x3, y3).

Note: your answer will be considered correct if its absolute or relative error doesn’t exceed 10-5.

Example

For x1 = 1, y1 = 2, x2 = 3, y2 = 4, x3 = 5, and y3 = 6, the output should be averagePlaneDistance(x1, y1, x2, y2, x3, y3) = 3.771236.

\[input\] float x1, y1, x2, y2, x3, y3

\[output\] float

The average distance between the three given points.

---

### 3 A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward.

For instance: kayak or rotator.

Implement a boolean function called isAlmostPalindrome(word) which returns true either if the word is a palindrome or if modifying just one character could make the word to be a palindrome; otherwise it will return false (when two or more characters must be changed to make the word as a palindrome).

For this exercise, it is assumed that all the characters of the word will be received in lower case. It is not required to make any check on the case (upper/lower).

Example:

<table><thead><tr class="header"><th>word</th><th style="text-align: center;">isAlmostPalindrome()</th><th>Further info</th></tr></thead><tbody><tr class="odd"><td>abccba</td><td style="text-align: center;">true</td><td>is already one</td></tr><tr class="even"><td>abccbx</td><td style="text-align: center;">true</td><td>palindrom after modifying x to a</td></tr><tr class="odd"><td>abccfg</td><td style="text-align: center;">false</td><td>no way to obtain palindrome modifying one char</td></tr></tbody></table>

Input/Output

\[input\] string word

A string consisting of lowercase English letters, which should be checked to be an almost palindrome.

Guaranteed constraints: 1 ≤ word.length ≤ 106.

\[output\] boolean

Whether the string word is an almost palindrome.

---

### 4 Implement a function that receives an array of positive integers numbers with values between 1 and 5000 and returns the number that most frequently appears in the array.

If there are two or more numbers that appear the same number of times, the function should return the lowest number that appears most.

Example

For numbers = \[34, 31, 34, 77, 82\], the output should be mostPopularNumber(numbers) = 34. Number 34 appears two times when the rest numbers appear only once.

For numbers = \[22, 101, 102, 101, 102, 525, 88\], the output should be mostPopularNumber(numbers) = 101. Both 101 and 102 appear two times, but 101 is lower than 102.

Input/Output

\[execution time limit\] 4 seconds (py3)

\[input\] array.integer numbers

Guaranteed constraints: 1 ≤ numbers.length ≤ 105, 1 ≤ numbers\[i\] ≤ 5000.

\[output\] integer

The lowest number that appears the most.

---

### 5 You are really interested in statistics, and your new project is to gather some information about the users of a big social network.

More specifically, you want to know which countries these users are from. Using the social network’s API, you managed to collect enough data to compose two tables users and cities, which have the following structures:

users: id: the unique user ID; city: the name of the city where this user lives; cities: city: a unique city name; country: the name of the country where this city is located. Given the tables users and cities, write a select statement that returns two columns id and country consisting of user ids and the countries where they live respectively. If a user’s city is missing from the cities table, the country column should contain “unknown” instead.

Return the table sorted by users’ ids.

Example

For the following table users

<table><thead><tr class="header"><th>id</th><th>city</th></tr></thead><tbody><tr class="odd"><td>1</td><td>San Francisco</td></tr><tr class="even"><td>2</td><td>Moscow</td></tr><tr class="odd"><td>3</td><td>London</td></tr></tbody></table>

and the following table cities

<table><thead><tr class="header"><th>city</th><th>country</th></tr></thead><tbody><tr class="odd"><td>Moscow</td><td>Russia</td></tr><tr class="even"><td>Saint Petersburg</td><td>Russia</td></tr><tr class="odd"><td>San Francisco</td><td>USA</td></tr><tr class="even"><td>Washington</td><td>USA</td></tr><tr class="odd"><td>New York</td><td>USA</td></tr><tr class="even"><td>London</td><td>England</td></tr></tbody></table>

the output should be

<table><thead><tr class="header"><th>id</th><th>country</th></tr></thead><tbody><tr class="odd"><td>1</td><td>USA</td></tr><tr class="even"><td>2</td><td>Russia</td></tr><tr class="odd"><td>3</td><td>England</td></tr></tbody></table>

## Implement a function that receives an array of integers arr and an integer int, which returns the number of occurrences of element int in array arr. For instance, given arr = \[2,3,4,3,2,1\] and int = 3, the function should return 2.
