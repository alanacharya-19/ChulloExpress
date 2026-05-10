import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const categories = [
  {
    id: "1",
    name: "All Restro",
    image: require("../../assets/categoryicons/restaurant.png"),
  },
  {
    id: "2",
    name: "Street Food",
    image: require("../../assets/categoryicons/street-food.png"),
  },
  {
    id: "3",
    name: "Favorites",
    image: require("../../assets/categoryicons/circle-heart.png"),
  },
  {
    id: "4",
    name: "Cake",
    image: require("../../assets/categoryicons/cake.png"),
  },
  {
    id: "5",
    name: "Biryani",
    image: require("../../assets/categoryicons/biryani.png"),
  },
  {
    id: "6",
    name: "Momos",
    image: require("../../assets/categoryicons/momos.png"),
  },
  {
    id: "7",
    name: "Drinks",
    image: require("../../assets/categoryicons/soda.png"),
  },
  {
    id: "8",
    name: "More",
    image: require("../../assets/categoryicons/more.png"),
  },
];

function CategoryItem({ item }: any) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={({ pressed: isPressed }) => [
        styles.item,
        isPressed && styles.itemPressed,
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={[styles.iconBox, pressed && styles.iconBoxPressed]}>
        <Image source={item.image} style={styles.icon} />
      </View>

      <Text style={[styles.label, pressed && styles.labelPressed]}>
        {item.name}
      </Text>
    </Pressable>
  );
}

export default function CategorySection() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>

        <Pressable>
          <Text style={styles.seeMore}>See all</Text>
        </Pressable>
      </View>

      {/* Grid */}
      <FlatList
        data={categories}
        numColumns={4}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <CategoryItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },

  seeMore: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF7A00",
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },

  item: {
    alignItems: "center",
    width: "22%",
  },

  itemPressed: {
    transform: [{ scale: 0.95 }],
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 2,
  },

  iconBoxPressed: {
    backgroundColor: "#FFF1E5",

    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.05,
    elevation: 2,
  },

  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },

  label: {
    marginTop: 9,
    fontSize: 10,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
  },

  labelPressed: {
    color: "#FF7A00",
  },
});
