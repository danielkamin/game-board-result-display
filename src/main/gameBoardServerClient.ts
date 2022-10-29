/* eslint-disable @typescript-eslint/no-unused-vars */
import dgram from 'node:dgram';

import GameBoardCommandHandler, {
  IGameBoardCommandHandler,
} from './gameBoardCommandHandlers';

const SERVER_PORT = 2001;
export interface IGameBoardServerClient {
  bindListeners: () => void;
  init: () => void;
}

export default class GameBoardServerClient implements IGameBoardServerClient {
  private server: dgram.Socket = dgram.createSocket('udp4');

  private gameBoardCommandHandler: GameBoardCommandHandler;

  constructor(gameBoardCommandHandler: GameBoardCommandHandler) {
    this.gameBoardCommandHandler = gameBoardCommandHandler;
    this.init();
  }

  init(): void {
    this.bindListeners();
    this.server.bind(2001);
  }

  bindListeners(): void {
    this.server.on('error', (err) => {
      console.log('Connection to game board udp server not established!');
      console.log(`Server error:\n${err.stack}`);
      this.server.close();
    });
    this.server.on('message', (msg) => {
      this.gameBoardCommandHandler.debounceHandleBufferMessage(
        Buffer.from(msg)
      );
    });
    this.server.on('listening', () => {
      const address = this.server.address();
      console.log('Connection to game board udp server live!');
      console.log(`Server listening ${address.address}:${address.port}`);
    });
  }
}
