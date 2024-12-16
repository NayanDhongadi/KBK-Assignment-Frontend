import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
    const [products, setProducts] = useState([]);
    const [productForm, setProductForm] = useState({ name: "", price: "", description: "" });
    const [editingProduct, setEditingProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/get-all-products")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.log(error));
    }, [products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    const handleSaveProduct = (e) => {
        e.preventDefault(); 
        if (editingProduct) {
            axios.put(`http://localhost:8000/edit-product/${editingProduct._id}`, productForm)
                .then(response => {
                    setProducts(products.map(product => product._id === editingProduct._id ? response.data : product));
                    closeModal();
                    // console.log("response------->",response)
                })
                .catch(error => console.log(error));
        } else {
            axios.post("http://localhost:8000/add-product", productForm)
            .then(response => {
                // console.log("response------->",response)
                setProducts([response.data, ...products]); 
                closeModal();
                })
                .catch(error => console.log(error));
        }
    };


    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setProductForm({ name: product.name, price: product.price, description: product.description });
        } else {
            setEditingProduct(null);
            setProductForm({ name: "", price: "", description: "" });
        }
        setShowModal(true);     
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setProductForm({ name: "", price: "", description: "" });
    };

    const handleDeleteProduct = (productId) => {
        axios.delete(`http://localhost:8000/delete-product/${productId}`)
            .then(() => {
                setProducts(products.filter(product => product._id !== productId));
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>Admin Panel</h1>

            <button onClick={() => openModal()}>Add Product</button>

            <h2>Product List</h2>


            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
                        <form onSubmit={(e) => {handleSaveProduct(e); }}>
                            <label for="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={productForm.name}
                                onChange={handleInputChange}
                                placeholder="Product Name"
                                required
                            />
                            <label for="price">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={productForm.price}
                                onChange={handleInputChange}
                                placeholder="Product Price"
                                required
                            />
                            <label for="description">Description</label>
                            <textarea
                                name="description"
                                value={productForm.description}
                                onChange={handleInputChange}
                                placeholder="Product Description"
                                required
                            />
                            <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
                        </form>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button onClick={() => openModal(product)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>



        </div>
    );
}

export default Admin;
