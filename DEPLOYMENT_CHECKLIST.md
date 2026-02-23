# ✅ Deployment Checklist - SM Medicals on Render

## Pre-Deployment Checks

### Code & Configuration
- [x] `package.json` has `"start"` script → `cd backend && npm start`
- [x] `backend/package.json` has `"start"` script → `node server.js`
- [x] `package.json` has proper build script
- [x] `.env` file configured for development
- [x] `.env.production` file created
- [x] `render.yaml` file configured
- [x] Backend server serves static frontend files from `/dist`
- [x] API Base URL configured to work in production

### Backend Configuration
- [x] Server listens on `process.env.PORT`
- [x] CORS enabled for all origins (or configured for production)
- [x] Database connection uses environment variables
- [x] JWT secret uses environment variable
- [x] Express serves `/dist` folder for static files
- [x] SPA fallback route configured for React Router

### Frontend Configuration
- [x] API config switches between dev and production URLs
- [x] Environment variables use Vite format (`VITE_*`)
- [x] Build output goes to `/dist`
- [x] All API calls go through centralized config

### Git Repository
- [ ] All code pushed to GitHub in correct branch
- [ ] `.env` (with secrets) is in `.gitignore`
- [ ] `node_modules` is in `.gitignore`
- [ ] `dist` folder is in `.gitignore` (built during deployment)

## Render Deployment Steps

### 1. Connect Repository
- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Select GitHub repository
- [ ] Authorize Render to access GitHub

### 2. Configure Service
- [ ] Service Name: `sm-medicals`
- [ ] Runtime: `Node`
- [ ] Build Command: `npm install && npm run build && cd backend && npm install`
- [ ] Start Command: `npm start`
- [ ] Plan: Free or Paid
- [ ] Auto-deploy from git: Enable

### 3. Set Environment Variables

**Essential Variables:**
```
NODE_ENV=production
PORT=10000
```

**Database Variables:**
```
DB_HOST=<your-db-host>
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
DB_NAME=<your-db-name>
```

**Security Variables:**
```
JWT_SECRET=<generate-secure-key>
```

**Optional - Razorpay:**
```
RAZORPAY_KEY_ID=<your-key>
RAZORPAY_KEY_SECRET=<your-secret>
```

**Frontend:**
```
FRONTEND_URL=https://<your-app>.onrender.com
```

### 4. Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete
- [ ] Check deployment logs for errors
- [ ] Verify app is running

## Post-Deployment Verification

### Test Frontend
- [ ] Visit `https://<your-app>.onrender.com`
- [ ] Page loads without errors
- [ ] Console has no critical errors

### Test Backend
- [ ] API health check: `https://<your-app>.onrender.com/api/health`
- [ ] Should return: `{"status":"healthy","database":"connected",...}`

### Test Admin Panel
- [ ] Navigate to `/admin/login`
- [ ] Login with:
  - Username: `admin@sm.com`
  - Password: `sm1314`
- [ ] Dashboard loads successfully
- [ ] Can view products and categories

### Test Product Operations
- [ ] Add a new product
- [ ] Verify it appears in database
- [ ] Go to main site and verify product is visible
- [ ] Update the product
- [ ] Delete the product

### Test API Calls
- [ ] Products load on home page
- [ ] Search functionality works
- [ ] Add to cart works
- [ ] Orders are created

## Troubleshooting

### If Build Fails
1. Check build logs in Render dashboard
2. Verify all dependencies are listed in `package.json`
3. Ensure `npm run build` works locally
4. Check for syntax errors

### If App Won't Start
1. Check start logs in Render dashboard
2. Verify `npm start` works locally
3. Check environment variables are set
4. Verify database connection string

### If Frontend Won't Load
1. Check if `/dist` folder was created during build
2. Verify static file serving is configured
3. Check for 404 errors in console
4. Check Express logs for static file requests

### If API Calls Fail
1. Verify backend is running (`/api/health`)
2. Check CORS configuration
3. Verify environment variables set correctly
4. Check API response in Network tab

### If Database Won't Connect
1. Verify DB credentials in environment variables
2. Ensure database server is accessible
3. Check firewall/security rules
4. Verify database and tables exist

## Success Indicators

✅ **App is ready when:**
- Frontend loads at custom domain
- Admin login works
- Products display on home page
- Can add/edit/delete products
- Database queries execute successfully
- All API endpoints respond correctly
- No errors in browser console
- `/api/health` returns healthy status

---

**Need Help?**
1. Check Render logs: Dashboard → Service → Logs
2. Test locally first: `npm run dev` and `npm start` separately
3. Verify environment variables match `.env` files
4. Check database connectivity

**Deployment successful! 🚀**
