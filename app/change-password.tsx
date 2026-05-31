import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChangePasswordScreen() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (!current.trim()) {
      Alert.alert("Required", "Enter your current password.");
      return;
    }
    if (newPass.length < 6) {
      Alert.alert("Too Short", "New password must be at least 6 characters.");
      return;
    }
    if (newPass !== confirm) {
      Alert.alert("Mismatch", "New passwords do not match.");
      return;
    }
    Alert.alert("Success", "Your password has been changed.");
    setCurrent("");
    setNewPass("");
    setConfirm("");
  };

  const input = (label: string, value: string, onChange: (v: string) => void, show: boolean, toggle: () => void, placeholder: string) => (
    <View className="mb-5">
      <Text className="text-xs font-bold text-gray-500 uppercase mb-1.5">{label}</Text>
      <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 h-12">
        <TextInput
          className="flex-1 text-sm text-[#222] font-medium"
          value={value}
          onChangeText={onChange}
          secureTextEntry={!show}
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={toggle}>
          <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">Change Password</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 mt-4">
          <View className="bg-[#FFF1E8] rounded-3xl p-4 mb-6 flex-row items-center gap-3">
            <Ionicons name="shield-checkmark-outline" size={24} color="#FF6B00" />
            <Text className="text-sm text-gray-600 flex-1">Password must be at least 6 characters long.</Text>
          </View>
          {input("Current Password", current, setCurrent, showCurrent, () => setShowCurrent(!showCurrent), "Enter current password")}
          {input("New Password", newPass, setNewPass, showNew, () => setShowNew(!showNew), "Enter new password")}
          {input("Confirm Password", confirm, setConfirm, showConfirm, () => setShowConfirm(!showConfirm), "Re-enter new password")}
          <TouchableOpacity className="bg-[#FF6B00] py-4 rounded-2xl items-center mt-2" onPress={handleSave}>
            <Text className="text-white font-bold text-base">Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
