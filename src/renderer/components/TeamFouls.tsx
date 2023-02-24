import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

interface IFouls {
  channel: EGameBoardDisplayChannels;
}
const TeamFouls: FC<IFouls> = ({ channel }) => {
  const [fouls, setFouls] = useState('0');
  const inRange = (number: number, start: number, end: number): boolean => {
    if (number >= start && number <= end) return true;
    return false;
  };
  window.electron.ipcRenderer.on(channel, (arg) => {
    try {
      console.log(arg);
    } catch (err) {
      console.error(err);
    }
  });

  return <></>;
};

export default TeamFouls;
