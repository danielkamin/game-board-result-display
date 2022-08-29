import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const GameClock: FC = () => {
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.gameClockSecondsChannel,
    (arg) => {
      const secondsData = arg as string;
      if (secondsData !== seconds) setSeconds(secondsData);
    }
  );

  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.gameClockMinutesChannel,
    (arg) => {
      const minutesData = arg as string;
      if (minutesData !== seconds) setMinutes(minutesData);
    }
  );

  return (
    <div>
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};

export default GameClock;
