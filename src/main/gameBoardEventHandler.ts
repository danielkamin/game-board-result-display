/* eslint-disable no-await-in-loop */

import { BrowserWindow } from 'electron';
import { EGameBoardDisplayChannels } from '../shared/enums';

export interface IGameBoardEventHandler {
  init: () => void;
  sendHomeTeamScoreData: (points: string) => void;
  sendAwayTeamScoreData: (points: string) => void;
  sendGameClockMinutes: (minutes: string) => void;
  sendGameClockSeconds: (seconds: string) => void;
  sendAdditionalGameClockData: (seconds: string) => void;
  sendGamePartData: (gamePart: string) => void;
}

export default class GameBoardEventHandler implements IGameBoardEventHandler {
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  sendAdditionalGameClockData(seconds = '24'): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.additionalClockChannel,
      seconds
    );
  }

  sendGamePartData(gamePart: string): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.gamePartChannel,
      gamePart
    );
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

  sendGameClockMinutes(minutes = '00'): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.gameClockMinutesChannel,
      `${minutes}`
    );
  }

  sendGameClockSeconds(seconds = '00'): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.gameClockMinutesChannel,
      `${seconds}`
    );
  }

  init(): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.testChannel,
      'GameBoardEventHandler is live!'
    );
  }
}
