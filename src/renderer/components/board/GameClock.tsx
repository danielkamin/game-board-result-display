import { FC, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';

const GameClockMinutes = () => {
  const [minutes, setMinutes] = useState('00');
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.gameClockMinutesChannel,
      (arg) => {
        try {
          const minutesData = arg as string;
          if (minutesData !== minutes) setMinutes(minutesData);
        } catch (err) {
          console.error(err);
        }
      }
    );
  }, []);

  return <span className="mb-1">{minutes}</span>;
};
const GameClockSeconds = () => {
  const [seconds, setSeconds] = useState('00');
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(
      EGameBoardDisplayChannels.gameClockSecondsChannel,
      (arg) => {
        try {
          const secondsData = arg as string;
          if (secondsData !== seconds)
            setSeconds(
              secondsData.length === 1 ? `0${secondsData}` : secondsData
            );
        } catch (err) {
          console.error(err);
        }
      }
    );
  }, []);
  return <span className="mb-1">{seconds}</span>;
};

const GameClock: FC = () => {
  return (
    <div className="text-4xl flex items-center justify-center flex-grow">
      <span
        className="text-black text-center bg-white radius rounded-3xl flex justify-center items-center gap-2"
        style={{ width: '150px', height: '50px' }}
      >
        <GameClockMinutes /> <span className="mb-1">:</span>{' '}
        <GameClockSeconds />
      </span>
    </div>
  );
};

export default GameClock;
