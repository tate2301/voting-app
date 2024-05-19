import { colors } from "@/assets/styles";
import { typography } from "@/assets/styles/typography";
import { Position as TPosition } from "@/lib/types";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    gap: 64,
    backgroundColor: colors.interactive,
  },
  text: {
    fontSize: 16,
    color: colors.paragraph,
    fontWeight: "500",
  },
  heading2: {
    ...typography.heading2,
    color: colors.heading,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 32,
    backgroundColor: colors.heading,
    width: "auto",
    flexDirection: "row",
    gap: 4,
  },
});

export default function Position(props: TPosition) {
  const router = useRouter();

  const onNav = () =>
    router.push(`/poll/${props.id}?position=${props.position}`);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{props.candidates.length} candidates</Text>
        <Text style={styles.heading2}>{props.position}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={onNav} style={styles.button}>
          <Text style={{ fontWeight: "700", color: colors.white }}>
            Cast my vote
          </Text>
          <Feather name="chevron-right" size={16} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}
