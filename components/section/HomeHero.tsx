import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const images = [
  require("../../assets/heroimages/image1.png"),
  require("../../assets/heroimages/image2.png"),
  require("../../assets/heroimages/image3.png"),
];

export default function HomeHero() {
  const flatListRef = useRef<FlatList>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (indexRef.current + 1) % images.length;
      indexRef.current = nextIndex;
      setIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FlatList ref={flatListRef} data={images} keyExtractor={(_, i) => i.toString()} horizontal pagingEnabled
          showsHorizontalScrollIndicator={false} scrollEnabled={false}
          getItemLayout={(_, i) => ({ length: width * 0.95, offset: width * 0.95 * i, index: i })}
          renderItem={({ item }) => <Image source={item} style={styles.image} />} />
      </View>
      <View style={styles.switchContainer}>
        {images.map((_, i) => (
          <View key={i} style={[styles.switchDot, index === i && styles.activeSwitchDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 10, alignItems: "center" },
  container: { width: "95%", height: 150, borderRadius: 16, overflow: "hidden", backgroundColor: "#F5F5F5",
    shadowColor: "#000", shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 5,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.6)" },
  image: { width: width * 0.95, height: 150, resizeMode: "cover" },
  switchContainer: { flexDirection: "row", marginTop: 8, alignSelf: "center", paddingHorizontal: 8, paddingVertical: 4 },
  switchDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(0,0,0,0.2)", marginHorizontal: 3 },
  activeSwitchDot: { width: 14, height: 6, borderRadius: 3, backgroundColor: "#FF6B00" },
});
