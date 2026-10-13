# QuickBite Express - Online Food Ordering & Fulfillment System

A modern, responsive React + Tailwind CSS web frontend designed strictly from UML Architecture diagrams: **Use Case Diagram**, **Activity Diagram**, **Class Diagram**, and **Sequence Diagram**.

---

## 🚀 Live Demo & Development Server
The application is running live at:
```bash
http://localhost:5173/
```

To run manually:
```bash
cd food-ordering-system
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

---

## 📐 Direct UML Diagram Mapping

### 1. UML Use Case Diagram
| Actor | Implemented Use Cases in Frontend |
|---|---|
| **Customer** | • Register / Log in (`CustomerAuthModal.jsx`)<br>• Browse Menu (`MenuSection.jsx`, categories, dietary filter, search)<br>• Place Order (`CartDrawer.jsx`, `CheckoutModal.jsx`)<br>• Make Payment (Card, UPI, Wallet, COD)<br>• Track Order (`OrderTracker.jsx`, `ReceiptModal.jsx`) |
| **Payment Gateway** | • Make Payment authorization & account verification<br>• Supports success callback or failure retry loop |
| **Admin** | • Manage Menu (`MenuManager.jsx`: add, edit price, toggle stock, delete)<br>• Manage Orders (`OrderManager.jsx`: kanban board, dispatch couriers)<br>• View Reports (`AdminDashboard.jsx`: gross sales, category breakdown) |
| **Delivery Agent** | • Deliver Order (`DeliveryDashboard.jsx`: accept run, pickup, GPS navigation simulation, mark delivered) |

---

### 2. UML Activity Diagram (Order & Fulfillment Workflow)
- **Start Node** &rarr; `Log in / Authenticate`
- &rarr; `Browse Menu & Add Items to Cart`
- &rarr; `Checkout & Submit Payment`
- &rarr; **Decision: Verify Payment?**
  - **[Failed: Retry]**: Includes an interactive simulation checkbox in Checkout to demo the decline & retry branch.
  - **[Success]**: Fires confetti and proceeds to fork.
- &rarr; **«fork» Concurrency**:
  - *Branch 1*: `Restaurant Prepares Food & Packages Order` (Kitchen ticket advances from PAID &rarr; PREPARING &rarr; READY_FOR_PICKUP)
  - *Branch 2*: `System Dispatches & Assigns Delivery Agent` (Courier status changes from AVAILABLE &rarr; ASSIGNED)
- &rarr; **«join» Concurrency**:
  - `Agent Picks Up Order & Transits` (OUT_FOR_DELIVERY)
  - `Order Delivered to Customer & Confirmed` (DELIVERED)
- &rarr; **Final Node**: Generates printable official receipt.

---

### 3. UML Class Diagram (Core Domain Architecture)
- **`Customer`**: `customerId`, `name`, `email`, `address`, `register()`, `login()`, `placeOrder()`, `trackOrder()`.
- **`Order`**: `orderId`, `orderDate`, `totalAmount`, `status`, `addItem()`, `calculateTotal()`, `updateStatus()`, `cancel()`.
- **`MenuItem`**: `itemId`, `name`, `price`, `category`, `image`, `prepTime`, `isAvailable`, `getDetails()`, `updatePrice()`, `isAvailable()`.
- **`Payment`**: `paymentId`, `amount`, `paymentMethod` (CARD/UPI/WALLET/COD), `status`, `processPayment()`, `refund()`, `generateReceipt()`.
- **`Admin`**: `adminId`, `name`, `role`, `manageMenu()`, `viewReports()`, `manageOrders()`.
- **`DeliveryAgent`**: `agentId`, `name`, `vehicleNo`, `status`, `acceptOrder()`, `updateLocation()`, `markDelivered()`.

---

### 4. UML Sequence Diagram (Step 1 to Step 9)
1. **Customer &rarr; FoodOrderingSystem**: `selectItems & checkout()`
2. **FoodOrderingSystem &rarr; PaymentGateway**: `initiatePayment(orderTotal)`
3. **PaymentGateway &rarr; PaymentGateway**: `verifyAccount()`
4. **PaymentGateway &rarr; FoodOrderingSystem**: `paymentSuccess()`
5. **FoodOrderingSystem &rarr; KitchenSystem**: `sendOrderToKitchen(orderId)`
6. **KitchenSystem &rarr; FoodOrderingSystem**: `orderReadyForPickup()`
7. **FoodOrderingSystem &rarr; DeliveryAgent**: `assignDelivery(pickupDetails)`
8. **DeliveryAgent &rarr; Customer**: `deliverFoodToCustomer()`
9. **Customer &rarr; FoodOrderingSystem**: `confirmDeliveryReceived()`

*(Features a 1-click **"Simulate Full Sequence Flow"** button to showcase all 9 steps in real-time).*

---

## 🛠️ Project Structure
```
food-ordering-system/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx               # Role Switcher (Customer / Admin / Courier) & Inspector
│   │   │   ├── NotificationToast.jsx    # Real-time state change toasts
│   │   │   └── UmlInspectorModal.jsx    # Interactive 4-diagram visual inspector
│   │   ├── customer/
│   │   │   ├── MenuSection.jsx          # Menu catalog, categories, search, diet tags
│   │   │   ├── DishCard.jsx             # Visual dish card with cart counter
│   │   │   ├── CartDrawer.jsx           # Slide-over cart, address, tax & promo math
│   │   │   ├── CheckoutModal.jsx        # Payment gateway simulator (Card, UPI, COD)
│   │   │   ├── OrderTracker.jsx         # Live status timeline, courier card, radar map
│   │   │   ├── ReceiptModal.jsx         # Printable official tax invoice
│   │   │   ├── CustomerAuthModal.jsx    # Customer login / registration
│   │   │   └── OrderHistoryModal.jsx    # Past orders list
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx       # KPI stats & sub-modules
│   │   │   ├── OrderManager.jsx         # Kitchen queue & courier dispatching
│   │   │   ├── MenuManager.jsx          # Catalog CRUD & price management
│   │   │   └── EditDishModal.jsx        # Add/edit dish form
│   │   └── delivery/
│   │       └── DeliveryDashboard.jsx    # Assigned runs, turn-by-turn GPS radar, delivery confirmation
│   ├── context/
│   │   └── FoodAppContext.jsx           # Global reactive state & workflow engine
│   ├── data/
│   │   └── initialData.js               # Seed menu, delivery agents, and orders
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```
