import { useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';
import Points from './Points';

const HomeTeam = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [teamsConfig, setTeamsConfig] = useState<any>();

  window.electron.ipcRenderer.on('config', (arg) => {
    const appConfig = JSON.parse(arg as string);
    setTeamsConfig(appConfig);
  });

  const getTeamTextColor = () =>
    teamsConfig ? teamsConfig['Home']['textColor'] : '#FFFFFF';
  const getTeamBackgroundColor = () =>
    teamsConfig ? teamsConfig['Home']['backgroundColor'] : '#CE4D11';
  return (
    <>
      {/* <img
        src={
          teamsConfig && `file://${teamsConfig && teamsConfig['Home']['image']}`
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
          {teamsConfig && teamsConfig['Home']['name'].slice(0, 3).toUpperCase()}
        </span>
        <Points channel={EGameBoardDisplayChannels.homeTeamPointsChannel} />
      </div>
    </>
  );
};

export default HomeTeam;
