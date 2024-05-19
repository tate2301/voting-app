import { colors } from "@/assets/styles";
import { typography } from "@/assets/styles/typography";
import Position from "@/components/Position";
import SafeAreaContainer from "@/components/SafeAreaContainer";
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
  const [positions, setPositions] = useState<TPosition[]>([]);

  const getCandidates = async (positionId: string): Promise<Candidate[]> => {
    const candidatesRef = collection(db, `polls/${positionId}/candidates`);
    const candidatesSnapshot = await getDocs(candidatesRef);
    const candidatesData = candidatesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Candidate)
    );
    return candidatesData;
  };

  const fetchData = async () => {
    const positionsRef = collection(db, "polls");
    const positionsSnapshot = await getDocs(positionsRef);
    const positionsData = positionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const positionsWithCandidates = await Promise.all(
      positionsData.map(async (position) => {
        const candidates = await getCandidates(position.id);
        return { ...position, candidates };
      })
    );

    setPositions(positionsWithCandidates as TPosition[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <View style={{ flex: 1, gap: 32, marginTop: 64, width: "100%" }}>
          {positions.map((position) => (
            <Position key={position.id} {...position} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}
