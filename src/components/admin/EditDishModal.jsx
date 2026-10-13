import React, { useState, useEffect } from 'react';
import { X, UtensilsCrossed, DollarSign, Clock, Image, Tag, AlignLeft, Check } from 'lucide-react';

export default function EditDishModal({ isOpen, onClose, initialDish, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Burgers',
    price: 12.99,
    prepTime: '15-20 min',
    isVeg: false,
    image: '',
    description: ''
  });

  useEffect(() => {
    if (initialDish) {
      setFormData({
        name: initialDish.name || '',
        category: initialDish.category || 'Burgers',
        price: initialDish.price || 12.99,
        prepTime: initialDish.prepTime || '15-20 min',
        isVeg: initialDish.isVeg ?? false,
        image: initialDish.image || '',
        description: initialDish.description || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'Burgers',
        price: 14.50,
        prepTime: '15 min',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        description: ''
      });
    }
  }, [initialDish, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {initialDish ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                UML MenuItem: updatePrice() & getDetails()
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto max-h-[75vh]">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Dish Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="E.g. Truffle Smoked Burger"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="Burgers">Burgers</option>
                <option value="Pizzas">Pizzas</option>
                <option value="Asian">Asian</option>
                <option value="Pasta">Pasta</option>
                <option value="Healthy">Healthy</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Price ($ USD)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimated Prep Time</label>
              <input
                type="text"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                placeholder="15-20 min"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Dietary Type</label>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isVeg: true })}
                  className={`flex-1 py-2 rounded-xl font-bold border transition cursor-pointer text-center ${
                    formData.isVeg ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isVeg: false })}
                  className={`flex-1 py-2 rounded-xl font-bold border transition cursor-pointer text-center ${
                    !formData.isVeg ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Non-Veg
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description & Ingredients</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe delicious ingredients, toppings, allergens..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              {initialDish ? 'Save Changes' : 'Add Item to Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
