import { orders } from "@/sampledata/orders";
import { Order } from "@/types";

export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function addOrder(order: Omit<Order, "id" | "date"> & { id?: string; date?: string }): Order {
  const newOrder: Order = {
    ...order,
    id: order.id || `ORD-${String(orders.length + 1).padStart(3, "0")}`,
    date: order.date || new Date().toISOString().slice(0, 10),
  };
  orders.unshift(newOrder);
  return newOrder;
}
