> > > a= (0, 9, 8,7, 6,5, 4, 3, 2, 1,0]

```
>>> a[-1]
```

Answer:

O1

0

CO Indexerror
O Syntaxerror
Which of the following is not a valid type?
Answer:
CO int

O float

<br>

❓double

CO All of them are valid

What is the result?

````
try:
    [1,2, 3][4]
except IndexError:
    print(""""IndexError raised"""")
except:
    print("""Exception raised""")
else:
    print('Something else happened')
finally:
    print('Cleaning up')```
Answer:

CO IndexError raised Exception raised Cleaning up

CO IndexEror raised Exception raised Something else happened
CO IndexEror raised Something else happened Cleaning up

CO IndexEror raised Cleaning up

What happens?
````

def f():

    f())
    return 42

f()

```
Answer:

O 42,42, 42, 42,...
O it hangs

O Syntaxerror

CO RuntimeError: maximum recursion depth exceeded

?class test():
```

id=0
def **init**(self,id):
self.id=id
id=2
t=test(1)
print(t.id)

```
Answer:

O0

O1

O2


<br>

❓ TypeError: __init_() takes exactly 2 argument (1 given)
Given a sequence of integer values, what method would you use for obtaining the SUM of its elements?

Answer:
O zip
O sum
O map
O reduce
In Python 2, which of the following code lines will not generate a list?

Answer:

CO filter(lambda x: x % 2, [i for i in range(10)])

<br>

❓ map(lambda x: x // 2, [i for i in range(10)])
O Zip([i for i in range(10)], [i for i in range(10)])

?>>> m = re.search(r'(ab[cd]?), "acdeabdabcde")
```

> > > m.groups()

```
Answer:
O ('ab')
O ('abe')
O ('abd')
O ('abcd')

Answer:
Which of the following modules has functions for object serialization?
O sqlite3
O pickle
O zlib

O hashlib

?>>> type(datetime.date(2012, 01, 01) - datetime.date(2011, 01, 01))

Answer:

O <type 'datetime.date'>


<br>

❓ <type 'datetime.timedelta'>
O <type 'datetime.datetime'>
O <type 'datetime.datedelta'>

```
