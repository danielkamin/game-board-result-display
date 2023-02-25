/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

interface IFouls {
  channel: EGameBoardDisplayChannels;
}
const TeamFouls: FC<IFouls> = ({ channel }) => {
  const [fouls, setFouls] = useState('0');

  useEffect(() => {
    window.electron.ipcRenderer.on(channel, (arg) => {
      try {
        console.log(arg);
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  return <></>;
};

export default TeamFouls;
