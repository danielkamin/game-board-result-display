import GameClock from './GameClock';
import GamePart from './GamePart';
import ShotClock from './ShotClock';

const GameClocks = () => {
  return (
    <div
      className="flex justify-center w-auto m-auto items-center h-full bg-black"
      id="main-clock"
    >
      <div className="flex gap-1 h-full items-center">
        <GamePart />
        <GameClock />
        <ShotClock />
      </div>
    </div>
  );
};

export default GameClocks;
