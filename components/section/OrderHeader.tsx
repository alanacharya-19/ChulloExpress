import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type TabType = "active" | "history";

type OrderHeaderProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export default function OrderHeader({ activeTab, onTabChange }: OrderHeaderProps) {
  return (
    <View className="px-5 pt-4 pb-2">
      <Text className="text-3xl font-bold text-[#1E1E1E] mb-4">My Orders</Text>
      <View className="flex-row bg-gray-100 rounded-2xl p-1">
        <Pressable
          className={`flex-1 py-3 rounded-xl ${activeTab === "active" ? "bg-white shadow-sm" : ""}`}
          onPress={() => onTabChange("active")}
        >
          <Text className={`text-center font-bold text-sm ${activeTab === "active" ? "text-[#FF6B00]" : "text-gray-500"}`}>
            Active
          </Text>
        </Pressable>
        <Pressable
          className={`flex-1 py-3 rounded-xl ${activeTab === "history" ? "bg-white shadow-sm" : ""}`}
          onPress={() => onTabChange("history")}
        >
          <Text className={`text-center font-bold text-sm ${activeTab === "history" ? "text-[#FF6B00]" : "text-gray-500"}`}>
            History
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
