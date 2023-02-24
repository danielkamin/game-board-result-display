/* eslint-disable class-methods-use-this */
import { BrowserWindow } from 'electron';
import { EGameBoardDisplayChannels } from '../../../../shared/enums';
import { Command } from '../../../../shared/interfaces';

export default class TeamFoulsCommand implements Command {
  name = 'teamPoints';

  execute(mainWindow: BrowserWindow, buffer: Buffer) {
    mainWindow.webContents.send(
      EGameBoardDisplayChannels.homeTeamFoulsChannel,
      buffer[1].toString()
    );
    mainWindow.webContents.send(
      EGameBoardDisplayChannels.awayTeamFoulsChannel,
      buffer[2].toString()
    );
  }
}
