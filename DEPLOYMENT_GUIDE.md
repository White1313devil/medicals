# SM Medicals - Render Deployment Guide

## Quick Start for Render Deployment

### Prerequisites
- GitHub account with your repo pushed
- Render account (render.com)
- MySQL database (use Render or external service)

### Step-by-Step Deployment

#### 1. **Prepare the Repository**
```bash
# Make sure all files are pushed to GitHub
git add .
git commit -m "Deployment ready"
git push origin main
```

#### 2. **Create Render Service**

**Option A: Using render.yaml (Recommended)**
- The `render.yaml` file already exists in the root
- Render will automatically use it during deployment

**Option B: Manual Setup in Render Dashboard**
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Configure:
   - **Name:** sm-medicals
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build && cd backend && npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid)

#### 3. **Set Environment Variables**

Add these in Render Dashboard > Environment Variables:

```
NODE_ENV=production
PORT=10000
DB_HOST=<your-mysql-host>
DB_USER=<your-mysql-user>
DB_PASSWORD=<your-mysql-password>
DB_NAME=<your-mysql-database>
JWT_SECRET=<generate-a-secure-key>
RAZORPAY_KEY_ID=<your-key>
RAZORPAY_KEY_SECRET=<your-secret>
FRONTEND_URL=https://<your-app>.onrender.com
```

#### 4. **Database Setup**

You have two options:

**Option A: Use Render PostgreSQL (requires migration)**
- Create a Postgres database on Render
- Update db.js to use PostgreSQL instead of MySQL

**Option B: Use External MySQL (Recommended for now)**
- Use your current local MySQL setup or
- Use a cloud service like:
  - PlanetScale (MySQL compatible)
  - Aiven
  - AWS RDS
  - Digital Ocean Managed Database

#### 5. **Initial Deployment**

1. Render will automatically detect changes and redeploy
2. Check deployment logs in Render Dashboard
3. Your app will be live at: `https://<your-app>.onrender.com`

### Troubleshooting

#### Error: "Missing script: start"
✅ Fixed! Root `package.json` now has proper start script.

#### Error: "Cannot find module"
- Check that all dependencies are installed
- Verify `node_modules` is not in `.gitignore`
- Run: `cd backend && npm install`

#### Error: "Database connection failed"
- Verify DB credentials in Environment Variables
- Ensure database is accessible from Render
- Check firewall/security rules

#### Error: "Frontend not loading"
- The `npm run build` command should create `/dist` folder
- Backend is configured to serve static files from `/dist`
- Check Render build logs for Vite build errors

### File Structure Expected by Render

```
SM-MEDICALS--main/
├── package.json (has "start" script)
├── .env.production
├── render.yaml
├── src/
│   └── ... (React frontend)
├── dist/ (created after build)
│   └── index.html (served by backend)
├── backend/
│   ├── package.json (has "start" script)
│   ├── server.js
│   ├── .env.production
│   └── ... (Node backend)
└── ... (other files)
```

### Important Notes

1. **Build Process**
   - Render runs: `npm run build` → creates `/dist`
   - Then: `cd backend && npm install` → installs backend deps
   - Finally: `npm start` → runs backend server which serves frontend

2. **Static Files**
   - React build output goes to `/dist`
   - Backend serves `/dist/index.html` for SPA routing
   - API routes like `/api/*` go to Express handlers

3. **Port Configuration**
   - Render assigns PORT automatically (usually 10000)
   - Process listens on `process.env.PORT || 5000`
   - Don't hardcode port 5000

4. **Environment Variables**
   - Production uses `.env.production`
   - Render environment variables override file values
   - Never commit real secrets to GitHub

### Production Checklist

- [ ] All scripts added to package.json
- [ ] Backend configured to serve static frontend
- [ ] Environment variables set in Render
- [ ] Database connection working
- [ ] Build process completes successfully
- [ ] Frontend loads and API calls work
- [ ] Admin login functions properly
- [ ] Products can be added/edited/deleted
- [ ] Data persists in database

### Deployment URLs

Once deployed, your app will be available at:
- **Frontend:** https://<your-app>.onrender.com
- **API:** https://<your-app>.onrender.com/api
- **Health Check:** https://<your-app>.onrender.com/api/health
- **Admin Login:** https://<your-app>.onrender.com/admin/login

### Monitoring

Use Render Dashboard to:
- View deployment logs
- Monitor CPU/Memory usage
- Set up email notifications
- View error logs

### Support

For issues:
1. Check Render deployment logs
2. Verify environment variables
3. Test API with: `https://<your-app>.onrender.com/api/health`
4. Check browser console for frontend errors

---

**Happy Deploying!** 🚀
