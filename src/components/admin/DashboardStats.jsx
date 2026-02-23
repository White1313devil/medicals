import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DashboardStats = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalCategories: 0,
        totalSales: 0,
        recentOrders: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/dashboard/stats');
                const data = await response.json();
                if (response.ok) {
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Medicines', value: stats.totalProducts, icon: '💊', color: '#E0F2F1', textColor: '#00796B' },
        { title: 'Total Orders', value: stats.totalOrders, icon: '📦', color: '#E3F2FD', textColor: '#1976D2' },
        { title: 'Sales Revenue', value: `₹${stats.totalSales.toLocaleString()}`, icon: '💰', color: '#F1F8E9', textColor: '#388E3C' },
        { title: 'Categories', value: stats.totalCategories, icon: '🏷️', color: '#FFF3E0', textColor: '#F57C00' },
    ];

    if (isLoading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading statistics...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Stats Overview */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '2rem'
            }}>
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{
                            padding: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '1.2rem',
                            background: card.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem'
                        }}>
                            {card.icon}
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '0.3rem' }}>{card.title}</p>
                            <h3 style={{ fontSize: '1.8rem', color: card.textColor, margin: 0 }}>{card.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders List */}
            <div className="glass-panel" style={{ padding: '2.5rem', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>Recent Transactions</h2>
                    <button style={{ color: 'var(--primary-teal)', fontWeight: '600', background: 'none' }}>View All Orders</button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '1.2rem 1rem', color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '600' }}>Order ID</th>
                                <th style={{ padding: '1.2rem 1rem', color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '600' }}>Customer</th>
                                <th style={{ padding: '1.2rem 1rem', color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '600' }}>Date</th>
                                <th style={{ padding: '1.2rem 1rem', color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '600' }}>Amount</th>
                                <th style={{ padding: '1.2rem 1rem', color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '600' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.length > 0 ? stats.recentOrders.map((order) => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                    <td style={{ padding: '1.2rem 1rem', fontWeight: '600' }}>#{order.id}</td>
                                    <td style={{ padding: '1.2rem 1rem' }}>{order.customerName}</td>
                                    <td style={{ padding: '1.2rem 1rem', color: 'var(--text-light)' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1.2rem 1rem', fontWeight: '700', color: 'var(--primary-teal)' }}>₹{order.totalPrice}</td>
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <span style={{
                                            padding: '0.4rem 1rem',
                                            borderRadius: '2rem',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            background: order.status === 'Delivered' ? '#E8F5E9' : '#FFF8E1',
                                            color: order.status === 'Delivered' ? '#2E7D32' : '#F9A825'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)' }}>No recent orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
