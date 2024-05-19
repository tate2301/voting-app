import { colors } from "@/assets/styles";
import { typography } from "@/assets/styles/typography";
import Position from "@/components/Position";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { usePollWithCandidates } from "@/hooks/usePollWithCandidates";
import { db } from "@/lib/firebase";
import { Candidate, Position as TPosition } from "@/lib/types";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: typography.heading2.fontSize,
    fontWeight: "700",
    color: colors.heading,
    paddingRight: 36,
  },
});

export default function VotePage() {
  const positions = usePollWithCandidates();

  return (
    <SafeAreaContainer>
      <ScrollView
        style={{
          width: "100%",
          flex: 1,
          flexGrow: 1,
          marginHorizontal: 0,
          padding: 8,
        }}
      >
        <View style={{ marginTop: 64 }}>
          <Text style={styles.title}>Welcome to the 2024 SRC elections.</Text>
        </View>
        <View
          style={{
            flex: 1,
            gap: 32,
            marginTop: 64,
            width: "100%",
            paddingBottom: 64,
          }}
        >
          {positions.map((position) => (
            <Position key={position.id} {...position} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}
