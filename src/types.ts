export type TTrip = {
  destination: string;
  period: { from: Date; to: Date };
  confirmed: boolean;
};

export type TOwnerTrip = {
  name: string;
  email: string;
};

export type TParticipant = {
  id: string;
  name: string | null;
  email: string;
  confirmed: boolean;
};

export type TActivity = {
  id: string;
  title: string;
  occursAt: Date;
};

export type TActivityDay = {
  date: Date;
  activities: TActivity[];
};
