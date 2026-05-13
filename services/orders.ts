import { orders } from "@/sampledata/orders";
import { Order } from "@/types";

export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
