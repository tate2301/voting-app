import { colors } from "@/assets/styles";
import { SplashScreen } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
      }}
    />
  );
}
