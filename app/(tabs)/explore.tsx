import IconButton from "@/components/item/IconButton";
import AllRestro from "@/components/section/AllRestro";
import FoodSection from "@/components/section/FoodSection";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";

export default function ExploreScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const scrollRef = useRef<ScrollView>(null);
  const foodY = useRef(0);

  useEffect(() => {
    if (category) {
      setTimeout(() => scrollRef.current?.scrollTo({ y: foodY.current, animated: true }), 150);
    }
  }, [category]);

  return (
    <View className="flex-1 mt-10">
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row items-center justify-between mx-5 mb-2">
          <Text className="text-3xl font-bold text-[#1E1E1E]">Explore</Text>
          <IconButton
            style={{ marginTop: 2 }}
            iconName="search-outline"
            onPress={() => router.push("/search")}
            iconSize={22}
            color="#000"
          />
        </View>
        <AllRestro />
        <View onLayout={(e) => { foodY.current = e.nativeEvent.layout.y; }}>
          <FoodSection initialCategory={category} />
        </View>
      </ScrollView>
    </View>
  );
}
