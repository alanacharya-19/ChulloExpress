import { getRestaurants } from "@/services/restaurants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AllRestroScreen() {
  const [query, setQuery] = useState("");

  const allRestaurants = getRestaurants();
  const filtered = query.trim()
    ? allRestaurants.filter((r) => r.restroName.toLowerCase().includes(query.toLowerCase()) || r.restroLocation.toLowerCase().includes(query.toLowerCase()))
    : allRestaurants;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-4 pt-14 pb-3">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">All Restaurants</Text>
      </View>

      <View className="mx-4 mb-3 flex-row items-center bg-gray-100 rounded-full px-4 h-12">
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          className="flex-1 ml-3 text-base text-[#222]"
          placeholder="Search restaurants..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="search-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3 text-base">No restaurants found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            className="flex-row items-center bg-white mb-4 rounded-2xl p-3"
            style={{
              shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
            }}
            onPress={() => router.push({ pathname: "/restro/[id]", params: { id: item.id } })}
          >
            <View style={{
              width: 64, height: 64, borderRadius: 32, backgroundColor: "#F5F5F5", alignItems: "center", justifyContent: "center",
              shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
            }}>
              <Image source={item.restroImage} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-base font-bold text-[#1E1E1E]">{item.restroName}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="location-outline" size={12} color="#9CA3AF" />
                <Text className="text-xs text-gray-400 ml-1">{item.restroLocation}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={12} color="#FACC15" />
                <Text className="text-xs text-gray-500 ml-1 font-semibold">{item.restroRating}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
          </Pressable>
        )}
      />
    </View>
  );
}
