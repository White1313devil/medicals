# SM Web - Medical Products Management System

A full-stack web application for managing medical products, orders, customers, and suppliers with an admin panel.

## 🚀 Features

### Admin Panel
- ✅ **Admin Management** - Secure authentication with role-based access
- ✅ **Category Management** - Create, Read, Update, Delete (CRUD) categories
- ✅ **Product Management** - Full CRUD operations for products with inventory tracking
- ✅ **Order Management** - Complete order lifecycle management with status tracking
- ✅ **Customer Management** - Maintain customer database with contact information
- ✅ **Supplier Management** - Track suppliers and their details
- ✅ **Dashboard** - Real-time statistics and analytics

### Frontend
- 🎨 Modern, responsive UI built with React
- 🔥 Vite for fast development and optimized builds
- 📱 Mobile-friendly design

### Backend
- 🔐 Secure JWT-based authentication
- 💾 MySQL database with Sequelize ORM
- 🔄 RESTful API architecture
- 📊 Comprehensive database schema with relationships

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** (comes with Node.js)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "SM web/SM web"
```

### 2. Install Dependencies

#### Install Frontend Dependencies
```bash
npm install
```

#### Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=sm_web
JWT_SECRET=thisIsASuperSecretKey123!
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Important:** Replace `your_mysql_password` with your actual MySQL password.

### 4. Setup Database

Run the database setup script to create the database, tables, and insert sample data:

```bash
cd backend
npm run db:setup
```

This will:
- Create the `sm_web` database
- Create all necessary tables (Admins, Categories, Products, Orders, etc.)
- Insert sample data
- Create a default admin user (username: `admin`, password: `admin123`)

---

## 🚀 Running the Application

You have two options to run the application:

### Option 1: Run Frontend and Backend Separately

#### Terminal 1 - Backend Server:
```bash
npm run server
```
Backend will run on: `http://localhost:5000`

#### Terminal 2 - Frontend Development Server:
```bash
npm run dev
```
Frontend will run on: `http://localhost:5173` (or the port Vite assigns)

### Option 2: Run from Backend Directory

```bash
# From the backend directory
npm run server
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category (soft delete)

### Products
- `GET /api/products` - Get all products (with pagination & search)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (soft delete)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer (soft delete)

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get single supplier
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier (soft delete)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

---

## 🗄️ Database Schema

The application uses the following database tables:

1. **Admins** - Admin user credentials and roles
2. **Categories** - Product categories
3. **Products** - Product catalog with pricing and inventory
4. **Customers** - Customer information
5. **Orders** - Order summaries
6. **OrderItems** - Individual items in orders
7. **Suppliers** - Supplier information
8. **ActivityLogs** - Audit trail of admin activities

---

## 🔑 Default Credentials

After running the database setup, you can login with:

- **Username:** `admin`
- **Password:** `admin123`

**⚠️ Important:** Change these credentials in production!

---

## 🛠️ Available Scripts

### Frontend (Root Directory)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Run backend server from root

### Backend (Backend Directory)
- `npm run server` - Start backend with nodemon (auto-restart)
- `npm run dev` - Same as server
- `npm start` - Start backend in production mode
- `npm run db:setup` - Setup database with schema and sample data
- `npm run data:import` - Import seed data
- `npm run data:destroy` - Destroy seed data

---

## 📁 Project Structure

```
SM web/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/           # Route controllers
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── customerController.js
│   │   └── supplierController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication
│   ├── models/                # Sequelize models
│   │   ├── Admin.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Customer.js
│   │   ├── Supplier.js
│   │   └── ActivityLog.js
│   ├── routes/                # API routes
│   ├── scripts/
│   │   └── setupDatabase.js   # Database setup script
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server
│   └── package.json
├── database/
│   └── sm_web_database.sql    # Complete database schema
├── src/
│   ├── components/            # React components
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔧 Troubleshooting

### Database Connection Issues
1. Ensure MySQL is running
2. Verify credentials in `.env` file
3. Check if the user has proper permissions

### Port Already in Use
- Frontend: If port 5173 is busy, Vite will use the next available port
- Backend: Change `PORT` in `.env` file

### Module Not Found Errors
```bash
# Reinstall dependencies
npm install
cd backend
npm install
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Support

For issues and questions, please open an issue on the repository or contact the development team.

---

**Built with ❤️ using React, Node.js, Express, and MySQL**
