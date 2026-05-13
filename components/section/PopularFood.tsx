import AddedToCartModal from "@/components/item/AddedToCartModal";
import { useCart } from "@/context/CartContext";
import { getFoods } from "@/services/foods";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import FoodCard from "../item/FoodItem";

const popularFoods = [...getFoods()].sort((a, b) => b.rating - a.rating).slice(0, 8);

export default function PopularFoods() {
  const { addItem } = useCart();
  const [modal, setModal] = useState<{ visible: boolean; name: string; image: any; price: number }>({
    visible: false, name: "", image: null, price: 0,
  });

  const handleAddToCart = (foodId: string) => {
    const food = getFoods().find((f) => f.id === foodId);
    if (!food) return;
    addItem({ id: food.id, name: food.name, price: food.price, image: food.image, quantity: 1, restaurant: food.restaurant });
    setModal({ visible: true, name: food.name, image: food.image, price: food.price });
  };

  const handleFoodPress = (foodId: string) => {
    router.push({ pathname: "/food/[id]", params: { id: foodId } });
  };

  return (
    <View className="mt-4 px-4">
      <Text className="text-lg font-bold text-black mb-3">Popular Foods</Text>
      <FlatList data={popularFoods} keyExtractor={(item) => item.id} numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        renderItem={({ item }) => (
          <FoodCard id={item.id} image={item.image} name={item.name} restaurant={item.restaurant} price={item.price}
            rating={item.rating} time={item.time} freeDelivery={item.freeDelivery} discount={item.discount}
            onAddToCart={handleAddToCart} onPress={handleFoodPress} />
        )} />
      <AddedToCartModal visible={modal.visible} itemName={modal.name} itemImage={modal.image} quantity={1} price={modal.price}
        onClose={() => setModal({ ...modal, visible: false })}
        onViewCart={() => { setModal({ ...modal, visible: false }); router.push("/(tabs)/cart"); }} />
    </View>
  );
}
