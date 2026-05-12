import { useCart } from "@/context/CartContext";
import { foods } from "@/sample/food";
import { orders } from "@/sample/order";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const statusConfig = {
  active: { color: "#22C55E", bg: "#E8F5E9", label: "Preparing", steps: ["Ordered", "Preparing", "On the Way", "Delivered"], current: 1 },
  delivered: { color: "#1565C0", bg: "#E3F2FD", label: "Delivered", steps: ["Ordered", "Prepared", "Delivered"], current: 3 },
  cancelled: { color: "#C62828", bg: "#FFEBEE", label: "Cancelled", steps: ["Ordered", "Cancelled"], current: 1 },
};

export default function OrderTrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCart();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-400 text-lg">Order not found</Text>
        <TouchableOpacity className="mt-4 bg-[#FF6B00] px-6 py-3 rounded-full" onPress={() => router.back()}>
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const cfg = statusConfig[order.status];

  const handleReorder = () => {
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="px-5 pt-2 pb-4">
          <View className="flex-row items-center gap-3 mb-4">
            <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-[#1E1E1E]">Order Details</Text>
          </View>
        </View>

        {/* Status card */}
        <View className="mx-5 bg-[#F4F4F4] rounded-3xl p-5 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-lg font-bold text-[#111]">{order.restaurant}</Text>
              <Text className="text-xs text-gray-500 mt-0.5">{order.id}</Text>
            </View>
            <View className="px-3 py-1.5 rounded-full" style={{ backgroundColor: cfg.bg }}>
              <Text className="text-xs font-bold" style={{ color: cfg.color }}>{cfg.label}</Text>
            </View>
          </View>

          <Text className="text-xs text-gray-500 mb-4">Ordered on {order.date}</Text>

          {/* Progress stepper for active */}
          {order.status === "active" && (
            <View className="mb-2">
              <View className="flex-row items-center gap-1 mb-3">
                <Ionicons name="time-outline" size={16} color="#22C55E" />
                <Text className="text-sm font-semibold text-gray-700">Estimated {order.estimatedTime}</Text>
              </View>
              {cfg.steps.map((step, i) => (
                <View key={step} className="flex-row items-start">
                  <View className="items-center w-8">
                    <View className={`w-6 h-6 rounded-full items-center justify-center ${i <= cfg.current ? "bg-[#22C55E]" : "bg-gray-300"}`}>
                      {i < cfg.current ? (
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      ) : (
                        <View className="w-2 h-2 rounded-full bg-gray-400" />
                      )}
                    </View>
                    {i < cfg.steps.length - 1 && (
                      <View className={`w-0.5 h-8 ${i < cfg.current ? "bg-[#22C55E]" : "bg-gray-300"}`} />
                    )}
                  </View>
                  <View className="ml-3 pb-6">
                    <Text className={`text-sm font-semibold ${i <= cfg.current ? "text-[#1E1E1E]" : "text-gray-400"}`}>{step}</Text>
                    {i === cfg.current && (
                      <Text className="text-xs text-[#22C55E] mt-0.5">In progress</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Delivered status summary */}
          {order.status === "delivered" && (
            <View className="mb-2">
              <View className="flex-row items-center gap-1 mb-1">
                <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                <Text className="text-sm font-semibold text-green-700">Delivered successfully</Text>
              </View>
              {order.rating && (
                <View className="flex-row items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons key={i} name="star" size={16} color={i < order.rating! ? "#FACC15" : "#D1D5DB"} />
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Cancelled status */}
          {order.status === "cancelled" && (
            <View className="flex-row items-center gap-1 mb-2">
              <Ionicons name="close-circle" size={16} color="#C62828" />
              <Text className="text-sm font-semibold text-red-700">Order was cancelled</Text>
            </View>
          )}
        </View>

        {/* Items list */}
        <View className="mx-5 mb-4">
          <Text className="text-base font-bold text-[#1E1E1E] mb-3">Items ({order.items.length})</Text>
          {order.items.map((item, i) => (
            <View key={i} className="flex-row items-center bg-[#F4F4F4] rounded-2xl p-3 mb-2">
              <Image source={item.image} className="w-14 h-14 rounded-xl" resizeMode="cover" />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-[#1E1E1E]">{item.name}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</Text>
              </View>
              <Text className="text-base font-bold text-[#FF6B00]">Rs {item.price * item.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Bill details */}
        <View className="mx-5 bg-[#F4F4F4] rounded-3xl p-5 mb-4">
          <Text className="text-base font-bold text-[#1E1E1E] mb-3">Bill Details</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-500">Subtotal</Text>
            <Text className="text-sm font-semibold text-[#222]">Rs. {order.total - order.deliveryFee + order.discount}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-500">Delivery Fee</Text>
            <Text className="text-sm font-semibold text-[#222]">Rs. {order.deliveryFee}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#FF6B00] font-semibold">Discount</Text>
            <Text className="text-sm text-[#FF6B00] font-bold">- Rs. {order.discount}</Text>
          </View>
          <View className="h-px bg-gray-300 my-2" />
          <View className="flex-row justify-between">
            <Text className="text-base font-bold text-[#111]">Total</Text>
            <Text className="text-base font-bold text-[#111]">Rs. {order.total}</Text>
          </View>
        </View>

        {/* Reorder button for non-active orders */}
        {order.status !== "active" && (
          <TouchableOpacity className="mx-5 bg-[#FF6B00] py-4 rounded-2xl items-center mb-4" onPress={handleReorder}>
            <Text className="text-white font-bold text-base">Reorder</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
