What is wrong with the following code?

class SomeClass {

protected $\_someMember,

public function \_\_construct(){

$this->\_someMember =1;
}

public static function getSomethingStatic(){
return $this->\_someMember \* 5;
}
}

Answer:
© The variable cannot be protected
© method cannot start with \_

CO Sthis cannot be used from static

© $\_someMember is a bad name for the variable

What is the difference between explode() y split()?

Answer:
© split partitions an array in more dimensions and explode partitions an array in more rows

©) split does an "split" of a matrix, and explode expands a matrix

O split does a "split" of a string taking a string as an input, while explode partitions an string by a regular expresion

© split does a “split” of a string taking a regular expresion as an input, while explode partitions a string using a string

Which of the following functions can be used in PHP to determine if the type of a variable is a float?

Answer:
O gettype()

CO is_double()

O get_type()

O is_date()

© A and B are correct

What will the following code produce?
echo $\_SERVER[REMOTE_ADDR}};
O Shows the local IP address

O Shows the visitor's IP address

O Shows the Web Server's IP address

PHP runs in several platforms, specially Unix. When you run a code developed in a Server Unix and
you move it to a Server Windows, which of the following situations is a problem?

Answer:

© Calling mail() will fail

© Executing code that calls OLE will fail
© The File Paths will stop working

In the following code, what does "[0-9]+" match?preg_match('/^[0-9]+$/', $variable)
Answer:

O Any character

O A character between 0 and 9

© One or more characters between 0 and 9

© O or more characters between 0 and 9

© Any character between 0 and 9 followed by $

Which is the length of the shorter string that can match with the following regular expression?

preg_match('/^[a-g]+[3-9]\*[A-Z]{2,10}$/')

Answer:
© 0 Characters
© 2 Characters
© 3 Characters
© 1 Character
© 4 Characters

Which one of the following was NOT introduced in PHP 7?

Answer:
© Namespaces

© A function to perform integer divisions
© Group return expressions

© Anonymous classes
Which of the following is NOT a valid PHP comparison operator?
<>

There's a requirement to send a message to a socket regardless of whether it is connected or not.
In that scenario, which of the following can be used?

Answer:
CO socket_sendto

© socket_send

© socket_send(0)

© socket_send y socket_sendto
© None of the above
If you want to stablish the modify (and access) date of a file, which of the following would you use?

Answer:
O file_time
O touch

CO filectime
O timestamp
Answer:
What does this line of code do?

$$
variable = "yay";
CO Sets $var by reference

CO Sets $$var value

CO Sets a variable named after Svar content

CO Sets the content of the "var" variable


If you want to determine if a cookie was previously set up, which of the following would you use?

Answer:
O iscookie()

O isset0)

O setecookie()

CO None of the above
Question:

Answer:


Given the following code, what would the output be?
<?php
FUNCTION TEST()

{
ECHO Hello World!\n";

test();
?>
© Hello World!

Question:

Answer:
O thisistrue
O thisisfalse

© Runtime compilation error

What will be the output of the following code?
Svar = ‘false’;

if (Svar) {

echo 'thisistrue’;
else {

echo 'thisisfalse’;
}
O thisistrue
O thisisfalse

Is there any problem with the following code?
class A {}
class B {}

class C extends A, B {}

Answer:
© The code is perfect

CO The classes can't be empty

© The class C can't inherit from A and B

© The private and public qualifiers are missing in the class

Given the following code, what would the output be?

$a = array(
null => 'a',
true => 'b',
false => 'c',
0 => 'd',
1 => 'e',
' => 'f',
);

echo count($a), "\n";

$$
