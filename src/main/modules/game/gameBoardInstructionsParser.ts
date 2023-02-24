import { BrowserWindow } from 'electron';
import { Buffer } from 'node:buffer';
import { Commands } from '../../../shared/enums';
import CommandManager from './commands/commandManager';
import ShotClockCommand from './commands/shotClockCommand';
import TeamPointsCommand from './commands/teamPointsCommand';
import UIEventHandler from './uiEventHandler';

// CMDSets	0F7H,247 - sety lub przewinienia drużyny
// Długość ramki: 4 bajty
// Struktura ramki: [0F7H, SETYA, SETYB, 008H]

const Instructions: Record<number, string> = {
  0xf0: Commands.EMPTY, // rozkaz pusty "nie rób nic"
  0xf1: Commands.DEVICE_STATE_CHANGE, // uruchomienie, wyłączenie, zmiana stanu urządzenia (np. syreny)
  0xf2: Commands.SET_REAL_TIME_CLOCK, // ustawienie zegara czasu rzeczywistego
  0xf3: Commands.DIAGNOSTIC_FUNCTIONS, // funkcje diagnostyczne
  0xf4: Commands.GAME_CLOCK, // zegar czasu gry
  0xf5: Commands.TIME_OUT_CLOCK, // zegar dodatkowy (Time Out)
  0xf6: Commands.SHOT_CLOCK, // zegar 24s
  0xf7: Commands.TEAMS_FOULS, // sety lub przewinienia drużyny
  0xf8: Commands.ADDITIONAL_INFO, // zagrywka, czasy trenera, sety lub przewinienia oraz część meczu
  0xf9: Commands.TEAM_POINTS, // punkty drużyny A i drużyny B
  0xfa: Commands.GAME_PARTS, // wyniki części meczu (setów, kwart)
  0xfb: Commands.VIOLATIONS_CLOCKS, // zegary kar - NIE UŻYWANE
  0xfc: Commands.PLAYER_GAME, // numer zawodnika, punkty, przewinienia
  0xfd: Commands.EMPTY1, // rezerwa
  0xfe: Commands.EMPTY2, // rezerwa
  0xff: Commands.EMPTY3, // rezerwa
};

export default class GameBoardInstructionsParser {
  private uiEventHandler: UIEventHandler;

  constructor(mainWindow: BrowserWindow) {
    const commandManager = new CommandManager();
    commandManager.registerCommand(
      Commands.TEAM_POINTS,
      new TeamPointsCommand()
    );
    commandManager.registerCommand(Commands.SHOT_CLOCK, new ShotClockCommand());
    commandManager.registerCommand(Commands.GAME_CLOCK, new ShotClockCommand());
    commandManager.registerCommand(
      Commands.ADDITIONAL_INFO,
      new ShotClockCommand()
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
