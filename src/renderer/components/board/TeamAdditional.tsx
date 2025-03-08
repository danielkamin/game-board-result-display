import { FC } from 'react';
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
  return (
    <div
      className="block border-r border-white text-white"
      style={{ width: '315.5px', backgroundColor: 'rgba(0, 0, 0, 1)' }}
    >
      {showDescription ? (
        <div className=" px-4 py-1 h-full text-center">
          <span className="font-semibold block">{description.title}</span>
          <span className="text-sm block">{description.subTitle}</span>
        </div>
      ) : (
        <div
          id={`fouls-points-${teamType}`}
          className="flex justify-around items-center text-xl h-full"
        >
          <TeamFouls channel={foulsChannel} />
          <TeamTimeouts channel={timeoutsChannel} />
        </div>
      )}
    </div>
  );
};
export default TeamAdditional;
