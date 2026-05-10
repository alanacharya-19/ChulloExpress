import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type FoodCardProps = {
  image: any;
  name: string;
  restaurant: string;
  price: number;
  rating: number;
  time: number;
  freeDelivery?: boolean;
  discount?: number;
};

export default function FoodCard({
  image,
  name,
  restaurant,
  price,
  rating,
  time,
  freeDelivery,
  discount,
}: FoodCardProps) {
  return (
    <View className="bg-white rounded-3xl overflow-hidden w-[48%] shadow-sm mb-4">
      {/* Image */}
      <View className="relative">
        <Image source={image} className="w-full h-32" resizeMode="cover" />

        {/* Discount */}
        {discount ? (
          <View className="absolute top-2 left-2 bg-[#FF6B00] px-2 py-1 rounded-full">
            <Text className="text-white text-[10px] font-bold">
              {discount}% OFF
            </Text>
          </View>
        ) : null}

        {/* Cart Button */}
        <TouchableOpacity className="absolute top-2 right-2 bg-white/90 p-2 rounded-full">
          <Ionicons name="cart-outline" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="p-3">
        {/* Food Name */}
        <Text numberOfLines={1} className="text-sm font-bold text-[#1E1E1E]">
          {name}
        </Text>

        {/* Restaurant */}
        <Text numberOfLines={1} className="text-xs text-gray-500 mt-1">
          {restaurant}
        </Text>

        {/* Price + Rating */}
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-[#FF6B00] font-bold text-base">Rs {price}</Text>

          <View className="flex-row items-center">
            <Ionicons name="star" size={13} color="#FACC15" />
            <Text className="ml-1 text-xs text-gray-700 font-medium">
              {rating}
            </Text>
          </View>
        </View>

        {/* Time + Delivery */}
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={13} color="#6B7280" />
            <Text className="ml-1 text-xs text-gray-500">{time} min</Text>
          </View>

          <Text
            className={`text-xs font-semibold ${
              freeDelivery ? "text-green-600" : "text-gray-400"
            }`}
          >
            {freeDelivery ? "Free Delivery" : "Paid"}
          </Text>
        </View>
      </View>
    </View>
  );
}
