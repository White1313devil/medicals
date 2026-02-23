import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MedicinesPage from './components/MedicinesPage';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import FormPage from './components/FormPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    // Check for existing admin session
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsAdmin(true);
        }
    }, []);

    const handleAdminLogin = (userData) => {
        setIsAdmin(true);
        navigate('/admin/dashboard');
    };

    const handleAdminLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setIsAdmin(false);
        navigate('/');
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            setSelectedCategory(null);
            navigate('/products');
        }
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateCartQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart((prevCart) =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const isAdminRoute = location.pathname.startsWith('/admin');
    const isLoginPage = location.pathname === '/admin/login';

    return (
        <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Standard Header - Only for Public Pages */}
            {!isAdminRoute && (
                <Header
                    onNavigate={(page) => {
                        if (page === 'home') navigate('/');
                        else navigate(`/${page}`);
                    }}
                    activePage={location.pathname.replace('/', '') || 'home'}
                    cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
                    onSearch={handleSearch}
                />
            )}

            <main
                style={{
                    flex: 1,
                    width: '100%',
                    maxWidth: isAdminRoute ? '100%' : '100%', // Full width
                    margin: 0,
                    padding: 0,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <AnimatePresence mode='wait'>
                    <Routes location={location} key={location.pathname}>
                        {/* Public Routes */}
                        <Route path="/" element={<HeroSection onNavigate={(page) => navigate(`/${page}`)} />} />
                        <Route path="/medicines" element={
                            <MedicinesPage
                                onNavigate={(page) => navigate(`/${page}`)}
                                onSelectCategory={(category) => {
                                    setSelectedCategory(category);
                                    setSearchQuery('');
                                    navigate('/products');
                                }}
                            />
                        } />
                        <Route path="/products" element={
                            <ProductList
                                categoryId={selectedCategory}
                                searchQuery={searchQuery}
                                onAddToCart={addToCart}
                                onNavigate={(page) => navigate(`/${page}`)}
                            />
                        } />
                        <Route path="/cart" element={
                            <Cart
                                cart={cart}
                                onUpdateQuantity={updateCartQuantity}
                                onRemoveFromCart={removeFromCart}
                                onNavigate={(page) => navigate(`/${page}`)}
                            />
                        } />
                        <Route path="/form" element={<FormPage cart={cart} onRemoveFromCart={removeFromCart} />} />
                        <Route path="/order" element={<OrderForm cart={cart} onNavigate={(page) => navigate(`/${page}`)} />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
                        <Route
                            path="/admin/dashboard"
                            element={isAdmin ? <AdminPanel onLogout={handleAdminLogout} /> : <Navigate to="/admin/login" />}
                        />
                        {/* Default redirect for admin */}
                        <Route path="/admin" element={<Navigate to="/admin/login" />} />
                    </Routes>
                </AnimatePresence>
            </main>

            {/* Modern Footer - Only for Public Pages */}
            {!isAdminRoute && (
                <footer style={{
                    marginTop: 'auto',
                    background: 'linear-gradient(135deg, rgba(0, 89, 80, 0.95) 0%, rgba(0, 137, 123, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    borderTop: '1px solid rgba(0, 200, 150, 0.3)'
                }}>
                    <div className="container" style={{ padding: '3rem 1.5rem' }}>
                        {/* Main Footer Content */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '2.5rem',
                            marginBottom: '2rem'
                        }}>
                            {/* Brand Section */}
                            <div>
                                <div style={{
                                    fontSize: '2.5rem',
                                    marginBottom: '1rem',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(135deg, #00FF88, #00D4FF)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    💊 SM Medicals
                                </div>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    Your trusted partner in health and wellness. Quality medicines delivered with care.
                                </p>
                            </div>

                            {/* Location & Contact */}
                            <div>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    color: '#00FF88'
                                }}>📍 Location</h4>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.8',
                                    margin: 0
                                }}>
                                    Co-operative Colony<br />
                                    Near Foto Point<br />
                                    Achi Mess Opposite<br />
                                    <span style={{ fontWeight: '600', color: 'white' }}>SM Medicals Store</span>
                                </p>
                            </div>

                            {/* Contact & Hours */}
                            <div>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    color: '#00FF88'
                                }}>📞 Contact Us</h4>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.8'
                                }}>
                                    <p style={{ margin: '0.3rem 0', fontWeight: '600' }}>Medical Team:</p>
                                    <p style={{ margin: '0.3rem 0' }}>
                                        <a href="tel:+918508978916" style={{ color: '#00FF88', textDecoration: 'none' }}>+91 8508978916</a>
                                    </p>
                                    <p style={{ margin: '0.3rem 0' }}>
                                        <a href="tel:+919345253780" style={{ color: '#00FF88', textDecoration: 'none' }}>+91 9345253780</a>
                                    </p>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    color: '#00FF88'
                                }}>🔗 Quick Links</h4>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}>
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        onClick={() => navigate('/medicines')}
                                        style={{
                                            background: 'transparent',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            border: 'none',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            padding: 0,
                                            transition: 'color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#00FF88'}
                                        onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                                    >
                                        → Shop Medicines
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        onClick={() => navigate('/')}
                                        style={{
                                            background: 'transparent',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            border: 'none',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            padding: 0,
                                            transition: 'color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#00FF88'}
                                        onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                                    >
                                        → Track Order
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        onClick={() => navigate('/admin/login')}
                                        style={{
                                            background: 'transparent',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            border: 'none',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            padding: 0,
                                            transition: 'color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#00FF88'}
                                        onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                                    >
                                        → Admin Portal
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Bottom */}
                        <div style={{
                            borderTop: '1px solid rgba(0, 255, 136, 0.2)',
                            paddingTop: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: '0.85rem',
                                color: 'rgba(255, 255, 255, 0.7)',
                                marginBottom: '0.5rem'
                            }}>
                                <p style={{ margin: '0' }}>
                                    Founded with care by <span style={{ fontWeight: '600', color: '#00FF88' }}>Sathiyakala</span> • Managed by <span style={{ fontWeight: '600', color: '#00D4FF' }}>Senthil Murugan</span>
                                </p>
                            </div>
                            <p style={{
                                fontSize: '0.8rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                margin: '0'
                            }}>
                                © 2026 SM Medicals. All rights reserved. • Serving health with trust since 2010
                            </p>
                        </div>
                    </div>

                    {/* Footer Gradient Accent */}
                    <div style={{
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #00FF88, #00D4FF, transparent)',
                        opacity: 0.5
                    }} />
                </footer>
            )}
        </div>
    );
}

export default App;
