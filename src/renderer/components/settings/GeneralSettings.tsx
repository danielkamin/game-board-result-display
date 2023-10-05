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
> = ({ teamsNamesFontSize }, ref) => {
  const [teamsNamesFontSizeState, setTeamsNamesFontSize] =
    useState(teamsNamesFontSize);

  useImperativeHandle(ref, () => ({
    getGeneralSettings: () => ({
      teamsNamesFontSize: teamsNamesFontSizeState,
    }),
    setGeneralSettings: (generalData: GeneralSettingsProperties) => {
      setTeamsNamesFontSize(generalData.teamsNamesFontSize);
    },
  }));

  return (
    <div className="flex flex-col gap-2">
      <ConnectionStatus />
      <div>
        <span>Wielkość czcionki druzyn:</span>
        <Input
          value={teamsNamesFontSizeState}
          onChange={(e) => setTeamsNamesFontSize(e.target.valueAsNumber)}
          type="number"
        />
      </div>
    </div>
  );
};

export default forwardRef(GeneralSettings);
