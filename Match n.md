# Match n

String length

`^.{1,35}$`

String that containts a substring ONLY once

`^(?:(?!<scr>).)*<scr>(?!.*<scr>).*$`

No identical consecutive characters

`^(([\w])(?!\2))+$`

No more than two identical consecutive characters, etc

`^(([\w])\2?(?!\2))+$`

### At least two unique characters: https://stackoverflow.com/questions/5341369/regex-for-at-least-two-unique-characters/
```
^
(?>                 # Possessive group - do not backtrack!
    (.)             # Match a duplicated character
       (?:
         (?=.*\1)       # It can have a duplicate after itself
         |
         (?<=\1.+)      # Or it already had one
       )
    |               # Or, it isn't a duplicated character at all
    (?<Unique>.)    # Capture it as a unique character.
)+
$
(?<-Unique>){2}     # After we're done, check there were at least
                    # two unique characters
```
The idea here is to match duplicated characters and count the rest using balancing groups: This is achieved with a possessive group - it makes sure the duplicated characters never backtrack, thus the next dot will only capture a non-duplicated character.  
In .Net, every capture of a group is added to a stack. (?<-Unique>) pops a capture from the stack, and fails if it's empty. It gives a nice way of counting how many captures we've had.

Or a simpler solution:
```
(.)(?<!\1.+)(?!.*\1).*(.)(?<!\2.+)(?!.*\2)
```

To explain it:
```
(.)                    # match any character...
(?<!\1.+)              # ...which does not already exist in the input...
(?!.*\1)               # ..and does not exist later on in the input
                       # We have now found one unique character.

.*                     # allow for any number of random characters in the middle

(.)(?<!\2.+)(?!.*\2)   # Find a second unique character, 
                       # using the same technique.
```
