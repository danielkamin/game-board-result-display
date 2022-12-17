import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { EGameBoardDisplayChannels } from 'shared/enums';

import './App.css';
import GameClock from './components/GameClock';
import Points from './components/Points';
import Divider from './components/Divider';
import GamePart from './components/GamePart';
import ShotClock from './components/ShotClock';
import HomeTeam from './components/HomeTeam';
import AwayTeam from './components/AwayTeam';

const ScoreBoard = () => {
  return (
    <main
      className="bg-black h-full border-4 flex"
      style={{ borderColor: '#9a9a9a' }}
    >
      <HomeTeam />
      <Points channel={EGameBoardDisplayChannels.homeTeamPointsChannel} />
      <AwayTeam />
      <Points channel={EGameBoardDisplayChannels.awayTeamPointsChannel} />
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
