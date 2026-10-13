import React, { useState } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { X, User, Mail, MapPin, Phone, Lock, CheckCircle2 } from 'lucide-react';

export default function CustomerAuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, customer, setCustomer, addToast } = useFoodApp();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [formData, setFormData] = useState({
    name: customer.name,
    email: customer.email,
    address: customer.address,
    phone: customer.phone,
    password: 'password123'
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomer({
      ...customer,
      name: formData.name,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      isLoggedIn: true
    });
    addToast(
      isRegisterMode ? 'Registration Successful' : 'Logged In',
      `Welcome, ${formData.name}! Customer profile updated.`,
      'success'
    );
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {isRegisterMode ? 'Create Customer Account' : 'Customer Authentication'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                UML Customer: {isRegisterMode ? 'register()' : 'login()'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setIsRegisterMode(false)}
            className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition ${
              !isRegisterMode ? 'border-amber-500 text-amber-600 bg-amber-50/20' : 'border-transparent hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterMode(true)}
            className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition ${
              isRegisterMode ? 'border-amber-500 text-amber-600 bg-amber-50/20' : 'border-transparent hover:text-slate-900'
            }`}
          >
            Register New Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Default Delivery Address</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-[11px] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-[11px] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition shadow-md shadow-amber-500/20 cursor-pointer"
          >
            {isRegisterMode ? 'Complete Registration' : 'Save & Authenticate'}
          </button>
        </form>
      </div>
    </div>
  );
}
