import { useState } from 'react';

const AwayTeam = () => {
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
          teamsConfig && `file://${teamsConfig && teamsConfig['Away']['image']}`
        }
        alt="Żubry Białystok"
        className="ml-4 team-logo"
      />
      <div className="mr-4">
        {teamsConfig && teamsConfig['Away']['name'].slice(0, 3).toUpperCase()}
      </div>
    </>
  );
};

export default AwayTeam;
