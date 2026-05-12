import OrderCard from "@/components/item/OrderCard";
import { useCart } from "@/context/CartContext";
import { foods } from "@/sample/food";
import { orders } from "@/sample/order";
import { router } from "expo-router";
import React from "react";
import { Alert, FlatList, Text, View } from "react-native";

type OrderListProps = {
  filter: "active" | "history";
};

export default function OrderList({ filter }: OrderListProps) {
  const { addItem } = useCart();

  const filtered = orders.filter((o) =>
    filter === "active" ? o.status === "active" : o.status !== "active"
  );

  const handleTrack = (id: string) => {
    router.push({ pathname: "/order/track/[id]", params: { id } });
  };

  const handleViewDetails = (id: string) => {
    router.push({ pathname: "/order/track/[id]", params: { id } });
  };

  const handleReorder = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    order.items.forEach((item) => {
      const food = foods.find((f) => f.id === item.id);
      if (food) {
        addItem({
          id: food.id,
          name: food.name,
          price: food.price,
          image: food.image,
          quantity: item.quantity,
          restaurant: food.restaurant,
        });
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
          {filter === "active"
            ? "Place an order to see it here"
            : "Delivered orders will appear here"}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
      renderItem={({ item }) => (
        <OrderCard
          id={item.id}
          restaurant={item.restaurant}
          status={item.status}
          total={item.total}
          date={item.date}
          estimatedTime={item.estimatedTime}
          rating={item.rating}
          items={item.items}
          onPress={handleViewDetails}
          onTrack={handleTrack}
          onReorder={handleReorder}
        />
      )}
    />
  );
}
