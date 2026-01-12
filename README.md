# FlatOut Cookies 🍪

A modern, fully responsive React e-commerce marketplace for purchasing delicious cookies. Features an interactive 3D landing page, comprehensive shopping cart, and complete checkout flow.

## Features

- **Interactive 3D Landing Page**: Engage users with a Three.js animated cookie that they can rotate and click to enter the site
- **Cookie Catalog**: Browse through a variety of cookies with filtering by category and search functionality
- **Shopping Cart**: Add, remove, and adjust quantities of items with real-time total calculation
- **Checkout Process**: Multi-step checkout with shipping information collection
- **Payment Interface**: Mock payment processing with card validation
- **Order Confirmation**: Detailed order summary and confirmation page
- **Fully Responsive**: Mobile-first design that works seamlessly on all devices
- **Mock Data**: Pre-populated with delicious cookie varieties and high-quality images

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **React Three Fiber** & **@react-three/drei** for 3D graphics
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Context API** for state management

## Getting Started

### Prerequisites

**Important**: This project requires Node.js version 20.19+ or 22.12+. Your current version is 16.13.1.

To upgrade Node.js:

```bash
# Using nvm (recommended)
nvm install 20
nvm use 20

# Or download from https://nodejs.org/
```

### Installation

1. Navigate to the project directory:

```bash
cd /Users/kubz/Desktop/flatoutcookies
```

2. Install dependencies (if not already installed):

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
flatoutcookies/
├── src/
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx    # 3D interactive landing
│   │   ├── ShopPage.tsx       # Cookie catalog
│   │   ├── CartPage.tsx       # Shopping cart
│   │   ├── CheckoutPage.tsx   # Checkout form
│   │   ├── PaymentPage.tsx    # Payment processing
│   │   └── ConfirmationPage.tsx # Order confirmation
│   ├── context/            # React Context for state management
│   │   └── ShoppingContext.tsx
│   ├── data/              # Mock data
│   │   └── mockData.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles with Tailwind
├── public/                # Static assets
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## User Flow

1. **Landing Page** (`/`) - Interactive 3D cookie animation
2. **Shop** (`/shop`) - Browse and add cookies to cart
3. **Cart** (`/cart`) - Review items and adjust quantities
4. **Checkout** (`/checkout`) - Enter shipping information
5. **Payment** (`/payment`) - Enter payment details (mock)
6. **Confirmation** (`/confirmation`) - View order summary

## Features in Detail

### 3D Landing Page

- Fully interactive 3D cookie model using Three.js
- Rotate, zoom, and hover effects
- Click to enter the shop

### Cookie Catalog

- Grid layout with responsive design
- Category filtering (Classic, Chocolate, Premium, Specialty)
- Search functionality
- Real-time inventory status
- Featured products highlighting

### Shopping Cart

- Add/remove items
- Quantity adjustment
- Real-time price calculation
- Free shipping
- Empty cart state handling

### Checkout Flow

- Form validation
- Shipping address collection
- Order summary sidebar
- Session-based data persistence

### Payment Processing

- Card input formatting
- CVV and expiry date validation
- Mock payment simulation
- Loading states

### Order Confirmation

- Order details display
- Shipping information
- Email confirmation notice
- Order timeline
- Print receipt option

## Responsive Design

The application is fully responsive with breakpoints for:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components adapt seamlessly across devices.

## Mock Data

The app includes 12 different cookie varieties across 4 categories:

- Classic (Chocolate Chip, Oatmeal Raisin, Sugar Cookie, Snickerdoodle)
- Chocolate (Double Chocolate Fudge, Chocolate Mint)
- Premium (White Chocolate Macadamia, Red Velvet, Salted Caramel)
- Specialty (Peanut Butter, Lemon Zest, Gingerbread)

All products include high-quality images from Unsplash, detailed descriptions, ingredient lists, pricing, and stock status.

## Future Enhancements

- User authentication
- Order history
- Product reviews and ratings
- Real payment gateway integration
- Backend API integration
- Email notifications
- Wishlist functionality
- Gift options
- Discount codes

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- 3D rendering powered by [Three.js](https://threejs.org)

---

Built with ❤️ and 🍪
