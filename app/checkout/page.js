"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax example
  const total = subtotal + tax;

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate network request/payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart(); // Empty the cart after successful purchase
    }, 2000);
  };

  // Success Screen
  if (isSuccess) {
    return (
      <main className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-10 w-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">Order Confirmed!</h1>
        <p className="mb-8 text-lg text-gray-600">
          Thank you for your purchase. We have received your order and will begin processing it right away.
        </p>
        <Link 
          href="/"
          className="rounded-xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Return to Store
        </Link>
      </main>
    );
  }

  // Empty Cart Redirect Guard
  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="mb-8 text-gray-600">You need items in your cart to checkout.</p>
        <button onClick={() => router.back()} className="text-indigo-600 font-medium hover:underline">
          &larr; Go Back
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 pb-20">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Secure Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-12">
        
        {/* Left Side: Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
            
            {/* Shipping Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                  <input required type="text" className="w-full rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="John Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Street Address</label>
                  <input required type="text" className="w-full rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="123 Main St" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                  <input required type="text" className="w-full rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="New York" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                  <input required type="text" className="w-full rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="10001" />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Payment Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Card Number</label>
                  <input required type="text" maxLength="16" className="w-full rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="0000 0000 0000 0000" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Expiration Date</label>
                  <input required type="text" placeholder="MM/YY" className="w-full rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">CVC</label>
                  <input required type="text" maxLength="4" placeholder="123" className="w-full rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h2>
            
            {/* Items List */}
            <div className="mb-6 max-h-60 overflow-y-auto space-y-4 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.imageUrl || "/hanger.jpg"} alt={item.name} className="h-16 w-16 rounded-lg border border-gray-200 bg-white object-cover" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${((item.price || 0) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (5%)</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>

            <div className="mb-8 flex justify-between border-t border-gray-200 pt-6 text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              className="block w-full rounded-xl bg-indigo-600 px-5 py-4 text-center text-base font-bold text-white transition hover:bg-indigo-700 shadow-md disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}