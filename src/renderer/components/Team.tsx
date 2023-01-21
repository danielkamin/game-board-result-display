import { EGameBoardDisplayChannels } from 'shared/enums';
import { TTeamProps } from 'shared/types';
import Points from './Points';

type TTeamComponentProps = {
  pointsChannel: EGameBoardDisplayChannels;
} & TTeamProps;

const Team = ({
  name,
  backgroundColor,
  textColor,
  pointsChannel,
}: TTeamComponentProps) => {
  return (
    <>
      <div
        className="text-5xl flex items-center justify-center p-2"
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        <span
          className="text-center font-medium"
          style={{
            width: '120px',
            height: '70px',
            lineHeight: '65px',
          }}
        >
          {name.slice(0, 3).toUpperCase()}
        </span>
        <Points channel={pointsChannel} />
      </div>
    </>
  );
};

export default Team;
