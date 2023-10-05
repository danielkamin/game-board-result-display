import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ns from './public/ns.png';

import GameBoard from './components/board/GameBoard';
import Settings from './components/settings/Settings';

const ScoreBoard = () => {
  return (
    <main className="flex-col flex h-full items-center justify-center w-full bg-gray-100">
      <div className="w-full flex justify-center items-center h-3/5">
        <Settings />
      </div>
      <div className="w-full border-b border-black" />
      <div className="w-full justify-center items-center flex h-2/5">
        <img src={ns} alt="" style={{ height: '80px' }} />
        <GameBoard />
      </div>
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
