-- Test: SQL Query with errors
-- There are 2 errors in this query. Can you find and fix them?

-- Task: Get all users who have placed orders in the last 30 days
-- Include their name, email, and total order amount

SELECT 
    u.name,
    u.email,
    SUM(o.amount) AS total_amount
FROM 
    users u
INNER JOIN 
    orders o ON u.id = o.user_id
WHERE 
    order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)  
GROUP BY 
    u.id, u.name, u.email
HAVING 
    SUM(o.amount) > 100  
ORDER BY 
    total_amount DESC;

