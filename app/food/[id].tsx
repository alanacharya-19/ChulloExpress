import AddedToCartModal from "@/components/item/AddedToCartModal";
import FoodCard from "@/components/item/FoodItem";
import { useCart } from "@/context/CartContext";
import { getFoodById, getFoods } from "@/services/foods";
import { getRestaurantByName, getRestaurants } from "@/services/restaurants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem, items } = useCart();
  const [qty, setQty] = useState(1);
  const [showCartModal, setShowCartModal] = useState(false);

  const food = getFoodById(id);
  const restro = food ? getRestaurantByName(food.restaurant) : undefined;

  if (!food) {
    return (
      <View className="flex-1 items-center justify-center ">
        <Text className="text-gray-400 text-lg">Food not found</Text>
        <TouchableOpacity
          className="mt-4 bg-[#FF6B00] px-6 py-3 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const cartItem = items.find((i) => i.id === food.id);
  const inCartQty = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: qty,
      restaurant: food.restaurant,
    });
    setShowCartModal(true);
  };

  const handleBuyNow = () => {
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: qty,
      restaurant: food.restaurant,
    });
    setQty(1);
    router.push("/(tabs)/cart");
  };

  const allFoods = getFoods();
  const recommended = allFoods.filter(
    (f) => f.id !== food.id && f.restaurant === food.restaurant,
  );
  const others = allFoods.filter(
    (f) => f.id !== food.id && f.restaurant !== food.restaurant,
  );
  const displayRecommended =
    recommended.length > 0 ? recommended : others.slice(0, 4);

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="relative">
          <Image
            source={food.image}
            className="w-full h-72"
            resizeMode="cover"
          />
          <View className="absolute inset-x-0 top-10 flex-row justify-between px-4 pt-2 ">
            <TouchableOpacity
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            {inCartQty > 0 && (
              <TouchableOpacity
                className="w-10 h-10 bg-white/90 rounded-full items-center justify-center"
                onPress={() => router.push("/(tabs)/cart")}
              >
                <View className="relative">
                  <Ionicons name="cart" size={20} color="#FF6B00" />
                  <View className="absolute -top-2 -right-2 bg-[#FF6B00] rounded-full w-4 h-4 items-center justify-center">
                    <Text className="text-white text-[9px] font-bold">
                      {inCartQty}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {food.discount > 0 && (
            <View className="absolute bottom-3 left-4 bg-[#FF6B00] px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">
                {food.discount}% OFF
              </Text>
            </View>
          )}
        </View>

        <View className="px-5 pt-5">
          <View className="flex-row items-center gap-3 mb-2">
            <View
              className={`w-6 h-6 rounded-full items-center justify-center ${food.veg ? "bg-green-100" : "bg-red-100"}`}
            >
              <View
                className={`w-3 h-3 rounded-full ${food.veg ? "bg-green-600" : "bg-red-600"}`}
              />
            </View>
            <Text className="text-2xl font-bold text-[#1E1E1E] flex-1">
              {food.name}
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center gap-2 mb-3" onPress={() => restro && router.push({ pathname: "/restro/[id]", params: { id: restro.id } })}>
            {restro && (
              <Image source={restro.restroImage} className="w-7 h-7 rounded-full" resizeMode="cover" />
            )}
            <Text className="text-sm text-gray-600 font-medium">
              {food.restaurant}
            </Text>
            {restro && (
              <>
                <Text className="text-gray-300">|</Text>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text className="text-xs text-gray-500">
                  {restro.restroLocation}
                </Text>
              </>
            )}
            <Ionicons name="chevron-forward" size={14} color="#D1D5DB" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-4 mb-4">
            <View className="flex-row items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
              <Ionicons name="star" size={14} color="#22C55E" />
              <Text className="text-sm font-bold text-green-700">
                {food.rating}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-500">{food.time} min</Text>
            </View>
            {food.freeDelivery && (
              <View className="bg-blue-50 px-2 py-1 rounded-lg">
                <Text className="text-xs font-bold text-blue-600">
                  Free Delivery
                </Text>
              </View>
            )}
          </View>
          <View className="flex-row items-baseline gap-2 mb-4">
            <Text className="text-3xl font-bold text-[#FF6B00]">
              Rs {food.price}
            </Text>
            {food.discount > 0 && (
              <Text className="text-base text-gray-400 line-through">
                Rs {Math.round(food.price / (1 - food.discount / 100))}
              </Text>
            )}
          </View>
          <Text className="text-sm text-gray-600 leading-6 mb-6">
            {food.description}
          </Text>
        </View>

        <View className="px-5 mb-6">
          <Text className="text-base font-bold text-[#1E1E1E] mb-3">
            Quantity
          </Text>
          <View className="flex-row items-center gap-4 mb-5">
            <TouchableOpacity
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Ionicons name="remove" size={20} color="#333" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-[#1E1E1E] w-8 text-center">
              {qty}
            </Text>
            <TouchableOpacity
              className="w-10 h-10 bg-[#FF6B00] rounded-full items-center justify-center"
              onPress={() => setQty(Math.min(99, qty + 1))}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-[#FFF1E8] py-4 rounded-2xl items-center"
              onPress={handleAddToCart}
            >
              <Text className="text-[#FF6B00] font-bold text-base">
                Add to Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-[#FF6B00] py-4 rounded-2xl items-center"
              onPress={handleBuyNow}
            >
              <Text className="text-white font-bold text-base">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 pt-2 border-t border-gray-100">
          <Text className="text-lg font-bold text-[#1E1E1E] mb-4">
            Recommended
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {displayRecommended.map((item) => (
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
                onPress={(foodId) =>
                  router.replace({
                    pathname: "/food/[id]",
                    params: { id: foodId },
                  })
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <AddedToCartModal
        visible={showCartModal}
        itemName={food.name}
        itemImage={food.image}
        quantity={qty}
        price={food.price}
        onClose={() => {
          setShowCartModal(false);
          setQty(1);
        }}
        onViewCart={() => {
          setShowCartModal(false);
          setQty(1);
          router.push("/(tabs)/cart");
        }}
      />
    </View>
  );
}
