import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";
import IconButton from "../item/IconButton";

export default function HomeHeader() {
  return (
    <View className="mx-4 flex-row items-center justify-between">
      <View>
        <Text className="text-xs text-gray-500">Hi, Alan</Text>
        <Text className="text-black text-base font-bold mt-0.5">Deliver to</Text>
        <View className="flex-row items-center mt-0.5 gap-1">
          <Ionicons name="location" size={14} color="#f97316" />
          <Text className="text-gray-500 text-xs">Bangesimal-1, Surkhet</Text>
          <Ionicons name="chevron-down" size={14} color="#000" />
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <IconButton iconName="notifications-outline" onPress={() => {}} iconSize={22} badgeCount={3} color="#000" />
        <IconButton iconName="menu" onPress={() => {}} iconSize={22} color="#000" />
      </View>
    </View>
  );
}
