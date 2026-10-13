import React from 'react';
import { X, Printer, CheckCircle2, UtensilsCrossed } from 'lucide-react';

export default function ReceiptModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide">QuickBite Official Receipt</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Receipt Paper Area */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-5 text-slate-800 text-xs font-mono">
          <div className="text-center pb-4 border-b border-dashed border-slate-300">
            <h3 className="font-extrabold text-base text-slate-900">QUICKBITE EXPRESS LLC</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">85 Gourmet Avenue, Suite 400</p>
            <p className="text-[11px] text-slate-500">Tel: +1 (800) 555-FOOD &bull; GST/Tax: #US-8492048</p>
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              <CheckCircle2 className="w-3 h-3" /> PAYMENT SETTLED
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-slate-600">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-bold text-slate-900">#{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="font-bold text-slate-900">{order.customer?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery To:</span>
              <span className="text-right max-w-[200px] truncate">{order.customer?.address}</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border-t border-b border-dashed border-slate-300 py-3 space-y-2">
            <div className="flex justify-between font-bold text-slate-900 text-[11px] pb-1 border-b border-slate-200">
              <span>ITEM</span>
              <span>QTY &bull; PRICE</span>
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[11px]">
                <span className="truncate pr-2">{item.name}</span>
                <span className="shrink-0">{item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Calculations */}
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Total Amount:</span>
              <span className="font-bold text-slate-900 text-sm">${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Payment Mode:</span>
              <span>{order.payment?.paymentMethod || 'CARD'}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Transaction Ref:</span>
              <span className="font-bold">{order.payment?.transactionId || 'TXN-902481'}</span>
            </div>
          </div>

          {/* Barcode & Footer note */}
          <div className="text-center pt-4 border-t border-dashed border-slate-300 space-y-2">
            <div className="tracking-widest font-bold text-xs text-slate-400">||| |||| ||||| || |||||| ||||</div>
            <p className="text-[10px] text-slate-400">
              Thank you for ordering with QuickBite! Bon Appetit.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-200/50 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
