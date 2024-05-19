import { colors } from "@/assets/styles";
import Candidate from "@/components/Candidate";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { usePollWithCandidatesByPollId } from "@/hooks/usePollWithCandidates";
import { auth, db } from "@/lib/firebase";
import { Candidate as TCandidate } from "@/lib/types";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const useMyChoice = () => {
  const { slug } = useGlobalSearchParams();

  const [myChoice, setMyChoice] = useState<string | null>(null);
  const [candidate, setCandidate] = useState<TCandidate | null>(null);

  useEffect(() => {
    const docRef = doc(db, `profiles/${auth.currentUser?.email}`);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setMyChoice(doc.data()?.[slug as string]);
    });

    return () => {
      unsubscribe();
    };
  }, [slug, auth.currentUser]);

  useEffect(() => {
    if (myChoice) {
      const docRef = doc(db, `polls/${slug}/candidates/${myChoice}`);
      onSnapshot(docRef, (doc) => {
        setCandidate(doc.data() as TCandidate);
      });
    }
  }, [myChoice]);

  return candidate;
};

export default function PollPage() {
  const { position, slug } = useGlobalSearchParams();

  const poll = usePollWithCandidatesByPollId(slug as string);
  const myChoice = useMyChoice();

  const navigation = useNavigation();

  useEffect(() => {});

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `Vote ${position} polls`,
    });
  }, []);

  return (
    <SafeAreaContainer>
      {poll && (
        <ScrollView
          style={{
            gap: 32,
            width: "100%",
            padding: 8,
            flex: 1,
            paddingVertical: 64,
            marginBottom: 64,
          }}
        >
          <View style={{ marginBottom: 64 }}>
            <Text style={{ fontWeight: "700", fontSize: 24, marginBottom: 16 }}>
              Your choice
            </Text>
            {!myChoice && (
              <View
                style={{
                  width: "100%",
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 64,
                  backgroundColor: colors.interactive,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    textAlign: "center",
                    color: colors.mute,
                  }}
                >
                  You haven't voted yet
                </Text>
              </View>
            )}
            {myChoice && <Candidate {...myChoice} hasVoted={!!myChoice} />}
          </View>
          <View style={{ marginBottom: 64 }}>
            <Text style={{ fontWeight: "700", fontSize: 24, marginBottom: 16 }}>
              Candidates
            </Text>
            <View style={{ gap: 32 }}>
              {poll?.candidates.map((candidate: TCandidate) => (
                <Candidate
                  key={candidate.id}
                  {...candidate}
                  hasVoted={!!myChoice}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
      {!poll && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 16, color: colors.paragraph }}>
            Loading poll...
          </Text>
        </View>
      )}
    </SafeAreaContainer>
  );
}
