import OrderCard from "@/components/item/OrderCard";
import { orders, type Order } from "@/sample/order";
import React from "react";
import { FlatList, Text, View } from "react-native";

type OrderListProps = {
  filter: "active" | "history";
};

export default function OrderList({ filter }: OrderListProps) {
  const filtered = orders.filter((o) =>
    filter === "active" ? o.status === "active" : o.status !== "active"
  );

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
          onTrack={(id) => console.log("Track", id)}
          onReorder={(id) => console.log("Reorder", id)}
        />
      )}
    />
  );
}
