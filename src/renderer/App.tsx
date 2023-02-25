import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { EGameBoardDisplayChannels } from 'shared/enums';
import { TAppConfig } from 'shared/types';

import './App.css';
import GameClock from './components/board/GameClock';
import GamePart from './components/board/GamePart';
import ShotClock from './components/board/ShotClock';
import Team from './components/board/Team';

const ScoreBoard = () => {
  const [teamsConfig, setTeamsConfig] = useState<TAppConfig>();
  const [loading, setLoading] = useState(true);

  window.electron.ipcRenderer.on('config', (arg) => {
    const appConfig = JSON.parse(arg as string);
    setTeamsConfig(appConfig);
    setLoading(false);
  });

  if (loading) {
    return <main className="bg-black h-full flex text-white">Ładowanie</main>;
  }
  if (!teamsConfig) {
    return (
      <main className="bg-black h-full flex text-white">
        Problem z ustawieniami!
      </main>
    );
  }
  return (
    <main className="bg-black h-full flex">
      <Team
        name={teamsConfig.home.name}
        backgroundColor={teamsConfig.home.backgroundColor}
        textColor={teamsConfig.home.textColor}
        pointsChannel={EGameBoardDisplayChannels.homeTeamPointsChannel}
      />
      <Team
        name={teamsConfig.away.name}
        backgroundColor={teamsConfig.away.backgroundColor}
        textColor={teamsConfig.away.textColor}
        pointsChannel={EGameBoardDisplayChannels.awayTeamPointsChannel}
      />
      <GamePart />
      <GameClock />
      <ShotClock />
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
