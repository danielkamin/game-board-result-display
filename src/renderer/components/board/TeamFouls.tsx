/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { inRange } from '../../../shared/utils';

interface IFouls {
  channel: EGameBoardDisplayChannels;
}
const TeamFouls: FC<IFouls> = ({ channel }) => {
  const [fouls, setFouls] = useState(0);

  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(channel, (arg) => {
      try {
        const foulData = arg as string;
        if (+foulData !== fouls && inRange(+foulData, 0, 5)) {
          setFouls(+foulData);
        } else {
          setFouls(0);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  return (
    <div className="absolute -bottom-2 w-full left-0 right-0 flex bg-white">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={`${i}foul`}
          className={`h-2 border border-gray-300 flex-1
          ${i + 1 <= fouls && 'bg-red-500'}`}
        />
      ))}
    </div>
  );
};

export default TeamFouls;
