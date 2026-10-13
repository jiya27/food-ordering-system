import React, { useState } from 'react';
import { useFoodApp } from '../../context/FoodAppContext';
import { 
  X, 
  Workflow, 
  Layers, 
  GitBranch, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  CreditCard, 
  Utensils, 
  Bike, 
  ShieldCheck,
  Play
} from 'lucide-react';

export default function UmlInspectorModal() {
  const { isUmlModalOpen, setIsUmlModalOpen, orders, activeTrackingOrderId, simulateFullWorkflow } = useFoodApp();
  const [activeTab, setActiveTab] = useState('sequence');

  if (!isUmlModalOpen) return null;

  const currentOrder = orders.find(o => o.orderId === activeTrackingOrderId) || orders[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">UML System Architecture Inspector</h2>
              <p className="text-xs text-slate-500">
                Interactive mapping of the Frontend implementation to the project's 4 UML Diagrams
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUmlModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-5 bg-white text-xs font-semibold text-slate-600 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('sequence')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'sequence'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>1. Sequence Diagram (9 Steps)</span>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'activity'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>2. Activity Diagram (Fork / Join)</span>
          </button>
          <button
            onClick={() => setActiveTab('usecase')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'usecase'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>3. Use Case Diagram (4 Actors)</span>
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'classes'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>4. Class Diagram (Data Entities)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
          {/* TAB 1: SEQUENCE DIAGRAM */}
          {activeTab === 'sequence' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <div>
                  <h3 className="font-bold text-indigo-950 text-sm">Sequence Diagram: Order Placement to Fulfillment Flow</h3>
                  <p className="text-xs text-indigo-700 mt-0.5">
                    Lifelines: <strong>Customer</strong> &rarr; <strong>:FoodOrderingSystem</strong> &rarr; <strong>:PaymentGateway</strong> &rarr; <strong>:KitchenSystem</strong> &rarr; <strong>:DeliveryAgent</strong>
                  </p>
                </div>
                {currentOrder && (
                  <button
                    onClick={() => simulateFullWorkflow(currentOrder.orderId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Live Sim (# {currentOrder.orderId})</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { step: 1, from: 'Customer', to: ':FoodOrderingSystem', method: 'selectItems & checkout()', desc: 'Customer browses menu, adds items to cart, proceeds to checkout form.', active: true },
                  { step: 2, from: ':FoodOrderingSystem', to: ':PaymentGateway', method: 'initiatePayment(orderTotal)', desc: 'System calls payment gateway with calculated grand total and payment token.', active: true },
                  { step: 3, from: ':PaymentGateway', to: ':PaymentGateway', method: 'verifyAccount()', desc: 'Gateway runs fraud check & authorization (supports retry on fail).', active: true },
                  { step: 4, from: ':PaymentGateway', to: ':FoodOrderingSystem', method: 'paymentSuccess()', desc: 'Gateway transmits transaction receipt and sets payment status to SUCCESS.', active: currentOrder?.status !== 'PENDING' },
                  { step: 5, from: ':FoodOrderingSystem', to: ':KitchenSystem', method: 'sendOrderToKitchen(orderId)', desc: 'Kitchen displays ticket in real-time and starts meal preparation.', active: ['PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(currentOrder?.status) },
                  { step: 6, from: ':KitchenSystem', to: ':FoodOrderingSystem', method: 'orderReadyForPickup()', desc: 'Kitchen chef marks food sealed and ready at pickup counter.', active: ['READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(currentOrder?.status) },
                  { step: 7, from: ':FoodOrderingSystem', to: ':DeliveryAgent', method: 'assignDelivery(pickupDetails)', desc: 'Dispatcher assigns nearest courier with route and customer address.', active: ['READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(currentOrder?.status) },
                  { step: 8, from: ':DeliveryAgent', to: 'Customer', method: 'deliverFoodToCustomer()', desc: 'Agent picks up package, navigates GPS transit, and arrives at doorstep.', active: ['OUT_FOR_DELIVERY', 'DELIVERED'].includes(currentOrder?.status) },
                  { step: 9, from: 'Customer', to: ':FoodOrderingSystem', method: 'confirmDeliveryReceived()', desc: 'Customer clicks "I have received my order" to complete workflow lifecycle.', active: currentOrder?.status === 'DELIVERED' }
                ].map(item => (
                  <div
                    key={item.step}
                    className={`p-3.5 rounded-xl border transition ${
                      item.active
                        ? 'bg-slate-50 border-indigo-200'
                        : 'bg-white border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-indigo-600">Step {item.step}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/70 font-mono text-slate-700">
                        {item.from} &rarr; {item.to}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] font-bold text-slate-900 bg-white p-1 rounded border border-slate-200 mb-1">
                      {item.method}
                    </div>
                    <p className="text-[11px] text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITY DIAGRAM */}
          {activeTab === 'activity' && (
            <div className="space-y-4 text-xs">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <h3 className="font-bold text-amber-950 text-sm">Activity Workflow: Order & Fulfillment Decision Points</h3>
                <p className="text-amber-800 mt-0.5 text-xs">
                  Features explicit <strong>Verify Payment [Failed: Retry / Success]</strong> and <strong>Fork/Join concurrency</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-3 font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>(● Start Node) &rarr; Log in / Authenticate</span>
                </div>
                <div className="pl-6 border-l-2 border-slate-700">
                  <p>&darr; Browse Menu & Add Items to Cart</p>
                  <p>&darr; Checkout & Submit Payment</p>
                  <div className="my-2 p-2 bg-slate-800 rounded-lg border border-amber-500/40 text-amber-300">
                    <strong>Decision: Verify Payment?</strong>
                    <div className="text-rose-400 text-[11px] mt-1 pl-2 border-l border-rose-500">
                      [Failed: Retry] &rarr; Loops back to Checkout & Submit Payment (tested via checkout toggle)
                    </div>
                    <div className="text-emerald-400 text-[11px] mt-1 pl-2 border-l border-emerald-500">
                      [Success] &rarr; Proceeds to Concurrency Fork
                    </div>
                  </div>
                  <div className="p-2 bg-indigo-950/60 rounded-lg border border-indigo-500/40 my-2">
                    <span className="text-indigo-300 font-bold">&laquo;fork&raquo;</span>
                    <div className="grid grid-cols-2 gap-2 mt-1 text-[11px]">
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-700 text-slate-200">
                        &bull; Restaurant Prepares Food & Packages Order
                      </div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-700 text-slate-200">
                        &bull; System Dispatches & Assigns Delivery Agent
                      </div>
                    </div>
                    <span className="text-indigo-300 font-bold block mt-2">&laquo;join&raquo;</span>
                  </div>
                  <p>&darr; Agent Picks Up Order & Transits</p>
                  <p>&darr; Order Delivered to Customer & Confirmed</p>
                </div>
                <div className="flex items-center gap-2 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span>(⦿ Final Node: Completed)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: USE CASE DIAGRAM */}
          {activeTab === 'usecase' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                <div className="flex items-center gap-2 font-bold text-blue-900 text-sm mb-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Customer (Actor)</span>
                </div>
                <ul className="space-y-1.5 text-blue-800">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Register / Log in</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Browse Menu (categories, search, diet tags)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Place Order (custom items, notes, address)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Make Payment (Card, UPI, Wallet, COD)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Track Order (Live updates & receipt)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
                <div className="flex items-center gap-2 font-bold text-purple-900 text-sm mb-2">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Payment Gateway (Actor)</span>
                </div>
                <ul className="space-y-1.5 text-purple-800">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Make Payment authorization</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Verify Account & Fraud check</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Emit success callback or failure retry</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Admin (Actor)</span>
                </div>
                <ul className="space-y-1.5 text-emerald-800">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Manage Menu (Add dishes, update prices, stock)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Manage Orders (Kitchen tickets, advance statuses)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> View Reports & Business Analytics</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm mb-2">
                  <Bike className="w-4 h-4 text-amber-600" />
                  <span>Delivery Agent (Actor)</span>
                </div>
                <ul className="space-y-1.5 text-amber-800">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Accept assigned delivery</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Update real-time GPS location</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Deliver Order & finalize confirmation</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: CLASS DIAGRAM */}
          {activeTab === 'classes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-indigo-700 border-b pb-1 mb-1.5 text-center">Customer</div>
                <div className="text-slate-600 text-[11px] mb-2">
                  - customerId: int<br/>
                  - name: String<br/>
                  - email: String<br/>
                  - address: String
                </div>
                <div className="text-slate-800 text-[11px] pt-1 border-t">
                  + register(): boolean<br/>
                  + login(): boolean<br/>
                  + placeOrder(): Order<br/>
                  + trackOrder(): Status
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-indigo-700 border-b pb-1 mb-1.5 text-center">Order</div>
                <div className="text-slate-600 text-[11px] mb-2">
                  - orderId: int<br/>
                  - orderDate: Date<br/>
                  - totalAmount: double<br/>
                  - status: String
                </div>
                <div className="text-slate-800 text-[11px] pt-1 border-t">
                  + addItem(item): void<br/>
                  + calculateTotal(): double<br/>
                  + updateStatus(): void<br/>
                  + cancel(): boolean
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-indigo-700 border-b pb-1 mb-1.5 text-center">MenuItem</div>
                <div className="text-slate-600 text-[11px] mb-2">
                  - itemId: int<br/>
                  - name: String<br/>
                  - price: double<br/>
                  - category: String
                </div>
                <div className="text-slate-800 text-[11px] pt-1 border-t">
                  + getDetails(): String<br/>
                  + updatePrice(): void<br/>
                  + isAvailable(): boolean
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-indigo-700 border-b pb-1 mb-1.5 text-center">Payment</div>
                <div className="text-slate-600 text-[11px] mb-2">
                  - paymentId: int<br/>
                  - amount: double<br/>
                  - paymentMethod: String<br/>
                  - status: String
                </div>
                <div className="text-slate-800 text-[11px] pt-1 border-t">
                  + processPayment(): boolean<br/>
                  + refund(): boolean<br/>
                  + generateReceipt(): String
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-indigo-700 border-b pb-1 mb-1.5 text-center">Admin</div>
                <div className="text-slate-600 text-[11px] mb-2">
                  - adminId: int<br/>
                  - name: String<br/>
                  - role: String
                </div>
                <div className="text-slate-800 text-[11px] pt-1 border-t">
                  + manageMenu(): void<br/>
                  + viewReports(): void<br/>
                  + manageOrders(): void
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-indigo-700 border-b pb-1 mb-1.5 text-center">DeliveryAgent</div>
                <div className="text-slate-600 text-[11px] mb-2">
                  - agentId: int<br/>
                  - name: String<br/>
                  - vehicleNo: String<br/>
                  - status: String
                </div>
                <div className="text-slate-800 text-[11px] pt-1 border-t">
                  + acceptOrder(): void<br/>
                  + updateLocation(): void<br/>
                  + markDelivered(): void
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={() => setIsUmlModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-xl transition cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
