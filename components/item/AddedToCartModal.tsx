import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  itemName: string;
  itemImage: any;
  quantity: number;
  price: number;
  onClose: () => void;
  onViewCart: () => void;
};

const { height } = Dimensions.get("window");

export default function AddedToCartModal({
  visible,
  itemName,
  itemImage,
  quantity,
  price,
  onClose,
  onViewCart,
}: Props) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 200,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 12,
          stiffness: 150,
        }),
      ]).start();
    } else {
      slideAnim.setValue(height);
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
        <Animated.View
          className="bg-white rounded-t-[32px] px-6 pb-10 pt-6"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          {/* Success icon */}
          <View className="items-center mb-4">
            <Animated.View
              className="w-16 h-16 bg-green-100 rounded-full items-center justify-center"
              style={{ transform: [{ scale: scaleAnim }] }}
            >
              <Ionicons name="checkmark-circle" size={40} color="#22C55E" />
            </Animated.View>
          </View>

          <Text className="text-center text-xl font-bold text-[#1E1E1E] mb-1">Added to Cart!</Text>
          <Text className="text-center text-sm text-gray-500 mb-5">
            {quantity} x {itemName}
          </Text>

          {/* Item preview */}
          <View className="flex-row items-center bg-gray-50 rounded-2xl p-3 mb-5">
            <Image source={itemImage} className="w-14 h-14 rounded-xl" resizeMode="cover" />
            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#1E1E1E]" numberOfLines={1}>{itemName}</Text>
              <Text className="text-xs text-gray-500 mt-0.5">Qty: {quantity}</Text>
            </View>
            <Text className="text-lg font-bold text-[#FF6B00]">Rs {price * quantity}</Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            className="bg-[#FF6B00] py-4 rounded-2xl items-center mb-3"
            onPress={onViewCart}
          >
            <Text className="text-white font-bold text-base">View Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 items-center" onPress={onClose}>
            <Text className="text-gray-500 font-semibold text-sm">Continue Browsing</Text>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
