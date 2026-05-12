export type OrderStatus = "active" | "delivered" | "cancelled";

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: any;
};

export type Order = {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  deliveryFee: number;
  discount: number;
  date: string;
  estimatedTime?: string;
  restaurant: string;
  rating?: number;
};

export const orders: Order[] = [
  {
    id: "ORD-001",
    restaurant: "Burger House",
    status: "active",
    total: 620,
    deliveryFee: 80,
    discount: 50,
    date: "2026-05-11",
    estimatedTime: "15 min",
    items: [
      { id: "1", name: "Cheese Burger", quantity: 2, price: 250, image: { uri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" } },
      { id: "5", name: "French Fries", quantity: 1, price: 100, image: { uri: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5" } },
    ],
  },
  {
    id: "ORD-002",
    restaurant: "Pizza Hub",
    status: "active",
    total: 510,
    deliveryFee: 80,
    discount: 45,
    date: "2026-05-11",
    estimatedTime: "25 min",
    items: [
      { id: "2", name: "Chicken Pizza", quantity: 1, price: 450, image: { uri: "https://images.unsplash.com/photo-1548365328-9f547f2a2a0f" } },
    ],
  },
  {
    id: "ORD-003",
    restaurant: "Momo King",
    status: "delivered",
    total: 240,
    deliveryFee: 0,
    discount: 12,
    date: "2026-05-10",
    rating: 5,
    items: [
      { id: "3", name: "Veg Momos", quantity: 2, price: 120, image: { uri: "https://images.unsplash.com/photo-1604908177522-040f8d0a7b3a" } },
    ],
  },
  {
    id: "ORD-004",
    restaurant: "Royal Kitchen",
    status: "delivered",
    total: 350,
    deliveryFee: 40,
    discount: 35,
    date: "2026-05-09",
    rating: 4,
    items: [
      { id: "4", name: "Chicken Biryani", quantity: 1, price: 350, image: { uri: "https://images.unsplash.com/photo-1604908554161-2f2f1b1c1c1c" } },
    ],
  },
  {
    id: "ORD-005",
    restaurant: "Toast Cafe",
    status: "delivered",
    total: 360,
    deliveryFee: 0,
    discount: 9,
    date: "2026-05-08",
    rating: 4,
    items: [
      { id: "6", name: "Grilled Sandwich", quantity: 2, price: 180, image: { uri: "https://images.unsplash.com/photo-1550507992-eb63ffee0847" } },
    ],
  },
  {
    id: "ORD-006",
    restaurant: "Snack Point",
    status: "cancelled",
    total: 100,
    deliveryFee: 0,
    discount: 0,
    date: "2026-05-07",
    items: [
      { id: "5", name: "French Fries", quantity: 1, price: 100, image: { uri: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5" } },
    ],
  },
];
