import FoodCard from "@/components/item/FoodItem";
import { getFoodsByRestaurant } from "@/services/foods";
import { getRestaurantById } from "@/services/restaurants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RestroDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const restro = getRestaurantById(id);
  const restroFoods = restro ? getFoodsByRestaurant(restro.restroName) : [];
  const categories = [...new Set(restroFoods.map((f) => f.category))];
  const filteredFoods = selectedCategory
    ? restroFoods.filter((f) => f.category === selectedCategory)
    : restroFoods;

  if (!restro) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400 text-lg">Restaurant not found</Text>
        <TouchableOpacity
          className="mt-4 bg-[#FF6B00] px-6 py-3 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="relative">
          <Image
            source={restro.restroImage}
            className="w-full h-52"
            resizeMode="cover"
          />
          <View className="absolute inset-x-0 top-10 flex-row justify-between px-4 pt-2">
            <TouchableOpacity
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 pt-5">
          <Text className="text-2xl font-bold text-[#1E1E1E]">
            {restro.restroName}
          </Text>
          <View className="flex-row items-center gap-2 mt-1">
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text className="text-sm text-gray-500">
              {restro.restroLocation}
            </Text>
          </View>

          <View className="flex-row items-center gap-4 mt-3 mb-5">
            <View className="flex-row items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
              <Ionicons name="star" size={14} color="#22C55E" />
              <Text className="text-sm font-bold text-green-700">
                {restro.restroRating}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-500">
                {restroFoods.length > 0 ? restroFoods[0].time : 25} min
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="pricetag-outline" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-500">
                Rs{" "}
                {restroFoods.length > 0
                  ? Math.min(...restroFoods.map((f) => f.price))
                  : 0}
                +
              </Text>
            </View>
          </View>
        </View>

        {categories.length > 0 && (
          <View className="mb-4">
            <FlatList
              data={["All", ...categories]}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const active =
                  item === "All"
                    ? selectedCategory === null
                    : selectedCategory === item;
                return (
                  <TouchableOpacity
                    className={`px-5 py-2 rounded-full ${active ? "bg-[#FF6B00]" : "bg-gray-100"}`}
                    onPress={() =>
                      setSelectedCategory(item === "All" ? null : item)
                    }
                  >
                    <Text
                      className={`text-sm font-semibold ${active ? "text-white" : "text-gray-700"}`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}

        {filteredFoods.length > 0 ? (
          <View className="px-4">
            <FlatList
              key={selectedCategory || "all"}
              data={filteredFoods}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 12,
              }}
              renderItem={({ item }) => (
                <FoodCard
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  restaurant={item.restaurant}
                  price={item.price}
                  rating={item.rating}
                  time={item.time}
                  freeDelivery={item.freeDelivery}
                  discount={item.discount}
                  onPress={(foodId) =>
                    router.push({
                      pathname: "/food/[id]",
                      params: { id: foodId },
                    })
                  }
                />
              )}
            />
          </View>
        ) : (
          <View className="items-center py-16">
            <Ionicons name="fast-food-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3 text-base">
              No items in this category
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
