import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const GameClock: FC = () => {
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.gameClockSecondsChannel,
    (arg) => {
      try {
        const secondsData = arg as string;
        if (secondsData !== seconds) setSeconds(secondsData);
      } catch (err) {
        console.error(err);
      }
    }
  );

  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.gameClockMinutesChannel,
    (arg) => {
      try {
        const minutesData = arg as string;
        if (minutesData !== seconds) setMinutes(minutesData);
      } catch (err) {
        console.error(err);
      }
    }
  );

  return (
    <div className="w-24 flex justify-center text-3xl">
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};

export default GameClock;
