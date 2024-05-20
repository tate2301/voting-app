import { colors } from "@/assets/styles";
import { typography } from "@/assets/styles/typography";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { auth } from "@/lib/firebase";
import { useNavigation, useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
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

export default function SignUp() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onSignUp = async () => {
    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      return;
    }

    if (!fullName || fullName.length < 3) {
      setFullNameError(true);
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.replace("/welcome");
      })
      .finally(() => setLoading(false));
  };

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
          }}
        >
          <Text style={typography.title}>Create an account</Text>
          <View style={{ gap: 16 }}>
            <TextInput
              placeholderTextColor={colors.mute}
              onChange={(text) => setFullName(text.nativeEvent.text)}
              value={fullName}
              style={{
                ...styles.input,
                borderColor: fullNameError ? colors.error : colors.border,
              }}
              placeholder="Full name"
            />
            <TextInput
              onChange={(text) => setEmail(text.nativeEvent.text)}
              value={email}
              inputMode="email"
              placeholderTextColor={colors.mute}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              blurOnSubmit={Platform.OS === "ios" ? true : false}
              style={{
                ...styles.input,
                borderColor: emailError ? colors.error : colors.border,
                textTransform: "lowercase",
              }}
              placeholder="Email"
            />
            <TextInput
              placeholderTextColor={colors.mute}
              onChange={(text) => setPassword(text.nativeEvent.text)}
              value={password}
              style={{
                ...styles.input,
                borderColor: passwordError ? colors.error : colors.border,
              }}
              secureTextEntry
              placeholder="Password"
            />
          </View>
        </View>
        <View style={{ marginBottom: 64, width: "100%", padding: 8 }}>
          <Pressable
            disabled={loading}
            onPress={onSignUp}
            style={{
              ...styles.primaryButton,
              backgroundColor: loading ? colors.mute : colors.heading,
            }}
          >
            <Text style={{ color: colors.white, fontWeight: "700" }}>
              {loading ? "Please wait..." : "Create account"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaContainer>
    </>
  );
}
