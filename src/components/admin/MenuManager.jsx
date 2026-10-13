import React, { useState } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import EditDishModal from './EditDishModal';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign,
  UtensilsCrossed,
  Filter
} from 'lucide-react';

export default function MenuManager() {
  const { menu, addMenuItem, updateMenuItem, toggleItemAvailability, deleteMenuItem } = useFoodApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  const categories = ['All', ...new Set(menu.map(m => m.category))];

  const filteredMenu = menu.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingDish(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (dish) => {
    setEditingDish(dish);
    setIsEditModalOpen(true);
  };

  const handleSaveDish = (data) => {
    if (editingDish) {
      updateMenuItem(editingDish.itemId, data);
    } else {
      addMenuItem(data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search catalog items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Add New Dish */}
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm shadow-indigo-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Menu Catalog Table / Card Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Menu Items Catalog ({filteredMenu.length})</h3>
            <p className="text-xs text-slate-500 font-mono">
              UML Class: MenuItem (itemId, name, price, category, isAvailable)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Dish Details</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Price</th>
                <th className="px-4 py-3.5">Prep Time</th>
                <th className="px-4 py-3.5">Stock Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMenu.map(dish => (
                <tr key={dish.itemId} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate max-w-xs">{dish.name}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{dish.description}</div>
                        <span className={`inline-block text-[9px] font-bold uppercase mt-0.5 px-1.5 py-0.2 rounded ${
                          dish.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {dish.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-600">
                    <span className="px-2 py-1 rounded-lg bg-slate-100 font-semibold text-[11px]">
                      {dish.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-slate-900 text-sm">
                      ${dish.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {dish.prepTime}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => toggleItemAvailability(dish.itemId)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                        dish.isAvailable
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                      title="Click to toggle availability"
                    >
                      {dish.isAvailable ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Sold Out</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(dish)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                        title="Edit dish details & price"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMenuItem(dish.itemId)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditDishModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialDish={editingDish}
        onSave={handleSaveDish}
      />
    </div>
  );
}
