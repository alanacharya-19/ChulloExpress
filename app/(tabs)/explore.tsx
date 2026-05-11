import SearchBar from "@/components/item/SearchBar";
import AllRestro from "@/components/section/AllRestro";
import PopularFoods from "@/components/section/PopularFood";
import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="ml-5 text-3xl font-bold text-[#1E1E1E]">Explore</Text>
        <SearchBar value={search} onChangeText={setSearch} onFilterPress={() => console.log("filter")} />
        <AllRestro />
        <PopularFoods />
      </ScrollView>
    </SafeAreaView>
  );
}
