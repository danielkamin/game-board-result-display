/* eslint-disable no-await-in-loop */

import { BrowserWindow } from 'electron';
import { EGameBoardDisplayChannels } from '../shared/enums';

export interface IGameBoardEventHandler {
  init: () => void;
  sendHomeTeamScoreData: (points: string) => void;
  sendAwayTeamScoreData: (points: string) => void;
  sendGameClockData: (minutes: string, seconds: string) => void;
}

export default class GameBoardEventHandler implements IGameBoardEventHandler {
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  sendHomeTeamScoreData(points = '0'): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.homeTeamPointsChannel,
      points
    );
  }

  sendAwayTeamScoreData(points = '0'): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.awayTeamPointsChannel,
      points
    );
  }

  sendGameClockData(minutes = '00', seconds = '00'): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.gameClockDataChannel,
      `${minutes}:${seconds}`
    );
  }

  init(): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.testChannel,
      'GameBoardEventHandler is live!'
    );
  }
}
