import { FC, useState, useEffect } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';
import { TeamProperties } from 'shared/types';
import TeamFouls from './TeamFouls';
import TeamTimeouts from './TeamTimeouts';

type TeamAdditionalProps = {
  foulsChannel: EGameBoardDisplayChannels;
  timeoutsChannel: EGameBoardDisplayChannels;
  teamType: 'home' | 'away';
  showDescription: boolean;
} & Pick<TeamProperties, 'description'>;

const TeamAdditional: FC<TeamAdditionalProps> = ({
  foulsChannel,
  teamType,
  timeoutsChannel,
  description,
  showDescription,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousShowDescription, setPreviousShowDescription] =
    useState(showDescription);

  useEffect(() => {
    if (showDescription !== previousShowDescription) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousShowDescription(showDescription);
      }, 500);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [showDescription, previousShowDescription]);

  return (
    <div
      className="block border-r border-white text-white relative overflow-hidden"
      style={{ width: '315.5px', backgroundColor: 'rgba(0, 0, 0, 1)' }}
    >
      {/* Kontener dla animacji przejścia */}
      <div className="transition-wrapper h-full">
        {/* Opis drużyny - zawsze obecny w DOM */}
        <div
          className={`px-4 py-1 h-full text-center absolute w-full ${
            showDescription ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <span className="font-semibold block">{description.title}</span>
          <span className="text-sm block">{description.subTitle}</span>
        </div>

        {/* Faule i czasy - zawsze obecne w DOM */}
        <div
          id={`fouls-points-${teamType}`}
          className={`flex justify-around items-center text-xl h-full absolute w-full ${
            showDescription ? 'opacity-0 z-0' : 'opacity-100 z-10'
          }`}
        >
          <TeamFouls channel={foulsChannel} />
          <TeamTimeouts channel={timeoutsChannel} />
        </div>

        {/* Animacja przejścia */}
        {isTransitioning && (
          <div
            className={`transition-overlay ${
              showDescription ? 'animate-in' : 'animate-out'
            }`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
          />
        )}
      </div>
    </div>
  );
};

export default TeamAdditional;
