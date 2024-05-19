import { colors } from "@/assets/styles";
import { SplashScreen } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      // When all loading is setup, unmount the splash screen component.
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerTintColor: colors.heading,
      }}
    />
  );
}
