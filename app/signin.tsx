import { colors } from "@/assets/styles";
import { typography } from "@/assets/styles/typography";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { auth } from "@/lib/firebase";
import { useNavigation, useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 16,
    width: "100%",
    borderColor: colors.border,
    borderWidth: 1,
    fontWeight: "500",
    color: colors.heading,
  },
  primaryButton: {
    backgroundColor: colors.heading,
    borderRadius: 64,
    color: colors.white,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onSignIn = async () => {
    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.replace("/welcome");
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setError(false);
  }, [email, password]);

  return (
    <>
      <SafeAreaContainer>
        <View
          style={{
            flex: 1,
            width: "100%",
            paddingTop: 64,
            gap: 64,
            padding: 8,
            paddingBottom: 64,
          }}
        >
          <Text style={typography.title}>Log in</Text>
          <View style={{ gap: 16 }}>
            <TextInput
              onChange={(text) => setEmail(text.nativeEvent.text)}
              value={email}
              inputMode="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              blurOnSubmit={Platform.OS === "ios" ? true : false}
              style={{
                ...styles.input,
                borderColor: emailError || error ? colors.error : colors.border,
                textTransform: "lowercase",
              }}
              placeholder="Email"
            />
            <TextInput
              onChange={(text) => setPassword(text.nativeEvent.text)}
              value={password}
              style={{
                ...styles.input,
                borderColor:
                  passwordError || error ? colors.error : colors.border,
              }}
              secureTextEntry
              placeholder="Password"
            />
            {error && (
              <Text style={{ color: colors.error }}>
                Invalid email or password
              </Text>
            )}
          </View>
        </View>
        <Pressable
          disabled={loading}
          onPress={onSignIn}
          style={{
            ...styles.primaryButton,
            backgroundColor: loading ? colors.mute : colors.heading,
          }}
        >
          <Text style={{ color: colors.white, fontWeight: "700" }}>
            {loading ? "Please wait..." : "Log in"}
          </Text>
        </Pressable>
      </SafeAreaContainer>
    </>
  );
}
