import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import path from 'path';
import fs from 'fs';

export type Channels = 'startup' | 'config' | 'saveConfig';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    removeListener(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.removeListener(channel, func as (...args: unknown[]) => void);
    },
  },
  writeErrorLog: async (content: string): Promise<void> => {
    try {
      const logDir = path.join(process.cwd(), 'logs');

      if (!fs.existsSync(logDir)) {
        await fs.promises.mkdir(logDir, { recursive: true });
      }

      const logPath = path.join(logDir, 'error.log');
      const timestamp = new Date().toISOString();
      const formattedContent = `\n[${timestamp}]\n${content}\n${'='.repeat(
        80
      )}\n`;

      await fs.promises.appendFile(logPath, formattedContent);
    } catch (err) {
      console.error('Failed to write to error log file:', err);
    }
  },
});
