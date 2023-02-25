import { FC, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const ShotClock: FC = () => {
  const [seconds, setSeconds] = useState('1');
  const inRange = (number: number, start: number, end: number): boolean => {
    if (number >= start && number <= end) return true;
    return false;
  };
  useEffect(() => {
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
    <div className="text-4xl flex items-center justify-center py-2">
      <span
        className="text-white text-center overflow-hidden"
        style={{ width: '70px', height: '55px', lineHeight: '50px' }}
      >
        {seconds}
      </span>
    </div>
  );
};

export default ShotClock;
