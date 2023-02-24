/* eslint-disable import/prefer-default-export */
export enum EGameBoardDisplayChannels {
  testChannel = 'test-channel',
  homeTeamPointsChannel = 'home-team-points',
  awayTeamPointsChannel = 'away-team-points',
  gameClockSecondsChannel = 'game-clock-seconds',
  gameClockMinutesChannel = 'game-clock-minutes',
  additionalClockChannel = 'additional-clock',
  gamePartChannel = 'game-part-clock',
  homeTeamFoulsChannel = 'home-team-fouls',
  awayTeamFoulsChannel = 'away-team-fouls',
}

export enum Commands {
  EMPTY = 'empty',
  DEVICE_STATE_CHANGE = 'deviceStateChange',
  SET_REAL_TIME_CLOCK = 'setRealTimeClock',
  DIAGNOSTIC_FUNCTIONS = 'diagnosticFunctions',
  GAME_CLOCK = 'gameClock',
  TIME_OUT_CLOCK = 'timeOutClock',
  SHOT_CLOCK = 'shotClock',
  TEAMS_FOULS = 'teamsFouls',
  ADDITIONAL_INFO = 'additionalInfo',
  TEAM_POINTS = 'teamPoints',
  GAME_PARTS = 'gameParts',
  VIOLATIONS_CLOCKS = 'violationsClocks',
  PLAYER_GAME = 'playerGame',
  EMPTY1 = 'empty1',
  EMPTY2 = 'empty2',
  EMPTY3 = 'empty3',
}
