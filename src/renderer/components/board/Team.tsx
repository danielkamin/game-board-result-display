import { EGameBoardDisplayChannels } from 'shared/enums';
import { TeamProperties } from 'shared/types';
import Points from './Points';

type TTeamComponentProps = {
  pointsChannel: EGameBoardDisplayChannels;
} & TeamProperties;

const Team = ({
  name,
  backgroundColor,
  textColor,
  pointsChannel,
}: TTeamComponentProps) => {
  return (
    <>
      <div
        className="text-2xl flex items-center justify-center p-2"
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        <span
          className="text-center font-medium"
          style={{
            width: '140px',
            maxHeight: '70px',
          }}
        >
          {name.toUpperCase()}
        </span>
        <Points channel={pointsChannel} />
      </div>
    </>
  );
};

export default Team;
