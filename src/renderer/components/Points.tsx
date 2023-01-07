import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

interface IPoints {
  channel: EGameBoardDisplayChannels;
}
const Points: FC<IPoints> = ({ channel }) => {
  const [points, setPoints] = useState('0');
  window.electron.ipcRenderer.on(channel, (arg) => {
    try {
      const pointsData = arg as string;
      if (pointsData !== points) setPoints(pointsData);
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div className="text-6xl font-medium flex items-center justify-center p-2">
      <span
        className="text-center"
        style={{ width: '100px', height: '90px', lineHeight: '85px' }}
      >
        {points}
      </span>
    </div>
  );
};

export default Points;
