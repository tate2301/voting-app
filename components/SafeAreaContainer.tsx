import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeAreaContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: "#fff",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flex: 1,
          width: "100%",
        }}
      >
        {children}
      </KeyboardAvoidingView>
    </View>
  );
}
