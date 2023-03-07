import { Buffer } from 'node:buffer';
import { BrowserWindow } from 'electron';
import { Command } from '../../../../shared/interfaces';

export default class CommandManager {
  commands: Record<string, Command> = {};

  registerCommand(name: string, command: Command) {
    this.commands[name] = command;
  }

  executeCommand(
    command: string | Command,
    mainWindow: BrowserWindow,
    buffer: Buffer
  ) {
    if (typeof command === 'string') {
      if (this.commands[command]) {
        this.commands[command].execute(mainWindow, buffer);
      }
    } else {
      command.execute(mainWindow, buffer);
    }
  }
}
