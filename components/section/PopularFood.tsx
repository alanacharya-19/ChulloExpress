import React from "react";
import { FlatList, Text, View } from "react-native";
import { foods } from "../../sample/food";
import FoodCard from "../item/FoodItem";

export default function PopularFoods() {
  return (
    <View className="mt-4 px-4">
      {/* HEADER */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold text-black mb-3">
          🔥 Popular Foods
        </Text>

        <Text style={{ fontSize: 12, fontWeight: "700", color: "#FF7A00" }}>
          See all
        </Text>
      </View>

      {/* GRID LIST */}
      <FlatList
        key={"2"}
        data={foods}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        renderItem={({ item }) => (
          <FoodCard
            image={item.image}
            name={item.name}
            restaurant={item.restaurant}
            price={item.price}
            rating={item.rating}
            time={item.time}
            freeDelivery={item.freeDelivery}
            discount={item.discount}
          />
        )}
      />
    </View>
  );
}
