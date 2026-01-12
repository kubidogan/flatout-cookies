# Quick Start Guide 🚀

## ⚠️ Important: Node.js Version Required

This project requires **Node.js 20.19+ or 22.12+**

Your current version: **16.13.1** ❌

### Upgrade Node.js First:

```bash
# Using nvm (recommended)
nvm install 20
nvm use 20

# Or download from https://nodejs.org/
```

## Run the App

Once Node.js is upgraded:

```bash
# 1. Navigate to project
cd /Users/kubz/Desktop/flatoutcookies

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open browser to http://localhost:5173 (or the URL shown in terminal)

## Test Card Numbers (Payment Page)

Use any of these for testing:

- `4242 4242 4242 4242`
- `5555 5555 5555 4444`
- Any expiry date in the future (e.g., `12/25`)
- Any 3-digit CVV (e.g., `123`)

## User Flow

1. **Landing** - Click the 3D cookie
2. **Shop** - Browse and add cookies to cart
3. **Cart** - Review and adjust quantities
4. **Checkout** - Enter shipping details
5. **Payment** - Enter card info (mock)
6. **Confirmation** - See order summary

## Key Features

✨ **3D Interactive Landing Page** - Rotate and click cookie
✨ **12 Cookie Varieties** - Across 4 categories
✨ **Real-time Cart** - Add, remove, update quantities
✨ **Category Filters** - Classic, Chocolate, Premium, Specialty
✨ **Search** - Find cookies by name or description
✨ **Fully Responsive** - Works on mobile, tablet, desktop
✨ **Mock Payment** - Complete checkout flow
✨ **Order Confirmation** - Detailed receipt

## Troubleshooting

**Can't upgrade Node?** See SETUP.md for alternatives

**Port in use?** Server will auto-select next available port

**3D not working?** Check WebGL support in browser (Chrome/Firefox recommended)

For detailed setup instructions, see **SETUP.md**

For full documentation, see **README.md**
