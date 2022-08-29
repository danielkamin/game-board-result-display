import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

const AdditionalClock: FC = () => {
  const [seconds, setSeconds] = useState('24');

  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.additionalClockChannel,
    (arg) => {
      const secondsData = arg as string;
      if (secondsData !== seconds) setSeconds(secondsData);
    }
  );

  return <div>{seconds}</div>;
};

export default AdditionalClock;
