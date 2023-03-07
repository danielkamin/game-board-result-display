/* eslint global-require: off, no-console: off, promise/always-return: off */
import path from 'path';
import { readFileSync, writeFile } from 'fs';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { EGameBoardDisplayChannels } from '../shared/enums';
import { NetworkStatus } from '../shared/types';

import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import {
  GameBoardUDPClient,
  GameBoardInstructionsParser,
} from './modules/game/index';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import network from './modules/network';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'error';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const gotTheLock = app.requestSingleInstanceLock();

ipcMain.on('startup', async (event) => {
  try {
    const parsedData = await network.getCurrentConnections;
    const config = readFileSync(getAssetPath('scoreboard', 'config.json'), {
      encoding: 'utf8',
    }).toString();

    if (
      parsedData &&
      typeof parsedData === 'object' &&
      'length' in parsedData
    ) {
      const connections = parsedData as any[];
      const validNetwork = connections.find((c) => c.ssid === 'W38M12');
      let networkStatus: NetworkStatus = 'NOT_CONNECTED';

      if (validNetwork) networkStatus = 'CONNECTED';
      else if (!validNetwork && connections.length > 0) {
        networkStatus = 'WRONG_NETWORK';
      }
      event.reply('config', { networkStatus, config });
    }
  } catch (err) {
    console.log(err);
  }
});

ipcMain.on('saveConfig', (_, args) => {
  writeFile(
    getAssetPath('scoreboard', 'config.json'),
    JSON.stringify(args[0]),
    'utf8',
    (err) => {
      if (err) console.error(err);
      console.log('New settings saved!');
    }
  );
});
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1400,
    height: 600,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  const gameBoardInstructionsParser = new GameBoardInstructionsParser(
    mainWindow
  );
  const gameBoardUDPClient = GameBoardUDPClient.getInstance(
    gameBoardInstructionsParser
  );
  gameBoardUDPClient.init();

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      mainWindow?.show();
    }, 30000);
  }

  // eslint-disable-next-line
  new AppUpdater();
};

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
