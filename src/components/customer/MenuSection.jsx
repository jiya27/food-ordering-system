import React, { useState, useMemo } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import DishCard from './DishCard';
import { 
  Search, 
  Sparkles, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Filter, 
  Leaf, 
  X,
  History,
  TrendingUp
} from 'lucide-react';

const CATEGORIES = ['All', 'Burgers', 'Pizzas', 'Asian', 'Pasta', 'Healthy', 'Desserts', 'Beverages'];

export default function MenuSection({ onOpenHistory }) {
  const { menu, orders, setActiveTrackingOrderId } = useFoodApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'price-low', 'price-high', 'rating'

  // Filter & sort
  const filteredDishes = useMemo(() => {
    return menu.filter(dish => {
      const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dish.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = vegOnly ? dish.isVeg : true;

      return matchesCategory && matchesSearch && matchesVeg;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [menu, selectedCategory, searchQuery, vegOnly, sortBy]);

  const activeOrders = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Summer Special: 20% off on Gourmet Burgers & Pizzas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Delicious Flavors, <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Speedy Doorstep Delivery.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Order fresh meals prepared by certified gourmet chefs. Powered by real-time kitchen tracking & dispatch automation.
          </p>

          {/* Quick Stats Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Avg 25-30 Mins</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Hygienic Packaging</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Live GPS Courier Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders Banner Alert (if customer has ongoing order) */}
      {activeOrders.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-emerald-500/10 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center animate-pulse-subtle">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Active Order #{activeOrders[0].orderId} in Transit!
              </h4>
              <p className="text-xs text-slate-600">
                Current status: <strong className="text-indigo-600">{activeOrders[0].status.replace('_', ' ')}</strong> &bull; Total: ${activeOrders[0].totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTrackingOrderId(activeOrders[0].orderId)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition cursor-pointer shadow-sm"
          >
            Track Order Live &rarr;
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search dishes, burgers, pizza, pasta, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary and Sort Toggles */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
            {/* Veg toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border shrink-0 ${
                vegOnly
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Leaf className={`w-3.5 h-3.5 ${vegOnly ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Veg Only</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer shrink-0"
            >
              <option value="recommended">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* History button */}
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer shrink-0"
              title="View past orders"
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Order History</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {selectedCategory === 'All' ? 'All Gourmet Selections' : selectedCategory}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {filteredDishes.length} freshly prepared items
          </p>
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDishes.map(dish => (
            <DishCard key={dish.itemId} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No items match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keyword or resetting category filters to browse our full catalog.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setVegOnly(false); }}
            className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
