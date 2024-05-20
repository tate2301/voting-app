import { colors } from "@/assets/styles";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { db } from "@/lib/firebase";
import { Candidate, Position } from "@/lib/types";
import { collection, getDocs, onSnapshot } from "firebase/firestore"; // Add 'unsubscribe' to the import statement
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const usePollsResults = () => {
  const [polls, setPolls] = useState<Position[]>([]);
  const [results, setResults] = useState<Map<string, Candidate[] | null>>(
    new Map()
  );

  useEffect(() => {
    const collectionRef = collection(db, "polls");
    getDocs(collectionRef).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPolls(data as Position[]);
    });
  }, []);

  useEffect(() => {
    const resultsCopy = results;

    polls.forEach(async (poll) => {
      const candidatesRef = collection(db, `polls/${poll.id}/candidates`);
      const unsubscribe = onSnapshot(candidatesRef, (snapshot) => {
        const candidates = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Candidate[];

        resultsCopy.set(poll.id, candidates);
        setResults(resultsCopy);
      });

      return () => unsubscribe();
    });
  }, [polls]);

  return { results, polls };
};

export default function ResultsPage() {
  const [key, setKey] = useState(0.0);
  const res = usePollsResults();

  const results = Array.from(res.results.entries()).map(([key, value]) => ({
    id: key,
    candidates: value,
  }));

  useEffect(() => {
    setTimeout(() => {
      setKey(Math.random());
    }, 1500);
  }, [res.polls, res.results, results]);

  console.log({ length: res.polls.length, results });

  return (
    <SafeAreaContainer>
      <ScrollView style={{ padding: 8, width: "100%", flex: 1 }}>
        <View style={{ paddingVertical: 64, flex: 1 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: "black",
              padding: 16,
            }}
          >
            Realtime election results
          </Text>
          <View style={{ gap: 32, marginTop: 32 }}>
            {results.map((result) => (
              <View
                key={result.id}
                style={{
                  padding: 16,
                  backgroundColor: colors.interactive,
                  borderRadius: 16,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "black",
                  }}
                >
                  {res.polls.find((poll) => poll.id === result.id)?.position}
                </Text>
                <Text style={{ color: colors.paragraph, marginTop: 4 }}>
                  {result.candidates?.length} candidates
                </Text>

                <View style={{ gap: 8, marginTop: 32 }}>
                  {result.candidates?.map((candidate) => {
                    const totalVotes =
                      result.candidates?.reduce(
                        (acc, curr) => acc + curr.votes,
                        0
                      ) ?? 0;
                    const candidatePercentage =
                      (candidate.votes / totalVotes) * 100;
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                          gap: 32,
                        }}
                        key={candidate.id}
                      >
                        <View
                          style={{
                            padding: 8,
                            flex: 1,
                          }}
                        >
                          <View
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 4,
                              backgroundColor: colors.heading,
                              width: `${(candidate.votes / totalVotes) * 100}%`,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "700",
                              color: colors.white,
                            }}
                          >
                            {candidate.name}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: colors.paragraph,
                              fontWeight: "700",
                            }}
                          >
                            {candidate.votes ?? 0} votes
                          </Text>
                          <Text>
                            {isNaN(candidatePercentage)
                              ? "0"
                              : candidatePercentage.toFixed(2)}
                            %
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}
