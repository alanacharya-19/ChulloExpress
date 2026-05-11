import SearchBar from "@/components/item/SearchBar";
import CategorySection from "@/components/section/CategorySection";
import HomeHeader from "@/components/section/HomeHeader";
import HomeHero from "@/components/section/HomeHero";
import PopularFoods from "@/components/section/PopularFood";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]} contentContainerStyle={{ paddingBottom: 100 }}>
        <HomeHeader />
        <View>
          <SearchBar value={search} onChangeText={setSearch} onFilterPress={() => console.log("filter")} />
        </View>
        <HomeHero />
        <CategorySection />
        <PopularFoods />
      </ScrollView>
    </SafeAreaView>
  );
}
