import AddedToCartModal from "@/components/item/AddedToCartModal";
import { useCart } from "@/context/CartContext";
import { getFoods } from "@/services/foods";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FoodCard from "../item/FoodItem";

const streetFoodCategories = ["Burgers", "Pizza", "Momos", "Sides", "Sandwich"];
const foodItems = getFoods();
const allCategories = ["All", ...new Set(foodItems.map((f) => f.category))];
const categories = [...allCategories, "Street Food", "Favourites", "Cake"];

type Props = {
  initialCategory?: string;
};

export default function FoodSection({ initialCategory }: Props) {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory && categories.includes(initialCategory) ? initialCategory : "All"
  );

  useEffect(() => {
    if (initialCategory && categories.includes(initialCategory)) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);
  const [modal, setModal] = useState<{ visible: boolean; name: string; image: any; price: number }>({
    visible: false, name: "", image: null, price: 0,
  });

  const filteredFoods = selectedCategory === "All"
    ? foodItems
    : selectedCategory === "Street Food"
      ? foodItems.filter((f) => streetFoodCategories.includes(f.category))
      : selectedCategory === "Favourites"
        ? [...foodItems].sort((a, b) => b.rating - a.rating)
        : selectedCategory === "Cake"
          ? foodItems.filter((f) => f.category === "Cake")
          : foodItems.filter((f) => f.category === selectedCategory);

  const handleAddToCart = (foodId: string) => {
    const food = foodItems.find((f) => f.id === foodId);
    if (!food) return;
    addItem({ id: food.id, name: food.name, price: food.price, image: food.image, quantity: 1, restaurant: food.restaurant });
    setModal({ visible: true, name: food.name, image: food.image, price: food.price });
  };

  const handleFoodPress = (foodId: string) => {
    router.push({ pathname: "/food/[id]", params: { id: foodId } });
  };

  return (
    <View className="mt-6 px-4">
      <Text className="text-lg font-bold text-black mb-3">Foods</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, marginBottom: 14 }}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const active = item === selectedCategory;
          return (
            <TouchableOpacity
              className={`px-5 py-2 rounded-full ${active ? "bg-[#FF6B00]" : "bg-gray-100"}`}
              onPress={() => setSelectedCategory(item)}
            >
              <Text className={`text-sm font-semibold ${active ? "text-white" : "text-gray-700"}`}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <FlatList
        key={selectedCategory}
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-gray-400 text-base">No foods in this category</Text>
          </View>
        }
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
