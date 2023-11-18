import { EGameBoardDisplayChannels } from '../../../shared/enums';
import { TeamProperties } from '../../../shared/types';
import Points from './Points';
import TeamFouls from './TeamFouls';

type TTeamComponentProps = {
  pointsChannel: EGameBoardDisplayChannels;
  foulsChannel: EGameBoardDisplayChannels;
  fontSize: number;
} & TeamProperties;

const Team = ({
  name,
  backgroundColor,
  textColor,
  pointsChannel,
  fontSize,
  foulsChannel,
}: TTeamComponentProps) => {
  return (
    <>
      <div
        className="text-2xl flex items-center justify-between p-2 pl-4 relative"
        style={{
          backgroundColor,
          color: textColor,
          width: '315px',
        }}
      >
        <span
          className="text-center font-medium leading-none"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          {name.toUpperCase()}
        </span>
        <Points channel={pointsChannel} />
        <TeamFouls channel={foulsChannel} />
      </div>
    </>
  );
};

export default Team;
