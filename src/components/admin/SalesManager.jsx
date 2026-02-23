import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SalesManager = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();
            if (response.ok) {
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredOrders = filter === 'All'
        ? orders
        : orders.filter(o => o.status === filter);

    if (isLoading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Orders...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                {['All', 'Order Placed', 'Delivered', 'Cancelled'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '0.6rem 1.5rem',
                            borderRadius: '2rem',
                            border: filter === f ? 'none' : '1px solid var(--glass-border)',
                            background: filter === f ? 'var(--primary-teal)' : 'white',
                            color: filter === f ? 'white' : 'var(--text-dark)',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="glass-panel" style={{ padding: '2rem', background: 'white' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Order Info</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Customer</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Items</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Total</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Status</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <p style={{ fontWeight: '600', margin: 0 }}>#{order.id}</p>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{new Date(order.createdAt).toLocaleString()}</span>
                                    </td>
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <p style={{ fontWeight: '500', margin: 0 }}>{order.customerName}</p>
                                    </td>
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <div style={{ maxWidth: '200px' }}>
                                            {order.items?.map((item, idx) => (
                                                <span key={idx} style={{ fontSize: '0.8rem', background: '#f5f5f5', padding: '0.2rem 0.5rem', borderRadius: '4px', marginRight: '4px', marginBottom: '4px', display: 'inline-block' }}>
                                                    {item.quantity}x {item.productName}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <p style={{ fontWeight: '700', color: 'var(--primary-teal)' }}>₹{order.totalPrice}</p>
                                    </td>
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <span style={{
                                            padding: '0.4rem 1rem',
                                            borderRadius: '2rem',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            background:
                                                order.status === 'Delivered' ? '#E8F5E9' :
                                                    order.status === 'Cancelled' ? '#FFEBEE' : '#FFF8E1',
                                            color:
                                                order.status === 'Delivered' ? '#2E7D32' :
                                                    order.status === 'Cancelled' ? '#C62828' : '#F9A825'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                            style={{
                                                padding: '0.4rem',
                                                borderRadius: '0.5rem',
                                                border: '1px solid #ddd',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            <option value="Order Placed">Placed</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesManager;
