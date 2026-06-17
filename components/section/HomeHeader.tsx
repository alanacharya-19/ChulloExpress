import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNotifications } from "@/context/NotificationContext";
import { useUser } from "@/context/UserContext";
import IconButton from "../item/IconButton";

type Props = {
  onMenuPress: () => void;
  onNotificationPress: () => void;
  onSearchPress?: () => void;
};

export default function HomeHeader({ onMenuPress, onNotificationPress, onSearchPress }: Props) {
  const { name, address } = useUser();
  const { unreadCount } = useNotifications();
  return (
    <View className="mx-4 flex-row items-center justify-between">
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Text className="text-xs text-gray-500">Hi, {name.split(" ")[0]}</Text>
        <Text className="text-black text-base font-bold mt-0.5">Deliver to</Text>
        <View className="flex-row items-center mt-0.5 gap-1">
          <Ionicons name="location" size={14} color="#f97316" />
          <Text className="text-gray-500 text-xs" numberOfLines={1}>{address}</Text>
          <Ionicons name="chevron-down" size={14} color="#000" />
        </View>
        </TouchableOpacity>
      <View className="flex-row items-center gap-3">
        <IconButton iconName="search-outline" onPress={onSearchPress || (() => router.push("/search"))} iconSize={22} color="#000" />
        <IconButton iconName="notifications-outline" onPress={onNotificationPress} iconSize={22} badgeCount={unreadCount} color="#000" />
        <IconButton iconName="menu" onPress={onMenuPress} iconSize={22} color="#000" />
      </View>
    </View>
  );
}
