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

export default function CartCard({ id, name, price, image, quantity, onUpdateQuantity, onRemove }: CartCardProps) {
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
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 28,
    padding: 10,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: { width: 80, height: 80, borderRadius: 22, backgroundColor: "#E8E8E8" },
  content: { flex: 1, marginLeft: 12, justifyContent: "center" },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  name: { fontSize: 16, fontWeight: "700", color: "#111" },
  size: { fontSize: 12, color: "#999", marginTop: 2 },
  deleteBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  price: { fontSize: 18, fontWeight: "800", color: "#FF6B00" },
  qtyContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 16, padding: 3 },
  qtyBtn: { width: 30, height: 30, borderRadius: 13, backgroundColor: "#F0F0F0", alignItems: "center", justifyContent: "center" },
  activeQtyBtn: { backgroundColor: "#FF6B00" },
  qtyText: { marginHorizontal: 12, fontSize: 16, fontWeight: "700", color: "#111" },
});
