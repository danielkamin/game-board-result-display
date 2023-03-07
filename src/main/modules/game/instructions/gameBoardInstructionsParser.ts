import { BrowserWindow } from 'electron';
import { Buffer } from 'node:buffer';

import { Commands } from '../../../../shared/enums';
import AdditionalInfoCommand from '../commands/additionalInfoCommand';
import CommandManager from '../commands/commandManager';
import GameClockCommand from '../commands/gameClockCommand';
import ShotClockCommand from '../commands/shotClockCommand';
import TeamFoulsCommand from '../commands/teamFoulsCommand';
import TeamPointsCommand from '../commands/teamPointsCommand';
import UIEventHandler from '../handlers/uiEventHandler';
import Instructions from './boardInstructions';

export default class GameBoardInstructionsParser {
  private uiEventHandler: UIEventHandler;

  constructor(mainWindow: BrowserWindow) {
    const commandManager = new CommandManager();
    commandManager.registerCommand(
      Commands.TEAM_POINTS,
      new TeamPointsCommand()
    );
    commandManager.registerCommand(Commands.SHOT_CLOCK, new ShotClockCommand());
    commandManager.registerCommand(Commands.GAME_CLOCK, new GameClockCommand());
    commandManager.registerCommand(
      Commands.ADDITIONAL_INFO,
      new AdditionalInfoCommand()
    );
    commandManager.registerCommand(
      Commands.TEAMS_FOULS,
      new TeamFoulsCommand()
    );
    this.uiEventHandler = new UIEventHandler(mainWindow, commandManager);
  }

  parseBufferMessage(msgBuffer: Buffer) {
    try {
      this.uiEventHandler.handleAction(Instructions[msgBuffer[0]], msgBuffer);
    } catch (err) {
      console.log(err);
    }
  }
}
