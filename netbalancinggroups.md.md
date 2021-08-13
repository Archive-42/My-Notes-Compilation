.NET Balancing Groups
=====================

Basic pattern

    ^(?:(?'open'o)+(?'-open'c)+)+(?(open)(?!))$

Optimized pattern using an atomic groups

    ^(?>(?'open'o)+(?'-open'c)+)+(?(open)(?!))$

allow any number of letters m anywhere in the string, while still requiring all o’s and c’s to be balanced

    ^m*(?>(?>(?'open'o)m*)+(?>(?'-open'c)m*)+)+(?(open)(?!))$

This is the generic solution for matching balanced constructs using .NET’s balancing groups or capturing group subtraction feature. You can replace o, m, and c with any regular expression, as long as no two of these three can match the same text.

Matching nested balanced parenthesis
------------------------------------

applies this technique to match a string in which all parentheses are perfectly balanced.

    ^[^()]*(?>(?>(?'open'\()[^()]*)+(?>(?'-open'\))[^()]*)+)+(?(open)(?!))$

… still not a parser

    (?=(\((?:(?<open>\()*[^()]+(?<-open>\))*)+\)(?(open)(?!))))

That isn’t optimal since it “reparses” some nested gropups of parenthesis for every match.  
Using a real parser would read/parse the string only once, and would be therefore more efficient.

    using System;
    using System.Text.RegularExpressions;
    public class Example
    {
       public static void Main()
       {
          var re = @"(?x)  # ignore spaces and comments
    (?=                    # lookahead (zero width)
      (
        \(                 # first (
        (?:
          (?<open> \( )*   # open++
          [^()]+
          (?<-open> \) )*  # open--
        )+
        \)                 # last )
        (?(open)(?!))      # fail if unblanaced: open > 0
      )
    )
    \(                     # eat a (, to advance the match a char";

          var str = "a + ((b + (c + d)) + (e + f)) + (x + ((y) + (z)) + x)";

          var m = Regex.Matches(str, re);

          Console.WriteLine("Matched: ");
          foreach (Match i in m)
            Console.WriteLine(i.Groups[1]);
       }
    }

### .. nested tags, e.g. X/HTML

    <div[^>]*>[^<>]*(((?'Open'<div[^>]*>)[^<>]*)+((?'-Open'</div>)[^<>]*)+)*(?(Open)(?!))</div>

Or more generalized (needs some more work):

&lt; \#The outermost left parenthesis \[^&lt;&gt;\]\_ \#The outermost left parenthesis is not the content of the brackets ( ( (?‘Open’&lt;) \#Met a left parenthesis, write on the blackboard“Open” \[^&lt;&gt;\]\_ \#Matching left parenthesis is not the content of the brackets )+ ( (?‘-Open’&gt;) \#Met the right bracket, wipe a“Open” \[^&lt;&gt;\]\_ \#Matching right parenthesis is not behind the bracket content )+ )\_ (?(Open)(?!)) \#In front of the outermost parentheses, judgment and not erase the blackboard “Open”; if there is failure, matching

>                         #The outermost right parenthesis

#### Backreferences To Subtracted Groups

#### [Matching Palindromes](https://www.regular-expressions.info/balancing.html)

    ^(?'letter'[a-z])+[a-z]?(?:\k'letter'(?'-letter'))+(?(letter)(?!))$

or more condensed

    (?x)^(?<l>\w)+\w?
    (\k<l>(?<-l>))+
    (?(l)(?!))$

https://www.regular-expressions.info/refrecurse.html
