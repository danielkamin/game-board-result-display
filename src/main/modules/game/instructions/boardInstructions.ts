import { Commands } from '../../../../shared/enums';

const Instructions: Record<number, string> = {
  0xf0: Commands.EMPTY, // rozkaz pusty "nie rób nic"
  0xf1: Commands.DEVICE_STATE_CHANGE, // uruchomienie, wyłączenie, zmiana stanu urządzenia (np. syreny)
  0xf2: Commands.SET_REAL_TIME_CLOCK, // ustawienie zegara czasu rzeczywistego
  0xf3: Commands.DIAGNOSTIC_FUNCTIONS, // funkcje diagnostyczne
  0xf4: Commands.GAME_CLOCK, // zegar czasu gry
  0xf5: Commands.TIME_OUT_CLOCK, // zegar dodatkowy (Time Out)
  0xf6: Commands.SHOT_CLOCK, // zegar 24s
  0xf7: Commands.TEAMS_FOULS, // sety lub przewinienia drużyny
  0xf8: Commands.ADDITIONAL_INFO, // zagrywka, czasy trenera, sety lub przewinienia oraz część meczu
  0xf9: Commands.TEAM_POINTS, // punkty drużyny A i drużyny B
  0xfa: Commands.GAME_PARTS, // wyniki części meczu (setów, kwart)
  0xfb: Commands.VIOLATIONS_CLOCKS, // zegary kar - NIE UŻYWANE
  0xfc: Commands.PLAYER_GAME, // numer zawodnika, punkty, przewinienia
  0xfd: Commands.EMPTY1, // rezerwa
  0xfe: Commands.EMPTY2, // rezerwa
  0xff: Commands.EMPTY3, // rezerwa
};
export default Instructions;
