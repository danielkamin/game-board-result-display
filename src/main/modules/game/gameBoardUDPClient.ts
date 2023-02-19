import dgram from 'node:dgram';

import GameBoardCommandHandler from './gameBoardCommandHandler';

export default class GameBoardUDPClient {
  private server: dgram.Socket = dgram.createSocket('udp4');

  static connectionsStatus: boolean = false;

  private gameBoardCommandHandler: GameBoardCommandHandler;

  private static _gameBoardUDPClientInstance: GameBoardUDPClient;

  private constructor(gameBoardCommandHandler: GameBoardCommandHandler) {
    this.gameBoardCommandHandler = gameBoardCommandHandler;
  }

  static getInstance(gameBoardCommandHandler: GameBoardCommandHandler) {
    if (!GameBoardUDPClient._gameBoardUDPClientInstance) {
      GameBoardUDPClient._gameBoardUDPClientInstance = new GameBoardUDPClient(
        gameBoardCommandHandler
      );
    }
    return this._gameBoardUDPClientInstance;
  }

  init(): void {
    this.bindListeners();
    this.server.bind(2001);
  }

  bindListeners() {
    this.server.on('error', (err) => {
      console.log('Connection to game board udp server not established!');
      console.log(`Server error:\n${err.stack}`);
      this.server.close();
    });
    this.server.on('message', (msg) => {
      this.gameBoardCommandHandler.handleBufferMessage(Buffer.from(msg));
    });
    this.server.on('listening', () => {
      const address = this.server.address();
      console.log('Connection to game board udp server live!');
      console.log(`Server listening ${address.address}:${address.port}`);
    });
  }
}
