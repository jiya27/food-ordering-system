import React from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { Plus, Minus, Star, Clock, Check } from 'lucide-react';

export default function DishCard({ dish }) {
  const { cart, addToCart, updateQuantity } = useFoodApp();

  const cartItem = cart.find(i => i.itemId === dish.itemId);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
      dish.isAvailable ? 'border-slate-200/80 hover:border-amber-300' : 'border-slate-200 opacity-60 bg-slate-50'
    }`}>
      {/* Image & Tags */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Veg/Non-veg indicator & Category */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase shadow-xs flex items-center gap-1 ${
            dish.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            {dish.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-medium">
            {dish.category}
          </span>
        </div>

        {/* Prep Time */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-slate-100 text-[10px] font-medium flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{dish.prepTime}</span>
        </div>

        {/* Price Tag pill */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-900 font-extrabold text-sm shadow-sm">
          ${dish.price.toFixed(2)}
        </div>

        {/* Availability Badge if out of stock */}
        {!dish.isAvailable && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-md uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors line-clamp-1">
              {dish.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{dish.rating}</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            {dish.reviews} ratings
          </span>

          {dish.isAvailable ? (
            quantity > 0 ? (
              <div className="flex items-center bg-amber-50 border border-amber-200 rounded-xl p-0.5">
                <button
                  onClick={() => updateQuantity(dish.itemId, -1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-amber-800 hover:bg-amber-200/60 transition cursor-pointer"
                  title="Decrease"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center font-bold text-xs text-amber-900">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(dish.itemId, 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition cursor-pointer shadow-xs"
                  title="Increase"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(dish)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-white text-white text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )
          ) : (
            <span className="text-xs font-medium text-slate-400 italic">Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
}
