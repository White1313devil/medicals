import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onNavigate, activePage, cartCount, onSearch }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for header shadow
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'medicines', label: 'Medicines', icon: '💊' },
        { id: 'cart', label: 'Cart', icon: '🛒', badge: cartCount > 0 ? cartCount : null },
    ];

    const handleNavClick = (pageId) => {
        onNavigate(pageId);
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* --- DESKTOP HEADER (> 1024px) --- */}
            <motion.header
                className="desktop-header glass-panel"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'sticky',
                    top: '1rem',
                    margin: '0 2rem',
                    padding: '0.8rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 1000,
                    borderRadius: 'var(--radius-full)',
                    background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'var(--glass-bg)',
                    boxShadow: scrolled ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                    transition: 'all 0.3s ease'
                }}
            >
                {/* Logo Area */}
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }} onClick={() => handleNavClick('home')}>
                    <img src="/smlogo.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
                    <div>
                        <h1 style={{ fontSize: '1.5rem', color: 'var(--primary-teal)', margin: 0, lineHeight: 1 }}>SM Medicals</h1>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', margin: 0 }}>(senthil murugan thunai)</p>
                    </div>
                </div>

                {/* Desktop Search */}
                <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search medicines..."
                        onChange={(e) => onSearch && onSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.7rem 1.2rem 0.7rem 2.8rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(255,255,255,0.5)',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'all 0.3s'
                        }}
                    />
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>🔍</span>
                </div>

                {/* Navigation Links */}
                <nav>
                    <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleNavClick(item.id)}
                                    style={{
                                        background: activePage === item.id ? 'var(--primary-teal)' : 'transparent',
                                        color: activePage === item.id ? 'white' : 'var(--text-dark)',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '2rem',
                                        fontSize: '1rem',
                                        fontWeight: activePage === item.id ? '600' : '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        border: activePage === item.id ? 'none' : '1px solid transparent'
                                    }}
                                >
                                    {item.label}
                                    {item.badge && (
                                        <span style={{
                                            background: activePage === item.id ? 'white' : 'var(--secondary-green)',
                                            color: activePage === item.id ? 'var(--primary-teal)' : 'white',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                            padding: '0.1rem 0.5rem',
                                            borderRadius: '1rem',
                                            minWidth: '1.2rem',
                                            textAlign: 'center'
                                        }}>
                                            {item.badge}
                                        </span>
                                    )}
                                </motion.button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </motion.header>


            {/* --- MOBILE & TABLET HEADER (< 1024px) --- */}
            <motion.header
                className="mobile-header"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 'var(--header-height-mobile)',
                    background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(15px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 1.5rem',
                    zIndex: 1000,
                    borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: scrolled ? 'var(--shadow-sm)' : 'none'
                }}
            >
                {/* Hamburger Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        zIndex: 1002
                    }}
                >
                    <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 7 : 0 }} style={{ width: '24px', height: '2px', background: 'var(--text-dark)', borderRadius: '2px' }} />
                    <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} style={{ width: '24px', height: '2px', background: 'var(--text-dark)', borderRadius: '2px' }} />
                    <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -7 : 0 }} style={{ width: '24px', height: '2px', background: 'var(--text-dark)', borderRadius: '2px' }} />
                </button>

                {/* Center Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 1002 }} onClick={() => handleNavClick('home')}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-teal)' }}>SM Medicals</span>
                </div>

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1002 }}>
                    {/* Search Toggle */}
                    <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} style={{ background: 'none', fontSize: '1.3rem' }}>
                        🔍
                    </button>
                    {/* Cart Icon */}
                    <button onClick={() => handleNavClick('cart')} style={{ background: 'none', position: 'relative', fontSize: '1.3rem' }}>
                        🛒
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-8px',
                                background: 'var(--secondary-green)',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Search Bar (Expandable) */}
            <AnimatePresence>
                {isMobileSearchOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 'var(--header-height-mobile)',
                            left: 0,
                            right: 0,
                            background: 'white',
                            padding: '1rem',
                            borderBottom: '1px solid var(--glass-border)',
                            zIndex: 999,
                            overflow: 'hidden'
                        }}
                    >
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search medicines..."
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem 1.2rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--primary-teal)',
                                background: 'var(--bg-soft)',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: '80%', // Drawer width
                            maxWidth: '300px',
                            background: 'white',
                            zIndex: 1001,
                            padding: '6rem 2rem 2rem',
                            boxShadow: 'var(--shadow-lg)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <h3 style={{ marginBottom: '2rem', color: 'var(--text-light)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Menu</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavClick(item.id)}
                                        style={{
                                            background: 'none',
                                            fontSize: '1.2rem',
                                            width: '100%',
                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            color: activePage === item.id ? 'var(--primary-teal)' : 'var(--text-dark)',
                                            fontWeight: activePage === item.id ? '700' : '400'
                                        }}
                                    >
                                        <span style={{ fontSize: '1.5rem', width: '30px' }}>{item.icon}</span>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div style={{ marginTop: 'auto' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', textAlign: 'center' }}>
                                SM Medicals App v1.0
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(3px)',
                            zIndex: 1000
                        }}
                    />
                )}
            </AnimatePresence>

            <style>{`
                /* Default: Show Desktop Header, Hide Mobile Header */
                .desktop-header { display: flex; }
                .mobile-header { display: none !important; }

                /* Responsiveness (< 1024px) */
                @media (max-width: 1024px) {
                    .desktop-header { display: none !important; }
                    .mobile-header { display: flex !important; }
                }
            `}</style>
        </>
    );
};

export default Header;
