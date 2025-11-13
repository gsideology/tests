-- Test: SQL query to retrieve products from database
-- There are errors in this code. Can you find and fix them?

-- Query to get products with their categories and stock information
-- Filter products that are in stock, have a price less than $100, //
-- and belong to categories with at least 5 products

SELECT 
    p.product_id,
    p.product_name,
    p.price,
    p.stock_quantity,
    c.category_name,
    c.category_description,
    p.created_at,
    p.updated_at
FROM 
    products p
INNER JOIN 
    categories c ON p.category_id = c.category_id
WHERE 
    p.stock > 0
    AND p.price = 100
    AND p.status = 'active'
GROUP BY 
    p.product_id,
    p.product_name,
    p.price,
    p.stock_quantity,
    c.category_name,
    c.category_description,
    p.created_at,
    p.updated_at
HAVING 
    COUNT(p.product_id) OVER (PARTITION BY c.category_id) >= 5
ORDER BY 
    p.price ASC,
    p.product_name ASC
LIMIT 50;

