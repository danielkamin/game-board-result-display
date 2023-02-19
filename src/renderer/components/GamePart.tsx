import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const GamePart: FC = () => {
  const [part, setPart] = useState<string>('1');
  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.gamePartChannel,
    (arg) => {
      try {
        const gamePartData = arg as string;
        if (+gamePartData > 5) setPart('1');
        else if (gamePartData !== part) setPart(gamePartData);
      } catch (err) {
        console.error(err);
      }
    }
  );
  return (
    <div className="text-4xl flex items-center justify-center py-4">
      <span
        className="text-white text-center"
        style={{ width: '80px', height: '55px', lineHeight: '50px' }}
      >
        {part}Q
      </span>
    </div>
  );
};

export default GamePart;
