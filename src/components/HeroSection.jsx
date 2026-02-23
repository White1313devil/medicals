import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = ({ onNavigate }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 1.5rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle, rgba(0,137,123,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                zIndex: -1
            }} />

            <div className="container grid-stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <motion.div
                    style={{ y: y1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span style={{
                        color: 'var(--accent-blue)',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.9rem'
                    }}>
                        Trusted Healthcare 2026
                    </span>
                    <h2 style={{
                        fontSize: '4rem',
                        fontWeight: '800',
                        lineHeight: 1.1,
                        margin: '1.5rem 0',
                        color: 'var(--text-dark)'
                    }}>
                        Your Health Is <br />
                        <span className="gradient-text">Our Priority</span>
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-light)',
                        maxWidth: '500px',
                        marginBottom: '2.5rem'
                    }}>
                        Experience the future of pharmacy with SM Medicals.
                        Premium branded medicines and essential care products delivered with trust.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('medicines')}
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: 'white',
                                background: 'var(--primary-teal)',
                                borderRadius: 'var(--radius-full)',
                                boxShadow: 'var(--shadow-lg)'
                            }}
                        >
                            Order Medicine
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onNavigate('form')}
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: 'var(--primary-teal)',
                                background: 'white',
                                border: '2px solid var(--primary-teal)',
                                borderRadius: 'var(--radius-full)'
                            }}
                        >
                            Contact Us
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: y2, position: 'relative' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    {/* Abstract Medical Representation - CSS Shape */}
                    <div style={{
                        width: '100%',
                        height: '500px',
                        background: 'linear-gradient(45deg, var(--bg-soft), #e0f2f1)',
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 0 50px rgba(255,255,255,0.5)',
                        animation: 'morph 8s ease-in-out infinite'
                    }}>
                        {/* 
                Placeholder for a robust image. 
                Using a pill graphic made of CSS or SVGs 
             */}
                        <div style={{
                            position: 'relative',
                            fontSize: '10rem'
                        }}>
                            💊
                        </div>

                        {/* Micro interaction floating cards */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="glass-panel"
                            style={{
                                position: 'absolute',
                                top: '20%',
                                left: '-10%',
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary-green)' }}></div>
                            <div>
                                <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Fast Delivery</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Within 24 Hours</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="glass-panel"
                            style={{
                                position: 'absolute',
                                bottom: '15%',
                                right: '-5%',
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
                            <div>
                                <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>100% Genuine</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Certified Products</p>
                            </div>
                        </motion.div>

                    </div>
                    <style>{`
            @keyframes morph {
              0% { borderRadius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
              50% { borderRadius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
              100% { borderRadius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            }
          `}</style>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
