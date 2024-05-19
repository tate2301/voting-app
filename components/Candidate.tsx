import { colors } from "@/assets/styles";
import { auth, db } from "@/lib/firebase";
import { Candidate as TCandidate } from "@/lib/types";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Image, Pressable, Text, View } from "react-native";

export default function Candidate(
  props: TCandidate & {
    hasVoted: boolean;
  }
) {
  const hasVotedForCandidate = props.voters?.includes(
    auth.currentUser?.email as string
  );

  const onVote = async () => {
    const candidateRef = doc(
      db,
      `polls/${props.pollId}/candidates/${props.id}`
    );
    const user = await auth.currentUser;

    const profilesCollectionRef = collection(db, "profiles");
    const profileRef = doc(profilesCollectionRef, user?.email as string);

    const profileDoc = await getDoc(profileRef);
    const profile = profileDoc.data();

    setDoc(
      candidateRef,
      {
        votes: (props.votes ?? 0) + 1,
        voters: [...(props.voters ?? []), user?.email as string],
      },
      { merge: true }
    );
    console.log("trying");
    if (!profileDoc.exists()) {
      setDoc(profileRef, {
        voted: [props.pollId],
        [props.pollId]: props.id,
      });
      return;
    }

    updateDoc(profileRef, {
      [props.pollId]: props.id,
    });
  };

  return (
    <View
      style={{
        width: "100%",
        padding: 8,
        borderRadius: 16,
        backgroundColor: colors.interactive,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 256,
          borderRadius: 8,
          objectFit: "cover",
        }}
        src={props.image}
      />
      <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{props.name}</Text>
        <Text>{props.party} member</Text>
        {hasVotedForCandidate && (
          <Text style={{ color: colors.primary, fontWeight: "700" }}>
            You have voted for this candidate
          </Text>
        )}

        {!props.hasVoted && (
          <Pressable
            disabled={props.hasVoted}
            onPress={onVote}
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
        )}
      </View>
    </View>
  );
}
