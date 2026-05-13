import OrderCard from "@/components/item/OrderCard";
import { useCart } from "@/context/CartContext";
import { getFoods } from "@/services/foods";
import { getOrders } from "@/services/orders";
import { router } from "expo-router";
import React from "react";
import { Alert, FlatList, Text, View } from "react-native";

type SortBy = "date" | "price-high-low" | "price-low-high";

type OrderListProps = {
  filter: "active" | "history";
  sortBy?: SortBy;
};

export default function OrderList({ filter, sortBy }: OrderListProps) {
  const { addItem } = useCart();

  const allOrders = getOrders();
  let filtered = allOrders.filter((o) =>
    filter === "active" ? o.status === "active" : o.status !== "active"
  );

  if (sortBy === "date") {
    filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sortBy === "price-high-low") {
    filtered = [...filtered].sort((a, b) => b.total - a.total);
  } else if (sortBy === "price-low-high") {
    filtered = [...filtered].sort((a, b) => a.total - b.total);
  }

  const handleTrack = (id: string) => {
    router.push({ pathname: "/order/track/[id]", params: { id } });
  };

  const handleViewDetails = (id: string) => {
    router.push({ pathname: "/order/track/[id]", params: { id } });
  };

  const handleReorder = (id: string) => {
    const order = allOrders.find((o) => o.id === id);
    if (!order) return;
    order.items.forEach((item) => {
      const food = getFoods().find((f) => f.id === item.id);
      if (food) {
        addItem({ id: food.id, name: food.name, price: food.price, image: food.image, quantity: item.quantity, restaurant: food.restaurant });
      }
    });
    Alert.alert("Items Added", `${order.items.length} item(s) added to cart`, [
      { text: "Continue", style: "cancel" },
      { text: "View Cart", onPress: () => router.push("/(tabs)/cart") },
    ]);
  };

  if (filtered.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-8 pt-20">
        <Text className="text-xl font-bold text-gray-400 mb-2">
          {filter === "active" ? "No active orders" : "No order history"}
        </Text>
        <Text className="text-sm text-gray-400 text-center">
          {filter === "active" ? "Place an order to see it here" : "Delivered orders will appear here"}
        </Text>
      </View>
    );
  }

  return (
    <FlatList data={filtered} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
      renderItem={({ item }) => (
        <OrderCard id={item.id} restaurant={item.restaurant} status={item.status} total={item.total} date={item.date}
          estimatedTime={item.estimatedTime} rating={item.rating} items={item.items}
          onPress={handleViewDetails} onTrack={handleTrack} onReorder={handleReorder} />
      )} />
  );
}
