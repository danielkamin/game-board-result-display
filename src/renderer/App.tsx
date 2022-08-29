import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { EGameBoardDisplayChannels } from 'shared/enums';
import './App.css';
import GameClock from './components/GameClock';
import Points from './components/Points';

const ScoreBoard = () => {
  // window.electron.ipcRenderer.on('ipc-test', (arg) => {
  //   console.log(arg);
  // });
  return (
    <main className="border border-white bg-black">
      <Points channel={EGameBoardDisplayChannels.homeTeamPointsChannel} />
      <Points channel={EGameBoardDisplayChannels.awayTeamPointsChannel} />
      <GameClock />
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
