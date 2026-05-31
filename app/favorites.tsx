import FoodCard from "@/components/item/FoodItem";
import { useFavorites } from "@/context/FavoritesContext";
import { getFoods } from "@/services/foods";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const allFoods = getFoods();
  const likedFoods = allFoods.filter((f) => favorites.has(f.id));

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">My Favorites</Text>
      </View>
      {likedFoods.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
          <Text className="text-lg font-bold text-gray-400 mt-4">No favorites yet</Text>
          <Text className="text-sm text-gray-400 text-center mt-2">Tap the heart icon on any food item to add it here.</Text>
          <TouchableOpacity className="bg-[#FF6B00] px-6 py-3 rounded-full mt-6" onPress={() => router.push("/(tabs)/explore")}>
            <Text className="text-white font-bold text-sm">Explore Foods</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={likedFoods}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodCard
              id={item.id} image={item.image} name={item.name} restaurant={item.restaurant}
              price={item.price} rating={item.rating} time={item.time}
              freeDelivery={item.freeDelivery} discount={item.discount}
              onPress={(id) => router.push({ pathname: "/food/[id]", params: { id } })}
            />
          )}
        />
      )}
    </View>
  );
}
