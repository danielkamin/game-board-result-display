import { useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';
import Points from './Points';

const AwayTeam = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [teamsConfig, setTeamsConfig] = useState<any>();

  window.electron.ipcRenderer.on('config', (arg) => {
    const appConfig = JSON.parse(arg as string);
    setTeamsConfig(appConfig);
  });
  const getTeamTextColor = () =>
    teamsConfig ? teamsConfig['Away']['textColor'] : '#18181b';
  const getTeamBackgroundColor = () =>
    teamsConfig ? teamsConfig['Away']['backgroundColor'] : '#FFFFFF';
  return (
    <>
      {/* <img
        src={
          teamsConfig && `file://${teamsConfig && teamsConfig['Away']['image']}`
        }
        alt="Żubry Białystok"
        className="ml-4 team-logo"
      /> */}
      <div
        className="text-5xl flex items-center justify-center p-2"
        style={{
          backgroundColor: getTeamBackgroundColor(),
          color: getTeamTextColor(),
        }}
      >
        <span
          className="text-center font-medium"
          style={{
            width: '120px',
            height: '70px',
            lineHeight: '65px',
          }}
        >
          {teamsConfig && teamsConfig['Away']['name'].slice(0, 3).toUpperCase()}
        </span>
        <Points channel={EGameBoardDisplayChannels.awayTeamPointsChannel} />
      </div>
    </>
  );
};

export default AwayTeam;
