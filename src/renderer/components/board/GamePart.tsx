import { FC, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { inRange } from '../../../shared/utils';

const GamePart: FC = () => {
  const [part, setPart] = useState<string>('1');
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.gamePartChannel,
      (arg) => {
        try {
          const gamePartData = arg as string;
          if (gamePartData !== part) {
            if (inRange(+gamePartData, 1, 4)) {
              setPart(gamePartData);
            } else {
              setPart('1');
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    );
  }, []);

  return (
    <div className="text-4xl flex items-center justify-center">
      <span
        className="text-white text-center"
        style={{ width: '70px', height: '55px', lineHeight: '50px' }}
      >
        {part}Q
      </span>
    </div>
  );
};

export default GamePart;
