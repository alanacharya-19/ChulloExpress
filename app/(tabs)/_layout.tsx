import { useCart } from "@/context/CartContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

function CartBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <View className="absolute -top-1 -right-2 bg-[#FF6B00] rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
      <Text className="text-white text-[10px] font-bold">{count > 99 ? "99+" : count}</Text>
    </View>
  );
}

export default function TabLayout() {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          marginLeft: 18,
          width: "90%",
          bottom: 20,
          left: 16,
          right: 16,
          height: 60,
          borderRadius: 25,
          backgroundColor: "#F5F5F5",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 6,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: focused ? "900" : "400", color: focused ? "#FF6B00" : "#8E8E93" }}>Home</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={focused ? "#FF6B00" : "#8E8E93"} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: focused ? "900" : "400", color: focused ? "#FF6B00" : "#8E8E93" }}>Explore</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "compass" : "compass-outline"} size={24} color={focused ? "#FF6B00" : "#8E8E93"} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: focused ? "900" : "400", color: focused ? "#FF6B00" : "#8E8E93" }}>Cart</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons name={focused ? "cart" : "cart-outline"} size={24} color={focused ? "#FF6B00" : "#8E8E93"} />
              <CartBadge count={cartCount} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: focused ? "900" : "400", color: focused ? "#FF6B00" : "#8E8E93" }}>Order</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "bag" : "bag-outline"} size={24} color={focused ? "#FF6B00" : "#8E8E93"} />
          ),
        }}
      />
    </Tabs>
  );
}
