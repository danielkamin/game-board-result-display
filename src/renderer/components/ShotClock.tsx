import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const ShotClock: FC = () => {
  const [seconds, setSeconds] = useState('1');

  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.additionalClockChannel,
    (arg) => {
      const secondsData = arg as string;
      if (secondsData !== seconds) setSeconds(secondsData);
    }
  );

  return (
    <div className="text-yellow-400 w-10 flex justify-center text-3xl">
      <span>{seconds}</span>
    </div>
  );
};

export default ShotClock;
