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
    <div className="text-5xl font-semibold w-20 flex justify-center">
      <span>{points}</span>
    </div>
  );
};

export default Points;
