import { Buffer } from 'node:buffer';
import { BrowserWindow } from 'electron';
import { Command } from '../../../shared/interfaces';

import CommandManager from './commands/commandManager';

export default class UIEventHandler {
  constructor(
    public mainWindow: BrowserWindow,
    public cmdManager: CommandManager
  ) {}

  handleAction(command: string | Command, arg: Buffer) {
    this.cmdManager.executeCommand(command, this.mainWindow, arg);
  }
}
