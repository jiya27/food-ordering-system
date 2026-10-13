// Seed menu items matching the UML MenuItem class:
// itemId: int, name: String, price: double, category: String, isAvailable: boolean
export const INITIAL_MENU = [
  {
    itemId: 101,
    name: 'Artisan Truffle Cheeseburger',
    category: 'Burgers',
    price: 14.99,
    rating: 4.9,
    reviews: 142,
    prepTime: '15-20 min',
    isAvailable: true,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Double Angus beef patties, aged gruyère, black truffle aioli, caramelized shallots, on toasted brioche.'
  },
  {
    itemId: 102,
    name: 'Classic Margherita Napoletana',
    category: 'Pizzas',
    price: 16.50,
    rating: 4.8,
    reviews: 98,
    prepTime: '18-22 min',
    isAvailable: true,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    description: 'San Marzano DOP tomato sauce, fresh buffalo mozzarella, aromatic sweet basil, cold-pressed olive oil.'
  },
  {
    itemId: 103,
    name: 'Crispy Korean Fried Chicken Bao',
    category: 'Asian',
    price: 13.25,
    rating: 4.9,
    reviews: 210,
    prepTime: '12-15 min',
    isAvailable: true,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    description: 'Double-fried crunchy chicken thigh glazed with gochujang chili honey, house pickled cucumbers, scallions.'
  },
  {
    itemId: 104,
    name: 'Wild Mushroom Fettuccine Alfredo',
    category: 'Pasta',
    price: 17.00,
    rating: 4.7,
    reviews: 76,
    prepTime: '20-25 min',
    isAvailable: true,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh artisanal fettuccine, sautéed chanterelles, porcini cream sauce, 24-month Parmigiano-Reggiano.'
  },
  {
    itemId: 105,
    name: 'Smoked BBQ Bacon Stuffed Burger',
    category: 'Burgers',
    price: 15.50,
    rating: 4.8,
    reviews: 160,
    prepTime: '15-20 min',
    isAvailable: true,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    description: 'Applewood smoked bacon, sharp Vermont cheddar, crispy beer-battered onion strings, homemade smoky BBQ glaze.'
  },
  {
    itemId: 106,
    name: 'Spicy Pepperoni & Hot Honey Pizza',
    category: 'Pizzas',
    price: 18.25,
    rating: 4.9,
    reviews: 320,
    prepTime: '18-22 min',
    isAvailable: true,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    description: 'Artisanal cured spicy pepperoni, whole milk mozzarella, Calabrian chili oil, habanero-infused warm honey drizzle.'
  },
  {
    itemId: 107,
    name: 'Salmon Poke & Avocado Bowl',
    category: 'Asian',
    price: 18.50,
    rating: 4.9,
    reviews: 185,
    prepTime: '10-15 min',
    isAvailable: true,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'Sashimi-grade Norwegian salmon, Hass avocado, edamame, spicy yuzu dressing, sesame, furikake over brown sushi rice.'
  },
  {
    itemId: 108,
    name: 'Mediterranean Grilled Paneer Salad',
    category: 'Healthy',
    price: 12.99,
    rating: 4.6,
    reviews: 84,
    prepTime: '10-12 min',
    isAvailable: true,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Herb-marinated grilled cottage cheese, cherry tomatoes, Kalamata olives, cucumber, lemon oregano vinaigrette.'
  },
  {
    itemId: 109,
    name: 'Molten Belgian Chocolate Lava Cake',
    category: 'Desserts',
    price: 8.75,
    rating: 4.95,
    reviews: 240,
    prepTime: '10 min',
    isAvailable: true,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'Warm dark chocolate ganache center, served with Madagascan bourbon vanilla bean gelato and raspberry coulis.'
  },
  {
    itemId: 110,
    name: 'Sparkling Dragonfruit Mango Cooler',
    category: 'Beverages',
    price: 5.50,
    rating: 4.8,
    reviews: 110,
    prepTime: '5 min',
    isAvailable: true,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh dragonfruit puree, Alphonso mango nectar, fresh mint leaves, sparkling spring water and crushed ice.'
  }
];

// Delivery agents matching the UML DeliveryAgent class:
// agentId: int, name: String, vehicleNo: String, status: String, phone: String
export const INITIAL_AGENTS = [
  {
    agentId: 501,
    name: 'Alex Rivera',
    phone: '+1 (555) 234-8901',
    vehicleNo: 'BIKE-NYC-402',
    rating: 4.9,
    totalDeliveries: 480,
    status: 'AVAILABLE', // AVAILABLE, ASSIGNED, EN_ROUTE, DELIVERED
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    currentLocation: { lat: 40.7128, lng: -74.0060, street: '5th Ave & 23rd St' }
  },
  {
    agentId: 502,
    name: 'Marcus Chen',
    phone: '+1 (555) 876-1234',
    vehicleNo: 'EV-MOTO-910',
    rating: 4.8,
    totalDeliveries: 310,
    status: 'AVAILABLE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    currentLocation: { lat: 40.7200, lng: -73.9950, street: 'Broadway & Houston' }
  },
  {
    agentId: 503,
    name: 'Sarah Jenkins',
    phone: '+1 (555) 432-6789',
    vehicleNo: 'SCOOTER-77',
    rating: 4.95,
    totalDeliveries: 620,
    status: 'AVAILABLE',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    currentLocation: { lat: 40.7300, lng: -74.0000, street: 'Union Square East' }
  }
];

// Initial mock orders to demonstrate the order history & admin dashboard immediately
export const INITIAL_ORDERS = [
  {
    orderId: 1001,
    orderDate: new Date(Date.now() - 3600000 * 3).toISOString(),
    customer: {
      customerId: 1,
      name: 'Jessica Miller',
      email: 'jessica@example.com',
      phone: '+1 (555) 321-9988',
      address: '742 Evergreen Terrace, Apt 4B, Springfield'
    },
    items: [
      { itemId: 101, name: 'Artisan Truffle Cheeseburger', price: 14.99, quantity: 2 },
      { itemId: 110, name: 'Sparkling Dragonfruit Mango Cooler', price: 5.50, quantity: 2 }
    ],
    totalAmount: 40.98,
    status: 'DELIVERED', // PENDING, PAID, PREPARING, READY_FOR_PICKUP, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    payment: {
      paymentId: 9001,
      amount: 40.98,
      paymentMethod: 'CARD',
      status: 'SUCCESS',
      transactionId: 'TXN-9841284-88',
      paidAt: new Date(Date.now() - 3600000 * 3).toLocaleTimeString()
    },
    deliveryAgent: {
      agentId: 501,
      name: 'Alex Rivera',
      phone: '+1 (555) 234-8901',
      vehicleNo: 'BIKE-NYC-402'
    },
    timeline: [
      { step: 'Order Placed', time: '12:15 PM', completed: true },
      { step: 'Payment Verified', time: '12:16 PM', completed: true },
      { step: 'Kitchen Prepared', time: '12:35 PM', completed: true },
      { step: 'Driver Picked Up', time: '12:40 PM', completed: true },
      { step: 'Delivered', time: '1:02 PM', completed: true }
    ]
  },
  {
    orderId: 1002,
    orderDate: new Date(Date.now() - 3600000 * 1).toISOString(),
    customer: {
      customerId: 2,
      name: 'David Robinson',
      email: 'david.r@example.com',
      phone: '+1 (555) 777-6655',
      address: '120 West 44th Street, New York, NY'
    },
    items: [
      { itemId: 106, name: 'Spicy Pepperoni & Hot Honey Pizza', price: 18.25, quantity: 1 },
      { itemId: 109, name: 'Molten Belgian Chocolate Lava Cake', price: 8.75, quantity: 1 }
    ],
    totalAmount: 27.00,
    status: 'OUT_FOR_DELIVERY',
    payment: {
      paymentId: 9002,
      amount: 27.00,
      paymentMethod: 'UPI',
      status: 'SUCCESS',
      transactionId: 'TXN-7193821-22',
      paidAt: new Date(Date.now() - 3600000 * 1).toLocaleTimeString()
    },
    deliveryAgent: {
      agentId: 502,
      name: 'Marcus Chen',
      phone: '+1 (555) 876-1234',
      vehicleNo: 'EV-MOTO-910'
    },
    timeline: [
      { step: 'Order Placed', time: '2:10 PM', completed: true },
      { step: 'Payment Verified', time: '2:11 PM', completed: true },
      { step: 'Kitchen Prepared', time: '2:25 PM', completed: true },
      { step: 'Driver Picked Up', time: '2:30 PM', completed: true },
      { step: 'In Transit to Customer', time: '2:35 PM', completed: false }
    ]
  }
];
