import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS } from '../../config/api';

const InventoryManager = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');

    // Modals
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    // Editing State
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);

    // Forms
    const [productForm, setProductForm] = useState({
        name: '',
        categoryId: '',
        rate: '',
        discount: 0,
        stockQuantity: 0,
        minStockLevel: 5,
        sku: '',
        manufacturer: '',
        inStock: true
    });

    const [categoryForm, setCategoryForm] = useState({
        name: '',
        description: '',
        isActive: true
    });

    useEffect(() => {
        // Get token from localStorage on component mount
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            setToken(adminToken);
        }
        fetchInitialData();
    }, []);

    const getHeaders = () => {
        const adminToken = localStorage.getItem('adminToken');
        return {
            'Content-Type': 'application/json',
            ...(adminToken && { 'Authorization': `Bearer ${adminToken}` })
        };
    };

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            const headers = getHeaders();
            const [prodRes, catRes] = await Promise.all([
                fetch(API_ENDPOINTS.PRODUCTS, { headers }),
                fetch(API_ENDPOINTS.CATEGORIES, { headers })
            ]);

            const prodData = await prodRes.json();
            const catData = await catRes.json();

            if (prodRes.ok) setProducts(prodData.products || []);
            if (catRes.ok) setCategories(catData || []);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Product Handlers ---
    const handleOpenProductModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setProductForm({
                name: product.name,
                categoryId: product.categoryId,
                rate: product.rate,
                discount: product.discount,
                stockQuantity: product.stockQuantity || 0,
                minStockLevel: product.minStockLevel || 5,
                sku: product.sku || '',
                manufacturer: product.manufacturer || '',
                inStock: product.inStock
            });
        } else {
            setEditingProduct(null);
            setProductForm({
                name: '',
                categoryId: categories[0]?.id || '',
                rate: '',
                discount: 0,
                stockQuantity: 0,
                minStockLevel: 5,
                sku: '',
                manufacturer: '',
                inStock: true
            });
        }
        setIsProductModalOpen(true);
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const url = editingProduct
            ? API_ENDPOINTS.PRODUCT_UPDATE(editingProduct.id)
            : API_ENDPOINTS.PRODUCT_CREATE;
        const method = editingProduct ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(productForm)
            });

            if (response.ok) {
                setIsProductModalOpen(false);
                alert('✅ Product saved successfully!');
                fetchInitialData();
            } else {
                const data = await response.json();
                if (response.status === 401) {
                    alert('❌ Unauthorized! Please login again.');
                } else if (response.status === 403) {
                    alert('❌ Access denied! Only admins can add products.');
                } else if (response.status === 400) {
                    alert(`❌ Validation Error: ${data.message || 'Please fill all required fields'}`);
                } else {
                    alert(`❌ Error: ${data.message || 'Failed to save product'}`);
                }
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert(`❌ Network Error: ${error.message || 'Connection failed. Check if backend is running.'}`);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const response = await fetch(API_ENDPOINTS.PRODUCT_DELETE(id), { 
                method: 'DELETE',
                headers: getHeaders()
            });
            if (response.ok) {
                alert('✅ Product deleted successfully!');
                fetchInitialData();
            } else {
                const data = await response.json();
                alert(data.message || '❌ Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(`❌ Error: ${error.message || 'Failed to delete product. Please try again.'}`);
        }
    };

    // --- Category Handlers ---
    const handleOpenCategoryModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setCategoryForm({
                name: category.name,
                description: category.description || '',
                isActive: category.isActive
            });
        } else {
            setEditingCategory(null);
            setCategoryForm({ name: '', description: '', isActive: true });
        }
        setIsCategoryModalOpen(true);
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const url = editingCategory
            ? API_ENDPOINTS.CATEGORY_UPDATE(editingCategory.id)
            : API_ENDPOINTS.CATEGORY_CREATE;
        const method = editingCategory ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: getHeaders(),
                body: JSON.stringify(categoryForm)
            });

            if (response.ok) {
                setIsCategoryModalOpen(false);
                alert('✅ Category saved successfully!');
                fetchInitialData();
            } else {
                const data = await response.json();
                if (response.status === 401) {
                    alert('❌ Unauthorized! Please login again.');
                } else if (response.status === 403) {
                    alert('❌ Access denied! Only admins can manage categories.');
                } else if (response.status === 400) {
                    alert(`❌ Validation Error: ${data.message || 'Please fill all required fields'}`);
                } else {
                    alert(`❌ Error: ${data.message || 'Failed to save category'}`);
                }
            }
        } catch (error) {
            console.error('Error saving category:', error);
            alert(`❌ Network Error: ${error.message || 'Connection failed. Check if backend is running.'}`);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure? This strictly deletes the category.')) return;
        try {
            const response = await fetch(API_ENDPOINTS.CATEGORY_DELETE(id), { 
                method: 'DELETE',
                headers: getHeaders()
            });
            if (response.ok) {
                alert('✅ Category deleted successfully!');
                fetchInitialData();
            } else {
                const data = await response.json();
                alert(data.message || '❌ Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert(`❌ Error: ${error.message || 'Failed to delete category. Please try again.'}`);
        }
    };


    if (isLoading) return <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-light)' }}>Loading Inventory Data...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '300px' }}>
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        style={{ width: '100%', padding: '0.8rem 1.2rem 0.8rem 2.8rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', background: 'white', outline: 'none' }}
                    />
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOpenCategoryModal()}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: 'white',
                            color: 'var(--primary-teal)',
                            border: '1px solid var(--primary-teal)',
                            borderRadius: '1rem',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <span>📂</span> Manage Categories
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOpenProductModal()}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: 'var(--primary-teal)',
                            color: 'white',
                            borderRadius: '1rem',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            boxShadow: '0 4px 15px rgba(0, 137, 123, 0.3)'
                        }}
                    >
                        <span>➕</span> Add Medicine
                    </motion.button>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1fr)', gap: '2rem' }}>

                {/* Product List */}
                <div className="glass-panel" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee' }}>
                        <h3 style={{ margin: 0, color: 'var(--text-dark)' }}>Medicines List</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>Name</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>Category</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>Stock</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>Price</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No medicines found. Add one to get started!</td>
                                    </tr>
                                ) : products.map((product) => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: '600', color: '#333' }}>{product.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#888' }}>SKU: {product.sku || 'N/A'}</div>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#555' }}>
                                            {categories.find(c => c.id === product.categoryId)?.name || 'Unknown'}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.8rem',
                                                background: product.stockQuantity > product.minStockLevel ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                                color: product.stockQuantity > product.minStockLevel ? '#2E7D32' : '#C62828',
                                                fontWeight: '600'
                                            }}>
                                                {product.stockQuantity} Left
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: '600' }}>₹{product.rate}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button onClick={() => handleOpenProductModal(product)} style={{ marginRight: '0.5rem', background: 'none', fontSize: '1.2rem' }}>✏️</button>
                                            <button onClick={() => handleDeleteProduct(product.id)} style={{ background: 'none', fontSize: '1.2rem' }}>🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Categories Sidebar */}
                <div className="glass-panel" style={{ padding: '1.5rem', background: 'white', alignSelf: 'start' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Categories</h3>
                        <button onClick={() => handleOpenCategoryModal()} style={{ fontSize: '0.8rem', color: 'var(--primary-teal)', fontWeight: '600' }}>+ Add</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {categories.map(cat => (
                            <div key={cat.id} style={{
                                padding: '0.8rem',
                                border: '1px solid #eee',
                                borderRadius: '0.8rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{cat.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#888' }}>{cat.isActive ? 'Active' : 'Inactive'}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.3rem' }}>
                                    <button onClick={() => handleOpenCategoryModal(cat)} style={{ opacity: 0.6, fontSize: '0.9rem' }}>✎</button>
                                    <button onClick={() => handleDeleteCategory(cat.id)} style={{ opacity: 0.6, fontSize: '0.9rem' }}>✕</button>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && <div style={{ textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>No categories yet.</div>}
                    </div>
                </div>

            </div>

            {/* --- PRODUCT MODAL --- */}
            <AnimatePresence>
                {isProductModalOpen && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsProductModalOpen(false)}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
                        ></motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="glass-panel"
                            style={{ width: '100%', maxWidth: '600px', background: 'white', padding: '2rem', position: 'relative', zIndex: 10001, maxHeight: '90vh', overflowY: 'auto' }}
                        >
                            <h2 style={{ marginBottom: '1.5rem' }}>{editingProduct ? 'Edit Medicine' : 'Add New Medicine'}</h2>

                            <form onSubmit={handleProductSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Medicine Name</label>
                                    <input required type="text" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Category</label>
                                    <select value={productForm.categoryId} onChange={e => setProductForm({ ...productForm, categoryId: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }}>
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>SKU / Batch No.</label>
                                    <input type="text" value={productForm.sku} onChange={e => setProductForm({ ...productForm, sku: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Price (₹)</label>
                                    <input required type="number" value={productForm.rate} onChange={e => setProductForm({ ...productForm, rate: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Discount (₹)</label>
                                    <input type="number" value={productForm.discount} onChange={e => setProductForm({ ...productForm, discount: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Stock Quantity</label>
                                    <input required type="number" value={productForm.stockQuantity} onChange={e => setProductForm({ ...productForm, stockQuantity: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Min Stock Alert</label>
                                    <input type="number" value={productForm.minStockLevel} onChange={e => setProductForm({ ...productForm, minStockLevel: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                                </div>

                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Manufacturer</label>
                                    <input type="text" value={productForm.manufacturer} onChange={e => setProductForm({ ...productForm, manufacturer: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                                </div>

                                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => setIsProductModalOpen(false)} style={{ flex: 1, padding: '0.8rem', background: '#f5f5f5', border: 'none', borderRadius: '0.5rem' }}>Cancel</button>
                                    <button type="submit" style={{ flex: 1, padding: '0.8rem', background: 'var(--primary-teal)', color: 'white', border: 'none', borderRadius: '0.5rem' }}>Save Details</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- CATEGORY MODAL --- */}
            <AnimatePresence>
                {isCategoryModalOpen && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCategoryModalOpen(false)}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
                        ></motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel"
                            style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '2rem', position: 'relative', zIndex: 10001 }}
                        >
                            <h2 style={{ marginBottom: '1.5rem' }}>{editingCategory ? 'Edit Category' : 'New Category'}</h2>
                            <form onSubmit={handleCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Category Name</label>
                                    <input required type="text" value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Description</label>
                                    <textarea value={categoryForm.description} onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '0.5rem', minHeight: '80px' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" checked={categoryForm.isActive} onChange={e => setCategoryForm({ ...categoryForm, isActive: e.target.checked })} />
                                    <label>Active</label>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => setIsCategoryModalOpen(false)} style={{ flex: 1, padding: '0.8rem', background: '#f5f5f5', border: 'none', borderRadius: '0.5rem' }}>Cancel</button>
                                    <button type="submit" style={{ flex: 1, padding: '0.8rem', background: 'var(--primary-teal)', color: 'white', border: 'none', borderRadius: '0.5rem' }}>Save Category</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default InventoryManager;
