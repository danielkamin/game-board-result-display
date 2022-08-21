/* eslint-disable @typescript-eslint/no-unused-vars */
import dgram from 'node:dgram';
import { IGameBoardEventHandler } from './gameBoardEventHandler';

const SERVER_PORT = 2001;
const SERVER_ADDRESS = '192.168.1.255';
export interface IGameBoardServerClient {
  bindListeners: () => void;
  init: () => void;
  // formatBufferMessage: (msg: Buffer) => void;
}

export default class GameBoardServerClient implements IGameBoardServerClient {
  private server: dgram.Socket = dgram.createSocket('udp4');

  private gameBoardEventHandler: IGameBoardEventHandler;

  constructor(gameBoardEventHandler: IGameBoardEventHandler) {
    this.gameBoardEventHandler = gameBoardEventHandler;
  }

  init(): void {
    this.server.bind(SERVER_PORT, SERVER_ADDRESS);
    this.bindListeners();
  }

  bindListeners(): void {
    this.server.on('error', (err) => {
      console.log('Connection to game board udp server not established!');
      console.log(`Server error:\n${err.stack}`);
      this.server.close();
    });
    this.server.on('listening', () => {
      const address = this.server.address();
      console.log('Connection to game board udp server live!');
      console.log(`Server listening ${address.address}:${address.port}`);
    });
    this.server.on('message', (msg, rinfo) => {
      console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
      // this.formatBufferMessage(msg);
    });
  }

  // formatBufferMessage(msg: Buffer): void {
  //   console.log(msg.toString());
  // }
}

const availableGameBoardCommands = {
  empty: 0xf0, // rozkaz pusty "nie rób nic"
  deviceStateChange: 0xf1, // uruchomienie, wyłączenie, zmiana stanu urządzenia (np. syreny)
  setRealTimeClockData: 0xf2, // ustawienie zegara czasu rzeczywistego
  diagnosticFunctions: 0xf3, // funkcje diagnostyczne
  gameClockData: 0xf4, // zegar czasu gry
  timeOutClockData: 0xf5, // zegar dodatkowy (Time Out)
  shotClockData: 0xf6, // zegar 24s
  teamsFoulsData: 0xf7, // sety lub przewinienia drużyny
  gameAdditionalInfoData: 0xf8, // zagrywka, czasy trenera, sety lub przewinienia oraz część meczu
  teamsPointsData: 0xf9, // punkty drużyny A i drużyny B
  gamePartsPointsData: 0xfa, // wyniki części meczu (setów, kwart)
  violationsClocksData: 0xfb, // zegary kar - NIE UŻYWANE
  playerGameData: 0xfc, // numer zawodnika, punkty, przewinienia
  empty1: 0xfd, // rezerwa
  empty2: 0xfe, // rezerwa
  empty3: 0xff, // rezerwa
};
