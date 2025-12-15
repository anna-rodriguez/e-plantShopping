import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cart = []) => {
    const total = cart.reduce((sum, item) => {
        const qty = Number(item.quantity) || 0;

        let costNum = 0;
        if (typeof item.cost === 'string') {
        const cleaned = item.cost.trim().replace(/^\$/, ''); // remove leading $
        const parsed = parseFloat(cleaned);
        costNum = isNaN(parsed) ? 0 : parsed;
        } else if (typeof item.cost === 'number') {
        costNum = item.cost;
        }

        return sum + qty * costNum;
    }, 0);

    return total;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); 
  };
  
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: (item.quantity ?? 0) + 1 }));
  };

  const handleDecrement = (item) => {
    const currentQty = item.quantity ?? 1;
        if (currentQty > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: currentQty - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  
  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    if (!item || !item.cost || !item.quantity) return 0;

    const unitPrice = parseFloat(item.cost.substring(1)); 

    // Multiply by quantity
    const totalCost = unitPrice * item.quantity;

    return totalCost;

  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
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


