import FoodCard from "@/components/item/FoodItem";
import RestroCard from "@/components/item/RestroCart";
import { getFoods } from "@/services/foods";
import { getRestaurants } from "@/services/restaurants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const allRestaurants = getRestaurants();
  const allFoods = getFoods();

  const matchedRestros = q
    ? allRestaurants.filter((r) => r.restroName.toLowerCase().includes(q))
    : [];

  const matchedFoods = q
    ? allFoods.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.restaurant.toLowerCase().includes(q)
      )
    : [];

  const hasAnyResults = matchedRestros.length > 0 || matchedFoods.length > 0;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-4 pt-14 pb-2 gap-3">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 h-12">
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            className="flex-1 ml-3 text-base text-[#222]"
            placeholder="Search for food, restaurants..."
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {query.trim() === "" ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="search-outline" size={64} color="#D1D5DB" />
          <Text className="text-gray-400 text-lg mt-4 font-medium">Search for your favorite food</Text>
          <Text className="text-gray-400 text-sm mt-1">Find dishes and restaurants you love</Text>
        </View>
      ) : !hasAnyResults ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="sad-outline" size={64} color="#D1D5DB" />
          <Text className="text-gray-400 text-lg mt-4 font-medium">No results found</Text>
          <Text className="text-gray-400 text-sm mt-1">Try searching for something else</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {matchedRestros.length > 0 && (
            <View className="mb-4">
              <Text className="text-lg font-bold text-[#1E1E1E] px-5 mb-3">Restaurants</Text>
              <FlatList
                data={matchedRestros}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <RestroCard
                    id={item.id}
                    restroImage={item.restroImage}
                    restroName={item.restroName}
                    onPress={(id) => router.push({ pathname: "/restro/[id]", params: { id } })}
                  />
                )}
              />
            </View>
          )}

          {matchedFoods.length > 0 && (
            <View className="px-4">
              <Text className="text-lg font-bold text-[#1E1E1E] mb-3">Foods</Text>
              <View className="flex-row flex-wrap justify-between">
                {matchedFoods.map((item) => (
                  <FoodCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    restaurant={item.restaurant}
                    price={item.price}
                    rating={item.rating}
                    time={item.time}
                    freeDelivery={item.freeDelivery}
                    discount={item.discount}
                    onPress={(foodId) => router.push({ pathname: "/food/[id]", params: { id: foodId } })}
                  />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
