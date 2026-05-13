import { Order } from "@/types";

const data: Order[] = [
  {
    id: "ORD-001",
    items: [
      { id: "1", name: "Cheese Burger", quantity: 2, price: 250, image: { uri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" } },
      { id: "5", name: "French Fries", quantity: 1, price: 100, image: { uri: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5" } },
    ],
    status: "active",
    total: 650,
    deliveryFee: 50,
    discount: 20,
    date: "2026-05-13",
    estimatedTime: "25-30 min",
    restaurant: "Burger House",
  },
  {
    id: "ORD-002",
    items: [
      { id: "2", name: "Chicken Pizza", quantity: 1, price: 450, image: { uri: "https://images.unsplash.com/photo-1548365328-9f547f2a2a0f" } },
    ],
    status: "active",
    total: 500,
    deliveryFee: 60,
    discount: 10,
    date: "2026-05-12",
    estimatedTime: "30-35 min",
    restaurant: "Pizza Corner",
  },
  {
    id: "ORD-003",
    items: [
      { id: "3", name: "Veg Momos", quantity: 1, price: 120, image: { uri: "https://images.unsplash.com/photo-1604908177522-040f8d0a7b3a" } },
      { id: "9", name: "Chicken Momos", quantity: 1, price: 150, image: { uri: "https://images.unsplash.com/photo-1626132647523-66f5a3800e3e" } },
    ],
    status: "delivered",
    total: 340,
    deliveryFee: 30,
    discount: 20,
    date: "2026-05-10",
    restaurant: "Momo Station",
    rating: 4,
    review: "Great momos! Loved the chicken ones.",
  },
  {
    id: "ORD-004",
    items: [
      { id: "4", name: "Chicken Biryani", quantity: 1, price: 350, image: { uri: "https://images.unsplash.com/photo-1604908554161-2f2f1b1c1c1c" } },
      { id: "10", name: "Veg Biryani", quantity: 1, price: 280, image: { uri: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8" } },
    ],
    status: "delivered",
    total: 720,
    deliveryFee: 40,
    discount: 50,
    date: "2026-05-08",
    restaurant: "Spicy Hut",
    rating: 5,
    review: "Best biryani in town!",
  },
  {
    id: "ORD-005",
    items: [
      { id: "6", name: "Grilled Sandwich", quantity: 1, price: 180, image: { uri: "https://images.unsplash.com/photo-1550507992-eb63ffee0847" } },
      { id: "16", name: "Cold Coffee", quantity: 1, price: 150, image: { uri: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735" } },
    ],
    status: "cancelled",
    total: 380,
    deliveryFee: 50,
    discount: 0,
    date: "2026-05-07",
    restaurant: "Cafe Aroma",
  },
  {
    id: "ORD-006",
    items: [
      { id: "14", name: "BBQ Wings", quantity: 2, price: 380, image: { uri: "https://images.unsplash.com/photo-1527477396000-e27163b4be8a" } },
      { id: "15", name: "BBQ Platter", quantity: 1, price: 650, image: { uri: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" } },
    ],
    status: "delivered",
    total: 1500,
    deliveryFee: 60,
    discount: 80,
    date: "2026-05-05",
    restaurant: "BBQ Nation",
    rating: 5,
    review: "Amazing BBQ! The platter is a must-try.",
  },
];

export function getOrders(): Order[] {
  return data;
}

export function getOrderById(id: string): Order | undefined {
  return data.find((o) => o.id === id);
}
