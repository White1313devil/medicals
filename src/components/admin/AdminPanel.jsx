import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardStats from './DashboardStats';
import InventoryManager from './InventoryManager';
import SalesManager from './SalesManager';

const AdminPanel = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('adminUser');
        if (user) {
            setAdminData(JSON.parse(user));
        }
    }, []);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'inventory', label: 'Inventory Management', icon: '💊' },
        { id: 'sales', label: 'Sales Records', icon: '💰' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardStats />;
            case 'inventory': return <InventoryManager />;
            case 'sales': return <SalesManager />;
            default: return <DashboardStats />;
        }
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'var(--bg-soft)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999 // Make sure it covers the main site
        }}>
            {/* Admin Sidebar */}
            <aside style={{
                width: '300px',
                background: 'white',
                borderRight: '1px solid var(--glass-border)',
                padding: '2.5rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh'
            }}>
                <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
                    <h2 className="gradient-text" style={{ fontSize: '1.8rem', margin: 0 }}>SM Admin</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.3rem' }}>Management Console v1.0</p>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {menuItems.map(item => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        width: '100%',
                                        padding: '1.2rem 1.5rem',
                                        borderRadius: '1.2rem',
                                        background: activeTab === item.id ? 'rgba(0, 137, 123, 0.1)' : 'transparent',
                                        color: activeTab === item.id ? 'var(--primary-teal)' : 'var(--text-dark)',
                                        fontWeight: activeTab === item.id ? '700' : '500',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s',
                                        border: 'none',
                                        outline: 'none'
                                    }}
                                >
                                    <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0 1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--primary-teal)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                            {adminData?.username?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div>
                            <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-dark)' }}>{adminData?.username || 'Admin User'}</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Administrator</span>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '1rem',
                            background: '#f8d7da',
                            color: '#721c24',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span>退出</span> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: '300px',
                flex: 1,
                padding: '3rem',
                minWidth: 0
            }}>
                <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                            {menuItems.find(i => i.id === activeTab)?.label}
                        </h1>
                        <p style={{ color: 'var(--text-light)' }}>Welcome back, administrator. Here's what's happening today.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ padding: '0.8rem 1.5rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <span style={{ color: 'var(--primary-teal)' }}>📅</span>
                            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminPanel;
