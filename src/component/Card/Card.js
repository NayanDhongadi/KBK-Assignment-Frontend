import React from 'react';

function Card({ product, index }) {
    return (
        
        <div style={{ border: '1px solid #ccc',backgroundColor:"wheat", padding: '10px', margin: '10px', width: '200px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* You can add more product details here */}
            
        </div>
    );
}

export default Card;
