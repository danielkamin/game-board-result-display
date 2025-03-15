import { FC, useCallback, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { inRange } from '../../../shared/utils';

interface ITimeouts {
  channel: EGameBoardDisplayChannels;
}

const TeamTimeouts: FC<ITimeouts> = ({ channel }) => {
  const [timeouts, setTimeouts] = useState(2);
  const handleTimeoutUpdate = useCallback((arg: unknown) => {
    try {
      const timeoutData = arg as number;
      if (timeoutData !== timeouts && inRange(timeoutData, 0, 3)) {
        setTimeouts(timeoutData);
      } else {
        setTimeouts(0);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;

    window.electron.ipcRenderer.on(channel, handleTimeoutUpdate);

    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(
          channel,
          handleTimeoutUpdate
        );
      }
    };
  }, [channel, handleTimeoutUpdate]);

  return (
    <div className="text-white">
      <span>Czasy: {timeouts}</span>
    </div>
  );
};

export default TeamTimeouts;
