import Ionicons from "@expo/vector-icons/Ionicons";
import { useNotifications } from "@/context/NotificationContext";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function NotificationsScreen() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
        <View className="flex-row items-center">
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#1E1E1E] ml-4">Notifications</Text>
          {unreadCount > 0 && (
            <View className="bg-[#FF6B00] rounded-full px-2 py-0.5 ml-2">
              <Text className="text-white text-xs font-bold">{unreadCount}</Text>
            </View>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text className="text-xs font-bold text-[#FF6B00]">Mark All Read</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={notifications}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="notifications-off-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3 text-base">No notifications</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-row items-start py-4 border-b border-gray-50 ${!item.read ? "bg-orange-50/50 -mx-5 px-5 rounded-2xl" : ""}`}
            onPress={() => markRead(item.id)}
          >
            <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: item.color + "20" }}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <View className="flex-1 ml-3">
              <View className="flex-row items-center gap-2">
                <Text className={`text-sm ${!item.read ? "font-bold text-[#1E1E1E]" : "font-semibold text-gray-500"}`}>{item.title}</Text>
                {!item.read && <View className="w-2 h-2 rounded-full bg-[#FF6B00]" />}
              </View>
              <Text className="text-xs text-gray-500 mt-0.5">{item.desc}</Text>
              <Text className="text-[10px] text-gray-400 mt-1">{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
