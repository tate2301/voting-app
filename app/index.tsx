import { colors } from "@/assets/styles";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { auth } from "@/lib/firebase";
import { Link, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flex: 1,
    paddingTop: "50%",
    width: "100%",
    gap: 64,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
  },
  actionText: {
    fontSize: 16,
    color: colors.paragraph,
  },
  primaryButton: {
    backgroundColor: "#0090FF",
    borderRadius: 64,
    color: "#ffffff",
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 64,
    color: "#0090FF",
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Start() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/vote");
      }
    });
  }, []);

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <View style={{ gap: 8 }}>
          <Text style={{ ...styles.title, fontWeight: 700 }}>
            Vote for your favorite candidate.
          </Text>
          <Text style={styles.actionText}>
            The easiest and quickest way to vote for your favorite candidate in
            the Chinhoyi University of Technology annual SRC Elections.
          </Text>
        </View>
        <View
          style={{
            gap: 16,
            width: "100%",
          }}
        >
          <Link href="/signin" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={{ color: "#fff", fontWeight: 600 }}>
                Sign in to your account
              </Text>
            </Pressable>
          </Link>
          <Link href={"/signup"} asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={{ color: "#121212", fontWeight: 600 }}>
                Create new account
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaContainer>
  );
}
