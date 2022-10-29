import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const ShotClock: FC = () => {
  const [seconds, setSeconds] = useState('1');

  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.additionalClockChannel,
    (arg) => {
      try {
        const secondsData = arg as string;
        if (secondsData !== seconds) setSeconds(secondsData);
      } catch (err) {
        console.error(err);
      }
    }
  );

  return (
    <div className="text-yellow-400 w-10 flex justify-center text-3xl">
      <span>{seconds}</span>
    </div>
  );
};

export default ShotClock;
