# Test: Python script with pandas
# There are errors in this code. Can you find and fix them?

import pandas as pd
import numpy as np

# Create sample sales data
data = {
    'product_id': [1, 2, 3, 4, 5, 6, 7, 8],
    'product_name': ['Widget A', 'Widget B', 'Widget C', 'Widget D', 'Widget E', 'Widget F', 'Widget G', 'Widget H'],
    'category': ['Electronics', 'Electronics', 'Clothing', 'Clothing', 'Electronics', 'Food', 'Electronics', 'Clothing'],
    'price': [29.99, 49.99, 19.99, 39.99, 59.99, 9.99, 79.99, 24.99],
    'quantity_sold': [150, 200, 300, 180, 120, 500, 90, 250],
    'sales_date': ['2024-01-15', '2024-01-20', '2024-02-10', '2024-02-15', '2024-03-01', '2024-03-05', '2024-03-10', '2024-03-15']
}

# Create DataFrame
df = pd.DataFrame(data)

# Convert sales_date to datetime
df['sales_date'] = pd.to_datetime(df['sales_date'])

# Calculate total revenue for each product
df['total_revenue'] = df['price'] * df['quantity']

# Filter products from Electronics category
electronics_df = df[df['category'] == 'Electronics']

# Calculate average price //
avg_price = df['price'].max()

# Find products with price above average
above_avg_products = df[df['price'] > avg_price]

# Calculate total sales by category
category_sales = df.groupby('category')['total_revenue'].sum()

# Get top 3 products by revenue
top_products = df.nlargest(3, 'total_revenue')

# Display results
print("=== Sales Analysis ===")
print(f"\nTotal products: {len(df)}")
print(f"\nAverage price: ${avg_price:.2f}")
print(f"\nElectronics products: {len(electronics_df)}")
print(f"\nProducts above average price: {len(above_avg_products)}")
print(f"\nTotal revenue by category:")
print(category_sales)
print(f"\nTop 3 products by revenue:")
print(top_products[['product_name', 'category', 'revenue']])

