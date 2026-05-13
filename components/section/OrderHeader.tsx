import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type TabType = "active" | "history";
export type SortBy = "date" | "price-high-low" | "price-low-high";

type OrderHeaderProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  sortBy: SortBy;
  onSortChange: (sort: SortBy) => void;
};

const sortOptions: { label: string; value: SortBy }[] = [
  { label: "Date", value: "date" },
  { label: "Price: High - Low", value: "price-high-low" },
  { label: "Price: Low - High", value: "price-low-high" },
];

export default function OrderHeader({ activeTab, onTabChange, sortBy, onSortChange }: OrderHeaderProps) {
  const isHistory = activeTab === "history";
  const [showSortMenu, setShowSortMenu] = useState(false);

  return (
    <View className="px-5 pt-4 pb-2">
      <View className="flex-row items-center justify-between mb-4">
        <View className="w-10">
          {isHistory && (
            <Pressable
              className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center"
              onPress={() => onTabChange("active")}
            >
              <Ionicons name="chevron-back" size={22} color="#FF6B00" />
            </Pressable>
          )}
        </View>
        <Text className="text-3xl font-bold text-[#1E1E1E]">
          {isHistory ? "Order History" : "My Orders"}
        </Text>
        <Pressable
          className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center"
          onPress={() => {
            if (isHistory) {
              setShowSortMenu(true);
            } else {
              onTabChange("history");
            }
          }}
        >
          <Ionicons
            name={isHistory ? "funnel-outline" : "time-outline"}
            size={20}
            color="#FF6B00"
          />
        </Pressable>
      </View>

      <Modal visible={showSortMenu} transparent animationType="fade" onRequestClose={() => setShowSortMenu(false)}>
        <Pressable className="flex-1 bg-black/30 justify-center items-center" onPress={() => setShowSortMenu(false)}>
          <Pressable className="bg-white rounded-2xl w-72 overflow-hidden" onPress={() => {}}>
            <Text className="text-base font-bold text-[#1E1E1E] text-center pt-4 pb-2">Sort by</Text>
            {sortOptions.map((option, i) => (
              <Pressable
                key={option.value}
                className={`flex-row items-center justify-between px-5 py-4 ${i < sortOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                onPress={() => {
                  onSortChange(option.value);
                  setShowSortMenu(false);
                }}
              >
                <Text className="text-sm font-semibold text-[#333]">{option.label}</Text>
                {sortBy === option.value && (
                  <Ionicons name="checkmark" size={18} color="#FF6B00" />
                )}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
