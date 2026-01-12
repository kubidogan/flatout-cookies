import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../types";
import { CheckCircle, Package, Mail, Home } from "lucide-react";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const [order] = useState<Order | null>(() => {
    const orderData = sessionStorage.getItem("order");
    return orderData ? JSON.parse(orderData) : null;
  });

  useEffect(() => {
    if (!order) {
      navigate("/shop");
    }
  }, [navigate, order]);

  if (!order) {
    return null;
  }

  const orderDate = new Date(order.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your purchase, {order.shippingInfo.fullName}!
            </p>
            <p className="text-gray-500">
              Your order has been received and is being prepared.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="text-primary-600" size={28} />
              <h2 className="text-2xl font-bold">Order Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="font-semibold text-lg">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="font-semibold text-lg">{orderDate}</p>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.cookie.id} className="flex gap-4">
                    <img
                      src={item.cookie.image}
                      alt={item.cookie.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.cookie.name}</p>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-primary-600 font-semibold">
                        £{item.cookie.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        £{(item.cookie.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-2xl font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-primary-600">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Home className="text-primary-600" size={28} />
              <h2 className="text-2xl font-bold">Shipping Address</h2>
            </div>
            <div className="text-gray-700 space-y-1">
              <p className="font-semibold">{order.shippingInfo.fullName}</p>
              <p>{order.shippingInfo.address}</p>
              <p>
                {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                {order.shippingInfo.zipCode}
              </p>
              <p>{order.shippingInfo.country}</p>
              <p className="pt-2">{order.shippingInfo.email}</p>
              <p>{order.shippingInfo.phone}</p>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Mail className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Confirmation email sent!
                </p>
                <p className="text-sm text-blue-800">
                  We've sent a confirmation email to{" "}
                  <span className="font-semibold">
                    {order.shippingInfo.email}
                  </span>{" "}
                  with your order details and tracking information.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">What's Next?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-lg">Order Confirmed</p>
                  <p className="text-gray-600">Your order has been received</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-lg">Baking Fresh</p>
                  <p className="text-gray-600">We're preparing your cookies</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-lg">On the Way</p>
                  <p className="text-gray-600">
                    Expected delivery in 2-3 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/shop")}
              className="flex-1 btn-primary py-4 text-lg"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 btn-secondary py-4 text-lg"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
