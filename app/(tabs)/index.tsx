import CategorySection from "@/components/section/CategorySection";
import HomeHeader from "@/components/section/HomeHeader";
import HomeHero from "@/components/section/HomeHero";
import NotificationsSheet from "@/components/section/NotificationsSheet";
import PopularFoods from "@/components/section/PopularFood";
import SideBarMenu from "@/components/section/SideBarMenu";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <View className="flex-1 mt-10">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <HomeHeader
          onMenuPress={() => setShowSidebar(true)}
          onNotificationPress={() => setShowNotifications(true)}
          onSearchPress={() => router.push("/search")}
        />
        <HomeHero />
        <CategorySection />
        <PopularFoods />
      </ScrollView>
      <SideBarMenu
        visible={showSidebar}
        onClose={() => setShowSidebar(false)}
      />
      <NotificationsSheet
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </View>
  );
}
