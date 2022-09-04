const commands = {
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
  gamePartsData: 0xfa, // wyniki części meczu (setów, kwart)
  violationsClocksData: 0xfb, // zegary kar - NIE UŻYWANE
  playerGameData: 0xfc, // numer zawodnika, punkty, przewinienia
  empty1: 0xfd, // rezerwa
  empty2: 0xfe, // rezerwa
  empty3: 0xff, // rezerwa
};

export default commands;
