import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockCookies, categories } from "../data/mockData";
import { useShoppingCart } from "../context/ShoppingContext";
import type { Cookie } from "../types";
import { ShoppingCart, Plus } from "lucide-react";

function CookieCard({ cookie }: { cookie: Cookie }) {
  const { addToCart } = useShoppingCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(cookie);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="card group">
      <div className="relative overflow-hidden h-64">
        <img
          src={cookie.image}
          alt={cookie.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {cookie.featured && (
          <span className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </span>
        )}
        {!cookie.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{cookie.name}</h3>
          <span className="text-primary-600 font-bold text-lg">
            £{cookie.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-primary-600 mb-2">{cookie.category}</p>
        <p className="text-gray-600 mb-4 line-clamp-2">{cookie.description}</p>
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
          <p className="text-xs text-gray-600">
            {cookie.ingredients.join(", ")}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!cookie.inStock || added}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-200 ${
            added
              ? "bg-green-500 text-white"
              : cookie.inStock
              ? "bg-primary-600 hover:bg-primary-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {added ? (
            <>✓ Added!</>
          ) : (
            <>
              <Plus size={20} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { getCartCount } = useShoppingCart();
  const navigate = useNavigate();

  const filteredCookies = mockCookies.filter((cookie) => {
    const matchesCategory =
      selectedCategory === "All" || cookie.category === selectedCategory;
    const matchesSearch =
      cookie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cookie.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary-600 font-display">
              FlatOut Cookies
            </h1>
            <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ShoppingCart size={24} />
              <span className="font-semibold">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Freshly Baked Cookies
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            Handcrafted with love, delivered to your door
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search cookies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-lg"
          />

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredCookies.length}{" "}
          {filteredCookies.length === 1 ? "cookie" : "cookies"}
        </p>

        {/* Cookie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCookies.map((cookie) => (
            <CookieCard key={cookie.id} cookie={cookie} />
          ))}
        </div>

        {filteredCookies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500">No cookies found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
