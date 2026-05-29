import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FavoritesProvider>
    </CartProvider>
  );
}
