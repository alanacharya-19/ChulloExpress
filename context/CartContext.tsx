import React, { createContext, useContext, useMemo, useReducer } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: any;
  quantity: number;
  restaurant: string;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" };

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getDeliveryFee: () => number;
  getDiscount: () => number;
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: Math.min(99, i.quantity + 1) }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: Math.min(99, action.payload.quantity) }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.min(99, Math.max(1, action.payload.quantity)) }
            : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo(
    () => ({
      items: state.items,
      addItem: (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }),
      removeItem: (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id }),
      updateQuantity: (id: string, quantity: number) =>
        dispatch({ type: "UPDATE_QTY", payload: { id, quantity } }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      getTotal: () =>
        state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getItemCount: () =>
        state.items.reduce((sum, i) => sum + i.quantity, 0),
      getDeliveryFee: () => (state.items.length > 0 ? 80 : 0),
      getDiscount: () =>
        state.items.reduce((sum, i) => sum + i.price * i.quantity * 0.1, 0),
    }),
    [state.items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
