import React from 'react';
import { motion } from 'framer-motion';

const Cart = ({ cart, onUpdateQuantity, onRemoveFromCart, onNavigate }) => {
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>🛒</div>
                    <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Your Cart is Empty
                    </h2>
                    <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        Add some products to get started!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('medicines')}
                        style={{
                            padding: '1rem 2.5rem',
                            background: 'var(--primary-teal)',
                            color: 'white',
                            borderRadius: '2rem',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0,137,123,0.3)'
                        }}
                    >
                        Continue Shopping
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
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
                        backdropFilter: 'blur(10px)',
                        margin: '0 auto 2rem auto' // Center the button too
                    }}
                >
                    ← Continue Shopping
                </motion.button>

                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Shopping Cart
                </h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '3rem' }}>
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2rem',
                maxWidth: '900px',
                margin: '0 auto'
            }}>
                {/* Cart Items */}
                {cart.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-panel grid-stack-mobile"
                        style={{
                            padding: '2rem',
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr auto',
                            gap: '2rem',
                            alignItems: 'center'
                        }}
                    >
                        {/* Product Icon */}
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
                        }}>
                            {item.image}
                        </div>

                        {/* Product Details */}
                        <div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                                {item.name}
                            </h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                {item.quantity}
                            </p>
                            <p style={{ color: 'var(--primary-teal)', fontWeight: 'bold', fontSize: '1.3rem' }}>
                                ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                            </p>

                            {/* Quantity Controls */}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'var(--glass-bg)',
                                        border: '1px solid var(--glass-border)',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-dark)'
                                    }}
                                >
                                    −
                                </motion.button>

                                <span style={{ fontSize: '1.2rem', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>
                                    {item.quantity}
                                </span>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'var(--primary-teal)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                >
                                    +
                                </motion.button>
                            </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemoveFromCart(item.id)}
                            style={{
                                background: 'rgba(244, 67, 54, 0.1)',
                                border: '1px solid rgba(244, 67, 54, 0.3)',
                                color: '#f44336',
                                padding: '0.8rem 1.2rem',
                                borderRadius: '1rem',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}
                        >
                            🗑️ Remove
                        </motion.button>
                    </motion.div>
                ))}

                {/* Cart Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel"
                    style={{
                        padding: '2rem',
                        background: 'linear-gradient(135deg, rgba(0,137,123,0.1), rgba(0,200,150,0.05))'
                    }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
                        Order Summary
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        <span style={{ color: 'var(--text-light)' }}>Subtotal:</span>
                        <span style={{ fontWeight: '600' }}>₹{calculateTotal()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        <span style={{ color: 'var(--text-light)' }}>Delivery:</span>
                        <span style={{ fontWeight: '600', color: 'var(--secondary-green)' }}>FREE</span>
                    </div>

                    <div style={{
                        borderTop: '2px solid var(--glass-border)',
                        paddingTop: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '2rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        <span>Total:</span>
                        <span style={{ color: 'var(--primary-teal)' }}>₹{calculateTotal()}</span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onNavigate('order')}
                        style={{
                            width: '100%',
                            padding: '1.2rem',
                            background: 'var(--primary-teal)',
                            color: 'white',
                            borderRadius: '1rem',
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(0,137,123,0.4)'
                        }}
                    >
                        Place Order →
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Cart;
