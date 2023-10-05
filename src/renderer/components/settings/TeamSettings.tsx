/* eslint-disable react/prop-types */
import {
  useState,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { TeamProperties } from '../../../shared/types';
import ColorPicker from './ColorPicker';
import Input from './Input';

type TeamSettingsHandle = {
  getTeamSettings: () => TeamProperties;
  setTeamSettings: (teamData: TeamProperties) => void;
};
const TeamSettings: ForwardRefRenderFunction<
  TeamSettingsHandle,
  TeamProperties
> = ({ textColor, backgroundColor, name }, ref) => {
  const [textColorState, setTextColor] = useState(textColor);
  const [backgroundColorState, setBackgroundColor] = useState(backgroundColor);
  const [nameState, setName] = useState(name);

  useImperativeHandle(ref, () => ({
    getTeamSettings: () => ({
      textColor: textColorState,
      backgroundColor: backgroundColorState,
      name: nameState,
    }),
    setTeamSettings: (teamData: TeamProperties) => {
      setTextColor(teamData.textColor);
      setBackgroundColor(teamData.backgroundColor);
      setName(teamData.name);
    },
  }));

  return (
    <div className="flex flex-col gap-2">
      <div>
        <span>Kolor tekstu:</span>
        <ColorPicker color={textColorState} onChange={setTextColor} />
      </div>
      <div>
        <span>Kolor tła:</span>
        <ColorPicker
          color={backgroundColorState}
          onChange={setBackgroundColor}
        />
      </div>
      <div>
        <span>Nazwa druzyny:</span>
        <Input value={nameState} onChange={(e) => setName(e.target.value)} />
      </div>
    </div>
  );
};

export default forwardRef(TeamSettings);
