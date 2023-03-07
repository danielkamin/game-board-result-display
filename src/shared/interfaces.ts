import { BrowserWindow } from 'electron';
import { Buffer } from 'node:buffer';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Command {
  name: string;
  execute(mainWindow: BrowserWindow, buffer: Buffer): any;
}

export interface IconProps {
  customClasses?: string;
}
