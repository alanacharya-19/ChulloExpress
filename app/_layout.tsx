import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <CartProvider>
          <FavoritesProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </FavoritesProvider>
        </CartProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
