import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

type Address = {
  id: string;
  label: string;
  full: string;
  default: boolean;
};

export default function AddressScreen() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", label: "Home", full: "Bangesimal-1, Surkhet, Nepal", default: true },
    { id: "2", label: "Work", full: "Lakeside, Pokhara, Nepal", default: false },
  ]);

  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Address", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setAddresses((prev) => prev.filter((a) => a.id !== id)) },
    ]);
  };

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">Delivery Address</Text>
      </View>
      <FlatList
        data={addresses}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="location-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3 text-base">No addresses saved</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-[#F4F4F4] rounded-3xl p-5 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <Ionicons name={item.label === "Home" ? "home" : "briefcase"} size={18} color="#FF6B00" />
                <Text className="text-base font-bold text-[#1E1E1E]">{item.label}</Text>
                {item.default && (
                  <View className="bg-[#FF6B00] px-2 py-0.5 rounded-full">
                    <Text className="text-white text-[10px] font-bold">Default</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={18} color="#C62828" />
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500 mb-3">{item.full}</Text>
            {!item.default && (
              <TouchableOpacity className="bg-white py-2 rounded-xl items-center" onPress={() => handleSetDefault(item.id)}>
                <Text className="text-xs font-bold text-[#FF6B00]">Set as Default</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      <View className="px-5 pb-8">
        <TouchableOpacity className="bg-[#FF6B00] py-4 rounded-2xl items-center" onPress={() => Alert.alert("Coming Soon", "Add new address form coming soon.")}>
          <Text className="text-white font-bold text-base">Add New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
