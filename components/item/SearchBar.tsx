import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View, ViewStyle } from "react-native";
import IconButton from "./IconButton";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  onFilterPress?: () => void;
};

export default function SearchBar({ value, onChangeText, placeholder = "Search for food, restaurants...", style, onFilterPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => { Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start(); };
  const handlePressOut = () => { Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start(); };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }, style]}>
      <Ionicons name="search" size={20} color="#000" />
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#888" style={styles.input} />
      <Pressable onPress={onFilterPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={styles.filterWrapper}>
          <IconButton iconName="options-outline" iconSize={20} color="#fff" onPress={onFilterPress || (() => {})} style={{ backgroundColor: "#FF6B00" }} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20, marginTop: 10, marginBottom: 5,
    flexDirection: "row", alignItems: "center",
    borderRadius: 30, backgroundColor: "#F5F5F5", paddingHorizontal: 18, height: 52,
    shadowColor: "#000", shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  input: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: "500", color: "#222", height: "100%" },
  filterWrapper: { marginLeft: 8 },
});
