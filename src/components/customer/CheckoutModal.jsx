import React, { useState } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Loader2, 
  ArrowLeft
} from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, checkoutData }) {
  const { grandTotal, customer, placeOrder } = useFoodApp();

  const [paymentMethod, setPaymentMethod] = useState('CARD'); // CARD, UPI, WALLET, COD
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [cardHolder, setCardHolder] = useState(customer.name);
  const [upiId, setUpiId] = useState('jessica@okaxis');

  // Activity Diagram simulator toggle:
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const totalPayable = Math.max(0, grandTotal - (checkoutData?.discount || 0));

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    try {
      await placeOrder({
        paymentMethod,
        shouldFailPayment: simulateFailure,
        customerNotes: checkoutData?.notes || ''
      });
      setIsProcessing(false);
      onClose(); // Closes modal, customer is now redirected to live order tracker!
    } catch (err) {
      setIsProcessing(false);
      setErrorMessage(
        'Transaction Declined by Payment Gateway. (UML Activity Diagram: [Failed: Retry] path triggered. Uncheck simulation toggle or correct details to retry.)'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Secure Checkout</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span>Sequence Step 2 & 3:</span>
                <span className="font-mono text-indigo-600">initiatePayment()</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleProcessPayment} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Order Summary & Destination */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block">Deliver to:</span>
              <span className="font-bold text-slate-900 line-clamp-1">{customer.address}</span>
            </div>
            <div className="text-right shrink-0 pl-3">
              <span className="text-slate-500 block">Payable:</span>
              <span className="font-extrabold text-slate-900 text-base text-amber-600">
                ${totalPayable.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select Payment Method (UML Payment.paymentMethod)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'CARD', label: 'Credit Card', icon: CreditCard },
                { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                { id: 'WALLET', label: 'Wallet', icon: Wallet },
                { id: 'COD', label: 'Cash / COD', icon: DollarSign }
              ].map(method => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-xs ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Method Specific Fields */}
          {paymentMethod === 'CARD' && (
            <div className="space-y-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Security CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'UPI' && (
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Virtual Payment Address (VPA / UPI ID)</label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                A verification prompt will be sent to your UPI provider (GPay, PhonePe, Paytm).
              </p>
            </div>
          )}

          {paymentMethod === 'WALLET' && (
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs text-slate-600">
              <p>Instant 1-Click checkout using linked Apple Pay / Google Wallet account.</p>
            </div>
          )}

          {paymentMethod === 'COD' && (
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs text-slate-600">
              <p>Pay cash or scan QR upon physical package handover at your doorstep.</p>
            </div>
          )}

          {/* Activity Diagram Test Simulation Box */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-start gap-2.5">
              <input
                id="failToggle"
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500 cursor-pointer"
              />
              <label htmlFor="failToggle" className="text-xs text-amber-900 font-medium cursor-pointer">
                <strong>Simulate Gateway Failure</strong> (Demonstrates UML Activity Diagram's <code className="bg-amber-100 px-1 py-0.5 rounded text-[10px] text-rose-700">[Failed: Retry]</code> decision flow)
              </label>
            </div>
          </div>

          {/* Error Message if retry needed */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-shake">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Payment Error</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Security guarantee */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted &bull; PCI-DSS Certified Gateway</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Account with Gateway...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize & Pay ${totalPayable.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
