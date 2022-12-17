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
    <div
      className="border-r-4 border-l-4 text-6xl font-medium flex items-center justify-center p-2"
      style={{ backgroundColor: '#e6e6e6', borderColor: '#9a9a9a' }}
    >
      <span
        className="text-gray-900 text-center"
        style={{ width: '100px', height: '90px', lineHeight: '85px' }}
      >
        {points}
      </span>
    </div>
  );
};

export default Points;
