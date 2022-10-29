import debounce from 'debounce';
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

  debounceHandleBufferMessage;

  constructor(gameBoardEventHandler: GameBoardEventHandler) {
    this.gameBoardEventHandler = gameBoardEventHandler;

    this.debounceHandleBufferMessage = debounce(
      this.handleBufferMessage,
      10,
      true
    );
  }

  handleBufferMessage(msgBuffer: Buffer) {
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

  displayGamePartHandler(msgBuffer: Buffer) {
    try {
      this.gameBoardEventHandler.sendGamePartData(msgBuffer[3].toString());
    } catch (err) {
      console.error(err);
    }
  }

  displayScoreHandler(msgBuffer: Buffer) {
    try {
      this.gameBoardEventHandler.sendHomeTeamScoreData(msgBuffer[1].toString());
      this.gameBoardEventHandler.sendAwayTeamScoreData(msgBuffer[2].toString());
    } catch (err) {
      console.error(err);
    }
  }

  displayShotClockHandler(msgBuffer: Buffer) {
    try {
      this.gameBoardEventHandler.sendShotClockData(msgBuffer[1].toString());
    } catch (err) {
      console.error(err);
    }
  }

  displayMainClockHandler(msgBuffer: Buffer) {
    try {
      this.gameBoardEventHandler.sendGameClockMinutes(msgBuffer[1].toString());
      this.gameBoardEventHandler.sendGameClockSeconds(msgBuffer[2].toString());
    } catch (err) {
      console.error(err);
    }
  }
}
