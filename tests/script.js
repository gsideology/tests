// Test: JavaScript file with errors
// There are errors in this code. Can you find and fix them?

// Function to calculate total price with discount
function calculateTotal(items, discountPercent) {
    let subtotal = 0;
    
    for (let i = 0; i < items.length; i++) {
        subtotal += items[i].price * items[i].quantity;
    }
    
    const discount = subtotal * (discountPercent / 100);
    const total = subtotal - discount;
    
    return {
        subtotal: subtotal,
        discount: discount,
        total: total
    };
}

// Function to format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

// Function to process order
async function processOrder(orderData) {
    try {
        // Validate order data
        if (!orderData.items || orderData.items.length === 0) {
            throw new Error('Order must contain at least one item');
        }
        
        // Calculate totals
        const totals = calculateTotal(orderData.items, orderData.discountPercent || 0);

        //something missing here
        
        // Prepare order payload
        const payload = {
            customerId: orderData.customerId,
            items: orderData.items,
            subtotal: totals.subtotal,
            discount: totals.discount,
            total: totals.total,
            timestamp: new Date().toISOString()
        };
        
        // Send order to server
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to process order');
        }
        
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error('Error processing order:', error);
        throw error;
    }
}

// Function to display order summary
function displayOrderSummary(order) {
    const summaryDiv = document.getElementById('order-summary');
    
    if (!summaryDiv) {
        console.error('Order summary element not found');
        return;
    }
    
    summaryDiv.innerHTML = `
        <h2>Order Summary</h2>
        <p>Order ID: ${order.orderId}</p>
        <p>Subtotal: ${formatCurrency(order.subtotal)}</p>
        <p>Discount: ${formatCurrency(order.discount)}</p>
        <p><strong>Total: ${formatCurrency(order.total)}</strong></p>
        <p>Status: ${order.status}</p>
    `;
}

// Example usage
const sampleOrder = {
    customerId: 12345,
    items: [
        { id: 1, name: 'Product A', price: 29.99, quantity: 2 },
        { id: 2, name: 'Product B', price: 49.99, quantity: 1 }
    ],
    discountPercent: 10
};

// Process sample order
processOrder(sampleOrder)
    .then(order => {
        displayOrderSummary(order);
    })
    .catch(error => {
        console.error('Failed to process order:', error);
    });

