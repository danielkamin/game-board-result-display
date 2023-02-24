/* eslint-disable class-methods-use-this */
import { BrowserWindow } from 'electron';
import { EGameBoardDisplayChannels } from '../../../../shared/enums';
import { Command } from '../../../../shared/interfaces';

export default class AdditionalInfoCommand implements Command {
  name = 'teamPoints';

  execute(mainWindow: BrowserWindow, buffer: Buffer) {
    mainWindow.webContents.send(
      EGameBoardDisplayChannels.gamePartChannel,
      buffer[3].toString()
    );
  }
}
