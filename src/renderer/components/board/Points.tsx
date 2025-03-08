// Points.tsx
import { FC, useCallback, useEffect, useState } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';

interface IPoints {
  channel: EGameBoardDisplayChannels;
  onPointsChange: (newPoints: string, oldPoints: string) => void;
}

const Points: FC<IPoints> = ({ channel, onPointsChange }) => {
  const [points, setPoints] = useState('0');
  const handlePointsUpdate = useCallback((arg: unknown) => {
    try {
      const pointsData = arg as string;
      if (pointsData !== points && pointsData !== '207') {
        onPointsChange?.(pointsData, points);
        setPoints(pointsData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;

    window.electron.ipcRenderer.on(channel, handlePointsUpdate);
    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(channel, handlePointsUpdate);
      }
    };
  }, [channel, onPointsChange, handlePointsUpdate]);

  return (
    <div className="text-5xl font-medium flex items-center justify-center">
      <span className="text-center" style={{ width: '110px' }}>
        {points}
      </span>
    </div>
  );
};

export default Points;
