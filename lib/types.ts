export type Candidate = {
  id: string;
  name: string;
  party: string;
  votes: number;
  image: string;
  pollId: string;
  voters: string[];
};

export type Position = {
  id: string;
  position: string;
  candidates: Candidate[];
};
