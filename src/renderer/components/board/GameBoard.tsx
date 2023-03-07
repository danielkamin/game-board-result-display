import useGlobalStore from '../../store/global';
import { EGameBoardDisplayChannels } from '../../../shared/enums';

import GameClock from './GameClock';
import GamePart from './GamePart';
import ShotClock from './ShotClock';
import Team from './Team';

const GameBoard = () => {
  const { homeTeam, awayTeam } = useGlobalStore();

  return (
    <section className="bg-black h-full flex score-board m-auto">
      <Team
        name={homeTeam.name}
        backgroundColor={homeTeam.backgroundColor}
        textColor={homeTeam.textColor}
        pointsChannel={EGameBoardDisplayChannels.homeTeamPointsChannel}
      />
      <Team
        name={awayTeam.name}
        backgroundColor={awayTeam.backgroundColor}
        textColor={awayTeam.textColor}
        pointsChannel={EGameBoardDisplayChannels.awayTeamPointsChannel}
      />
      <GamePart />
      <GameClock />
      <ShotClock />
    </section>
  );
};

export default GameBoard;
