import { colors } from "@/assets/styles";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.heading,
    paddingRight: 36,
  },
  actionText: {
    fontSize: 20,
    color: colors.paragraph,
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
    color: colors.paragraph,
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 64,
    color: colors.white,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
  },
});

export default function Welcome() {
  return (
    <SafeAreaContainer>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-end",
          padding: 8,
          paddingBottom: 64,
        }}
      >
        <View>
          <Image
            source={require("@/assets/images/Union.png")}
            style={{
              width: 200,
              height: 70,
              marginBottom: 256,
            }}
          />
          <Text style={styles.title}>Ready to vote?</Text>
          <Text style={styles.actionText}>A few things to keep in mind</Text>
        </View>
        <View style={{ gap: 8, marginTop: 64 }}>
          <Text style={styles.text}>
            1. You can only vote for one candidate per poll
          </Text>
          <Text style={styles.text}>2. Your vote cannot be transferred</Text>
          <Text style={styles.text}>3. You can vote in any poll</Text>
        </View>

        <Link href="/vote" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 16 }}>
              Start Voting
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaContainer>
  );
}
