type ObjectValues<T> = T[keyof T];

export type TeamProperties = {
  name: string;
  backgroundColor: string;
  textColor: string;
};
export type GeneralSettingsProperties = {
  teamsNamesFontSize: number;
};

export type ScoreBoardConfig = {
  awayTeam: TeamProperties;
  homeTeam: TeamProperties;
  general: GeneralSettingsProperties;
};

const NETWORK_STATUS = {
  CONNECTED: 'CONNECTED',
  WRONG_NETWORK: 'WRONG_NETWORK',
  NOT_CONNECTED: 'NOT_CONNECTED',
} as const;

export type NetworkStatus = ObjectValues<typeof NETWORK_STATUS>;
