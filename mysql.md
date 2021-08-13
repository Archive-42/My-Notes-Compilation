Question:

Which of the following commands is used to connect as an anonymous user to a MySQL server running in the localhost?

Answer: © mysql -u anon O mysal-u’’ O mysql

O mysal-u Question:

Answer:

Which of the following commands is used to create a database called “abc”? O CREATE -l abe

© DATABASE /anderson

CO CREATE DATABASE anderson © mysql -s abc

Question:

Answer:

Which of the following is not a valid “aggregate” function? © count

© sum © MIN

© COMPUTE

Question:

Which of the following is a valid MySQL connection?

Answer: © mysql&gt; mysql -host=server —user=usuario ~password=clave

© mysql&gt; mysql -host = server -password —user = nombre

© mysql&gt; mysql -h server -u usuario -p –defaults-file=C:-options

© mysql&gt; mysql -h server -u usuario -p clave The TRUNCATE TABLE clause

Answer: © Deletes the table

© Checks if the table has a PRIMARY KEY defined © Deletes all the rows from a table

© Resets the autonumbers field’s index Can the UPDATE and SELECT clause be in a same SQL sentence?

Answer: O They can be used together, even if a nested query is not used O No, they cant

O You can if you use a nested query A trigger can belong to:

Answer: © A single table in the database © All the tables in the database © More than one table in the database With SQL, how can all the records from a table “People” be obtained where the value of the column “Name” starts with “a”?

Answer:

© SELECT \* FROM People WHERE Name=‘a’

© SELECT \_ FROM People WHERE Name LIKE ‘%a! © SELECT \_ FROM People WHERE Name LIKE ’a%’ © SELECT \* FROM People WHERE Name=“%a%’ How do | select all the records from a table called People where”lastname" is alphabetical between (including ends) “Richards” and “Smith’

Answer: CO SELECT lastname&gt;‘Richards’ AND lastname«’Smith FROM People

CO SELECT \_ FROM People WHERE lastname BETWEEN ‘Richads’ AND ‘Smith’ © SELECT \_ FROM People WHERE lastname&gt;‘Richards’ AND apellido&lt;’Smith’

Which of the following statements is false?

Answer: © MyISAM tables support foreign keys and relationship constraints

© MyISAM and InnoDB tables support compound keys creation

© MyISAM can only block at a table level while InnoDB can block at row level © MyISAM tables don’t support transactions

You’ve created a small MySQL database in a website and now the traffic has grown too much. The server is working slowly. Here are some ways

to reduce the load

The POSTs that the users do, are never repeated for this website.

Which one will give the LEAST improvement?

Answer: © Analyze the queries and add indexes

© Generate static pages in all the available places

© Move the database to another server and connect by TCP/IP CO Add a cache object like Zend or APC

A table that has been deleted with DROP TABLE can?

❓ Be restored using COMMIT

❓ Can’t be restored

❓ Be restored with ALTER TABLE

❓ Be restored with a ROLLBLACK

Which SQL reserved word is used to retrieve unique values?

❓ DISTINCT

Considering the employees table, how would you bring the 3 employees with the highest salary?

<table><thead><tr class="header"><th>ID</th><th>Nombre</th><th>Apellido</th><th>Salario</th><th>Fecha Nacimiente</th></tr></thead><tbody><tr class="odd"><td>2</td><td>Pablo</td><td>sanchez</td><td>5500]15/09/1984]</td><td></td></tr><tr class="even"><td>4</td><td>Mariana_iudrez</td><td>2500] 13/11/1981</td><td></td><td></td></tr><tr class="odd"><td>5</td><td>Maria Calabro</td><td>8200</td><td>1/1/1990</td><td></td></tr><tr class="even"><td>6</td><td>Pauia Sensini</td><td>7500</td><td>16/05/1988</td><td></td></tr></tbody></table>

Answer:

oO SELECT TOP 3 Employees ORDER BY Salario DESC

oO SELECT TOP 3 \_ FROM Employees ORDER BY Salario DESC oO SELECT TOP 3 \_ FROM Employees ORDER BY Salario

oO SELECT \* FROM Employees WHERE Salario &gt;= 7500

oO SELECT TOP 3 FROM Employees ORDER BY Salario DESC

<table><thead><tr class="header"><th>OId</th><th style="text-align: center;">OrderDate</th><th style="text-align: right;">OrderPrice</th><th>Customer</th></tr></thead><tbody><tr class="odd"><td>1</td><td style="text-align: center;">12/11/2008</td><td style="text-align: right;">1000</td><td>Hansen</td></tr><tr class="even"><td>2</td><td style="text-align: center;">23/10/2008</td><td style="text-align: right;">1600</td><td>Nilsen</td></tr><tr class="odd"><td>3</td><td style="text-align: center;">02/09/2008</td><td style="text-align: right;">700</td><td>Hansen</td></tr></tbody></table>

Given this table, how do we do to obtain the name and the sum of all their orders only to those clients whose sum of orders is less than 2000?

Answer:

oO SELECT Customer, SUM(OrderPrice) FROM Orders GROUP BY Customer HAVING SUM(OrderPrice) &lt; 2000 oO SELECT Customer, SUM(OrderPrice) FROM Orders WHERE SUM(OrderPrice) &lt; 2000 GROUP BY Customer oO SELECT Customer, SUM(OrderPrice) FROM Orders GROUP BY O_Id HAVING SUM(OrderPrice) &lt; 2000

oO SELECT Customer, SUM(OrderPrice) FROM Orders WHERE SUM(OrderPrice) &lt; 2000 GROUP BY O_Id

Tabla Personas P_Id|LastName —|———— 1 |Hansen 2 |Svendson 3 |Pettersen

Tabla Ordenes

<table><thead><tr class="header"><th>OrderNo</th><th>P_Id</th></tr></thead><tbody><tr class="odd"><td>77895</td><td>3</td></tr><tr class="even"><td>44678</td><td>3</td></tr><tr class="odd"><td>22456</td><td>1</td></tr><tr class="even"><td>24562</td><td>1</td></tr><tr class="odd"><td>34764</td><td>15</td></tr></tbody></table>

<table><thead><tr class="header"><th>FirstName</th><th>LastName</th><th>Address</th><th>city</th></tr></thead><tbody><tr class="odd"><td>Ola</td><td>Timoteivn</td><td>10</td><td>Sandnes</td></tr><tr class="even"><td>Tove</td><td>Borgvn</td><td>23</td><td>Sandnes</td></tr><tr class="odd"><td>Kari Storgt</td><td>20</td><td>Stavanger</td><td></td></tr></tbody></table>

Given both tables above, we want to list all the people and their orders. If they don’t have orders, we also want them to show in the list.

Answer:

SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo FROM Persons LEFT JOIN Orders ON Persons.P_Id=Orders.P_Id ORDER BY Persons.LastName

Which of the following statements is false about DELETE FROM?

Answer:

❓ DELETE FROM can be used to delete the value of a column

❓ DELETE FROM can be used to delete multiple rows

❓ DELETE FROM can be used to delete one or more rows

oO DELETE FROM doesn’t produce a different result from DELETE (without FROM)

Which of the followings is NOT a difference between TRUNCATE and DELETE?

O TRUNCATE is a DDL (data definition language) command and DELETE is a DML (data manupulation language) command O With DELETE you can specify a WHERE and with TRUNCATE you can’t do it

❓ DELETE removes data only and TRUNCATE removes data and structure

O With TRUNCATE you can’t do ROLLBACK of the deleted data in a transaction and with DELETE you can do it.

What’s the HAVING clause for?

Answer:

CO It allows you to select different values

O It allows you to specify a search condition for the aggregate function O It allows you yo make the JOIN of 2 or more tables

CO t’s like the WHERE clause

?In SQL it’s possible to create:

❓ CONSTRAINTs only for the columns

❓ CONSTRAINTs only for the tables

❓ CONSTRAINTs for columns and tables
