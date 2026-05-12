import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import IconButton from "./IconButton";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  onFilterPress?: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search for food, restaurants...",
  style,
  onFilterPress,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
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
    <Animated.View
      style={[styles.container, { transform: [{ scale }] }, style]}
    >
      {/* Left search icon */}
      <Ionicons name="search" size={20} color="#000" />

      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        style={styles.input}
      />

      {/* Right filter button */}
      <Pressable
        onPress={onFilterPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.filterWrapper}>
          <IconButton
            iconName="options-outline"
            iconSize={20}
            color="#fff"
            onPress={onFilterPress || (() => {})}
            style={{
              backgroundColor: "#FF6B00",
            }}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderRadius: 23,
    paddingHorizontal: 12,
    marginHorizontal: 15,

    backgroundColor: "#F5F5F5",

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },

  filterWrapper: {
    marginLeft: 8,
  },
});
