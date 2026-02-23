import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS, CONFIG } from '../config/api';

const OrderForm = ({ cart, onNavigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        city: '',
        address: '',
        state: '',
        pincode: '',
        paymentMethod: 'card'
    });

    const [submitted, setSubmitted] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Load Razorpay script
        const res = await initializeRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load. Please check your internet connection.');
            return;
        }

        setPaymentProcessing(true);

        // Razorpay options
        const options = {
            key: CONFIG.RAZORPAY_KEY,
            amount: calculateTotal() * 100, // Amount in paise
            currency: 'INR',
            name: 'SM Medicals',
            description: 'Medicine Order Payment',
            image: '/smlogo.png',
            handler: async function (response) {
                // Payment successful
                console.log('Payment successful:', response);

                try {
                    const orderData = {
                        customerName: formData.name,
                        totalPrice: calculateTotal(),
                        items: cart.map(item => ({
                            productId: item.id,
                            productName: item.name,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    };

                    const apiResponse = await fetch(API_ENDPOINTS.ORDER_CREATE, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(orderData)
                    });

                    if (apiResponse.ok) {
                        setTransactionId(response.razorpay_payment_id);
                        setPaymentProcessing(false);
                        setSubmitted(true);
                    } else {
                        alert('❌ Order saved but payment processing had an issue. Our team will contact you.');
                    }
                } catch (err) {
                    alert(`❌ Payment error: ${err.message || 'An unexpected error occurred. Please try again.'}`);
                    setPaymentProcessing(false);
                    console.error('Order saving error:', err);
                    alert('Server error while saving order.');
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: '9999999999' // You can add a phone field to the form
            },
            notes: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode
            },
            theme: {
                color: '#00897B' // Your primary teal color
            },
            method: {
                // Enable specific payment methods based on user selection
                card: formData.paymentMethod === 'card',
                netbanking: formData.paymentMethod === 'netbanking',
                upi: formData.paymentMethod === 'upi',
                wallet: formData.paymentMethod === 'wallet'
            },
            modal: {
                ondismiss: function () {
                    setPaymentProcessing(false);
                    alert('Payment cancelled. Please try again.');
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    if (submitted) {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        textAlign: 'center',
                        padding: '3rem'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        style={{ fontSize: '6rem', marginBottom: '2rem' }}
                    >
                        ✅
                    </motion.div>
                    <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Order Confirmed!
                    </h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                        Thank you for your order, {formData.name}!
                    </p>
                    <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
                        Your order of ₹{calculateTotal()} will be delivered to your address soon.
                    </p>
                    {transactionId && (
                        <p style={{
                            color: 'var(--text-dark)',
                            fontSize: '0.9rem',
                            marginBottom: '2rem',
                            padding: '1rem',
                            background: 'rgba(0,137,123,0.1)',
                            borderRadius: '0.5rem'
                        }}>
                            <strong>Transaction ID:</strong> {transactionId}
                        </p>
                    )}
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
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
            >
                <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('cart')}
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
                        margin: '0 auto 2rem auto'
                    }}
                >
                    ← Back to Cart
                </motion.button>

                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Order Details
                </h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '3rem' }}>
                    Please fill in your details to complete the order
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2rem',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel"
                    style={{ padding: '2rem' }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)', textAlign: 'center' }}>
                        Order Summary
                    </h3>
                    <div style={{ marginBottom: '1rem' }}>
                        {cart.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.8rem',
                                color: 'var(--text-light)'
                            }}>
                                <span>{item.name} × {item.quantity}</span>
                                <span style={{ fontWeight: '600' }}>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        borderTop: '2px solid var(--glass-border)',
                        paddingTop: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        <span>Total:</span>
                        <span style={{ color: 'var(--primary-teal)' }}>₹{calculateTotal()}</span>
                    </div>
                </motion.div>

                {/* Order Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="glass-panel"
                    style={{ padding: '2rem' }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-dark)', textAlign: 'center' }}>
                        Contact Information
                    </h3>

                    <div className="grid-stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                                Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--glass-bg)',
                                    fontSize: '1rem',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                                Age *
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--glass-bg)',
                                    fontSize: '1rem',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--glass-bg)',
                                fontSize: '1rem',
                                backdropFilter: 'blur(10px)'
                            }}
                        />
                    </div>

                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '2rem', color: 'var(--text-dark)', textAlign: 'center' }}>
                        Delivery Address
                    </h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                            Address *
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows="3"
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--glass-bg)',
                                fontSize: '1rem',
                                backdropFilter: 'blur(10px)',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div className="grid-stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                                City *
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--glass-bg)',
                                    fontSize: '1rem',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                                State *
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--glass-bg)',
                                    fontSize: '1rem',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                            Pincode *
                        </label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{6}"
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--glass-bg)',
                                fontSize: '1rem',
                                backdropFilter: 'blur(10px)'
                            }}
                        />
                    </div>

                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)', textAlign: 'center' }}>
                        Payment Method
                    </h3>

                    <div style={{ marginBottom: '2rem' }}>
                        {[
                            { value: 'card', label: 'Credit / Debit Card', icon: '�', desc: 'Visa, Mastercard, Rupay, Amex' },
                            { value: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
                            { value: 'upi', label: 'UPI', icon: '�', desc: 'GPay, PhonePe, Paytm & more' },
                            { value: 'wallet', label: 'Wallets', icon: '💵', desc: 'Paytm, PhonePe, Freecharge' }
                        ].map((method) => (
                            <motion.label
                                key={method.value}
                                whileHover={{ scale: 1.02 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1.2rem',
                                    marginBottom: '1rem',
                                    borderRadius: '0.8rem',
                                    border: `2px solid ${formData.paymentMethod === method.value ? 'var(--primary-teal)' : 'var(--glass-border)'}`,
                                    background: formData.paymentMethod === method.value ? 'rgba(0,137,123,0.1)' : 'var(--glass-bg)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.value}
                                    checked={formData.paymentMethod === method.value}
                                    onChange={handleChange}
                                    style={{
                                        marginRight: '1rem',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    }}
                                />
                                <span style={{ fontSize: '1.8rem', marginRight: '1rem' }}>{method.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>
                                        {method.label}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                                        {method.desc}
                                    </div>
                                </div>
                            </motion.label>
                        ))}
                    </div>

                    {/* Payment Info Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            marginBottom: '2rem',
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, rgba(0,137,123,0.1), rgba(0,200,150,0.05))',
                            borderRadius: '1rem',
                            border: '2px solid var(--primary-teal)'
                        }}
                    >
                        <h4 style={{
                            fontSize: '1.2rem',
                            marginBottom: '1rem',
                            color: 'var(--text-dark)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            🔒 Secure Payment via Razorpay
                        </h4>

                        <div style={{
                            background: 'rgba(255,255,255,0.7)',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.95rem',
                            color: 'var(--text-light)',
                            lineHeight: '1.6'
                        }}>
                            <p style={{ margin: '0 0 0.8rem 0' }}>
                                ✓ Your payment is 100% secure and encrypted
                            </p>
                            <p style={{ margin: '0 0 0.8rem 0' }}>
                                ✓ You will be redirected to Razorpay payment gateway
                            </p>
                            <p style={{ margin: 0 }}>
                                ✓ Amount to pay: <strong style={{ color: 'var(--primary-teal)', fontSize: '1.1rem' }}>₹{calculateTotal()}</strong>
                            </p>
                        </div>
                    </motion.div>

                    <motion.button
                        type="submit"
                        disabled={paymentProcessing}
                        whileHover={{ scale: paymentProcessing ? 1 : 1.02 }}
                        whileTap={{ scale: paymentProcessing ? 1 : 0.98 }}
                        style={{
                            width: '100%',
                            padding: '1.2rem',
                            background: paymentProcessing ? 'var(--text-light)' : 'var(--primary-teal)',
                            color: 'white',
                            borderRadius: '1rem',
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: paymentProcessing ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 20px rgba(0,137,123,0.4)',
                            opacity: paymentProcessing ? 0.7 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {paymentProcessing ? (
                            <>
                                <span style={{
                                    display: 'inline-block',
                                    width: '20px',
                                    height: '20px',
                                    border: '3px solid rgba(255,255,255,0.3)',
                                    borderTopColor: 'white',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite'
                                }} />
                                Processing...
                            </>
                        ) : (
                            `Confirm Order & Pay ₹${calculateTotal()}`
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
};

export default OrderForm;
