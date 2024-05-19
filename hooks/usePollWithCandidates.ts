import { db } from "@/lib/firebase";
import { Candidate, Position } from "@/lib/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const usePollWithCandidates = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const getCandidates = async (positionId: string): Promise<Candidate[]> => {
    const candidatesRef = collection(db, `polls/${positionId}/candidates`);
    const candidatesSnapshot = await getDocs(candidatesRef);
    const candidatesData = candidatesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          pollId: positionId,
        } as Candidate)
    );
    return candidatesData;
  };

  useEffect(() => {
    const positionsRef = collection(db, "polls");
    const unsubscribe = onSnapshot(positionsRef, async (snapshot) => {
      const positionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const positionsWithCandidates = await Promise.all(
        positionsData.map(async (position) => {
          const candidates = await getCandidates(position.id);
          return { ...position, candidates };
        })
      );

      setPositions(positionsWithCandidates as Position[]);
    });

    return () => unsubscribe();
  }, []);

  return positions;
};

export const usePollWithCandidatesByPollId = (pollId: string) => {
  const [position, setPosition] = useState<Position | null>(null);

  const getCandidates = async (positionId: string): Promise<Candidate[]> => {
    const candidatesRef = collection(db, `polls/${positionId}/candidates`);
    const candidatesSnapshot = await getDocs(candidatesRef);
    const candidatesData = candidatesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          pollId: positionId,
        } as Candidate)
    );
    return candidatesData;
  };

  useEffect(() => {
    const positionsRef = doc(db, `polls/${pollId}`);
    const unsubscribe = onSnapshot(positionsRef, async (snapshot) => {
      const positionsData = {
        id: pollId,
        ...snapshot.data(),
      } as {
        id: string;
        position: string;
      };

      const candidates = await getCandidates(snapshot.id);
      const positionWithCandidate: Position = { ...positionsData, candidates };
      setPosition(positionWithCandidate as Position);
    });

    return () => unsubscribe();
  }, []);

  return position;
};
