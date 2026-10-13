import React from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { X, Clock, FileText, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function OrderHistoryModal({ isOpen, onClose, onSelectOrder, onOpenReceipt }) {
  const { orders } = useFoodApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Your Order History</h3>
              <p className="text-xs text-slate-500 font-mono">
                UML Customer.trackOrder()
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

        {/* Orders list */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-3.5">
          {orders.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">No orders placed yet.</p>
          ) : (
            orders.map(order => (
              <div
                key={order.orderId}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition space-y-2.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Order #{order.orderId}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="font-bold text-amber-600">${order.totalAmount.toFixed(2)}</span>
                </div>

                <div className="text-[11px] text-slate-500">
                  {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                <div className="text-slate-700 line-clamp-1">
                  {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onOpenReceipt(order);
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>View Receipt</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectOrder(order.orderId);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <span>Track Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
