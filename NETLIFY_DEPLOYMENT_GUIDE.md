# Deploy BM Creations: Frontend on Netlify + Backend on Replit

This guide will help you deploy your frontend to Netlify while keeping the backend on Replit.

---

## 🎯 **Step 1: Get Your Replit Backend URL**

1. Go to your Replit project
2. Click the **"Publish"** button (or use your existing published app)
3. Copy your Replit deployment URL (e.g., `https://your-app-name.replit.app`)
4. **Important**: Keep this URL handy - you'll need it for Netlify

---

## 🔧 **Step 2: Add Environment Variable to Replit**

In your Replit project:

1. Open the **Secrets** tool (🔒 icon in left sidebar)
2. Add a new secret:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-netlify-site.netlify.app` (you'll update this after creating the Netlify site)

3. **Important**: After you deploy to Netlify and get your URL, come back and update this value

---

## 📦 **Step 3: Push to GitHub**

Make sure all files are committed:

```bash
git add .
git commit -m "Configure for Netlify deployment"
git push origin main
```

Files that were added/modified:
- `netlify.toml` - Netlify build configuration
- `client/public/_redirects` - Fix for React Router 404 errors
- `client/src/lib/queryClient.ts` - API URL configuration
- `server/index.ts` - CORS headers for cross-origin requests

---

## 🚀 **Step 4: Deploy to Netlify**

### Option A: Deploy via Netlify UI (Easiest)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository
5. Netlify will auto-detect settings from `netlify.toml`:
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/dist`
6. Click **"Deploy site"**

### Option B: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## ⚙️ **Step 5: Add Environment Variable to Netlify**

After your site is deployed:

1. In Netlify Dashboard, go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-replit-app.replit.app` (your Replit backend URL from Step 1)
4. Click **"Save"**
5. **Redeploy** your site:
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Deploy site"**

---

## 🔄 **Step 6: Update Replit with Netlify URL**

Now that you have your Netlify URL:

1. Go back to **Replit**
2. Open **Secrets** (🔒)
3. Update the `FRONTEND_URL` secret:
   - **Value**: `https://your-actual-site.netlify.app`
4. **Restart** your Replit deployment

---

## ✅ **Step 7: Test Your Deployment**

1. Visit your Netlify URL: `https://your-site.netlify.app`
2. Test the following:
   - ✅ Homepage loads
   - ✅ Shop page shows products
   - ✅ Product details page works
   - ✅ Add to cart functionality
   - ✅ Buy Now button opens payment dialog
   - ✅ Order tracking works
   - ✅ Contact form works
   - ✅ Admin login at `/admin`

---

## 🐛 **Troubleshooting**

### Products Not Loading?
- Check that `VITE_API_URL` is set correctly in Netlify
- Make sure your Replit backend is running (published/deployed)
- Check browser console for CORS errors

### 404 Errors on Page Refresh?
- Verify `client/public/_redirects` file exists
- Make sure `netlify.toml` has the redirect rule

### CORS Errors?
- Verify `FRONTEND_URL` is set in Replit secrets
- Make sure the URL matches exactly (no trailing slash)
- Restart your Replit deployment after adding the secret

### Admin Login Not Working?
- Admin sessions might not persist across domains
- You may need to implement JWT tokens instead of session-based auth for cross-origin admin access

---

## 📝 **Important Notes**

### File Uploads
Product images uploaded via admin panel are stored on Replit, not Netlify. The paths will work because they reference the Replit backend URL.

### Database
Your PostgreSQL database is on Replit and will be accessed by the backend API.

### Payment Webhooks
Discord webhooks will continue to work from the Replit backend.

### Custom Domain
You can add a custom domain to both:
- Netlify: For your frontend (e.g., `www.bmcreations.com`)
- Replit: For your API (e.g., `api.bmcreations.com`)

---

## 🎉 **Success!**

Your site should now be:
- ✅ Frontend hosted on Netlify (fast CDN, free SSL)
- ✅ Backend running on Replit (database, APIs, file uploads)
- ✅ Both working together seamlessly

Need help? Check the error logs in:
- **Netlify**: Site settings → Functions → Function logs
- **Replit**: Check the console output in your Repl
