import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/productsData';

const MedicinesPage = ({ onNavigate, onSelectCategory }) => {
    const handleCategoryClick = (categoryId) => {
        onSelectCategory(categoryId);
        onNavigate('products');
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    Shop by Category
                </h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                    Browse our wide range of medicines, skincare, baby products, and health drinks.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCategoryClick(category.id)}
                        className="glass-panel"
                        style={{
                            padding: '3rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Animated background effect */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'radial-gradient(circle at center, rgba(0,137,123,0.1), transparent)',
                                opacity: 0
                            }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Icon */}
                        <motion.div
                            style={{
                                fontSize: '5rem',
                                zIndex: 1
                            }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {category.icon}
                        </motion.div>

                        {/* Category Name */}
                        <h3 style={{
                            fontSize: '1.5rem',
                            color: 'var(--text-dark)',
                            marginBottom: '0.5rem',
                            zIndex: 1,
                            fontWeight: '700'
                        }}>
                            {category.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                            color: 'var(--text-light)',
                            fontSize: '0.95rem',
                            zIndex: 1,
                            lineHeight: '1.6'
                        }}>
                            {category.description}
                        </p>

                        {/* Browse button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{
                                marginTop: 'auto',
                                padding: '0.8rem 2rem',
                                background: 'var(--primary-teal)',
                                color: 'white',
                                borderRadius: '2rem',
                                fontWeight: '600',
                                fontSize: '0.95rem',
                                zIndex: 1,
                                boxShadow: '0 4px 15px rgba(0,137,123,0.3)'
                            }}
                        >
                            Browse Products →
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Additional info section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                    marginTop: '4rem',
                    padding: '2rem',
                    textAlign: 'center',
                    color: 'var(--text-light)'
                }}
            >
                <p style={{ fontSize: '1rem' }}>
                    💊 Quality products • 🚚 Fast delivery • 💯 Trusted by thousands
                </p>
            </motion.div>
        </div>
    );
};

export default MedicinesPage;
