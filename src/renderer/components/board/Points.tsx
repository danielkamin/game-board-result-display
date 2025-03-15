// Points.tsx
import { FC, useCallback, useEffect, useState, useRef } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';

interface IPoints {
  channel: EGameBoardDisplayChannels;
  onPointsChange: (newPoints: string, oldPoints: string) => void;
}

const Points: FC<IPoints> = ({ channel, onPointsChange }) => {
  const [points, setPoints] = useState('0');
  const previousPointsRef = useRef(points);

  const handlePointsUpdate = useCallback(
    (arg: unknown) => {
      try {
        const pointsData = arg as string;
        if (pointsData !== previousPointsRef.current && pointsData !== '207') {
          onPointsChange?.(pointsData, previousPointsRef.current);
          previousPointsRef.current = pointsData;
          setPoints(pointsData);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [onPointsChange]
  ); // Usunięto points z zależności, używamy ref

  useEffect(() => {
    if (!window.electron?.ipcRenderer) return;

    window.electron.ipcRenderer.on(channel, handlePointsUpdate);

    // eslint-disable-next-line consistent-return
    return () => {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.removeListener(channel, handlePointsUpdate);
      }
    };
  }, [channel, handlePointsUpdate]);

  return (
    <div className="text-5xl font-medium flex items-center justify-center">
      <span className="text-center" style={{ width: '110px' }}>
        {points}
      </span>
    </div>
  );
};

export default Points;
