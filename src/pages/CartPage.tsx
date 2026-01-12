import { useShoppingCart } from "../context/ShoppingContext";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } =
    useShoppingCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft size={20} />
              Back to Shop
            </button>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some delicious cookies to get started!
          </p>
          <button onClick={() => navigate("/shop")} className="btn-primary">
            Browse Cookies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft size={20} />
              Back to Shop
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-600 font-display">
              Shopping Cart
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cookie.id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={item.cookie.image}
                    alt={item.cookie.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.cookie.name}
                        </h3>
                        <p className="text-sm text-primary-600">
                          {item.cookie.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cookie.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.cookie.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.cookie.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cookie.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          ${item.cookie.price.toFixed(2)} each
                        </p>
                        <p className="text-xl font-bold text-primary-600">
                          ${(item.cookie.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({getCartCount()})</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full btn-primary text-lg py-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="w-full btn-secondary mt-3"
              >
                Continue Shopping
              </button>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-semibold">
                  ✓ Free shipping on all orders
                </p>
                <p className="text-sm text-green-800 font-semibold">
                  ✓ Freshly baked daily
                </p>
                <p className="text-sm text-green-800 font-semibold">
                  ✓ Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
