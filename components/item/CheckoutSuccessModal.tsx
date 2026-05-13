import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  total: number;
  itemCount: number;
  onClose: () => void;
  onViewOrders: () => void;
};

const { height } = Dimensions.get("window");

export default function CheckoutSuccessModal({ visible, total, itemCount, onClose, onViewOrders }: Props) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, damping: 20, stiffness: 200 }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, damping: 12, stiffness: 150 }),
      ]).start();
    } else {
      slideAnim.setValue(height);
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
          <Animated.View className="bg-white rounded-t-[32px] px-6 pb-10 pt-6" style={{ transform: [{ translateY: slideAnim }] }}>
            <View className="items-center mb-4">
              <Animated.View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center" style={{ transform: [{ scale: scaleAnim }] }}>
                <Ionicons name="checkmark-circle" size={40} color="#22C55E" />
              </Animated.View>
            </View>
            <Text className="text-center text-xl font-bold text-[#1E1E1E] mb-1">Order Placed!</Text>
            <Text className="text-center text-sm text-gray-500 mb-5">{itemCount} item{itemCount !== 1 ? "s" : ""} ordered</Text>
            <View className="bg-gray-50 rounded-2xl p-4 mb-5">
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm text-gray-500">Items</Text>
                <Text className="text-sm font-semibold text-[#222]">{itemCount}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Total</Text>
                <Text className="text-lg font-bold text-[#FF6B00]">Rs. {total}</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-[#FF6B00] py-4 rounded-2xl items-center mb-3" onPress={onViewOrders}>
              <Text className="text-white font-bold text-base">View Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 items-center" onPress={onClose}>
              <Text className="text-gray-500 font-semibold text-sm">Continue Shopping</Text>
            </TouchableOpacity>
          </Animated.View>
      </Pressable>
    </Modal>
  );
}
