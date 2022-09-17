import { useState } from 'react';

const HomeTeam = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [teamsConfig, setTeamsConfig] = useState<any>();

  window.electron.ipcRenderer.on('config', (arg) => {
    const appConfig = JSON.parse(arg as string);
    setTeamsConfig(appConfig);
  });
  return (
    <>
      <img
        src={
          teamsConfig && `file://${teamsConfig && teamsConfig['Home']['image']}`
        }
        alt="Żubry Białystok"
        className="ml-4 team-logo"
      />
      <div className="mr-4">
        {teamsConfig && teamsConfig['Home']['name'].slice(0, 3).toUpperCase()}
      </div>
    </>
  );
};

export default HomeTeam;
