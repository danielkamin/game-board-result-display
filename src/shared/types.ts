type ObjectValues<T> = T[keyof T];

export type TeamProperties = {
  name: string;
  backgroundColor: string;
  textColor: string;
  imageUrl: string;
  description: SectionDescription;
};
export type GeneralSettingsProperties = {
  teamsNamesFontSize: number;
  gameDescription: SectionDescription;
};

export type ScoreBoardConfig = {
  awayTeam: TeamProperties;
  homeTeam: TeamProperties;
  general: GeneralSettingsProperties;
};

export type SectionDescription = {
  title: string;
  subTitle: string;
};

const NETWORK_STATUS = {
  CONNECTED: 'CONNECTED',
  WRONG_NETWORK: 'WRONG_NETWORK',
  NOT_CONNECTED: 'NOT_CONNECTED',
} as const;

export type NetworkStatus = ObjectValues<typeof NETWORK_STATUS>;
