import React, { useState } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Bike, 
  MapPin, 
  Phone, 
  FileText, 
  Play, 
  ShieldCheck, 
  ArrowLeft,
  PackageCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function OrderTracker({ orderId, onBackToMenu, onOpenReceipt }) {
  const { orders, confirmDeliveryReceived, advanceOrderStatus, simulateFullWorkflow } = useFoodApp();

  const order = orders.find(o => o.orderId === orderId) || orders[0];

  if (!order) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <p className="text-slate-600">No active order found to track.</p>
        <button
          onClick={onBackToMenu}
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  // Sequence diagram steps mapping
  const steps = [
    {
      id: 'PAID',
      title: 'Payment Verified',
      seq: 'Step 4: paymentSuccess()',
      desc: 'Payment captured and verified by Payment Gateway',
      icon: ShieldCheck,
      isDone: ['PAID', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.status)
    },
    {
      id: 'PREPARING',
      title: 'Kitchen Prepares Food',
      seq: 'Step 5: sendOrderToKitchen()',
      desc: 'Chefs are slicing, grilling, and packaging your meal',
      icon: ChefHat,
      isDone: ['PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.status)
    },
    {
      id: 'READY_FOR_PICKUP',
      title: 'Ready & Agent Dispatched',
      seq: 'Step 6-7: orderReadyForPickup() & assignDelivery()',
      desc: 'Meal boxed hot. System dispatched nearest delivery courier',
      icon: PackageCheck,
      isDone: ['READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.status)
    },
    {
      id: 'OUT_FOR_DELIVERY',
      title: 'Agent In Transit',
      seq: 'Step 8: deliverFoodToCustomer()',
      desc: 'Delivery agent is riding towards your destination address',
      icon: Bike,
      isDone: ['OUT_FOR_DELIVERY', 'DELIVERED'].includes(order.status)
    },
    {
      id: 'DELIVERED',
      title: 'Delivered & Confirmed',
      seq: 'Step 9: confirmDeliveryReceived()',
      desc: 'Customer confirmed package received at doorstep',
      icon: CheckCircle2,
      isDone: order.status === 'DELIVERED'
    }
  ];

  const isDelivered = order.status === 'DELIVERED';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Back button & top status bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToMenu}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Simulation tool */}
          {!isDelivered && (
            <button
              onClick={() => simulateFullWorkflow(order.orderId)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
              title="Fast-forward entire Sequence Diagram flow"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Simulate Full Sequence Flow</span>
            </button>
          )}

          <button
            onClick={() => onOpenReceipt(order)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>Digital Receipt</span>
          </button>
        </div>
      </div>

      {/* Main Status Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">ORDER #{order.orderId}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isDelivered
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800 animate-pulse-subtle'
              }`}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              {isDelivered ? 'Order Successfully Delivered!' : 'Your meal is on the way!'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Placed on {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; Settled via {order.payment?.paymentMethod || 'CARD'}
            </p>
          </div>

          {!isDelivered && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 text-center sm:text-right shrink-0">
              <span className="text-[11px] font-semibold text-amber-800 block">ESTIMATED ARRIVAL</span>
              <span className="text-2xl font-black text-amber-600">18 - 24 Mins</span>
            </div>
          )}
        </div>

        {/* Step Progression Timeline (Directly visualizes the UML sequence diagram lifelines!) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              UML Fulfillment Workflow Progression
            </h3>
            <span className="text-xs font-semibold text-indigo-600">
              Live State Sync Active
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative flex items-start gap-4">
                  {/* Step bullet / icon */}
                  <div className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs transition-colors shadow-xs ${
                    step.isDone
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.isDone ? <CheckCircle2 className="w-4 h-4" /> : <span className="font-bold">{idx + 1}</span>}
                  </div>

                  {/* Step detail */}
                  <div className="flex-1 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/60">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className={`text-xs sm:text-sm font-bold ${step.isDone ? 'text-slate-900' : 'text-slate-500'}`}>
                        {step.title}
                      </h4>
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-medium border border-indigo-100">
                        {step.seq}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 9 Action Trigger: Customer Confirm Delivery */}
        {order.status === 'OUT_FOR_DELIVERY' && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div>
              <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Did your delivery driver arrive?
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                UML Sequence Step 9: Customer executes <code className="font-mono font-bold">confirmDeliveryReceived()</code>
              </p>
            </div>
            <button
              onClick={() => confirmDeliveryReceived(order.orderId)}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition cursor-pointer"
            >
              I Received My Food
            </button>
          </div>
        )}

        {/* Assigned Courier Card & Delivery Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          {/* Agent info */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Bike className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Delivery Agent</span>
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {order.deliveryAgent?.name || 'Alex Rivera'}
              </h4>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span>Vehicle: <strong className="text-slate-700">{order.deliveryAgent?.vehicleNo || 'BIKE-NYC-402'}</strong></span>
              </div>
            </div>
            <a
              href={`tel:${order.deliveryAgent?.phone || '555-0192'}`}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 transition shadow-xs"
              title="Call driver"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Destination info */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Destination Address</span>
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {order.customer?.name}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                {order.customer?.address}
              </p>
            </div>
          </div>
        </div>

        {/* Live Simulated Map Widget */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 text-white p-4 relative">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live Transit Radar (Simulated GPS Lifeline)
            </span>
            <span className="text-[11px] font-mono text-slate-400">Status: {order.status}</span>
          </div>

          {/* SVG visual map line */}
          <div className="relative h-28 bg-slate-950/80 rounded-xl p-4 flex items-center justify-between overflow-hidden border border-slate-800">
            {/* Restaurant node */}
            <div className="flex flex-col items-center gap-1 z-10 text-center">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-300">QuickBite Kitchen</span>
            </div>

            {/* Connecting highway dotted line */}
            <div className="flex-1 mx-4 relative flex items-center">
              <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 via-indigo-400 to-emerald-400 transition-all duration-1000"
                  style={{
                    width: order.status === 'PAID' ? '15%' :
                           order.status === 'PREPARING' ? '30%' :
                           order.status === 'READY_FOR_PICKUP' ? '50%' :
                           order.status === 'OUT_FOR_DELIVERY' ? '80%' : '100%'
                  }}
                />
              </div>

              {/* Moving Courier Icon on the line */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000"
                style={{
                  left: order.status === 'PAID' ? '15%' :
                        order.status === 'PREPARING' ? '30%' :
                        order.status === 'READY_FOR_PICKUP' ? '50%' :
                        order.status === 'OUT_FOR_DELIVERY' ? '80%' : '100%'
                }}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
                  <Bike className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Customer node */}
            <div className="flex flex-col items-center gap-1 z-10 text-center">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${
                isDelivered ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-300">Your Doorstep</span>
            </div>
          </div>
        </div>

        {/* Order items summary */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 uppercase mb-3">Order Items</h4>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs text-slate-700">
                <span>
                  <strong className="text-amber-600">{item.quantity}x</strong> {item.name}
                </span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-900">
              <span>Total Paid</span>
              <span className="text-amber-600">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
