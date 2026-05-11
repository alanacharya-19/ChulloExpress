import OrderHeader from "@/components/section/OrderHeader";
import OrderList from "@/components/section/OrderList";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <OrderHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <View style={{ flex: 1 }}>
        <OrderList filter={activeTab} />
      </View>
    </SafeAreaView>
  );
}
