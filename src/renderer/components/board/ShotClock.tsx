import { FC, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { inRange } from '../../../shared/utils';

const ShotClock: FC = () => {
  const [seconds, setSeconds] = useState('1');

  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.additionalClockChannel,
      (arg) => {
        try {
          const secondsData = arg as string;
          if (secondsData !== seconds) {
            if (inRange(+secondsData, 0, 24)) {
              setSeconds(secondsData);
            } else setSeconds('--');
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
        className="text-white text-center overflow-hidden"
        style={{ width: '60px', height: '55px', lineHeight: '50px' }}
      >
        {seconds}
      </span>
    </div>
  );
};

export default ShotClock;
