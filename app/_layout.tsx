import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Keyboard,
} from "react-native";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      {!isKeyboardVisible && (
        <View style={styles.navbar}>
          <View style={styles.navbarList}>
            <TouchableOpacity
              onPress={() => router.push("/")}
              style={styles.navbarItem}
            >
              <Text style={styles.navbarLink}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              style={styles.navbarItem}
            >
              <Text style={styles.navbarLink}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/order")}
              style={styles.navbarItem}
            >
              <Text style={styles.navbarLink}>Orders</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.content}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="order" options={{ headerShown: false }} />
          <Stack.Screen name="add-order" options={{ headerShown: false }} />
        </Stack>
      </View>
    </>
  );
}

const { width } = Dimensions.get("window");
const isSmallScreen = width <= 768;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#333",
    padding: 8,
    paddingTop: StatusBar.currentHeight || 20,
  },
  navbarList: {
    flexDirection: isSmallScreen ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navbarItem: {
    margin: isSmallScreen ? 10 : 16,
  },
  navbarLink: {
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
});
