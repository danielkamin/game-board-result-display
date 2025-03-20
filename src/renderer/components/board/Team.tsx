import { useState, useRef, useCallback, useEffect } from 'react';
import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { TeamProperties } from '../../../shared/types';
import Points from './Points';

type TTeamComponentProps = {
  pointsChannel: EGameBoardDisplayChannels;
  fontSize: number;
} & TeamProperties;

const Team = ({
  name,
  backgroundColor,
  textColor,
  imageUrl,
  pointsChannel,
  fontSize,
}: Omit<TTeamComponentProps, 'description'>) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const lastAnimationTimestamp = useRef<number>(0);
  const isAnimatingRef = useRef(isAnimating);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const handlePointsChange = useCallback(
    (newPoints: string, oldPoints: string) => {
      if (isAnimatingRef.current) return;

      const numericNewPoints = parseInt(newPoints, 10);
      const numericOldPoints = parseInt(oldPoints, 10);
      const currentTime = Date.now();

      if (
        currentTime - lastAnimationTimestamp.current > 3000 &&
        numericNewPoints > numericOldPoints
      ) {
        setIsAnimating(true);
        lastAnimationTimestamp.current = currentTime;

        setTimeout(() => {
          setIsAnimating(false);
        }, 1200);
      }
    },
    []
  );

  return (
    <div
      className="flex items-center justify-between relative overflow-hidden p-2 pl-4"
      style={{
        backgroundColor,
        color: textColor,
        width: '340px',
      }}
    >
      {imageUrl ? (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <div className="relative h-24 w-16 overflow-visible">
            <img
              src={`file://${imageUrl}`}
              alt="Logo"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-auto object-cover"
            />
          </div>
        </div>
      ) : null}
      <span
        className="text-center font-medium leading-none ml-20"
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {name.toUpperCase()}
      </span>
      <Points channel={pointsChannel} onPointsChange={handlePointsChange} />
      {isAnimating && (
        <div className="absolute inset-0 animate-score-change">
          <div
            className="animate-score-change-inner"
            style={{
              backgroundColor,
            }}
          >
            {imageUrl && (
              <div className="absolute w-full top-1/2 -translate-y-1/2">
                <div className="relative h-24 w-16 overflow-visible mx-auto">
                  <img
                    src={`file://${imageUrl}`}
                    alt="Logo"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
