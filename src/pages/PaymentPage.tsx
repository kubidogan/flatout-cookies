import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingContext";
import type { PaymentInfo, ShippingInfo } from "../types";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, createOrder } = useShoppingCart();
  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentInfo>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Format card number with spaces
    if (e.target.name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      if (value.length > 19) value = value.slice(0, 19);
    }

    // Format expiry date
    if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      if (value.length > 5) value = value.slice(0, 5);
    }

    // Limit CVV
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    setPaymentData({
      ...paymentData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Get shipping info from session storage
    const shippingInfo = JSON.parse(
      sessionStorage.getItem("shippingInfo") || "{}"
    ) as ShippingInfo;

    // Create order
    const order = createOrder(shippingInfo);

    // Store order in session storage
    sessionStorage.setItem("order", JSON.stringify(order));
    sessionStorage.removeItem("shippingInfo");

    // Small delay to ensure state updates complete
    setTimeout(() => {
      navigate("/confirmation");
    }, 100);
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/checkout")}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            disabled={processing}
          >
            <ArrowLeft size={20} />
            Back to Checkout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Payment
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-primary-600" size={32} />
              <h2 className="text-2xl font-bold">Payment Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none font-mono"
                  placeholder="4242 4242 4242 4242"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  placeholder="JOHN DOE"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none font-mono"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none font-mono"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                <Lock className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Secure Payment
                  </p>
                  <p className="text-sm text-blue-800">
                    Your payment information is encrypted and secure. This is a
                    demo - no real charges will be made.
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    £{getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary-600">
                    £{getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className={`w-full text-lg py-4 rounded-lg font-semibold transition-all ${
                  processing ? "bg-gray-400 cursor-not-allowed" : "btn-primary"
                }`}
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Processing Payment...
                  </span>
                ) : (
                  "Complete Purchase"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              By completing your purchase, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
