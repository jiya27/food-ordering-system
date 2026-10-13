import React from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  User, 
  ShieldCheck, 
  Bike, 
  RotateCcw, 
  Workflow, 
  Clock, 
  MapPin, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeRole, 
    setActiveRole, 
    cart, 
    setIsCartOpen, 
    orders, 
    setActiveTrackingOrderId, 
    customer, 
    setIsAuthModalOpen,
    setIsUmlModalOpen,
    resetToDemoDefaults,
    activeAgentId,
    setActiveAgentId,
    agents
  } = useFoodApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const currentAgent = agents.find(a => a.agentId === activeAgentId) || agents[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner: UML Architecture Quick Nav & Global Controls */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
              <Sparkles className="w-3 h-3" /> Live Demo Mode
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              UML Core Actors: <strong className="text-white">Customer</strong>, <strong className="text-white">Payment Gateway</strong>, <strong className="text-white">Admin</strong>, <strong className="text-white">Delivery Agent</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUmlModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition cursor-pointer shadow-xs"
              title="Inspect UML Use Case, Activity, Class, and Sequence mapping"
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>UML Diagrams Inspector</span>
            </button>
            <button
              onClick={resetToDemoDefaults}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
              title="Reset data back to initial seed data"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Tagline */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  QuickBite <span className="text-amber-500">Express</span>
                </span>
                <span className="block text-[11px] font-medium text-slate-500">
                  Online Food Ordering & Fulfillment System
                </span>
              </div>
            </div>

            {/* Mobile Cart / Role Indicator */}
            <div className="flex md:hidden items-center gap-2">
              {activeRole === 'customer' && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                      {totalCartCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Role Switcher (Actor Perspectives from Use Case Diagram) */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80 w-full md:w-auto justify-center">
            <button
              onClick={() => setActiveRole('customer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeRole === 'customer'
                  ? 'bg-white text-slate-900 shadow-xs shadow-slate-200 border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>Customer Portal</span>
            </button>

            <button
              onClick={() => setActiveRole('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer relative ${
                activeRole === 'admin'
                  ? 'bg-white text-slate-900 shadow-xs shadow-slate-200 border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Admin / Kitchen</span>
              {activeOrdersCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveRole('delivery')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeRole === 'delivery'
                  ? 'bg-white text-slate-900 shadow-xs shadow-slate-200 border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-emerald-500" />
              <span>Delivery Agent</span>
            </button>
          </div>

          {/* Right Role-specific Metadata & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {activeRole === 'customer' && (
              <>
                {/* Active Tracking Quick Button */}
                {activeOrdersCount > 0 && (
                  <button
                    onClick={() => {
                      const latest = orders.find(o => o.status !== 'DELIVERED') || orders[0];
                      if (latest) setActiveTrackingOrderId(latest.orderId);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 hover:bg-indigo-100 transition cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>Live Tracking ({activeOrdersCount})</span>
                  </button>
                )}

                {/* Customer Account Button */}
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition border border-slate-200 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-[11px]">
                    {customer.name.charAt(0)}
                  </div>
                  <span className="truncate max-w-[110px]">{customer.name.split(' ')[0]}</span>
                </button>

                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-sm shadow-amber-500/20 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Cart</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-white text-amber-600 font-extrabold text-[11px]">
                    {totalCartCount}
                  </span>
                </button>
              </>
            )}

            {activeRole === 'admin' && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">Chef & Store Admin</div>
                  <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Store Open & Accepting Orders
                  </div>
                </div>
              </div>
            )}

            {activeRole === 'delivery' && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={activeAgentId}
                    onChange={(e) => setActiveAgentId(Number(e.target.value))}
                    className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {agents.map(ag => (
                      <option key={ag.agentId} value={ag.agentId}>
                        {ag.name} ({ag.vehicleNo})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                </div>
                <div className="px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-[10px] font-bold text-emerald-700">
                  {currentAgent.status}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
