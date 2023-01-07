import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import GameClock from './components/GameClock';
import GamePart from './components/GamePart';
import ShotClock from './components/ShotClock';
import HomeTeam from './components/HomeTeam';
import AwayTeam from './components/AwayTeam';

const ScoreBoard = () => {
  return (
    <main className="bg-black h-full flex">
      <HomeTeam />
      <AwayTeam />
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
