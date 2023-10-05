import { FC, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';

interface IPoints {
  channel: EGameBoardDisplayChannels;
}
const Points: FC<IPoints> = ({ channel }) => {
  const [points, setPoints] = useState('0');
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(channel, (arg) => {
      try {
        const pointsData = arg as string;
        if (pointsData !== points) setPoints(pointsData);
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  return (
    <div className="text-6xl font-medium flex items-center justify-center">
      <span className="text-center" style={{ width: '110px' }}>
        {points}
      </span>
    </div>
  );
};

export default Points;
