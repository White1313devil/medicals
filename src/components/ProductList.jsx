import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from '../config/api';

const ProductList = ({ categoryId, onAddToCart, onNavigate, searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let url = API_ENDPOINTS.PRODUCTS;

                // Add search or category filters
                const params = new URLSearchParams();
                if (searchQuery) params.append('keyword', searchQuery);

                // Map frontend category IDs to backend names/IDs if needed
                // For now, we'll try to match by partial name or pass the ID
                if (categoryId) {
                    // This is a simplified mapping for demo purposes
                    // In a real app, you'd use the numeric ID directly from the database
                    const categoryMap = {
                        'general-pharmacy': 'General Pharmacy',
                        'skin-care': 'Skin Care',
                        'baby-products': 'Baby Products',
                        'health-drinks': 'Health Drinks'
                    };
                    params.append('category', categoryMap[categoryId] || categoryId);
                }

                const response = await fetch(`${url}?${params.toString()}`);
                const data = await response.json();

                if (response.ok) {
                    setProducts(data.products || []);
                } else {
                    setError('❌ Failed to load products. Please try refreshing the page.');
                }
            } catch (err) {
                setError('⚠️ Connection error. Please check your internet and try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, searchQuery]);

    const getCategoryDisplayName = () => {
        if (searchQuery) return `Search Results for "${searchQuery}"`;
        const names = {
            'general-pharmacy': 'General Pharmacy Medicines',
            'skin-care': 'Skin Care Products',
            'baby-products': 'Baby Products',
            'health-drinks': 'Health Drinks'
        };
        return names[categoryId] || categoryId || 'Products';
    };

    if (isLoading) return <div style={{ padding: '8rem', textAlign: 'center' }}><h3>🏪 Loading medicines...</h3></div>;
    if (error) return <div style={{ padding: '8rem', textAlign: 'center', color: '#e53935' }}><h3>{error}</h3><p>Try refreshing or contact support.</p></div>;

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
            {/* Header with back button */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('medicines')}
                    style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        color: 'var(--text-dark)',
                        marginBottom: '2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    ← Back to Shop
                </motion.button>

                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    {getCategoryDisplayName()}
                </h2>

                <p style={{ color: 'var(--text-light)', marginBottom: '3rem' }}>
                    {products.length} {products.length === 1 ? 'product' : 'products'} available in stock
                </p>
            </motion.div>

            {/* Products Grid */}
            {products.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '2rem'
                }}>
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -10 }}
                            className="glass-panel"
                            style={{
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                position: 'relative',
                                overflow: 'hidden',
                                border: !product.inStock ? '1px solid #ffcdd2' : '1px solid var(--glass-border)',
                                opacity: !product.inStock ? 0.7 : 1
                            }}
                        >
                            {!product.inStock && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: '#ef5350',
                                    color: 'white',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '2rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    zIndex: 2
                                }}>OUT OF STOCK</div>
                            )}

                            {/* Product Image/Icon placeholder */}
                            <div style={{
                                height: '140px',
                                background: 'white',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '4rem',
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.03)'
                            }}>
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {categoryId === 'baby-products' ? '👶' :
                                        categoryId === 'skin-care' ? '🧴' :
                                            categoryId === 'health-drinks' ? '🥤' : '💊'}
                                </motion.div>
                            </div>

                            {/* Product Details */}
                            <div>
                                <h3 style={{ margin: '0.5rem 0 0.3rem', fontSize: '1.2rem', color: 'var(--text-dark)', minHeight: '3rem' }}>
                                    {product.name}
                                </h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                    {product.Category?.name || 'Essential Care'}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <span style={{ color: 'var(--primary-teal)', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                        ₹{product.finalPrice || product.rate}
                                    </span>
                                    {product.discount > 0 && (
                                        <span style={{ textDecoration: 'line-through', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                                            ₹{product.rate}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <motion.button
                                whileHover={{ scale: product.inStock ? 1.05 : 1 }}
                                whileTap={{ scale: product.inStock ? 0.95 : 1 }}
                                onClick={() => product.inStock && onAddToCart({
                                    ...product,
                                    price: product.finalPrice || product.rate
                                })}
                                disabled={!product.inStock}
                                style={{
                                    marginTop: 'auto',
                                    padding: '1rem',
                                    background: product.inStock ? 'var(--primary-teal)' : '#cfd8dc',
                                    color: 'white',
                                    borderRadius: '1rem',
                                    fontWeight: '600',
                                    width: '100%',
                                    fontSize: '1rem',
                                    boxShadow: product.inStock ? '0 4px 12px rgba(0, 137, 123, 0.25)' : 'none',
                                    border: 'none',
                                    cursor: product.inStock ? 'pointer' : 'not-allowed'
                                }}
                            >
                                {product.inStock ? 'Add to Cart 🛒' : 'Notify Me'}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-light)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
                    <h3>No products found in this category.</h3>
                    <p>Try exploring our other categories or check back later!</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;
