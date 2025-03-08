import dgram from 'node:dgram';
import GameBoardInstructionsParser from '../instructions/gameBoardInstructionsParser';

export default class GameBoardUDPClient {
  private server: dgram.Socket = dgram.createSocket('udp4');

  static connectionsStatus: boolean = false;

  private gameBoardInstructionsParser: GameBoardInstructionsParser;

  private static _gameBoardUDPClientInstance: GameBoardUDPClient;

  private constructor(
    gameBoardInstructionsParser: GameBoardInstructionsParser
  ) {
    this.gameBoardInstructionsParser = gameBoardInstructionsParser;
  }

  static getInstance(gameBoardInstructionsParser: GameBoardInstructionsParser) {
    if (!GameBoardUDPClient._gameBoardUDPClientInstance) {
      GameBoardUDPClient._gameBoardUDPClientInstance = new GameBoardUDPClient(
        gameBoardInstructionsParser
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
      try {
        this.gameBoardInstructionsParser.parseBufferMessage(Buffer.from(msg));
      } catch (err) {
        console.error(err);
      }
    });
    this.server.on('listening', () => {
      const address = this.server.address();
      console.log('Connection to game board udp server live!');
      console.log(`Server listening ${address.address}:${address.port}`);
    });
  }
}
