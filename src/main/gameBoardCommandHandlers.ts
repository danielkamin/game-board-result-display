import { Buffer } from 'node:buffer';
import commands from './gameBoardCommands';
import GameBoardEventHandler from './gameBoardEventHandler';

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
  gameBoardEventHandler: GameBoardEventHandler;

  constructor(gameBoardEventHandler: GameBoardEventHandler) {
    this.gameBoardEventHandler = gameBoardEventHandler;
  }

  handleBufferMessage(msgBuffer: Buffer) {
    if (msgBuffer[0]) {
      switch (msgBuffer[0]) {
        case commands.gameAdditionalInfoData:
          this.displayGamePartHandler(msgBuffer);
          break;
        case commands.gameClockData:
          this.displayMainClockHandler(msgBuffer);
          break;

        case commands.shotClockData:
          this.displayShotClockHandler(msgBuffer);
          break;
        case commands.teamsPointsData:
          this.displayScoreHandler(msgBuffer);
          break;

        default:
          break;
      }
    }
  }

  displayGamePartHandler(msgBuffer: Buffer) {
    console.log(msgBuffer);
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
