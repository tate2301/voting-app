import { colors } from "@/assets/styles";
import { Pressable, Text, View } from "react-native";

export default function Candidate() {
  return (
    <View
      style={{
        width: "100%",
        padding: 8,
        borderRadius: 16,
        backgroundColor: colors.interactive,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 256,
          backgroundColor: colors.white,
          borderRadius: 8,
        }}
      ></View>
      <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Tatenda Chinyamakobvu
        </Text>
        <Text>ZICOSU member</Text>

        <Pressable
          style={{
            marginTop: 16,
            borderRadius: 16,
            backgroundColor: colors.heading,
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.white, fontWeight: "700" }}>Vote</Text>
        </Pressable>
      </View>
    </View>
  );
}
