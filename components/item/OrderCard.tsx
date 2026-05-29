import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

type OrderCardProps = {
  id: string;
  restaurant: string;
  status: "active" | "delivered" | "cancelled";
  total: number;
  date: string;
  estimatedTime?: string;
  rating?: number;
  items: { name: string; quantity: number; image: any }[];
  onPress?: (id: string) => void;
  onTrack?: (id: string) => void;
  onReorder?: (id: string) => void;
};

const statusColors = {
  active: { bg: "#E8F5E9", text: "#2E7D32", label: "Preparing" },
  delivered: { bg: "#E3F2FD", text: "#1565C0", label: "Delivered" },
  cancelled: { bg: "#FFEBEE", text: "#C62828", label: "Cancelled" },
};

export default function OrderCard({ id, restaurant, status, total, date, estimatedTime, rating, items, onPress, onTrack, onReorder }: OrderCardProps) {
  const sc = statusColors[status];

  return (
    <Pressable className="bg-[#F4F4F4] rounded-3xl p-4 mb-4 mx-5" onPress={() => onPress?.(id)}>
      <View className="flex-row items-center justify-between mb-3">
        <View>
          <Text className="text-lg font-bold text-[#111]">{restaurant}</Text>
          <Text className="text-xs text-gray-500 mt-0.5">{id} | {date}</Text>
        </View>
        <View className="px-3 py-1.5 rounded-full" style={{ backgroundColor: sc.bg }}>
          <Text className="text-xs font-bold" style={{ color: sc.text }}>{sc.label}</Text>
        </View>
      </View>
      <View className="flex-row items-center mb-3">
        {items.slice(0, 3).map((item, i) => (
          <Image key={i} source={item.image} className="w-10 h-10 rounded-xl -ml-2 first:ml-0 border-2 border-[#F4F4F4]" resizeMode="cover" />
        ))}
        {items.length > 3 && (
          <View className="w-10 h-10 rounded-xl -ml-2 bg-gray-300 items-center justify-center border-2 border-[#F4F4F4]">
            <Text className="text-xs font-bold text-gray-600">+{items.length - 3}</Text>
          </View>
        )}
        <View className="ml-auto">
          <Text className="text-sm text-gray-500">{items.length} item{items.length > 1 ? "s" : ""}</Text>
          <Text className="text-base font-bold text-[#FF6B00]">Rs. {total}</Text>
        </View>
      </View>
      {status === "active" && (
        <View className="mb-3">
          <View className="flex-row items-center gap-1 mb-1">
            <Ionicons name="time-outline" size={14} color="#22C55E" />
            <Text className="text-xs text-gray-600">Estimated {estimatedTime}</Text>
          </View>
          <View className="h-1.5 bg-gray-300 rounded-full overflow-hidden">
            <View className="w-2/3 h-full bg-[#22C55E] rounded-full" />
          </View>
          <View className="flex-row justify-between mt-1">
            <Text className="text-[10px] text-gray-500">Ordered</Text>
            <Text className="text-[10px] text-gray-500">Preparing</Text>
            <Text className="text-[10px] text-gray-500">Delivered</Text>
          </View>
        </View>
      )}
      {status === "delivered" && rating && (
        <View className="flex-row items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons key={i} name="star" size={14} color={i < rating ? "#FACC15" : "#D1D5DB"} />
          ))}
        </View>
      )}
      <View className="flex-row gap-3">
        {status === "active" ? (
          <TouchableOpacity className="flex-1 bg-[#FF6B00] py-3 rounded-xl items-center" onPress={() => onTrack?.(id)}>
            <Text className="text-white font-bold text-sm">Track Order</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className={`flex-1 py-3 rounded-xl items-center ${status === "cancelled" ? "bg-gray-300" : "bg-[#FF6B00]"}`} onPress={() => onReorder?.(id)}>
            <Text className={`font-bold text-sm ${status === "cancelled" ? "text-gray-600" : "text-white"}`}>Reorder</Text>
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
}
