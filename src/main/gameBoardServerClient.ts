/* eslint-disable @typescript-eslint/no-unused-vars */
import dgram from 'node:dgram';
import debounce from 'debounce';

import { IGameBoardCommandHandler } from './gameBoardCommandHandlers';

const SERVER_PORT = 2001;
export interface IGameBoardServerClient {
  bindListeners: () => void;
  init: () => void;
}

export default class GameBoardServerClient implements IGameBoardServerClient {
  private server: dgram.Socket = dgram.createSocket('udp4');

  private gameBoardCommandHandler: IGameBoardCommandHandler;

  private debounceHandleBufferMessage;

  constructor(gameBoardCommandHandler: IGameBoardCommandHandler) {
    this.gameBoardCommandHandler = gameBoardCommandHandler;
    this.debounceHandleBufferMessage = debounce(
      this.gameBoardCommandHandler.handleBufferMessage,
      500
    );
  }

  init(): void {
    this.bindListeners();
    this.server.bind(SERVER_PORT);
  }

  bindListeners(): void {
    this.server.on('error', (err) => {
      console.log('Connection to game board udp server not established!');
      console.log(`Server error:\n${err.stack}`);
      this.server.close();
    });
    this.server.on('message', (msg) => {
      this.debounceHandleBufferMessage(Buffer.from(msg));
    });
    this.server.on('listening', () => {
      const address = this.server.address();
      console.log('Connection to game board udp server live!');
      console.log(`Server listening ${address.address}:${address.port}`);
    });
  }
}