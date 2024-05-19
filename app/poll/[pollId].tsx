import { colors } from "@/assets/styles";
import Candidate from "@/components/Candidate";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

export default function PollPage() {
  const { slug, candidates } = useLocalSearchParams();
  const { position } = useGlobalSearchParams();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `Vote ${position} polls`,
    });
  }, []);

  return (
    <SafeAreaContainer>
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
        </View>
        <View style={{ marginBottom: 64 }}>
          <Text style={{ fontWeight: "700", fontSize: 24, marginBottom: 16 }}>
            Candidates
          </Text>
          <View style={{ gap: 32 }}>
            <Candidate />
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}
