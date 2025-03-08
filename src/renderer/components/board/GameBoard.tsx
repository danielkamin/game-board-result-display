import { useEffect, useState, useCallback } from 'react';
import useGlobalStore from '../../store/global';
import { EGameBoardDisplayChannels } from '../../../shared/enums';

import Team from './Team';
import GameClocks from './GameClocks';
import GameDescription from './GameDescription';
import TeamAdditional from './TeamAdditional';

const ANIMATION_DURATION = 500; // 500ms
const DESCRIPTION_DURATION = 30000; // 3s
const CYCLE_INTERVAL = 120000; // 12s

const GameBoard = () => {
  const { homeTeam, awayTeam, general } = useGlobalStore();
  const [showDescription, setShowDescription] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);

  const runTransition = useCallback(async (show: boolean) => {
    setIsTransitioning(true);
    setIsAnimatingIn(true);

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION));

    setShowDescription(show);

    setIsAnimatingIn(false);

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION));
    setIsTransitioning(false);
  }, []);

  useEffect(() => {
    let isActive = true;

    const toggleCycle = async () => {
      if (!isActive) return;

      await runTransition(true);
      if (!isActive) return;

      await new Promise((resolve) => setTimeout(resolve, DESCRIPTION_DURATION));
      if (!isActive) return;

      await runTransition(false);
    };

    toggleCycle();

    const intervalId = setInterval(toggleCycle, CYCLE_INTERVAL);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [runTransition]);

  return (
    <section className="h-full flex score-board my-auto flex-col">
      <div className="flex">
        <Team
          name={homeTeam.name}
          backgroundColor={homeTeam.backgroundColor}
          textColor={homeTeam.textColor}
          fontSize={general.teamsNamesFontSize}
          imageUrl={homeTeam.imageUrl}
          pointsChannel={EGameBoardDisplayChannels.homeTeamPointsChannel}
        />
        <Team
          name={awayTeam.name}
          backgroundColor={awayTeam.backgroundColor}
          textColor={awayTeam.textColor}
          fontSize={general.teamsNamesFontSize}
          imageUrl={awayTeam.imageUrl}
          pointsChannel={EGameBoardDisplayChannels.awayTeamPointsChannel}
        />
        <GameClocks />
      </div>
      <div className="flex transition-wrapper">
        <TeamAdditional
          teamType="home"
          foulsChannel={EGameBoardDisplayChannels.homeTeamFoulsChannel}
          timeoutsChannel={EGameBoardDisplayChannels.homeTeamTimeoutsChannel}
          description={homeTeam.description}
          showDescription={showDescription}
        />
        <TeamAdditional
          teamType="away"
          foulsChannel={EGameBoardDisplayChannels.awayTeamFoulsChannel}
          timeoutsChannel={EGameBoardDisplayChannels.awayTeamTimeoutsChannel}
          description={awayTeam.description}
          showDescription={showDescription}
        />
        <GameDescription gameDescription={general.gameDescription} />
        {isTransitioning && (
          <div
            className={`transition-overlay ${
              isAnimatingIn ? 'animate-in' : 'animate-out'
            }`}
          />
        )}
      </div>
    </section>
  );
};

export default GameBoard;
