/* eslint-disable react/prop-types */
import { GeneralSettingsProperties } from 'shared/types';
import {
  useState,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react';

import ConnectionStatus from './ConnectionsStatus';
import Input from './Input';

type GeneralSettingsHandle = {
  getGeneralSettings: () => GeneralSettingsProperties;
  setGeneralSettings: (generalData: GeneralSettingsProperties) => void;
};
const GeneralSettings: ForwardRefRenderFunction<
  GeneralSettingsHandle,
  GeneralSettingsProperties
> = ({ teamsNamesFontSize, gameDescription }, ref) => {
  const [teamsNamesFontSizeState, setTeamsNamesFontSize] =
    useState(teamsNamesFontSize);
  const [gameDescriptionState, setGameDescription] = useState(gameDescription);
  useImperativeHandle(ref, () => ({
    getGeneralSettings: () => ({
      teamsNamesFontSize: teamsNamesFontSizeState,
      gameDescription: gameDescriptionState,
    }),
    setGeneralSettings: (generalData: GeneralSettingsProperties) => {
      setTeamsNamesFontSize(generalData.teamsNamesFontSize);
      setGameDescription(generalData.gameDescription);
    },
  }));

  return (
    <div className="flex gap-2">
      <ConnectionStatus />
      <div>
        <span>Wielkość czcionki druzyn:</span>
        <Input
          value={teamsNamesFontSizeState}
          onChange={(e) => setTeamsNamesFontSize(e.target.valueAsNumber)}
          type="number"
        />
      </div>
      <div>
        <span>Opis meczu:</span>
        <div className="flex gap-2">
          <Input
            value={gameDescriptionState.title}
            placeholder="Tytuł opisu"
            onChange={(e) =>
              setGameDescription({
                title: e.target.value,
                subTitle: gameDescriptionState.subTitle,
              })
            }
          />
          <Input
            value={gameDescriptionState.subTitle}
            placeholder="Sub-tytuł opisu"
            onChange={(e) =>
              setGameDescription({
                subTitle: e.target.value,
                title: gameDescriptionState.title,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(GeneralSettings);
