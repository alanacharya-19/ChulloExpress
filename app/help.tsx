import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const faqs = [
  { q: "How do I place an order?", a: "Browse restaurants, select your food, add to cart, and checkout. You can track the order in real-time." },
  { q: "What payment methods are accepted?", a: "We accept cash on delivery, card payments, and mobile banking. More options coming soon." },
  { q: "How long does delivery take?", a: "Delivery usually takes 25-45 minutes depending on the restaurant and your location." },
  { q: "Can I cancel my order?", a: "Yes, you can cancel an active order from the order tracking screen before it is prepared." },
  { q: "What if my order is wrong or damaged?", a: "Contact our support team immediately and we will make it right with a refund or replacement." },
];

export default function HelpScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert("Required", "Please fill in all fields.");
      return;
    }
    Alert.alert("Submitted", "We'll get back to you within 24 hours.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <View className="flex-1 mt-10 bg-white">
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1E1E1E] ml-4">Help & Support</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="mx-5 mb-6 bg-[#FFF1E8] rounded-3xl p-5 flex-row items-center gap-4">
          <View className="w-12 h-12 bg-[#FF6B00] rounded-full items-center justify-center">
            <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-[#1E1E1E]">Need help?</Text>
            <Text className="text-xs text-gray-600 mt-0.5">We typically reply within a few minutes</Text>
          </View>
          <TouchableOpacity className="bg-[#FF6B00] px-4 py-2 rounded-full" onPress={() => Alert.alert("Live Chat", "Connecting you to a support agent...")}>
            <Text className="text-white text-xs font-bold">Chat</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-base font-bold text-[#1E1E1E] mx-5 mb-3">Frequently Asked Questions</Text>
        <View className="mx-5 bg-[#F4F4F4] rounded-3xl overflow-hidden mb-8">
          {faqs.map((faq, i) => {
            const open = expanded === faq.q;
            return (
              <TouchableOpacity key={faq.q} className={`px-5 py-4 ${i < faqs.length - 1 ? "border-b border-gray-200" : ""}`} onPress={() => setExpanded(open ? null : faq.q)}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-[#333] flex-1">{faq.q}</Text>
                  <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#999" />
                </View>
                {open && <Text className="text-sm text-gray-500 mt-3 leading-5">{faq.a}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-base font-bold text-[#1E1E1E] mx-5 mb-3">Contact Us</Text>
        <View className="mx-5 bg-[#F4F4F4] rounded-3xl p-5 mb-6">
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 uppercase mb-1.5">Name</Text>
            <TextInput className="bg-white rounded-xl px-4 h-12 text-sm text-[#222]" placeholder="Your name" placeholderTextColor="#999" value={name} onChangeText={setName} />
          </View>
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 uppercase mb-1.5">Email</Text>
            <TextInput className="bg-white rounded-xl px-4 h-12 text-sm text-[#222]" placeholder="your@email.com" placeholderTextColor="#999" value={email} onChangeText={setEmail} keyboardType="email-address" />
          </View>
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 uppercase mb-1.5">Message</Text>
            <TextInput className="bg-white rounded-xl px-4 py-3 text-sm text-[#222] min-h-[100px]" placeholder="How can we help?" placeholderTextColor="#999" value={message} onChangeText={setMessage} multiline textAlignVertical="top" />
          </View>
          <TouchableOpacity className="bg-[#FF6B00] py-4 rounded-2xl items-center" onPress={handleSubmit}>
            <Text className="text-white font-bold text-base">Send Message</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-5 flex-row gap-4">
          <TouchableOpacity className="flex-1 bg-[#F4F4F4] rounded-3xl p-4 items-center" onPress={() => Alert.alert("Call Support", "Coming soon.")}>
            <Ionicons name="call-outline" size={24} color="#FF6B00" />
            <Text className="text-xs font-bold text-[#333] mt-2">Call Us</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-[#F4F4F4] rounded-3xl p-4 items-center" onPress={() => Alert.alert("Email Support", "support@chulloexpress.com")}>
            <Ionicons name="mail-outline" size={24} color="#FF6B00" />
            <Text className="text-xs font-bold text-[#333] mt-2">Email Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
