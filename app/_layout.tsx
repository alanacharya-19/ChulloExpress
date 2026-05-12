import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
