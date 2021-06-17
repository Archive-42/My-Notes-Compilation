Question:

Which of the following commands is used to
connect as an anonymous user to a MySQL
server running in the localhost?

Answer:
© mysql -u anon
O mysal-u''
O mysql

O mysal-u
Question:

Answer:

Which of the following commands is used
to create a database called “abc"?
O CREATE -l abe

© DATABASE /anderson

CO CREATE DATABASE anderson
© mysql -s abc

Question:

Answer:

Which of the following is not a valid
“aggregate” function?
© count

© sum
© MIN

© COMPUTE

Question:

Which of the following is a valid
MySQL connection?

Answer:
© mysql> mysql -host=server —user=usuario ~password=clave

© mysql> mysql -host = server -password —user = nombre

© mysql> mysql -h server -u usuario -p --defaults-file=C:\my-options

© mysql> mysql -h server -u usuario -p clave
The TRUNCATE TABLE clause

Answer:
© Deletes the table

© Checks if the table has a PRIMARY KEY defined
© Deletes all the rows from a table

© Resets the autonumbers field's index
Can the UPDATE and SELECT clause
be in a same SQL sentence?

Answer:
O They can be used together, even if a nested query is not used
O No, they cant

O You can if you use a nested query
A trigger can belong to:

Answer:
© A single table in the database
© All the tables in the database
© More than one table in the database
With SQL, how can all the records from a
table "People" be obtained where the value
of the column "Name" starts with "a"?

Answer:

© SELECT \* FROM People WHERE Name='a’

© SELECT _ FROM People WHERE Name LIKE ‘%a!
© SELECT _ FROM People WHERE Name LIKE 'a%'
© SELECT \* FROM People WHERE Name="%a%'
How do | select all the records from a table
called People where "lastname" is alphabetical
between (including ends) "Richards" and “Smith’

Answer:
CO SELECT lastname>'Richards' AND lastname«'Smith FROM People

CO SELECT _ FROM People WHERE lastname BETWEEN 'Richads' AND ‘Smith’
© SELECT _ FROM People WHERE lastname>'Richards’ AND apellido<’Smith’

Which of the following statements is false?

Answer:
© MyISAM tables support foreign keys and relationship constraints

© MyISAM and InnoDB tables support compound keys creation

© MyISAM can only block at a table level while InnoDB can block at row level
© MyISAM tables don't support transactions

You've created a small MySQL database in a website and now the traffic has grown too much.
The server is working slowly. Here are some ways

to reduce the load

The POSTs that the users do, are never repeated for this website.

Which one will give the LEAST improvement?

Answer:
© Analyze the queries and add indexes

© Generate static pages in all the available places

© Move the database to another server and connect by TCP/IP
CO Add a cache object like Zend or APC

A table that has been deleted with DROP TABLE can?

<br>

❓ Be restored using COMMIT

<br>

❓ Can't be restored

<br>

❓ Be restored with ALTER TABLE

<br>

❓ Be restored with a ROLLBLACK

Which SQL reserved word is used to retrieve unique values?

<br>

❓ DISTINCT

Considering the employees table, how would you bring the 3 employees with the highest salary?

| ID  | Nombre         | Apellido         | Salario          | Fecha Nacimiente |
| --- | -------------- | ---------------- | ---------------- | ---------------- |
| 2   | Pablo          | sanchez          | 5500]15/09/1984] |
| 4   | Mariana_iudrez | 2500] 13/11/1981 |
| 5   | Maria Calabro  | 8200             | 1/1/1990         |
| 6   | Pauia Sensini  | 7500             | 16/05/1988       |

Answer:

oO SELECT TOP 3 Employees ORDER BY Salario DESC

oO SELECT TOP 3 _ FROM Employees ORDER BY Salario DESC
oO SELECT TOP 3 _ FROM Employees ORDER BY Salario

oO SELECT \* FROM Employees WHERE Salario >= 7500

oO SELECT TOP 3 FROM Employees ORDER BY Salario DESC

| OId | OrderDate  | OrderPrice | Customer |
| --- | :--------: | ---------: | -------- |
| 1   | 12/11/2008 |       1000 | Hansen   |
| 2   | 23/10/2008 |       1600 | Nilsen   |
| 3   | 02/09/2008 |        700 | Hansen   |

Given this table, how do we do to obtain the name and the sum of all their orders only to those clients whose sum of orders is less than 2000?

Answer:

oO SELECT Customer, SUM(OrderPrice) FROM Orders GROUP BY Customer HAVING SUM(OrderPrice) < 2000
oO SELECT Customer, SUM(OrderPrice) FROM Orders WHERE SUM(OrderPrice) < 2000 GROUP BY Customer
oO SELECT Customer, SUM(OrderPrice) FROM Orders GROUP BY O_Id HAVING SUM(OrderPrice) < 2000

oO SELECT Customer, SUM(OrderPrice) FROM Orders WHERE SUM(OrderPrice) < 2000 GROUP BY O_Id

Tabla Personas
P_Id|LastName
---|------------
1 |Hansen
2 |Svendson
3 |Pettersen

Tabla Ordenes

| OrderNo | P_Id |
| ------- | ---- |
| 77895   | 3    |
| 44678   | 3    |
| 22456   | 1    |
| 24562   | 1    |
| 34764   | 15   |

| FirstName   | LastName  | Address   | city    |
| ----------- | --------- | --------- | ------- |
| Ola         | Timoteivn | 10        | Sandnes |
| Tove        | Borgvn    | 23        | Sandnes |
| Kari Storgt | 20        | Stavanger |

Given both tables above, we want to list all the people and their orders. If they don't have orders, we also want them to show in the list.

Answer:

SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo FROM Persons LEFT JOIN Orders ON Persons.P_Id=Orders.P_Id
ORDER BY Persons.LastName

Which of the following statements is false about DELETE FROM?

Answer:

<br>

❓ DELETE FROM can be used to delete the value of a column

<br>

❓ DELETE FROM can be used to delete multiple rows

<br>

❓ DELETE FROM can be used to delete one or more rows

oO DELETE FROM doesn't produce a different result from DELETE (without FROM)

Which of the followings is NOT a difference between TRUNCATE and DELETE?

O TRUNCATE is a DDL (data definition language) command and DELETE is a DML (data manupulation language) command
O With DELETE you can specify a WHERE and with TRUNCATE you can't do it

<br>

❓ DELETE removes data only and TRUNCATE removes data and structure

O With TRUNCATE you can't do ROLLBACK of the deleted data in a transaction and with DELETE you can do it.

What's the HAVING clause for?

Answer:

CO It allows you to select different values

O It allows you to specify a search condition for the aggregate function
O It allows you yo make the JOIN of 2 or more tables

CO t's like the WHERE clause

?In SQL it's possible to create:

<br>

❓ CONSTRAINTs only for the columns

<br>

❓ CONSTRAINTs only for the tables

<br>

❓ CONSTRAINTs for columns and tables
