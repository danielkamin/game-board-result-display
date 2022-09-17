import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { EGameBoardDisplayChannels } from 'shared/enums';
import { useState } from 'react';

import { TAppConfig } from 'shared/types';
import './App.css';
import GameClock from './components/GameClock';
import Points from './components/Points';
import Divider from './components/Divider';
import GamePart from './components/GamePart';
import ShotClock from './components/ShotClock';
import HomeTeam from './components/HomeTeam';
import AwayTeam from './components/AwayTeam';

const ScoreBoard = () => {
  const [teamsConfig, setTeamsConfig] = useState<any>();
  window.electron.ipcRenderer.on('config', (arg) => {
    const appConfig = JSON.parse(arg as string) as TAppConfig;
    setTeamsConfig(appConfig);
  });

  return (
    <main className="bg-black h-full">
      <section className="flex py-2 text-white text-5xl">
        <div className="flex items-center justify-around w-2/5">
          <HomeTeam />
          <div className="mx-2">
            <Points channel={EGameBoardDisplayChannels.homeTeamPointsChannel} />
          </div>
          <Divider />
        </div>
        <div className="flex items-center justify-around w-2/5">
          <div className="mx-2">
            <Points channel={EGameBoardDisplayChannels.awayTeamPointsChannel} />
          </div>
          <AwayTeam />
          <Divider />
        </div>
        <div className="flex w-1/4 justify-around items-center">
          <GamePart />
          <Divider height="50%" />
          <GameClock />
          <Divider height="50%" />
          <ShotClock />
        </div>
      </section>
    </main>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScoreBoard />} />
      </Routes>
    </Router>
  );
}
