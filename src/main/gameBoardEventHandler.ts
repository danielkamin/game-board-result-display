/* eslint-disable no-await-in-loop */

import { BrowserWindow } from 'electron';
import { EGameBoardDisplayChannels } from '../shared/enums';

export interface IGameBoardEventHandler {
  sendHomeTeamScoreData: (points: string) => void;
  sendAwayTeamScoreData: (points: string) => void;
  sendGameClockMinutes: (minutes: string) => void;
  sendGameClockSeconds: (seconds: string) => void;
  sendShotClockData: (seconds: string) => void;
  sendGamePartData: (gamePart: string) => void;
}

export default class GameBoardEventHandler implements IGameBoardEventHandler {
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  sendShotClockData(seconds = '24'): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.additionalClockChannel,
      seconds
    );
  }

  sendGamePartData(gamePart = '0'): void {
    console.log(gamePart);
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

  sendGameClockMinutes(minutes = '0'): void {
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.gameClockMinutesChannel,
      `${minutes}`
    );
  }

  sendGameClockSeconds(seconds = '0'): void {
    const sec = seconds.length === 1 ? `0${seconds}` : seconds;
    this.mainWindow.webContents.send(
      EGameBoardDisplayChannels.gameClockSecondsChannel,
      sec
    );
  }
}