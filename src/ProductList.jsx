// 1. Corrected Redux imports and added useDispatch import
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // <-- ADDED useDispatch
import './ProductList.css'
import CartItem from './CartItem';
import addItem from './CartSlice'; // <-- Corrected to named import { addItem }

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); 
    const [addedToCart, setAddedToCart] = useState({});
    
    // 2. Added initialization of dispatch hook
    const dispatch = useDispatch(); // <-- ADDED Initialization
        dispatch(addItem(product));
    
        
    const plantsArray = [
        // ... (Your plantsArray data remains here) ...
    ];
    // NOTE: If you are iterating over plantsArray in the return,
    // the allPlants variable might be redundant and can be removed.
    // const allPlants = plantsArray.flatMap(category => category.plants); 

    const styleObj = {
        // ... (Your styleObj remains here) ...
    }
    const styleObjUl = {
        // ... (Your styleObjUl remains here) ...
    }
    const styleA = {
        // ... (Your styleA remains here) ...
    }

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); 
    };
    
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false); 
    };
    
    const handleAddToCart = (product) => {
        dispatch(addItem(product)); 
      
        setAddedToCart((prevState) => ({ 
          ...prevState, 
          [product.name]: true, 
        }));
    };
    
    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };
    
    return (
        <div>
            {/* ... (Your navbar JSX) ... */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => ( 
                        <div key={index}> 
                            <h1>
                                <div>{category.category}</div> 
                            </h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={`${category.category}-${plantIndex}`}> {/* Improved key */}
                                        <img 
                                            className="product-image" 
                                            src={plant.image} 
                                            alt={plant.name} 
                                        />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        {/* 3. Removed redundant $ sign */}
                                        <div className="product-cost">{plant.cost}</div> 
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;