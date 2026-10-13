import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MENU, INITIAL_AGENTS, INITIAL_ORDERS } from '../data/initialData';
import confetti from 'canvas-confetti';

const FoodAppContext = createContext(null);

export function FoodAppProvider({ children }) {
  // Current view role: 'customer' | 'admin' | 'delivery'
  const [activeRole, setActiveRole] = useState('customer');

  // Customer state (matches UML Customer class)
  const [customer, setCustomer] = useState({
    customerId: 1,
    name: 'Jessica Miller',
    email: 'jessica.m@example.com',
    address: '742 Evergreen Terrace, Apt 4B, Springfield',
    phone: '+1 (555) 321-9988',
    isLoggedIn: true
  });

  // Admin state (matches UML Admin class)
  const [admin] = useState({
    adminId: 901,
    name: 'Chef & Manager Gordon',
    role: 'Head Restaurant Administrator'
  });

  // Delivery agent active profile
  const [activeAgentId, setActiveAgentId] = useState(501);

  // Core Data Stores with localStorage backup
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem('food_ordering_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('food_ordering_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem('food_ordering_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });

  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(1002);
  const [isUmlModalOpen, setIsUmlModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('food_ordering_menu', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem('food_ordering_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('food_ordering_agents', JSON.stringify(agents));
  }, [agents]);

  // Toast helper
  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.itemId === item.itemId);
      if (existing) {
        return prev.map(i => i.itemId === item.itemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    addToast('Item Added', `${item.name} added to your cart`, 'success');
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.itemId !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.itemId === itemId) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      }).filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartSubtotal > 0 ? (cartSubtotal > 35 ? 0 : 3.99) : 0;
  const taxAmount = cartSubtotal * 0.0825; // 8.25%
  const grandTotal = cartSubtotal + deliveryFee + taxAmount;

  // Order Placement (Matches Activity Diagram: Checkout -> Verify Payment -> Fork -> Join)
  const placeOrder = ({ paymentMethod, shouldFailPayment = false, customerNotes = '' }) => {
    return new Promise((resolve, reject) => {
      // Step 2 & 3: Initiate Payment & Verify Account
      setTimeout(() => {
        if (shouldFailPayment) {
          addToast(
            'Payment Verification Failed',
            'Card was declined or timeout occurred. (Activity Diagram: [Failed: Retry])',
            'error'
          );
          reject(new Error('Payment gateway declined transaction. Please retry.'));
          return;
        }

        // Step 4: Payment Success!
        const newOrderId = Math.floor(1000 + Math.random() * 9000);
        const assignedAgent = agents.find(a => a.status === 'AVAILABLE') || agents[0];

        const newOrder = {
          orderId: newOrderId,
          orderDate: new Date().toISOString(),
          customer: { ...customer },
          items: [...cart],
          totalAmount: parseFloat(grandTotal.toFixed(2)),
          status: 'PAID', // Initial verified state
          kitchenNotes: customerNotes,
          payment: {
            paymentId: Math.floor(9000 + Math.random() * 1000),
            amount: parseFloat(grandTotal.toFixed(2)),
            paymentMethod,
            status: 'SUCCESS',
            transactionId: `TXN-${Math.floor(1000000 + Math.random() * 9000000)}`,
            paidAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
          deliveryAgent: {
            agentId: assignedAgent.agentId,
            name: assignedAgent.name,
            phone: assignedAgent.phone,
            vehicleNo: assignedAgent.vehicleNo
          },
          timeline: [
            { step: 'Order Placed & Checkout', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true },
            { step: 'Payment Verified & Approved', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true },
            { step: 'Kitchen Received & Preparing', time: 'In Progress', completed: false },
            { step: 'Delivery Agent Assigned & Dispatched', time: 'Pending', completed: false },
            { step: 'Food Picked Up & En Route', time: 'Pending', completed: false },
            { step: 'Delivered to Customer', time: 'Pending', completed: false }
          ]
        };

        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        setActiveTrackingOrderId(newOrderId);

        // Update assigned agent status
        setAgents(prev => prev.map(a => a.agentId === assignedAgent.agentId ? { ...a, status: 'ASSIGNED' } : a));

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        addToast(
          'Order Confirmed!',
          `Order #${newOrderId} sent to kitchen. Payment approved!`,
          'success'
        );

        resolve(newOrder);
      }, 1200);
    });
  };

  // Step-by-step Status Progression (Matches UML Sequence Diagram)
  const advanceOrderStatus = (orderId, targetStatus) => {
    setOrders(prev => prev.map(ord => {
      if (ord.orderId !== orderId) return ord;

      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let updatedTimeline = [...ord.timeline];
      let newAgentStatus = 'ASSIGNED';

      if (targetStatus === 'PREPARING') {
        updatedTimeline[2] = { ...updatedTimeline[2], time: nowTime, completed: true };
        addToast('Kitchen Update', `Order #${orderId} is being prepared by chefs!`, 'info');
      } else if (targetStatus === 'READY_FOR_PICKUP') {
        updatedTimeline[2] = { ...updatedTimeline[2], completed: true };
        updatedTimeline[3] = { ...updatedTimeline[3], time: nowTime, completed: true };
        addToast('Kitchen Ready', `Order #${orderId} packaged and ready for pickup!`, 'info');
      } else if (targetStatus === 'OUT_FOR_DELIVERY') {
        updatedTimeline[2] = { ...updatedTimeline[2], completed: true };
        updatedTimeline[3] = { ...updatedTimeline[3], completed: true };
        updatedTimeline[4] = { ...updatedTimeline[4], time: nowTime, completed: true };
        newAgentStatus = 'EN_ROUTE';
        addToast('Agent In Transit', `Delivery Agent picked up order #${orderId} and is on the way!`, 'info');
      } else if (targetStatus === 'DELIVERED') {
        updatedTimeline = updatedTimeline.map(t => ({ ...t, completed: true, time: t.time === 'Pending' || t.time === 'In Progress' ? nowTime : t.time }));
        newAgentStatus = 'AVAILABLE';
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        addToast('Delivered!', `Order #${orderId} delivered and verified by customer!`, 'success');
      }

      // Update agent status if associated
      if (ord.deliveryAgent?.agentId) {
        setAgents(agList => agList.map(a => a.agentId === ord.deliveryAgent.agentId ? { ...a, status: newAgentStatus } : a));
      }

      return {
        ...ord,
        status: targetStatus,
        timeline: updatedTimeline
      };
    }));
  };

  // Sequence Diagram Step 9: Customer confirms delivery received
  const confirmDeliveryReceived = (orderId) => {
    advanceOrderStatus(orderId, 'DELIVERED');
  };

  // Automated Full-Lifecycle Demo Simulator (Runs sequence steps 1 -> 9 automatically)
  const simulateFullWorkflow = async (orderId) => {
    addToast('Simulation Started', 'Simulating end-to-end UML sequence diagram...', 'info');
    advanceOrderStatus(orderId, 'PREPARING');
    
    setTimeout(() => {
      advanceOrderStatus(orderId, 'READY_FOR_PICKUP');
      setTimeout(() => {
        advanceOrderStatus(orderId, 'OUT_FOR_DELIVERY');
        setTimeout(() => {
          advanceOrderStatus(orderId, 'DELIVERED');
        }, 4000);
      }, 3500);
    }, 3000);
  };

  // Menu Management (Admin methods from UML Class diagram)
  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      itemId: Math.max(...menu.map(m => m.itemId), 100) + 1,
      rating: 5.0,
      reviews: 1,
      isAvailable: true
    };
    setMenu(prev => [newItem, ...prev]);
    addToast('Menu Updated', `"${newItem.name}" added to menu catalog`, 'success');
  };

  const updateMenuItem = (itemId, updatedData) => {
    setMenu(prev => prev.map(m => m.itemId === itemId ? { ...m, ...updatedData } : m));
    addToast('Menu Updated', 'Item details saved successfully', 'success');
  };

  const toggleItemAvailability = (itemId) => {
    setMenu(prev => prev.map(m => {
      if (m.itemId === itemId) {
        const nextState = !m.isAvailable;
        addToast('Availability Toggled', `${m.name} is now ${nextState ? 'Available' : 'Sold Out'}`, 'info');
        return { ...m, isAvailable: nextState };
      }
      return m;
    }));
  };

  const deleteMenuItem = (itemId) => {
    setMenu(prev => prev.filter(m => m.itemId !== itemId));
    addToast('Item Removed', 'Menu item removed from catalog', 'info');
  };

  // Reset to initial state
  const resetToDemoDefaults = () => {
    setMenu(INITIAL_MENU);
    setOrders(INITIAL_ORDERS);
    setAgents(INITIAL_AGENTS);
    setCart([]);
    localStorage.removeItem('food_ordering_menu');
    localStorage.removeItem('food_ordering_orders');
    localStorage.removeItem('food_ordering_agents');
    addToast('Demo Reset', 'Reset all menu, orders, and agent states to initial seed data', 'info');
  };

  return (
    <FoodAppContext.Provider value={{
      // Roles
      activeRole,
      setActiveRole,
      // Customer
      customer,
      setCustomer,
      isAuthModalOpen,
      setIsAuthModalOpen,
      // Admin
      admin,
      // Agent
      agents,
      setAgents,
      activeAgentId,
      setActiveAgentId,
      // Menu
      menu,
      addMenuItem,
      updateMenuItem,
      toggleItemAvailability,
      deleteMenuItem,
      // Cart
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartSubtotal,
      deliveryFee,
      taxAmount,
      grandTotal,
      // Orders & Tracking
      orders,
      activeTrackingOrderId,
      setActiveTrackingOrderId,
      placeOrder,
      advanceOrderStatus,
      confirmDeliveryReceived,
      simulateFullWorkflow,
      // UML Inspector
      isUmlModalOpen,
      setIsUmlModalOpen,
      // Toasts
      toasts,
      addToast,
      removeToast,
      resetToDemoDefaults
    }}>
      {children}
    </FoodAppContext.Provider>
  );
}

export function useFoodApp() {
  const context = useContext(FoodAppContext);
  if (!context) {
    throw new Error('useFoodApp must be used within FoodAppProvider');
  }
  return context;
}
