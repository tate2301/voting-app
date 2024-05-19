import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

import { Tabs } from "expo-router";
import { colors } from "@/assets/styles";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,

        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="vote"
        options={{
          title: "Vote",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: "Results",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="bar-chart-2" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
