import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

type TGamePart = '1' | '2' | '3' | '4';

const GamePart: FC = () => {
  const [part, setPart] = useState<TGamePart>('1');
  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.gamePartChannel,
    (arg) => {
      try {
        const gamePartData = arg as TGamePart;
        if (gamePartData !== part) setPart(gamePartData);
      } catch (err) {
        console.error(err);
      }
    }
  );
  return (
    <div className="w-11 flex justify-center text-3xl">
      <span>Q{part}</span>
    </div>
  );
};

export default GamePart;
