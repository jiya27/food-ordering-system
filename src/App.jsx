import React, { useState } from 'react';
import { FoodAppProvider, useFoodApp } from './context/FoodAppContext';
import Navbar from './components/common/Navbar';
import NotificationToast from './components/common/NotificationToast';
import UmlInspectorModal from './components/common/UmlInspectorModal';

// Customer Components
import MenuSection from './components/customer/MenuSection';
import CartDrawer from './components/customer/CartDrawer';
import CheckoutModal from './components/customer/CheckoutModal';
import OrderTracker from './components/customer/OrderTracker';
import CustomerAuthModal from './components/customer/CustomerAuthModal';
import OrderHistoryModal from './components/customer/OrderHistoryModal';
import ReceiptModal from './components/customer/ReceiptModal';

// Admin & Delivery Components
import AdminDashboard from './components/admin/AdminDashboard';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';

import { UtensilsCrossed, ShieldCheck, Heart, Sparkles, Workflow } from 'lucide-react';

function MainAppContent() {
  const { 
    activeRole, 
    activeTrackingOrderId, 
    setActiveTrackingOrderId,
    setIsUmlModalOpen 
  } = useFoodApp();

  // Modal states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);

  const handleProceedToCheckout = (data) => {
    setCheckoutData(data);
    setIsCheckoutOpen(true);
  };

  const handleOpenReceipt = (order) => {
    setSelectedReceiptOrder(order);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-amber-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {/* CUSTOMER PORTAL */}
        {activeRole === 'customer' && (
          <>
            {activeTrackingOrderId ? (
              <OrderTracker
                orderId={activeTrackingOrderId}
                onBackToMenu={() => setActiveTrackingOrderId(null)}
                onOpenReceipt={handleOpenReceipt}
              />
            ) : (
              <MenuSection onOpenHistory={() => setIsHistoryOpen(true)} />
            )}

            <CartDrawer onProceedToCheckout={handleProceedToCheckout} />
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              checkoutData={checkoutData}
            />
            <CustomerAuthModal />
            <OrderHistoryModal
              isOpen={isHistoryOpen}
              onClose={() => setIsHistoryOpen(false)}
              onSelectOrder={(ordId) => setActiveTrackingOrderId(ordId)}
              onOpenReceipt={handleOpenReceipt}
            />
          </>
        )}

        {/* ADMIN PORTAL */}
        {activeRole === 'admin' && (
          <AdminDashboard onOpenReceipt={handleOpenReceipt} />
        )}

        {/* DELIVERY AGENT PORTAL */}
        {activeRole === 'delivery' && (
          <DeliveryDashboard onOpenReceipt={handleOpenReceipt} />
        )}
      </main>

      {/* Global Modals & System Toasts */}
      <ReceiptModal
        isOpen={!!selectedReceiptOrder}
        onClose={() => setSelectedReceiptOrder(null)}
        order={selectedReceiptOrder}
      />
      <UmlInspectorModal />
      <NotificationToast />

      {/* Modern Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
              <UtensilsCrossed className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">QuickBite Express</span>
            <span>&bull;</span>
            <span>Online Food Ordering & Fulfillment System</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsUmlModalOpen(true)}
              className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>4 UML Diagrams Specification</span>
            </button>
            <span>&bull;</span>
            <span>Use Case &bull; Activity &bull; Class &bull; Sequence</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Engineered with React + Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <FoodAppProvider>
      <MainAppContent />
    </FoodAppProvider>
  );
}
