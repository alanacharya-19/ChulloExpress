import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Share, Text, TouchableOpacity, View } from "react-native";

export default function AboutScreen() {
  const handleShare = async () => {
    await Share.share({ message: "ChulloExpress - Fast food delivery at your doorstep! Download now: https://chulloexpress.com" });
  };
  const info = [
    { label: "Version", value: "1.0.0" },
    { label: "Platform", value: "iOS & Android" },
    { label: "Developer", value: "ChulloExpress Team" },
    { label: "Contact", value: "support@chulloexpress.com" },
  ];

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">About</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="items-center mt-6 mb-8">
          <Image source={require("../assets/heroimages/logo.png")} className="w-24 h-24 rounded-full mb-4" resizeMode="cover" />
          <Text className="text-2xl font-bold text-[#1E1E1E]">ChulloExpress</Text>
          <Text className="text-sm text-gray-500 mt-1 text-center px-10">Fast food delivery at your doorstep. Order from your favorite restaurants in Nepal.</Text>
        </View>
        <View className="mx-5 bg-[#F4F4F4] rounded-3xl overflow-hidden">
          {info.map((item, i) => (
            <View key={item.label} className={`flex-row justify-between px-5 py-4 ${i < info.length - 1 ? "border-b border-gray-200" : ""}`}>
              <Text className="text-sm font-semibold text-[#333]">{item.label}</Text>
              <Text className="text-sm text-gray-500">{item.value}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity className="mx-5 bg-[#FF6B00] py-4 rounded-2xl items-center flex-row justify-center gap-2 mt-6" onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color="#fff" />
          <Text className="text-white font-bold text-base">Share App</Text>
        </TouchableOpacity>
        <View className="items-center mt-6">
          <Text className="text-xs text-gray-400">Made with love in Nepal</Text>
        </View>
      </ScrollView>
    </View>
  );
}
