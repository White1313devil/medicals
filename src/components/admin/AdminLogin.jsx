import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from '../../config/api';

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data));
                onLogin(data);
            } else {
                setError(data.message || '❌ Invalid username or password. Please check your credentials.');
            }
        } catch (err) {
            setError('⚠️ Cannot connect to server. Please ensure the backend is running on port 5000.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'var(--bg-gradient)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    padding: '3rem',
                    textAlign: 'center'
                }}
            >
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{
                        fontSize: '3.5rem',
                        marginBottom: '1rem',
                        display: 'inline-block'
                    }}>🛡️</div>
                    <h2 className="gradient-text" style={{ fontSize: '2.2rem', margin: 0 }}>Admin Portal</h2>
                    <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Log in to manage your medical shop</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            style={{
                                width: '100%',
                                padding: '1rem 1.2rem',
                                borderRadius: '1rem',
                                border: '1px solid var(--glass-border)',
                                background: 'white',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            style={{
                                width: '100%',
                                padding: '1rem 1.2rem',
                                borderRadius: '1rem',
                                border: '1px solid var(--glass-border)',
                                background: 'white',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ color: '#e53935', fontSize: '0.9rem', margin: '0' }}
                        >
                            ⚠️ {error}
                        </motion.p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#00796B' }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        style={{
                            background: 'var(--primary-teal)',
                            color: 'white',
                            padding: '1.2rem',
                            borderRadius: '1rem',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            marginTop: '1rem',
                            opacity: isLoading ? 0.7 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 8px 16px rgba(0, 137, 123, 0.25)'
                        }}
                    >
                        {isLoading ? 'Verifying...' : 'Access Dashboard'}
                    </motion.button>
                </form>

                <div style={{ marginTop: '2.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <p>© 2026 SM Medicals Management System</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
