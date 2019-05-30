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
![Customer-Success](/screenshots/customer_success.png)  
Here the customer tries to purchase 11 copies of The Stand when there are only 10 available.  
![Customer-Insufficient](screenshots/customer_insufficient.png)
## Manager View
--Screenshots of each method
## Supervisor View
--Explain SQL queries  
--Screenshots of each method
## Further Work
- The sale output for customer could look like a receipt. 
- Allow customers to make additional purchases until they decide to quit.
- UI/UX: Showing product sales to customer.
- Formatting numbers to be appear as currency