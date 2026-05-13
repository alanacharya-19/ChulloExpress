import OrderHeader from "@/components/section/OrderHeader";
import OrderList from "@/components/section/OrderList";
import React, { useState } from "react";
import { View } from "react-native";

type SortBy = "date" | "price-high-low" | "price-low-high";

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [sortBy, setSortBy] = useState<SortBy>("date");

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <OrderHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <View style={{ flex: 1 }}>
        <OrderList
          filter={activeTab}
          sortBy={activeTab === "history" ? sortBy : undefined}
        />
      </View>
    </View>
  );
}
