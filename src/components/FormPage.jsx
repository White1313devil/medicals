import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FormPage = ({ cart = [], onRemoveFromCart = () => { } }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        contact: '',
        upiId: '',
        issue: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18; // 18% GST estimate
    const total = subtotal + gst;

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cart.length === 0 && !formData.issue) {
            alert("Please add items to cart or describe an issue.");
            return;
        }

        setStatus('submitting');

        const orderDetails = cart.map(item => `${item.name} x${item.quantity} (₹${item.price * item.quantity})`).join('\n');
        const messageBody = `
New Order/Consultation Request:
-----------------------------
Name: ${formData.name}
Age: ${formData.age}
Contact: ${formData.contact}
UPI ID: ${formData.upiId}

Order Details:
${orderDetails || 'No items in cart'}

Subtotal: ₹${subtotal}
GST (18%): ₹${gst.toFixed(2)}
Total Amount: ₹${total.toFixed(2)}

Medical Issue/Notes:
${formData.issue || 'None'}
`;

        const formDataToSend = new FormData();
        formDataToSend.append('access_key', '1e7cf237-83ad-4c8b-b98d-3620bc454927');
        formDataToSend.append('name', formData.name);
        formDataToSend.append('subject', `New Order from ${formData.name} - ₹${total.toFixed(2)}`);
        formDataToSend.append('message', messageBody);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({
                    name: '',
                    age: '',
                    contact: '',
                    upiId: '',
                    issue: ''
                });
            } else {
                console.error("Error", data);
                setStatus('error');
            }
        } catch (error) {
            console.error("Error", error);
            setStatus('error');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1000px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                    Checkout & Consultation
                </h2>

                <div className="grid-stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Cart Summary Section */}
                    <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0.5rem', textAlign: 'center' }}>
                            Your Cart ({cart.reduce((a, c) => a + c.quantity, 0)} items)
                        </h3>

                        {cart.length === 0 ? (
                            <p style={{ color: 'var(--text-light)', textAlign: 'center', margin: '2rem 0' }}>Your cart is empty.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                                {cart.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: '600' }}>{item.name}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                                ₹{item.price} x {item.quantity}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <p style={{ fontWeight: 'bold' }}>₹{item.price * item.quantity}</p>
                                            <button
                                                onClick={() => onRemoveFromCart(item.id)}
                                                style={{ color: 'red', background: 'none', fontSize: '1.2rem' }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-light)' }}>
                                <span>GST (18%)</span>
                                <span>₹{gst.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-teal)', marginTop: '1rem' }}>
                                <span>Total Amount</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Form Section */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        {status === 'success' ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{ textAlign: 'center', padding: '2rem 0' }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Order Placed!</h3>
                                <p style={{ marginBottom: '2rem' }}>We will verify your payment and details and contact you shortly.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="neon-effect"
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        color: 'white',
                                        background: 'var(--primary-teal)',
                                        borderRadius: 'var(--radius-lg)',
                                        fontWeight: '600'
                                    }}
                                >
                                    Place New Order
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Order Details</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="grid-stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label>Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            required
                                            value={formData.age}
                                            onChange={handleChange}
                                            style={inputStyle}
                                            placeholder="25"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label>Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="contact"
                                            required
                                            value={formData.contact}
                                            onChange={handleChange}
                                            style={inputStyle}
                                            placeholder="+91"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label>UPI ID (for payment verification)</label>
                                    <input
                                        type="text"
                                        name="upiId"
                                        required
                                        value={formData.upiId}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="username@bank"
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label>Medical Issue / Notes (Optional)</label>
                                    <textarea
                                        name="issue"
                                        rows="3"
                                        value={formData.issue}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, resize: 'none' }}
                                        placeholder="Describe any symptoms or add notes..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="neon-effect"
                                    style={{
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: 'white',
                                        background: 'var(--primary-teal)',
                                        borderRadius: 'var(--radius-lg)',
                                        opacity: status === 'submitting' ? 0.7 : 1,
                                        cursor: status === 'submitting' ? 'wait' : 'pointer'
                                    }}
                                >
                                    {status === 'submitting' ? 'Processing...' : `Pay & Place Order (₹${total.toFixed(2)})`}
                                </motion.button>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const inputStyle = {
    padding: '0.8rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(0,0,0,0.1)',
    background: 'rgba(255,255,255,0.8)',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s'
};

export default FormPage;
