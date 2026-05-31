import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

type Promo = {
  id: string;
  code: string;
  title: string;
  desc: string;
  discount: string;
  validUntil: string;
  color: string;
  active: boolean;
};

const promos: Promo[] = [
  { id: "1", code: "MOMO10", title: "Momo Mania", desc: "10% off on all momo items", discount: "10%", validUntil: "Jun 30, 2026", color: "#FF6B00", active: true },
  { id: "2", code: "BURGER20", title: "Burger Lover", desc: "Rs. 20 off on burgers above Rs. 200", discount: "Rs. 20", validUntil: "Jul 15, 2026", color: "#22C55E", active: true },
  { id: "3", code: "FIRST50", title: "First Order", desc: "50% off up to Rs. 100 on your first order", discount: "50%", validUntil: "Aug 1, 2026", color: "#3B82F6", active: true },
  { id: "4", code: "FREEDEL", title: "Free Delivery", desc: "Free delivery on orders above Rs. 300", discount: "Free", validUntil: "Jun 25, 2026", color: "#8B5CF6", active: true },
  { id: "5", code: "PIZZA15", title: "Pizza Party", desc: "15% off on all pizza orders", discount: "15%", validUntil: "Jun 20, 2026", color: "#FACC15", active: false },
  { id: "6", code: "BIRYANI25", title: "Biryani Bonanza", desc: "25% off on biryani orders above Rs. 400", discount: "25%", validUntil: "May 30, 2026", color: "#C62828", active: false },
];

const handleCopy = (code: string) => {
  Alert.alert("Copied!", `Coupon code "${code}" copied to clipboard.`);
};

export default function PromotionsScreen() {
  const active = promos.filter((p) => p.active);
  const expired = promos.filter((p) => !p.active);

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">Offers & Promotions</Text>
      </View>
      <FlatList
        data={active}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          expired.length > 0 ? (
            <View className="mb-2">
              <Text className="text-base font-bold text-[#1E1E1E] mb-3">Active Offers</Text>
            </View>
          ) : undefined
        }
        ListFooterComponent={
          expired.length > 0 ? (
            <View>
              <Text className="text-base font-bold text-[#1E1E1E] mb-3 mt-4">Expired</Text>
              {expired.map((item) => (
                <View key={item.id} className="bg-gray-100 rounded-3xl p-5 mb-4 opacity-60">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center gap-2">
                      <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: item.color + "20" }}>
                        <Ionicons name="pricetag-outline" size={20} color={item.color} />
                      </View>
                      <View>
                        <Text className="text-sm font-bold text-gray-400">{item.title}</Text>
                        <Text className="text-[10px] text-gray-400">{item.discount} OFF</Text>
                      </View>
                    </View>
                    <View className="bg-gray-300 px-3 py-1 rounded-full">
                      <Text className="text-white text-xs font-bold">Expired</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-gray-400">{item.desc}</Text>
                  <Text className="text-[10px] text-gray-400 mt-1">Valid until {item.validUntil}</Text>
                </View>
              ))}
            </View>
          ) : undefined
        }
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="pricetag-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3 text-base">No offers available</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-[#F4F4F4] rounded-3xl p-5 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: item.color + "20" }}>
                  <Ionicons name="pricetag-outline" size={20} color={item.color} />
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#1E1E1E]">{item.title}</Text>
                  <Text className="text-[10px] text-[#FF6B00] font-bold">{item.discount} OFF</Text>
                </View>
              </View>
              <View className="bg-[#FF6B00] px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">{item.code}</Text>
              </View>
            </View>
            <Text className="text-xs text-gray-500">{item.desc}</Text>
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-[10px] text-gray-400">Valid until {item.validUntil}</Text>
              <TouchableOpacity className="bg-white px-4 py-2 rounded-full border border-[#FF6B00]" onPress={() => handleCopy(item.code)}>
                <Text className="text-[#FF6B00] text-xs font-bold">Copy Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
