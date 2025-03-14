/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useCallback, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { inRange } from '../../../shared/utils';

interface IFouls {
  channel: EGameBoardDisplayChannels;
}
const TeamFouls: FC<IFouls> = ({ channel }) => {
  const [fouls, setFouls] = useState(0);
  const handleTeamFoulsUpdate = useCallback((arg: unknown) => {
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
  }, []);
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;
    window.electron.ipcRenderer.on(channel, handleTeamFoulsUpdate);
    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(
          channel,
          handleTeamFoulsUpdate
        );
      }
    };
  }, [handleTeamFoulsUpdate]);

  return (
    <div className="text-white">
      <span>Faule: {fouls}</span>
    </div>
  );
};

export default TeamFouls;
