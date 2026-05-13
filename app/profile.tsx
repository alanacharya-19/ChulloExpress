import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("Alan Shrestha");
  const [email, setEmail] = useState("alan@example.com");
  const [phone, setPhone] = useState("+977-9841234567");
  const [address, setAddress] = useState("Bangesimal-1, Surkhet, Nepal");

  const handleSave = () => {
    Alert.alert("Profile Updated", "Your profile has been saved successfully.");
  };

  return (
    <View className="flex-1 mt-10">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity
          className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">
          My Profile
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-[#FF6B00] rounded-full items-center justify-center mb-3">
            <Text className="text-white text-4xl font-bold">
              {name.charAt(0)}
            </Text>
          </View>
          <TouchableOpacity className="bg-[#FF6B00] px-4 py-1.5 rounded-full">
            <Text className="text-white text-xs font-bold">Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5">
          <View className="mb-5">
            <Text className="text-xs font-bold text-gray-500 uppercase mb-1.5">
              Full Name
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 h-12">
              <Ionicons name="person-outline" size={18} color="#FF6B00" />
              <TextInput
                className="flex-1 ml-3 text-sm text-[#222] font-medium"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-xs font-bold text-gray-500 uppercase mb-1.5">
              Email
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 h-12">
              <Ionicons name="mail-outline" size={18} color="#FF6B00" />
              <TextInput
                className="flex-1 ml-3 text-sm text-[#222] font-medium"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-xs font-bold text-gray-500 uppercase mb-1.5">
              Phone
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 h-12">
              <Ionicons name="call-outline" size={18} color="#FF6B00" />
              <TextInput
                className="flex-1 ml-3 text-sm text-[#222] font-medium"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-xs font-bold text-gray-500 uppercase mb-1.5">
              Delivery Address
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 h-12">
              <Ionicons name="location-outline" size={18} color="#FF6B00" />
              <TextInput
                className="flex-1 ml-3 text-sm text-[#222] font-medium"
                value={address}
                onChangeText={setAddress}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-[#FF6B00] py-4 rounded-2xl items-center mt-4"
            onPress={handleSave}
          >
            <Text className="text-white font-bold text-base">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
