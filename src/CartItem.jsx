import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0; // Initialize a variable total to hold the cumulative sum.
    // Iterate over the cart array using cart.forEach().
    cart.forEach(item => {
      // Extract its quantity and cost.
      const quantity = item.quantity;
      
      // Convert the cost string (e.g., "$10.00") to a number 
      const itemCost = parseFloat(item.cost.substring(1));
      
      // Add the resulting value to total.
      total += itemCost * quantity;
    });
    return total; // After processing all items, return the final total sum.
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e); // Calling the prop to return to the plant list
  };
 
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
        name: item.name, 
        quantity: item.quantity + 1 
    }));
  };

  const handleDecrement = (item) => {
    // If the quantity is greater than 1, decrement it
    if (item.quantity > 1) {
        dispatch(updateQuantity({
            name: item.name, 
                quantity: item.quantity - 1 
        }));
    } else {
    // If quantity is 1 (and decrementing would make it 0), remove the item
        dispatch(removeItem(item.name));
        }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    const subtotal = unitPrice * item.quantity;
    return subtotal.toFixed(2); // Return subtotal formatted to two decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


