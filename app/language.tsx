import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

type Language = {
  code: string;
  name: string;
  native: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "ne", name: "Nepali", native: "नेपाली", flag: "🇳🇵" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState("en");

  const handleSelect = (code: string) => {
    setSelected(code);
    Alert.alert("Language Changed", `App language set to ${languages.find((l) => l.code === code)?.name}.`);
  };

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">Language</Text>
      </View>
      <FlatList
        data={languages}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => {
          const active = selected === item.code;
          return (
            <TouchableOpacity
              className={`flex-row items-center py-4 px-4 rounded-2xl mb-2 ${active ? "bg-[#FFF1E8]" : "bg-[#F4F4F4]"}`}
              onPress={() => handleSelect(item.code)}
            >
              <Text className="text-2xl">{item.flag}</Text>
              <View className="flex-1 ml-4">
                <Text className={`text-sm font-bold ${active ? "text-[#FF6B00]" : "text-[#333]"}`}>{item.name}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">{item.native}</Text>
              </View>
              {active && <Ionicons name="checkmark-circle" size={22} color="#FF6B00" />}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
