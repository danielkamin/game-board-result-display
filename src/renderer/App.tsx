import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { EGameBoardDisplayChannels } from 'shared/enums';
import './App.css';
import GameClock from './components/GameClock';
import Points from './components/Points';
import HomeTeamLogo from '../../assets/scoreboard/home.png';
import Divider from './components/Divider';
import GamePart from './components/GamePart';
import ShotClock from './components/ShotClock';

const ScoreBoard = () => {
  // window.electron.ipcRenderer.on('ipc-test', (arg) => {
  //   console.log(arg);
  // });
  return (
    <main className="border border-white bg-black border-t-2 h-full">
      <section className="flex gap-5 p-4 text-white text-3xl ">
        <div className="flex items-center w-1/3">
          <img
            src={HomeTeamLogo}
            alt="Żubry Białystok"
            className="ml-4 team-logo"
          />
          <div className="mx-4">ZUB</div>
          <div className="mx-16">
            <Points channel={EGameBoardDisplayChannels.homeTeamPointsChannel} />
          </div>
          <Divider />
        </div>
        <div className="flex items-center w-1/3">
          <img
            src={HomeTeamLogo}
            alt="Żubry Białystok"
            className="ml-4 team-logo"
          />
          <div className="mx-4">ZUB</div>

          <div className="mx-16">
            <Points channel={EGameBoardDisplayChannels.awayTeamPointsChannel} />
          </div>
          <Divider />
        </div>
        <div className="flex w-1/3 justify-around items-center">
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
