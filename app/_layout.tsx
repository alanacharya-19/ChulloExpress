import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <NotificationProvider>
          <CartProvider>
            <FavoritesProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </FavoritesProvider>
          </CartProvider>
        </NotificationProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
