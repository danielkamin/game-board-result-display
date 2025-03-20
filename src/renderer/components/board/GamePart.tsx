import { FC, useCallback, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { inRange } from '../../../shared/utils';

const GamePart: FC = () => {
  const [part, setPart] = useState<string>('1');
  const handleGamePartUpdate = useCallback((arg: unknown) => {
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
  }, []);
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.gamePartChannel,
      handleGamePartUpdate
    );
    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(
          EGameBoardDisplayChannels.gamePartChannel,
          handleGamePartUpdate
        );
      }
    };
  }, [handleGamePartUpdate]);

  return (
    <div className="text-5xl flex items-center justify-center">
      <span
        className="text-white text-center"
        style={{ width: '85px', height: '60px', lineHeight: '55px' }}
      >
        {part}Q
      </span>
    </div>
  );
};

export default GamePart;
