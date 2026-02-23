-- ================================================================
-- SM Web Database Schema for MySQL 
-- Complete Database Setup with All Required Tables
-- ================================================================

-- Drop Database if exists (for clean setup)
DROP DATABASE IF EXISTS sm_web;

-- Create Database
CREATE DATABASE sm_web CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sm_web;

-- ================================================================
-- 1. Admins Table
-- Stores administrative user credentials with secure password hashing
-- ================================================================
CREATE TABLE Admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'manager') DEFAULT 'admin',
    isActive BOOLEAN DEFAULT TRUE,
    lastLogin DATETIME NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_active (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 2. Categories Table
-- Stores product categories with soft delete and active status
-- ================================================================
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    slug VARCHAR(255) NULL UNIQUE,
    isActive BOOLEAN DEFAULT TRUE,
    displayOrder INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME DEFAULT NULL,
    INDEX idx_name (name),
    INDEX idx_slug (slug),
    INDEX idx_active (isActive),
    INDEX idx_deleted (deletedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 3. Products Table
-- Stores product details linked to categories with pricing and inventory
-- ================================================================
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoryId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    sku VARCHAR(100) NULL UNIQUE,
    rate DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    finalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    inStock BOOLEAN DEFAULT TRUE,
    stockQuantity INT DEFAULT 0,
    minStockLevel INT DEFAULT 0,
    manufacturer VARCHAR(255) NULL,
    expiryDate DATE NULL,
    batchNumber VARCHAR(100) NULL,
    imageUrl VARCHAR(500) NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME DEFAULT NULL,
    FOREIGN KEY (categoryId) REFERENCES Categories(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_category (categoryId),
    INDEX idx_name (name),
    INDEX idx_sku (sku),
    INDEX idx_stock (inStock),
    INDEX idx_deleted (deletedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 4. Customers Table
-- Stores customer information for order tracking
-- ================================================================
CREATE TABLE Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) NULL,
    pincode VARCHAR(10) NULL,
    gstNumber VARCHAR(20) NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME DEFAULT NULL,
    INDEX idx_name (name),
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_deleted (deletedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 5. Orders Table
-- Stores customer order summaries with payment and delivery tracking
-- ================================================================
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderNumber VARCHAR(50) NOT NULL UNIQUE,
    customerId INT NULL,
    customerName VARCHAR(255) NOT NULL,
    customerEmail VARCHAR(255) NULL,
    customerPhone VARCHAR(20) NULL,
    customerAddress TEXT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discountAmount DECIMAL(10, 2) DEFAULT 0.00,
    taxAmount DECIMAL(10, 2) DEFAULT 0.00,
    finalAmount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status ENUM('Pending', 'Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned') DEFAULT 'Order Placed',
    paymentStatus ENUM('Pending', 'Paid', 'Failed', 'Refunded') DEFAULT 'Pending',
    paymentMethod ENUM('Cash', 'Card', 'UPI', 'Net Banking', 'Other') DEFAULT 'Cash',
    deliveryDate DATE NULL,
    notes TEXT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES Customers(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_order_number (orderNumber),
    INDEX idx_customer (customerId),
    INDEX idx_status (status),
    INDEX idx_payment_status (paymentStatus),
    INDEX idx_created (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 6. OrderItems Table
-- Stores individual items within an order
-- ================================================================
CREATE TABLE OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    productName VARCHAR(255) NOT NULL,
    productSku VARCHAR(100) NULL,
    quantity INT DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    totalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (orderId) REFERENCES Orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_order (orderId),
    INDEX idx_product (productId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 7. Suppliers Table (Optional - for inventory management)
-- Stores supplier information
-- ================================================================
CREATE TABLE Suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contactPerson VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) NULL,
    gstNumber VARCHAR(20) NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME DEFAULT NULL,
    INDEX idx_name (name),
    INDEX idx_active (isActive),
    INDEX idx_deleted (deletedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 8. ActivityLogs Table
-- Tracks all admin activities for audit purposes
-- ================================================================
CREATE TABLE ActivityLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adminId INT NULL,
    adminUsername VARCHAR(255) NULL,
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NULL,
    entityId INT NULL,
    description TEXT NULL,
    ipAddress VARCHAR(45) NULL,
    userAgent TEXT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES Admins(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_admin (adminId),
    INDEX idx_action (action),
    INDEX idx_entity (entity),
    INDEX idx_created (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- Insert Default Admin User
-- Username: admin
-- Password: admin123 (hashed with bcrypt)
-- ================================================================
-- Note: This is a bcrypt hash of "admin123" with salt rounds = 10
INSERT INTO Admins (username, email, password, role, isActive) 
VALUES 
    ('admin', 'admin@smweb.com', '$2a$10$Xo3xyZvN5QZ6KJn5pR7aEOzM.2KRO7P8YAU8m8Q4W5bW5kqZc0mH6', 'super_admin', TRUE),
    ('manager', 'manager@smweb.com', '$2a$10$Xo3xyZvN5QZ6KJn5pR7aEOzM.2KRO7P8YAU8m8Q4W5bW5kqZc0mH6', 'manager', TRUE);

-- ================================================================
-- Insert Sample Categories
-- ================================================================
INSERT INTO Categories (name, description, slug, isActive, displayOrder) 
VALUES 
    ('Medicines', 'General medicines and pharmaceuticals', 'medicines', TRUE, 1),
    ('Surgical Items', 'Surgical equipment and supplies', 'surgical-items', TRUE, 2),
    ('First Aid', 'First aid kits and supplies', 'first-aid', TRUE, 3),
    ('Personal Care', 'Personal care and hygiene products', 'personal-care', TRUE, 4),
    ('Health Supplements', 'Vitamins and health supplements', 'health-supplements', TRUE, 5);

-- ================================================================
-- Insert Sample Products
-- ================================================================
INSERT INTO Products (categoryId, name, description, sku, rate, discount, finalPrice, inStock, stockQuantity, minStockLevel) 
VALUES 
    (1, 'Paracetamol 500mg', 'Pain relief and fever reducer', 'MED-001', 50.00, 5.00, 45.00, TRUE, 100, 20),
    (1, 'Ibuprofen 400mg', 'Anti-inflammatory medication', 'MED-002', 80.00, 10.00, 70.00, TRUE, 75, 15),
    (2, 'Surgical Gloves (Pack of 100)', 'Sterile latex gloves', 'SUR-001', 300.00, 30.00, 270.00, TRUE, 50, 10),
    (2, 'Surgical Mask (Pack of 50)', 'Disposable face masks', 'SUR-002', 150.00, 15.00, 135.00, TRUE, 200, 30),
    (3, 'First Aid Kit', 'Complete first aid kit', 'FA-001', 500.00, 50.00, 450.00, TRUE, 25, 5),
    (4, 'Hand Sanitizer 500ml', 'Alcohol-based hand sanitizer', 'PC-001', 120.00, 12.00, 108.00, TRUE, 150, 25),
    (5, 'Vitamin C Tablets', 'Immune system support', 'SUP-001', 200.00, 20.00, 180.00, TRUE, 80, 15);

-- ================================================================
-- Insert Sample Customers
-- ================================================================
INSERT INTO Customers (name, email, phone, address, city, state, pincode) 
VALUES 
    ('John Doe', 'john@example.com', '9876543210', '123 Main Street', 'Mumbai', 'Maharashtra', '400001'),
    ('Jane Smith', 'jane@example.com', '9876543211', '456 Park Avenue', 'Delhi', 'Delhi', '110001'),
    ('Robert Johnson', 'robert@example.com', '9876543212', '789 Lake Road', 'Bangalore', 'Karnataka', '560001');


-- ================================================================
-- Database Setup Complete
-- ================================================================
-- Total Tables: 8 (Admins, Categories, Products, Customers, Orders, OrderItems, Suppliers, ActivityLogs)
-- Default Admin Created: username = 'admin', password = 'admin123'
-- Sample Data Inserted: Categories, Products, Customers
-- Note: Order numbers are auto-generated in the application code (backend/models/Order.js)
-- ================================================================
