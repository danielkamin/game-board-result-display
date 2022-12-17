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
      {/* <img
        src={
          teamsConfig && `file://${teamsConfig && teamsConfig['Away']['image']}`
        }
        alt="Żubry Białystok"
        className="ml-4 team-logo"
      /> */}
      <div
        className=" text-5xl font-medium flex items-center justify-center p-2"
        style={{ borderColor: '#9a9a9a' }}
      >
        <span
          className="text-white text-center"
          style={{ width: '120px', height: '70px', lineHeight: '65px' }}
        >
          {teamsConfig && teamsConfig['Away']['name'].slice(0, 3).toUpperCase()}
        </span>
      </div>
    </>
  );
};

export default AwayTeam;
