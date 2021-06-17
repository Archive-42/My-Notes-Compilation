Q1 (3/20)

Write a program that outputs sequentially the integers from 1 to 99, but on some conditions prints a string instead:
when the integer is a multiple of 3 print “Open” instead of the number,
when it is a multiple of 7 print “Source” instead of the number,
when it is a multiple of both 3 and 7 print “OpenSource” instead of the number.

Q2 (3/20)

Solve the game "Guess a number", find a secret integer between 1 and 1000000
in less than 50 guesses. Write a function that solves the game without user input and returns the
solution by using the function verify() which is defined with the following
specification:
function verify(guess: integer) -> integer
Argument:
guess (integer) the number to verify
Returns:
0 if the guess is the solution, your program won
-1 if the solution is smaller than the guess parameter
1 if the solution is bigger than the guess parameter

Warning: You are not allowed to call verify() more that 50 times or you lose.

Q3 (3/20)

Write a function that takes a list of strings and returns the sum of the list items that represent an integer (skipping the other items)

Q4 (1/20)

Write a recursive version of the previous function (or an iterative version if you have already done a recursive version).

Q5 SQL (3/20)

Write pseudo-SQL statements to create database tables to store the products of a basic webshop. Each product has a name, a price, a creation date and may belong to several categories. Categories have a name and a flag to indicate whether the category is private or public.
Write a SQL query to find the list of products that belong to more than 5 public categories.

Q6 (1/20)

Write a program to download the contents of https://www.sap.com/belgique/index.html (the SAP homepage for Belgium), and then save the contents of the page to a new local file, with all occurrences of "SAP" replaced by "Odoo".

Q7 (2/20)

You have a huge file named "data.bin" that does not fit in memory; code a program that deletes every 7th byte of it. truncate can be used to change its size.

Q8 Regular Expression (2/20)

Write a regular expression to match strings containing both "Odoo" and "#rules" in any order.

Q9 Javascript (1/20)

Write a function that, when called, returns an array for which each element is a letter of the alphabet, from "A" to "Z" (exactly once, in order and upper case). Your code cannot contain the character ' (quote), " (double quote) or ` (back quote)

Q10 Unix (1/20)

Write a C program that roughly measures the overhead of a mode switch between the kernel and userspace on a UNIX/Linux system (without using the pthread API). Please indicate the assumptions your rough estimation is based on.
