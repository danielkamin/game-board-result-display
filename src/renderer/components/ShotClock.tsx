import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const ShotClock: FC = () => {
  const [seconds, setSeconds] = useState('24');

  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.additionalClockChannel,
    (arg) => {
      const secondsData = arg as string;
      if (secondsData !== seconds) setSeconds(secondsData);
    }
  );

  return <div className="text-yellow-400">{seconds}</div>;
};

export default ShotClock;
