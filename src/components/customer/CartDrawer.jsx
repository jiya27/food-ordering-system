import React, { useState } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  FileText,
  Percent
} from 'lucide-react';

export default function CartDrawer({ onProceedToCheckout }) {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal,
    deliveryFee,
    taxAmount,
    grandTotal,
    customer,
    setCustomer
  } = useFoodApp();

  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isCartOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'TASTY20') {
      const discount = cartSubtotal * 0.2;
      setAppliedDiscount(discount);
      setPromoMessage('20% discount coupon applied successfully!');
    } else {
      setPromoMessage('Invalid coupon code. Try code: TASTY20');
      setAppliedDiscount(0);
    }
  };

  const finalAmount = Math.max(0, grandTotal - appliedDiscount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Your Food Cart</h3>
                <p className="text-xs text-slate-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">Your cart is currently empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our gourmet menu and add delicious dishes to satisfy your cravings.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600 transition cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Progress */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  {cartSubtotal >= 35 ? (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">You unlocked FREE Delivery!</span>
                    </div>
                  ) : (
                    <div>
                      Add <strong className="font-bold text-emerald-950">${(35 - cartSubtotal).toFixed(2)}</strong> more for <strong>FREE Delivery</strong>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {cart.map(item => (
                    <div
                      key={item.itemId}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs truncate">{item.name}</h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">${item.price.toFixed(2)} each</div>
                        <div className="text-xs font-bold text-amber-600 mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.itemId, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemId, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.itemId)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Delivery Address Review */}
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-800 font-bold">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      Delivery Destination
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">Customer Profile</span>
                  </div>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Enter street address & apartment"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Percent className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. TASTY20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] ${appliedDiscount > 0 ? 'text-emerald-600 font-medium' : 'text-rose-500'}`}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    Kitchen Notes / Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g., extra cutlery, sauce on the side, ring doorbell..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Cart Footer Calculation & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes (8.25%)</span>
                  <span className="font-semibold text-slate-900">${taxAmount.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount (TASTY20)</span>
                    <span>-${appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-amber-600 text-base">${finalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={clearCart}
                  className="px-3 py-2.5 border border-slate-300 text-slate-600 hover:bg-slate-200/50 rounded-xl text-xs font-semibold transition cursor-pointer"
                  title="Empty Cart"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onProceedToCheckout({ notes: deliveryNotes, discount: appliedDiscount });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
