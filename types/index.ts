export type Food = {
  id: string;
  name: string;
  restaurant: string;
  category: string;
  price: number;
  rating: number;
  time: number;
  freeDelivery: boolean;
  discount: number;
  veg: boolean;
  description: string;
  image: { uri: string };
};

export type Restaurant = {
  id: string;
  restroImage: { uri: string };
  restroName: string;
  restroLocation: string;
  restroRating: number;
};

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
  review?: string;
};
