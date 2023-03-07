import { FC, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const GameClockMinutes = () => {
  const [minutes, setMinutes] = useState('00');
  useEffect(() => {
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

  return <span>{minutes}</span>;
};
const GameClockSeconds = () => {
  const [seconds, setSeconds] = useState('00');
  useEffect(() => {
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
  return <span>{seconds}</span>;
};

const GameClock: FC = () => {
  return (
    <div className="text-4xl flex items-center justify-center py-4 flex-grow">
      <span
        className="text-black text-center bg-white radius rounded-3xl"
        style={{ width: '150px', height: '55px', lineHeight: '50px' }}
      >
        <GameClockMinutes /> : <GameClockSeconds />
      </span>
    </div>
  );
};

export default GameClock;
