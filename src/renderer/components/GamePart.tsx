import { FC, useState } from 'react';
import { EGameBoardDisplayChannels } from 'shared/enums';

type TGamePart = '1' | '2' | '3' | '4';

const GamePart: FC<TGamePart> = () => {
  const [part, setPart] = useState<TGamePart>('1');
  window.electron.ipcRenderer.on(
    EGameBoardDisplayChannels.gamePartChannel,
    (arg) => {
      const gamePartData = arg as TGamePart;
      if (gamePartData !== part) setPart(gamePartData);
    }
  );
  return <div>{part}</div>;
};

export default GamePart;
