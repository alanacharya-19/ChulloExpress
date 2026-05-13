import { useCart } from "@/context/CartContext";
import { getFoods } from "@/services/foods";
import { getOrderById } from "@/services/orders";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const statusConfig = {
  active: {
    color: "#22C55E",
    bg: "#E8F5E9",
    label: "Preparing",
    steps: ["Ordered", "Preparing", "On the Way", "Delivered"],
    current: 1,
  },
  delivered: {
    color: "#1565C0",
    bg: "#E3F2FD",
    label: "Delivered",
    steps: ["Ordered", "Prepared", "Delivered"],
    current: 3,
  },
  cancelled: {
    color: "#C62828",
    bg: "#FFEBEE",
    label: "Cancelled",
    steps: ["Ordered", "Cancelled"],
    current: 1,
  },
};

export default function OrderTrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCart();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  const order = getOrderById(id);

  if (!order) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-400 text-lg">Order not found</Text>
        <TouchableOpacity
          className="mt-4 bg-[#FF6B00] px-6 py-3 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const cfg = statusConfig[order.status];
  const hasReviewed = userRating > 0;

  const handleReorder = () => {
    order.items.forEach((item) => {
      const food = getFoods().find((f) => f.id === item.id);
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

  const handleSubmitReview = () => {
    if (userRating === 0) {
      Alert.alert(
        "Select Rating",
        "Please select a star rating before submitting.",
      );
      return;
    }
    Alert.alert(
      "Review Submitted",
      `You rated ${userRating} star${userRating > 1 ? "s" : ""}${userReview ? ': "' + userReview + '"' : ""}.`,
    );
  };

  return (
    <View className="flex-1 mt-10">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-5 pt-2 pb-4">
          <View className="flex-row items-center gap-3 mb-4">
            <TouchableOpacity
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-[#1E1E1E]">
              Order Details
            </Text>
          </View>
        </View>

        <View className="mx-5 bg-[#F4F4F4] rounded-3xl p-5 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-lg font-bold text-[#111]">
                {order.restaurant}
              </Text>
              <Text className="text-xs text-gray-500 mt-0.5">{order.id}</Text>
            </View>
            <View
              className="px-3 py-1.5 rounded-full"
              style={{ backgroundColor: cfg.bg }}
            >
              <Text className="text-xs font-bold" style={{ color: cfg.color }}>
                {cfg.label}
              </Text>
            </View>
          </View>
          <Text className="text-xs text-gray-500 mb-4">
            Ordered on {order.date}
          </Text>

          {order.status === "active" && (
            <View className="mb-2">
              <View className="flex-row items-center gap-1 mb-3">
                <Ionicons name="time-outline" size={16} color="#22C55E" />
                <Text className="text-sm font-semibold text-gray-700">
                  Estimated {order.estimatedTime}
                </Text>
              </View>
              {cfg.steps.map((step, i) => (
                <View key={step} className="flex-row items-start">
                  <View className="items-center w-8">
                    <View
                      className={`w-6 h-6 rounded-full items-center justify-center ${i <= cfg.current ? "bg-[#22C55E]" : "bg-gray-300"}`}
                    >
                      {i < cfg.current ? (
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      ) : (
                        <View className="w-2 h-2 rounded-full bg-gray-400" />
                      )}
                    </View>
                    {i < cfg.steps.length - 1 && (
                      <View
                        className={`w-0.5 h-8 ${i < cfg.current ? "bg-[#22C55E]" : "bg-gray-300"}`}
                      />
                    )}
                  </View>
                  <View className="ml-3 pb-6">
                    <Text
                      className={`text-sm font-semibold ${i <= cfg.current ? "text-[#1E1E1E]" : "text-gray-400"}`}
                    >
                      {step}
                    </Text>
                    {i === cfg.current && (
                      <Text className="text-xs text-[#22C55E] mt-0.5">
                        In progress
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {order.status === "delivered" && (
            <View className="mb-2">
              <View className="flex-row items-center gap-1 mb-1">
                <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                <Text className="text-sm font-semibold text-green-700">
                  Delivered successfully
                </Text>
              </View>
              {order.rating && (
                <View className="flex-row items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={16}
                      color={i < order.rating! ? "#FACC15" : "#D1D5DB"}
                    />
                  ))}
                </View>
              )}
            </View>
          )}

          {order.status === "cancelled" && (
            <View className="flex-row items-center gap-1 mb-2">
              <Ionicons name="close-circle" size={16} color="#C62828" />
              <Text className="text-sm font-semibold text-red-700">
                Order was cancelled
              </Text>
            </View>
          )}
        </View>

        {order.status === "delivered" && (
          <View className="mx-5 bg-[#F4F4F4] rounded-3xl p-5 mb-4">
            <Text className="text-base font-bold text-[#1E1E1E] mb-3">
              {hasReviewed ? "Your Review" : "Rate this Order"}
            </Text>
            <View className="flex-row items-center gap-2 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setUserRating(i + 1)}>
                  <Ionicons
                    name={i < userRating ? "star" : "star-outline"}
                    size={28}
                    color={i < userRating ? "#FACC15" : "#D1D5DB"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              className="bg-white rounded-xl p-3 text-sm text-gray-700 min-h-[80px]"
              placeholder="Write your review..."
              placeholderTextColor="#999"
              multiline
              value={userReview}
              onChangeText={setUserReview}
            />
            <TouchableOpacity
              className="bg-[#FF6B00] py-3 rounded-xl items-center mt-3"
              onPress={handleSubmitReview}
            >
              <Text className="text-white font-bold text-sm">
                {hasReviewed ? "Update Review" : "Submit Review"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="mx-5 mb-4">
          <Text className="text-base font-bold text-[#1E1E1E] mb-3">
            Items ({order.items.length})
          </Text>
          {order.items.map((item, i) => (
            <View
              key={i}
              className="flex-row items-center bg-[#F4F4F4] rounded-2xl p-3 mb-2"
            >
              <Image
                source={item.image}
                className="w-14 h-14 rounded-xl"
                resizeMode="cover"
              />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-[#1E1E1E]">
                  {item.name}
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                  Qty: {item.quantity}
                </Text>
              </View>
              <Text className="text-base font-bold text-[#FF6B00]">
                Rs {item.price * item.quantity}
              </Text>
            </View>
          ))}
        </View>

        <View className="mx-5 bg-[#F4F4F4] rounded-3xl p-5 mb-4">
          <Text className="text-base font-bold text-[#1E1E1E] mb-3">
            Bill Details
          </Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-500">Subtotal</Text>
            <Text className="text-sm font-semibold text-[#222]">
              Rs. {order.total - order.deliveryFee + order.discount}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-500">Delivery Fee</Text>
            <Text className="text-sm font-semibold text-[#222]">
              Rs. {order.deliveryFee}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#FF6B00] font-semibold">
              Discount
            </Text>
            <Text className="text-sm text-[#FF6B00] font-bold">
              - Rs. {order.discount}
            </Text>
          </View>
          <View className="h-px bg-gray-300 my-2" />
          <View className="flex-row justify-between">
            <Text className="text-base font-bold text-[#111]">Total</Text>
            <Text className="text-base font-bold text-[#111]">
              Rs. {order.total}
            </Text>
          </View>
        </View>

        {order.status !== "active" && (
          <TouchableOpacity
            className="mx-5 bg-[#FF6B00] py-4 rounded-2xl items-center mb-4"
            onPress={handleReorder}
          >
            <Text className="text-white font-bold text-base">Reorder</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
