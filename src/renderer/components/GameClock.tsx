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
    <div
      className="text-5xl border-l-4 border-r-4 flex items-center justify-center p-4 flex-grow"
      style={{ borderColor: '#9a9a9a', backgroundColor: '#5B5B5B' }}
    >
      <span
        className="text-white text-center"
        style={{ width: '110px', height: '70px', lineHeight: '65px' }}
      >
        <span>{minutes}</span>:<span>{seconds}</span>
      </span>
    </div>
  );
};

export default GameClock;
