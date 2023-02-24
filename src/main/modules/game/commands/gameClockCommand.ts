/* eslint-disable class-methods-use-this */
import { BrowserWindow } from 'electron';
import { EGameBoardDisplayChannels } from '../../../../shared/enums';
import { Command } from '../../../../shared/interfaces';

export default class GameClockCommand implements Command {
  name = 'teamPoints';

  execute(mainWindow: BrowserWindow, buffer: Buffer) {
    mainWindow.webContents.send(
      EGameBoardDisplayChannels.gameClockMinutesChannel,
      buffer[1].toString()
    );
    mainWindow.webContents.send(
      EGameBoardDisplayChannels.gameClockSecondsChannel,
      buffer[2].toString()
    );
  }
}
