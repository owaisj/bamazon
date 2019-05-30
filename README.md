# Bamazon
A command-line, Amazon-like storefront. Functionally similar to [cliBay](https://github.com/owaisj/cliBay).
## Technologies Used
- Node.js
- MySQL
## Customer View
This portion of the application uses three packages, `MySQL`, `Inquirer JS`, and `Cli-table`. When started, the app runs a query to the SQL server that displays the products table (formatted with `cli-table`). Using an `Inquirer` prompt, the user is asked to pick a product by ID and how much they'd like to purchase. If there are not enough of the product, the customer is notified.  
The `products` table was seeded using the following query:  
```sql
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
    ('The Stand', 'Books', 15.00, 25),
    ('Vision', 'Books', 20.00, 20),
    ('The Wind Up Bird Chronicle', 'Books', 10.00, 20),
    ('Crime and Punishment', 'Books', 7.50, 25),
    ('Creatine', 'Health', 10.00, 50),
    ('Turmeric', 'Health' 12.50, 30),
    ('Moleskine Notebook', 'Stationary', 10.00, 75),
    ('G2 Pens', 'Stationary', 3.00, 100),
    ('Oreos', 'Snacks', 3.00, 150),
    ('Goldfish','Snacks', 2.50, 200);
```  
Here we see the customer successfully purchase 5 bags of goldfish.  
![Customer-Success](screenshots/customer_success.png?raw=true)  
Here the customer tries to purchase 11 copies of The Stand when there are only 10 available.  
![Customer-Insufficient](screenshots/customer_insufficient.png?raw=true)
## Manager View
This portion of the application begins with an Immediately Invoked Function Expression (IIFE) that has an inquiry for the user to choose their action. Their choice is sent through a `switch-case` statement which returns a function corresponding to the selected action.  
Here the manager can view all products that are for sale.  
![View all products](screenshots/manager_all.png?raw=true)  
Here the manager can view all products that have a stock quantity lower than 15 items.  
![View low inventory](screenshots/manager_low.png?raw=true)  
To demonstrate the add to inventory function, the manager will add 2 copies of JS Ninja to the stock.  
![Add Inv A](screenshots/manager_add_inv_A.png?raw=true)  
![Add Inv B](screenshots/manager_add_inv_B.png?raw=true)  
To demonstrate the add product function, the manager adds 25 copies of World War Z to the table.  
![Add new A](screenshots/manager_add_new_A.png?raw=true)  
![Add new B](screenshots/manager_add_new_B.png?raw=true)  
## Supervisor View
To view total sales by deparment, the following query was used:  
```sql
SELECT departments.department_id, departments.department_name, departments.over_head_costs,
    COALESCE(SUM(products.product_sales), 0) AS product_sales,
    COALESCE(SUM(products.product_sales), 0) - over_head_costs AS total_profit
FROM departments
LEFT JOIN products
ON departments.department_name = products.department_name
GROUP BY departments.department_id
ORDER BY total_profit DESC;
```  
This query takes the departments table (`LEFT`) and matches records from the products table (`RIGHT`) after finding the total sales for the products and getting the total sum for each department that has been created in the departments table (and thus has overhead costs) and is a part of product entries that have been sold. The `COALESCE` method is used so that `null` values are not added to the sum. The entries are ordered by descending profit so that the most profitable departments are on top.  
This displays the following table:  
![Sales by deparment](screenshots/supervisor_total_sales.png?raw=true)  
Here the supervisor can add a new department  
![new department](screenshots/supervisor_new_d.png?raw=true)
## Further Work
- The sale output for customer could look like a receipt. 
- Allow customers to make additional purchases until they decide to quit.
- UI/UX: Showing product sales to customer.
- Formatting numbers to be appear as currency