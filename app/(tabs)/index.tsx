import SearchBar from "@/components/item/SearchBar";
import CategorySection from "@/components/section/CategorySection";
import HomeHeader from "@/components/section/HomeHeader";
import HomeHero from "@/components/section/HomeHero";
import PopularFoods from "@/components/section/PopularFood";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]} // 👈 SearchBar becomes sticky
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* HEADER (scrolls away) */}
        <HomeHeader />

        {/* SEARCH BAR (sticks on top) */}
        <View>
          <SearchBar value={""} onFilterPress={() => console.log("filter")} />
        </View>

        {/* CONTENT */}
        <HomeHero />
        <CategorySection />
        <PopularFoods />
      </ScrollView>
    </SafeAreaView>
  );
}
