import CartCard from "@/components/item/CartCard";
import CartFooter from "@/components/section/CartFooter";
import CartHeader from "@/components/section/CartHeader";
import { useCart } from "@/context/CartContext";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Alert, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    getDeliveryFee,
    getDiscount,
  } = useCart();

  const subtotal = useMemo(() => getTotal(), [items]);
  const deliveryFee = useMemo(() => getDeliveryFee(), [items]);
  const discount = useMemo(() => getDiscount(), [items]);
  const total = useMemo(
    () => subtotal + deliveryFee - discount,
    [subtotal, deliveryFee, discount],
  );
  const itemCount = useMemo(() => getItemCount(), [items]);

  const handleCheckout = () => {
    if (itemCount === 0) return;
    Alert.alert("Place Order", `Total: Rs. ${total}\nProceed to checkout?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Order Now",
        onPress: () => {
          clearCart();
          router.push("/(tabs)/order");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CartHeader itemCount={itemCount} onClearCart={clearCart} />

      {itemCount === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Image
            source={{
              uri: "https://img.icons8.com/ios/200/FF6B00/shopping-cart.png",
            }}
            className="w-32 h-32 mb-6 opacity-60"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-gray-400 mb-2">
            Your cart is empty
          </Text>
          <Text className="text-sm text-gray-400 text-center">
            Browse restaurants and add items you like to order
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CartCard
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
              restaurant={item.restaurant}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          )}
          ListFooterComponent={
            <CartFooter
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
              itemCount={itemCount}
              onCheckout={handleCheckout}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}
