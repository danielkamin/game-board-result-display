import useGlobalStore from '../../store/global';
import { EGameBoardDisplayChannels } from '../../../shared/enums';

import GameClock from './GameClock';
import GamePart from './GamePart';
import ShotClock from './ShotClock';
import Team from './Team';

const GameBoard = () => {
  const { homeTeam, awayTeam, general } = useGlobalStore();

  return (
    <section className="bg-gray-900 h-full flex score-board my-auto">
      <Team
        name={homeTeam.name}
        backgroundColor={homeTeam.backgroundColor}
        textColor={homeTeam.textColor}
        fontSize={general.teamsNamesFontSize}
        pointsChannel={EGameBoardDisplayChannels.homeTeamPointsChannel}
      />
      <Team
        name={awayTeam.name}
        backgroundColor={awayTeam.backgroundColor}
        textColor={awayTeam.textColor}
        fontSize={general.teamsNamesFontSize}
        pointsChannel={EGameBoardDisplayChannels.awayTeamPointsChannel}
      />
      <div className="flex justify-center gap-1 w-auto m-auto">
        <GamePart />
        <GameClock />
        <ShotClock />
      </div>
    </section>
  );
};

export default GameBoard;
