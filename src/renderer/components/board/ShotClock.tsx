import { FC, useCallback, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { inRange } from '../../../shared/utils';

const ShotClock: FC = () => {
  const [seconds, setSeconds] = useState('1');
  const handleShotClockUpdate = useCallback((arg: unknown) => {
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
  }, []);
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.additionalClockChannel,
      handleShotClockUpdate
    );
    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(
          EGameBoardDisplayChannels.additionalClockChannel,
          handleShotClockUpdate
        );
      }
    };
  }, [handleShotClockUpdate]);

  return (
    <div className="text-5xl flex items-center justify-center">
      <span
        className="text-white text-center overflow-hidden"
        style={{ width: '66px', height: '55px', lineHeight: '50px' }}
      >
        {seconds}
      </span>
    </div>
  );
};

export default ShotClock;
