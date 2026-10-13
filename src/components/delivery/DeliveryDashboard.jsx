import React from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { 
  Bike, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Navigation, 
  Package, 
  ShieldCheck, 
  Star, 
  User, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function DeliveryDashboard({ onOpenReceipt }) {
  const { 
    agents, 
    activeAgentId, 
    setActiveAgentId, 
    orders, 
    advanceOrderStatus, 
    confirmDeliveryReceived 
  } = useFoodApp();

  const currentAgent = agents.find(a => a.agentId === activeAgentId) || agents[0];

  // Orders assigned to this agent
  const assignedOrders = orders.filter(
    o => o.deliveryAgent?.agentId === currentAgent.agentId || 
        (!o.deliveryAgent && o.status === 'READY_FOR_PICKUP')
  );

  const activeTrip = assignedOrders.find(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const completedTrips = assignedOrders.filter(o => o.status === 'DELIVERED');

  return (
    <div className="space-y-8 pb-16">
      {/* Agent Banner & Profile Card */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentAgent.avatar}
                alt={currentAgent.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-400"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold mb-1">
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery Agent Portal &bull; UML Actor</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">{currentAgent.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
                <span>Vehicle: <strong className="text-white">{currentAgent.vehicleNo}</strong></span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <strong className="text-white">{currentAgent.rating}</strong> (500+ reviews)
                </span>
                <span>&bull;</span>
                <span>Phone: <strong className="text-white">{currentAgent.phone}</strong></span>
              </div>
            </div>
          </div>

          {/* Courier Selector Switcher for demonstration */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              Switch Courier Profile:
            </span>
            <div className="flex gap-2">
              {agents.map(ag => (
                <button
                  key={ag.agentId}
                  onClick={() => setActiveAgentId(ag.agentId)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeAgentId === ag.agentId
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {ag.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Active Job Section */}
      {activeTrip ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-extrabold uppercase">
                  ACTIVE DELIVERY RUN
                </span>
                <span className="text-xs font-bold text-slate-400">ORDER #{activeTrip.orderId}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {activeTrip.status === 'READY_FOR_PICKUP' && 'Ready for pickup at restaurant'}
                {activeTrip.status === 'OUT_FOR_DELIVERY' && 'Package picked up - In transit to customer'}
                {activeTrip.status === 'PREPARING' && 'Kitchen is preparing meal'}
                {activeTrip.status === 'PAID' && 'Order confirmed by system'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Order Total:</span>
              <span className="text-lg font-black text-amber-600">${activeTrip.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer & Address */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Customer Destination</span>
                <a
                  href={`tel:${activeTrip.customer?.phone || '555-0100'}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Customer
                </a>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">{activeTrip.customer?.name}</h4>
                <div className="flex items-start gap-1.5 text-xs text-slate-600 mt-1">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{activeTrip.customer?.address}</span>
                </div>
              </div>

              {activeTrip.kitchenNotes && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong>Delivery Notes:</strong> {activeTrip.kitchenNotes}
                </div>
              )}
            </div>

            {/* Order Package Checklist */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Package Items ({activeTrip.items.length})</span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  {activeTrip.payment?.paymentMethod} &bull; PAID
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                {activeTrip.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-0.5">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <strong>{item.quantity}x</strong> {item.name}
                    </span>
                    <span className="text-slate-400 font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Simulated Turn-by-Turn GPS Map Route */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 text-white p-5 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 animate-spin" />
                Live GPS Navigation &bull; UML: updateLocation()
              </span>
              <span className="text-slate-400 text-[11px]">
                Target: {activeTrip.customer?.address.split(',')[0]}
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Navigation className="w-5 h-5 rotate-45" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Turn right on 5th Avenue in 150m</div>
                  <div className="text-[11px] text-slate-400">Speed: 28 km/h &bull; Est. 6 mins to destination</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Distance Remaining</span>
                <span className="text-lg font-black text-emerald-400">1.4 km</span>
              </div>
            </div>
          </div>

          {/* Agent Action Controls (UML Class methods & Sequence Lifelines) */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wider">
                  Courier Lifecycle Actions
                </h4>
                <p className="text-[11px] text-indigo-700">
                  Directly implements <code className="font-mono font-bold">acceptOrder()</code>, <code className="font-mono font-bold">updateLocation()</code>, & <code className="font-mono font-bold">markDelivered()</code>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {activeTrip.status === 'READY_FOR_PICKUP' && (
                <button
                  onClick={() => advanceOrderStatus(activeTrip.orderId, 'OUT_FOR_DELIVERY')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  <span>Pick Up Package & Begin Transit &rarr;</span>
                </button>
              )}

              {activeTrip.status === 'OUT_FOR_DELIVERY' && (
                <button
                  onClick={() => confirmDeliveryReceived(activeTrip.orderId)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Order as Delivered (Sequence Step 8)</span>
                </button>
              )}

              {activeTrip.status === 'PREPARING' && (
                <div className="text-xs text-indigo-800 font-medium p-2 bg-indigo-100/60 rounded-xl">
                  Order is currently in kitchen preparation. You will be notified when ready for pickup.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">You are all caught up!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No active trips assigned right now. When customers place orders and the kitchen finishes preparation, dispatch notifications will appear here.
          </p>
        </div>
      )}

      {/* Past Completed Trips for this agent */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">
          Completed Deliveries History ({completedTrips.length})
        </h3>
        {completedTrips.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {completedTrips.map(order => (
              <div key={order.orderId} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">Order #{order.orderId}</span>
                  <p className="text-slate-500 text-[11px]">{order.customer?.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-emerald-600">${order.totalAmount.toFixed(2)}</span>
                  <button
                    onClick={() => onOpenReceipt(order)}
                    className="text-slate-400 hover:text-indigo-600"
                    title="View receipt"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No completed runs recorded today yet.</p>
        )}
      </div>
    </div>
  );
}
