import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CartCardProps = {
  id: string;
  name: string;
  price: number;
  image: any;
  quantity: number;
  restaurant: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function CartCard({
  id,
  name,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartCardProps) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.size}>Medium</Text>
          </View>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => onRemove(id)}>
            <Ionicons name="trash-outline" size={18} color="#FF6B00" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>Rs. {price * quantity}</Text>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => onUpdateQuantity(id, quantity - 1)}>
              <Ionicons name="remove" size={16} color="#222" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity style={[styles.qtyBtn, styles.activeQtyBtn]} onPress={() => onUpdateQuantity(id, quantity + 1)}>
              <Ionicons name="add" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F4F4F4",
    borderRadius: 28,
    padding: 14,
    marginBottom: 18,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 22,
    resizeMode: "cover",
  },
  content: { flex: 1, marginLeft: 14, justifyContent: "space-between", height: 95 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  name: { fontSize: 18, fontWeight: "800", color: "#111", maxWidth: 160 },
  size: { fontSize: 13, color: "#888", marginTop: 4, fontWeight: "500" },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: "#FFF1E8",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  price: { fontSize: 20, fontWeight: "800", color: "#FF6B00" },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    padding: 4,
  },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  activeQtyBtn: { backgroundColor: "#FF6B00" },
  qtyText: { marginHorizontal: 14, fontSize: 16, fontWeight: "700", color: "#111" },
});
