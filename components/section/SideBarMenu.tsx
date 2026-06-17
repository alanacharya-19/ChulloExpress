import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.75;

const menuItems = [
  { icon: "person-outline", label: "Profile", route: "/profile" },
  { icon: "bag-outline", label: "My Orders", route: "/(tabs)/order" },
  { icon: "heart-outline", label: "Favorites", route: "/favorites" },
  { icon: "notifications-outline", label: "Notifications", route: "/notifications" },
  { icon: "pricetag-outline", label: "Offers", route: "/promotions" },
  {
    icon: "location-outline",
    label: "Delivery Address",
    route: "/address",
  },
  { icon: "settings-outline", label: "Settings", route: "/settings" },
  { icon: "help-circle-outline", label: "Help & Support", route: "/help" },
  { icon: "language-outline", label: "Language", route: "/language" },
  { icon: "share-outline", label: "Share App", route: "", share: true },
  {
    icon: "information-circle-outline",
    label: "About",
    route: "/about",
  },
  {
    icon: "log-out-outline",
    label: "Logout",
    route: "/profile",
    danger: true,
  },
];

export default function SideBarMenu({ visible, onClose }: Props) {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : width,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [visible]);

  const handleNavigate = (route: string, danger?: boolean, share?: boolean) => {
    onClose();
    if (share) {
      Share.share({ message: "ChulloExpress - Fast food delivery at your doorstep! Download now: https://chulloexpress.com" });
      return;
    }
    if (danger) {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => router.push("/profile") },
      ]);
      return;
    }
    router.push(route as any);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/40 " onPress={onClose}>
        <Animated.View
          className="bg-white h-full w-[50%] absolute right-0 top-0 pt-14 px-6 rounded-l-3xl"
          style={{ transform: [{ translateX: slideAnim }] }}
        >
          <View className="items-center mb-8 border-b border-gray-100 pb-6">
            <Image
              source={require("../../assets/heroimages/logo.png")}
              className="w-20 h-20 rounded-full mb-3"
              resizeMode="cover"
            />
            <Text className="text-lg font-bold text-[#1E1E1E]">
              ChulloExpress
            </Text>
            <Text className="text-xs text-gray-500 mt-1">Alan Shrestha</Text>
          </View>

          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              className="flex-row items-center py-4 border-b border-gray-50"
              onPress={() => handleNavigate(item.route, item.danger, (item as any).share)}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={item.danger ? "#C62828" : "#FF6B00"}
              />
              <Text
                className={`ml-4 text-base font-semibold ${item.danger ? "text-[#C62828]" : "text-[#333]"}`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          <View className="mt-auto mb-10">
            <TouchableOpacity
              className="flex-row items-center py-4 justify-center"
              onPress={onClose}
            >
              <Ionicons name="close-outline" size={20} color="#666" />
              <Text className="ml-2 text-base text-gray-500 font-medium">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
