import { getRestaurants } from "@/services/restaurants";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import RestroCard from "../item/RestroCart";

export default function AllRestro() {
  return (
    <View className="mt-4">
      <View className="flex-row justify-between items-center mx-5 mb-4">
        <Text className="text-xl font-bold">All Restaurants</Text>
        <Pressable onPress={() => router.push("/allrestro")}>
          <Text className="text-xs font-bold text-[#FF7A00]">See all</Text>
        </Pressable>
      </View>
      <FlatList
        data={getRestaurants()}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
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
  );
}
