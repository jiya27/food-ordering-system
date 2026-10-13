import React, { useState } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { 
  ChefHat, 
  Bike, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  PackageCheck, 
  Phone, 
  User, 
  DollarSign,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function OrderManager({ onOpenReceipt }) {
  const { orders, advanceOrderStatus, agents } = useFoodApp();
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'ALL') return true;
    return o.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and status tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Live Order & Kitchen Queue</h3>
          <p className="text-xs text-slate-500 font-mono">
            UML Admin: manageOrders() & sequence triggers
          </p>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'ALL', label: 'All Orders' },
            { id: 'PAID', label: 'Paid / New' },
            { id: 'PREPARING', label: 'In Kitchen' },
            { id: 'READY_FOR_PICKUP', label: 'Ready' },
            { id: 'OUT_FOR_DELIVERY', label: 'In Transit' },
            { id: 'DELIVERED', label: 'Delivered' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition ${
                filterStatus === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid / Kanban Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOrders.map(order => {
          return (
            <div
              key={order.orderId}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">#{order.orderId}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'OUT_FOR_DELIVERY' ? 'bg-amber-100 text-amber-800' :
                      order.status === 'READY_FOR_PICKUP' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'PREPARING' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; {order.customer?.name}
                  </span>
                </div>

                <button
                  onClick={() => onOpenReceipt(order)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition cursor-pointer"
                  title="View receipt"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-4 flex-1 space-y-2.5 text-xs">
                <div className="space-y-1">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-700">
                      <span><strong className="text-amber-600">{it.quantity}x</strong> {it.name}</span>
                      <span className="text-slate-500 font-medium">${(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {order.kitchenNotes && (
                  <div className="p-2 bg-amber-50/70 rounded-xl border border-amber-200/60 text-[11px] text-amber-900">
                    <strong>Note:</strong> {order.kitchenNotes}
                  </div>
                )}

                {/* Delivery Info */}
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-0.5">
                  <div className="flex items-center gap-1 text-slate-700">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Customer: {order.customer?.name} ({order.customer?.phone})</span>
                  </div>
                  <div className="truncate text-slate-600">
                    Destination: {order.customer?.address}
                  </div>
                  <div className="flex items-center gap-1 pt-1 text-slate-700 font-medium">
                    <Bike className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Courier: {order.deliveryAgent?.name} ({order.deliveryAgent?.vehicleNo})</span>
                  </div>
                </div>
              </div>

              {/* Status Action Buttons (Sequence Diagram Lifelines) */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-slate-900">
                  Total: <span className="text-amber-600">${order.totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {order.status === 'PAID' && (
                    <button
                      onClick={() => advanceOrderStatus(order.orderId, 'PREPARING')}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                      title="Sequence Step 5: sendOrderToKitchen()"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>Send to Kitchen</span>
                    </button>
                  )}

                  {order.status === 'PREPARING' && (
                    <button
                      onClick={() => advanceOrderStatus(order.orderId, 'READY_FOR_PICKUP')}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                      title="Sequence Step 6: orderReadyForPickup()"
                    >
                      <PackageCheck className="w-3.5 h-3.5" />
                      <span>Mark Ready</span>
                    </button>
                  )}

                  {order.status === 'READY_FOR_PICKUP' && (
                    <button
                      onClick={() => advanceOrderStatus(order.orderId, 'OUT_FOR_DELIVERY')}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                      title="Sequence Step 7-8: assignDelivery() & transit"
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>Dispatch Agent</span>
                    </button>
                  )}

                  {order.status === 'OUT_FOR_DELIVERY' && (
                    <button
                      onClick={() => advanceOrderStatus(order.orderId, 'DELIVERED')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                      title="Mark complete"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Delivery</span>
                    </button>
                  )}

                  {order.status === 'DELIVERED' && (
                    <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
