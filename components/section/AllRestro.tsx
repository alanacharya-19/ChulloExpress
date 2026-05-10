import { restaurants } from "@/sample/restro";
import React from "react";
import { FlatList, Text, View } from "react-native";
import RestroCard from "../item/RestroCart";

export default function AllRestro() {
  return (
    <View className="mt-4">
      <Text className="text-xl font-bold ml-5 mb-4">All Restaurants</Text>

      <FlatList
        data={restaurants}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => (
          <RestroCard
            restroImage={item.restroImage}
            restroName={item.restroName}
          />
        )}
      />
    </View>
  );
}
