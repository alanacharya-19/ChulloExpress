import { useCart } from "@/context/CartContext";
import { foods } from "@/sample/food";
import React from "react";
import { Alert, FlatList, Text, View } from "react-native";
import FoodCard from "../item/FoodItem";

export default function PopularFoods() {
  const { addItem } = useCart();

  const handleAddToCart = (foodId: string) => {
    const food = foods.find((f) => f.id === foodId);
    if (!food) return;
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: 1,
      restaurant: food.restaurant,
    });
    Alert.alert("Added!", `${food.name} added to cart`);
  };

  return (
    <View className="mt-4 px-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold text-black mb-3">Popular Foods</Text>
        <Text style={{ fontSize: 12, fontWeight: "700", color: "#FF7A00" }}>See all</Text>
      </View>
      <FlatList
        key={"2"}
        data={foods}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
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
            onAddToCart={handleAddToCart}
          />
        )}
      />
    </View>
  );
}
