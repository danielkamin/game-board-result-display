import { FC, useCallback, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';

const GameClockMinutes = () => {
  const [minutes, setMinutes] = useState('00');
  const handleGameClockMinutesUpdate = useCallback((arg: unknown) => {
    try {
      const minutesData = arg as string;
      if (minutesData !== minutes) setMinutes(minutesData);
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.gameClockMinutesChannel,
      handleGameClockMinutesUpdate
    );

    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(
          EGameBoardDisplayChannels.gameClockMinutesChannel,
          handleGameClockMinutesUpdate
        );
      }
    };
  }, [handleGameClockMinutesUpdate]);

  return <span className="mb-1">{minutes}</span>;
};
const GameClockSeconds = () => {
  const [seconds, setSeconds] = useState('00');
  const handleGameClockSecondsUpdate = useCallback((arg: unknown) => {
    try {
      const secondsData = arg as string;
      if (secondsData !== seconds)
        setSeconds(secondsData.length === 1 ? `0${secondsData}` : secondsData);
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;

    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.gameClockSecondsChannel,
      handleGameClockSecondsUpdate
    );
    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(
          EGameBoardDisplayChannels.gameClockSecondsChannel,
          handleGameClockSecondsUpdate
        );
      }
    };
  }, [handleGameClockSecondsUpdate]);
  return <span className="mb-1">{seconds}</span>;
};

const GameClock: FC = () => {
  return (
    <div className="text-4xl flex items-center justify-center flex-grow">
      <span
        className="text-gray-900 font-medium text-center bg-white radius rounded-3xl flex justify-center items-center gap-2"
        style={{ width: '150px', height: '50px' }}
      >
        <GameClockMinutes /> <span className="mb-1">:</span>{' '}
        <GameClockSeconds />
      </span>
    </div>
  );
};

export default GameClock;
