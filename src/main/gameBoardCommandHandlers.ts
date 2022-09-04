import { Buffer } from 'node:buffer';
import commands from './gameBoardCommands';
import { IGameBoardEventHandler } from './gameBoardEventHandler';

export interface IGameBoardCommandHandler {
  handleBufferMessage: (msgBuffer: Buffer) => void;
  displayMainClockHandler: (msgBuffer: Buffer) => void;
  displayScoreHandler: (msgBuffer: Buffer) => void;
  displayShotClockHandler: (msgBuffer: Buffer) => void;
  displayGamePartHandler: (msgBuffer: Buffer) => void;
}

export default class GameBoardCommandHandler
  implements IGameBoardCommandHandler
{
  private gameBoardEventHandler: IGameBoardEventHandler;

  constructor(gameBoardEventHandler: IGameBoardEventHandler) {
    this.gameBoardEventHandler = gameBoardEventHandler;
  }

  private commandHandlers = {
    [commands.gameClockData]: this.displayMainClockHandler,
    [commands.teamsPointsData]: this.displayScoreHandler,
    [commands.shotClockData]: this.displayShotClockHandler,
    [commands.gamePartsData]: this.displayGamePartHandler,
  };

  handleBufferMessage(msgBuffer: Buffer) {
    if (this.commandHandlers[msgBuffer[0]]) {
      this.commandHandlers[msgBuffer[0]](msgBuffer);
    }
  }

  displayGamePartHandler(msgBuffer: Buffer) {
    this.gameBoardEventHandler.sendGamePartData(msgBuffer[3].toString());
  }

  displayScoreHandler(msgBuffer: Buffer) {
    this.gameBoardEventHandler.sendHomeTeamScoreData(msgBuffer[1].toString());
    this.gameBoardEventHandler.sendAwayTeamScoreData(msgBuffer[2].toString());
  }

  displayShotClockHandler(msgBuffer: Buffer) {
    this.gameBoardEventHandler.sendShotClockData(msgBuffer[1].toString());
  }

  displayMainClockHandler(msgBuffer: Buffer) {
    this.gameBoardEventHandler.sendGameClockMinutes(msgBuffer[1].toString());
    this.gameBoardEventHandler.sendGameClockSeconds(msgBuffer[2].toString());
  }
}
