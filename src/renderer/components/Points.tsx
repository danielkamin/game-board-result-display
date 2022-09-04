import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

interface IPoints {
  channel: EGameBoardDisplayChannels;
}
const Points: FC<IPoints> = ({ channel }) => {
  const [points, setPoints] = useState('0');
  window.electron.ipcRenderer.on(channel, (arg) => {
    const pointsData = arg as string;
    if (pointsData !== points) setPoints(pointsData);
  });
  return <div className="text-4xl font-semibold">{points}</div>;
};

export default Points;
