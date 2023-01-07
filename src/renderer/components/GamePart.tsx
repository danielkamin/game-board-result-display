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
    <div className="text-5xl flex items-center justify-center py-4">
      <span
        className="text-white text-center"
        style={{ width: '80px', height: '70px', lineHeight: '65px' }}
      >
        {part}Q
      </span>
    </div>
  );
};

export default GamePart;
