import React, { useState } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import OrderManager from './OrderManager';
import MenuManager from './MenuManager';
import { 
  TrendingUp, 
  ShoppingBag, 
  UtensilsCrossed, 
  Bike, 
  DollarSign, 
  BarChart3, 
  Layers, 
  ShieldCheck, 
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminDashboard({ onOpenReceipt }) {
  const { admin, orders, menu, agents } = useFoodApp();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'menu', 'reports'

  // Analytics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount : 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const totalCompletedOrders = orders.filter(o => o.status === 'DELIVERED').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Profile & Greeting Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Portal &bull; UML Admin Actor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kitchen Operations & Management Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Welcome, <strong className="text-white">{admin.name}</strong> ({admin.role}). Live restaurant kitchen pipeline is synchronized.
          </p>
        </div>

        {/* Quick KPI Cards row in hero */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 min-w-[120px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Gross Sales</span>
            <span className="text-xl font-black text-amber-400">${totalRevenue.toFixed(2)}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 min-w-[120px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Orders</span>
            <span className="text-xl font-black text-emerald-400">{activeOrdersCount}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Total Revenue</span>
            <h4 className="text-xl font-extrabold text-slate-900">${totalRevenue.toFixed(2)}</h4>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2% today
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Live Orders</span>
            <h4 className="text-xl font-extrabold text-slate-900">{activeOrdersCount}</h4>
            <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">
              {totalCompletedOrders} delivered
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Catalog Dishes</span>
            <h4 className="text-xl font-extrabold text-slate-900">{menu.length}</h4>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
              {menu.filter(m => m.isAvailable).length} active items
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Courier Fleet</span>
            <h4 className="text-xl font-extrabold text-slate-900">{agents.length}</h4>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
              {agents.filter(a => a.status === 'AVAILABLE').length} ready for dispatch
            </span>
          </div>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold text-slate-600 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-4 border-b-2 cursor-pointer transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Kitchen Orders Queue ({activeOrdersCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`py-3 px-4 border-b-2 cursor-pointer transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'menu'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Menu Catalog Management ({menu.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`py-3 px-4 border-b-2 cursor-pointer transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'reports'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Sales Reports & Analytics</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'orders' && <OrderManager onOpenReceipt={onOpenReceipt} />}
      {activeTab === 'menu' && <MenuManager />}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Sales Performance Reports</h3>
                <p className="text-xs text-slate-500 font-mono">
                  UML Method: Admin.viewReports()
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                Quarterly Peak
              </span>
            </div>

            {/* Visual chart breakdown bars */}
            <div className="space-y-3 pt-2">
              {[
                { category: 'Burgers & Sandwiches', share: 42, revenue: totalRevenue * 0.42 },
                { category: 'Artisanal Pizzas', share: 28, revenue: totalRevenue * 0.28 },
                { category: 'Asian Bowls & Bao', share: 16, revenue: totalRevenue * 0.16 },
                { category: 'Desserts & Shakes', share: 14, revenue: totalRevenue * 0.14 },
              ].map(cat => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{cat.category}</span>
                    <span className="font-mono text-slate-900">${cat.revenue.toFixed(2)} ({cat.share}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full"
                      style={{ width: `${cat.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
