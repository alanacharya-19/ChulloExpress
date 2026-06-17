import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useNotifications } from "@/context/NotificationContext";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const { height } = Dimensions.get("window");

export default function NotificationsSheet({ visible, onClose }: Props) {
  const { notifications, markRead } = useNotifications();
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : height,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <Animated.View
          className="bg-white rounded-t-[32px] max-h-[80%] min-h-[50%]"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <Text className="text-xl font-bold text-[#1E1E1E]">Notifications</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View className="px-4 pb-4">
            {notifications.map((notif) => (
              <TouchableOpacity key={notif.id} className="flex-row items-start py-4 border-b border-gray-50" onPress={() => markRead(notif.id)}>
                <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: notif.color + "20" }}>
                  <Ionicons name={notif.icon as any} size={20} color={notif.color} />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-bold text-[#1E1E1E]">{notif.title}</Text>
                  <Text className="text-xs text-gray-500 mt-0.5">{notif.desc}</Text>
                  <Text className="text-[10px] text-gray-400 mt-1">{notif.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="bg-[#FF6B00] py-3 rounded-xl items-center mt-3"
              onPress={() => { onClose(); router.push("/notifications" as any); }}
            >
              <Text className="text-white font-bold text-sm">View All Notifications</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
