import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  onPress: () => void;
  iconName: string;
  iconSize?: number;
  badgeCount?: number;
  style?: ViewStyle;
  color: string;
  disabled?: boolean;
};

export default function IconButton({
  onPress,
  iconName,
  iconSize = 22,
  badgeCount,
  color,
  style,
  disabled = false,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.container,
          disabled && styles.disabled,
          { transform: [{ scale }] },
          style,
        ]}
      >
        {/* Icon */}
        <Ionicons name={iconName as any} size={iconSize} color={color} />

        {/* Badge */}
        {typeof badgeCount === "number" && badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {/* {badgeCount > 9 ? "9+" : badgeCount} */}
              {badgeCount ? (badgeCount > 9 ? "9+" : badgeCount) : "1"}
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F5F5F5",

    // neumorphism-like shadow
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,

    position: "relative",
    overflow: "visible",
  },

  disabled: {
    opacity: 0.4,
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF6B00",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
