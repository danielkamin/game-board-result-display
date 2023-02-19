import { Buffer } from 'node:buffer';
import commands from './gameBoardCommands';
import RendererWindowEventHandler from './rendererWindowEventHandler';

export interface IGameBoardCommandHandler {
  handleBufferMessage: (msgBuffer: Buffer) => void;
  mainClockHandler: (msgBuffer: Buffer) => void;
  scoreHandler: (msgBuffer: Buffer) => void;
  shotClockHandler: (msgBuffer: Buffer) => void;
  gamePartHandler: (msgBuffer: Buffer) => void;
}

export default class GameBoardCommandHandler
  implements IGameBoardCommandHandler
{
  rendererWindowEventHandler: RendererWindowEventHandler;

  constructor(rendererWindowEventHandler: RendererWindowEventHandler) {
    this.rendererWindowEventHandler = rendererWindowEventHandler;
  }

  handleBufferMessage(msgBuffer: Buffer) {
    switch (msgBuffer[0]) {
      case commands.gameAdditionalInfoData:
        this.gamePartHandler(msgBuffer);
        break;
      case commands.gameClockData:
        this.mainClockHandler(msgBuffer);
        break;
      case commands.shotClockData:
        this.shotClockHandler(msgBuffer);
        break;
      case commands.teamsPointsData:
        this.scoreHandler(msgBuffer);
        break;
      default:
        break;
    }
  }

  gamePartHandler(msgBuffer: Buffer) {
    try {
      this.rendererWindowEventHandler.sendGamePartData(msgBuffer[3].toString());
    } catch (err) {
      console.error(err);
    }
  }

  scoreHandler(msgBuffer: Buffer) {
    try {
      this.rendererWindowEventHandler.sendHomeTeamScoreData(
        msgBuffer[1].toString()
      );
      this.rendererWindowEventHandler.sendAwayTeamScoreData(
        msgBuffer[2].toString()
      );
    } catch (err) {
      console.error(err);
    }
  }

  shotClockHandler(msgBuffer: Buffer) {
    try {
      this.rendererWindowEventHandler.sendShotClockData(
        msgBuffer[1].toString()
      );
    } catch (err) {
      console.error(err);
    }
  }

  mainClockHandler(msgBuffer: Buffer) {
    try {
      this.rendererWindowEventHandler.sendGameClockMinutes(
        msgBuffer[1].toString()
      );
      this.rendererWindowEventHandler.sendGameClockSeconds(
        msgBuffer[2].toString()
      );
    } catch (err) {
      console.error(err);
    }
  }
}
