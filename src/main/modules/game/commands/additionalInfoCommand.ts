/* eslint-disable class-methods-use-this */
import { BrowserWindow } from 'electron';
import { EGameBoardDisplayChannels } from '../../../../shared/enums';
import { Command } from '../../../../shared/interfaces';

export default class AdditionalInfoCommand implements Command {
  name = 'teamPoints';

  execute(mainWindow: BrowserWindow, buffer: Buffer) {
    if (buffer[3].toString() === '1' || buffer[3].toString() === '2') {
      mainWindow.webContents.send(
        EGameBoardDisplayChannels.awayTeamTimeoutsChannel,
        Math.max(0, 2 - +buffer[1].toString() / 2)
      );
      mainWindow.webContents.send(
        EGameBoardDisplayChannels.homeTeamTimeoutsChannel,
        Math.max(0, 2 - +buffer[2].toString() / 2)
      );
    } else if (buffer[3].toString() === '3' || buffer[3].toString() === '4') {
      mainWindow.webContents.send(
        EGameBoardDisplayChannels.awayTeamTimeoutsChannel,
        Math.max(0, 3 - +buffer[1].toString() / 2)
      );
      mainWindow.webContents.send(
        EGameBoardDisplayChannels.homeTeamTimeoutsChannel,
        Math.max(0, 3 - +buffer[2].toString() / 2)
      );
    } else {
      mainWindow.webContents.send(
        EGameBoardDisplayChannels.awayTeamTimeoutsChannel,
        Math.max(0, 1 - +buffer[1].toString() / 2)
      );
      mainWindow.webContents.send(
        EGameBoardDisplayChannels.homeTeamTimeoutsChannel,
        Math.max(0, 1 - +buffer[2].toString() / 2)
      );
    }

    mainWindow.webContents.send(
      EGameBoardDisplayChannels.gamePartChannel,
      buffer[3].toString()
    );
  }
}
