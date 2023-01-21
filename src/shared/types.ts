export type TTeamProps = {
  name: string;
  backgroundColor: string;
  textColor: string;
};

export type TAppConfig = {
  away: TTeamProps;
  home: TTeamProps;
};
