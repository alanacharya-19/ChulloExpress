import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [sms, setSms] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const settings = [
    { icon: "notifications-outline", label: "Push Notifications", value: notifications, onToggle: setNotifications },
    { icon: "chatbubble-outline", label: "SMS Alerts", value: sms, onToggle: setSms },
    { icon: "moon-outline", label: "Dark Mode", value: darkMode, onToggle: setDarkMode },
  ];

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">Settings</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5">
          <Text className="text-xs font-bold text-gray-500 uppercase mb-3">Preferences</Text>
          <View className="bg-[#F4F4F4] rounded-3xl overflow-hidden">
            {settings.map((s, i) => (
              <View key={s.label} className={`flex-row items-center justify-between px-5 py-4 ${i < settings.length - 1 ? "border-b border-gray-200" : ""}`}>
                <View className="flex-row items-center gap-3">
                  <Ionicons name={s.icon as any} size={20} color="#FF6B00" />
                  <Text className="text-sm font-semibold text-[#333]">{s.label}</Text>
                </View>
                <Switch value={s.value} onValueChange={s.onToggle} trackColor={{ false: "#D1D5DB", true: "#FFD6B0" }} thumbColor={s.value ? "#FF6B00" : "#F4F4F4"} />
              </View>
            ))}
          </View>
        </View>
        <View className="px-5 mt-8">
          <Text className="text-xs font-bold text-gray-500 uppercase mb-3">Account</Text>
          <TouchableOpacity className="flex-row items-center gap-3 bg-[#F4F4F4] rounded-3xl px-5 py-4 mb-3" onPress={() => router.push("/profile")}>
            <Ionicons name="person-outline" size={20} color="#FF6B00" />
            <Text className="text-sm font-semibold text-[#333]">Edit Profile</Text>
            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" className="ml-auto" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-3 bg-[#F4F4F4] rounded-3xl px-5 py-4" onPress={() => router.push("/address" as any)}>
            <Ionicons name="location-outline" size={20} color="#FF6B00" />
            <Text className="text-sm font-semibold text-[#333]">Manage Addresses</Text>
            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" className="ml-auto" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
