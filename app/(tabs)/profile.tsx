import { colors } from "@/assets/styles";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Pressable, Text, View } from "react-native";

export default function ProfilePage() {
  const user = auth.currentUser;
  const router = useRouter();

  const onLogout = () => {
    signOut(auth);
    router.navigate("/");
  };

  return (
    <SafeAreaContainer>
      <View style={{ paddingVertical: 64, flex: 1, padding: 8, width: "100%" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "black",
            padding: 16,
          }}
        >
          Profile
        </Text>

        <View style={{ gap: 32, marginTop: 32 }}>
          <View
            style={{
              padding: 16,
              backgroundColor: "#0090FF",
              borderRadius: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "white",
              }}
            >
              Your email
            </Text>
            <Text style={{ color: "white", marginTop: 4 }}>{user?.email}</Text>
          </View>
          <Pressable
            onPress={onLogout}
            style={{
              backgroundColor: colors.error,
              padding: 16,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 64,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: colors.white,
              }}
            >
              Sign out
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaContainer>
  );
}
