# FlatOut Cookies - Setup Guide

## Node.js Version Issue

Your current Node.js version (16.13.1) is not compatible with the latest versions of Vite and other dependencies. You need Node.js 20.19+ or 22.12+.

## How to Upgrade Node.js

### Option 1: Using NVM (Recommended)

If you have NVM installed:

```bash
# Install Node.js 20
nvm install 20

# Use Node.js 20
nvm use 20

# Set as default
nvm alias default 20

# Verify
node --version
```

### Option 2: Download from Official Website

1. Visit https://nodejs.org/
2. Download the LTS version (currently v20.x or v22.x)
3. Run the installer
4. Restart your terminal
5. Verify: `node --version`

### Option 3: Using Homebrew (macOS)

```bash
# Update Homebrew
brew update

# Install Node 20
brew install node@20

# Link it
brew link node@20

# Verify
node --version
```

## After Upgrading Node.js

Once you have Node.js 20+ installed:

1. Navigate to the project:

```bash
cd /Users/kubz/Desktop/flatoutcookies
```

2. Clean install (recommended):

```bash
# Remove old node_modules and lock file
rm -rf node_modules package-lock.json

# Install fresh
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to the URL shown (typically http://localhost:5173)

## If You Can't Upgrade Node.js Right Now

You can try using an older version of Vite that supports Node 16:

```bash
# Remove current dependencies
rm -rf node_modules package-lock.json

# Install with legacy peer deps flag
npm install --legacy-peer-deps

# Try to run
npm run dev
```

Note: This may not work with all features, particularly the 3D rendering.

## Troubleshooting

### Issue: "Cannot find module"

**Solution**: Run `npm install` again

### Issue: Port already in use

**Solution**: The dev server will automatically try the next available port, or you can specify one:

```bash
npm run dev -- --port 3000
```

### Issue: 3D scene not rendering

**Solution**: Check browser console for WebGL support. Try a different browser (Chrome/Firefox recommended)

### Issue: Images not loading

**Solution**: The app uses Unsplash URLs which require internet connection

## Project Overview

Once running, you'll see:

1. **Landing Page** (/) - Click the 3D cookie to enter
2. **Shop** (/shop) - Browse 12 different cookies
3. **Cart** (/cart) - Manage your selections
4. **Checkout** (/checkout) - Enter shipping info
5. **Payment** (/payment) - Mock payment (use any card number like 4242 4242 4242 4242)
6. **Confirmation** (/confirmation) - Order summary

## Features Working Out of the Box

✅ 3D interactive cookie on landing page
✅ Responsive design (mobile, tablet, desktop)
✅ Shopping cart with add/remove/update
✅ Category filtering and search
✅ Multi-step checkout flow
✅ Mock payment processing
✅ Order confirmation
✅ Session-based cart persistence

## Need Help?

Check the main README.md for detailed feature documentation and project structure.
