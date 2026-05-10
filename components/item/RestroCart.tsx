import React, { useRef } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";

type RestroCardProps = {
  restroImage: any;
  restroName: string;
};

export default function RestroCard({
  restroImage,
  restroName,
}: RestroCardProps) {
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
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={{
          transform: [{ scale }],
          alignItems: "center",
          marginRight: 16,
        }}
      >
        {/* Neumorphism Icon Button Style Circle */}
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 39,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            justifyContent: "center",

            // soft shadow like icon button
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Image
            source={restroImage}
            style={{
              width: 70,
              height: 70,
              borderRadius: 33,
            }}
            resizeMode="cover"
          />
        </View>

        <Text
          numberOfLines={1}
          style={{
            marginTop: 8,
            fontSize: 10,
            fontWeight: "900",
            color: "#333",
            maxWidth: 100,
            textAlign: "center",
          }}
        >
          {restroName}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
