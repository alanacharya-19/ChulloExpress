import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CartHeaderProps = {
  itemCount: number;
  onClearCart: () => void;
};

export default function CartHeader({ itemCount, onClearCart }: CartHeaderProps) {
  const handleClear = () => {
    if (itemCount === 0) return;
    Alert.alert("Clear Cart", "Remove all items from your cart?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: onClearCart },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.subtitle}>{itemCount} item{itemCount !== 1 ? "s" : ""} added</Text>
      </View>
      <TouchableOpacity style={styles.iconBtn} onPress={handleClear}>
        <Ionicons name="trash-outline" size={20} color={itemCount > 0 ? "#FF6B00" : "#ccc"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
  },
  spacer: { width: 48 },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  titleContainer: { alignItems: "center" },
  title: { fontSize: 24, fontWeight: "800", color: "#111" },
  subtitle: { marginTop: 2, fontSize: 13, color: "#888", fontWeight: "500" },
});
