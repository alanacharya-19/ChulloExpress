import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CartFooterProps = {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  itemCount: number;
  onCheckout: () => void;
};

export default function CartFooter({ subtotal, deliveryFee, discount, total, itemCount, onCheckout }: CartFooterProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>Rs. {subtotal}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Delivery Fee</Text>
          <Text style={styles.value}>Rs. {deliveryFee}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.discountLabel}>Discount (10%)</Text>
          <Text style={styles.discountValue}>- Rs. {discount}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Rs. {total}</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.checkoutBtn, itemCount === 0 && styles.checkoutBtnDisabled]} disabled={itemCount === 0} onPress={onCheckout}>
        <View style={styles.checkoutContent}>
          <View>
            <Text style={styles.checkoutSmall}>Total Price</Text>
            <Text style={styles.checkoutPrice}>Rs. {total}</Text>
          </View>
          <View style={styles.checkoutRight}>
            <Text style={styles.checkoutText}>{itemCount === 0 ? "Cart Empty" : "Checkout"}</Text>
            {itemCount > 0 && <Ionicons name="arrow-forward" size={20} color="#fff" />}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 10 },
  summaryCard: { backgroundColor: "#F4F4F4", borderRadius: 28, padding: 22, marginBottom: 18, shadowColor: "#FFFFFF", shadowOffset: { width: -5, height: -5 }, shadowOpacity: 1, shadowRadius: 8, elevation: 4 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  label: { fontSize: 15, color: "#666", fontWeight: "500" },
  value: { fontSize: 15, color: "#222", fontWeight: "600" },
  discountLabel: { fontSize: 15, color: "#FF6B00", fontWeight: "600" },
  discountValue: { fontSize: 15, color: "#FF6B00", fontWeight: "700" },
  divider: { height: 1, backgroundColor: "#E5E5E5", marginVertical: 8 },
  totalLabel: { fontSize: 18, color: "#111", fontWeight: "800" },
  totalValue: { fontSize: 20, color: "#111", fontWeight: "800" },
  checkoutBtn: { backgroundColor: "#FF6B00", borderRadius: 28, paddingVertical: 20, paddingHorizontal: 22, elevation: 6 },
  checkoutBtnDisabled: { backgroundColor: "#ccc", elevation: 0 },
  checkoutContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  checkoutSmall: { color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: "500" },
  checkoutPrice: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 2 },
  checkoutRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkoutText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
