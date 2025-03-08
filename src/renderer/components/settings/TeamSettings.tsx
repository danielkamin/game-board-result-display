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
import ImageUpload from './ImageUpload';

type TeamSettingsHandle = {
  getTeamSettings: () => TeamProperties;
  setTeamSettings: (teamData: TeamProperties) => void;
};
const TeamSettings: ForwardRefRenderFunction<
  TeamSettingsHandle,
  TeamProperties
> = ({ textColor, backgroundColor, name, imageUrl, description }, ref) => {
  const [textColorState, setTextColor] = useState(textColor);
  const [backgroundColorState, setBackgroundColor] = useState(backgroundColor);
  const [nameState, setName] = useState(name);
  const [descriptionState, setDescription] = useState(description);
  const [image, setImage] = useState<string>(imageUrl);

  useImperativeHandle(ref, () => ({
    getTeamSettings: () => ({
      textColor: textColorState,
      backgroundColor: backgroundColorState,
      name: nameState,
      imageUrl: image,
      description: descriptionState,
    }),
    setTeamSettings: (teamData: TeamProperties) => {
      setTextColor(teamData.textColor);
      setBackgroundColor(teamData.backgroundColor);
      setName(teamData.name);
      setImage(teamData.imageUrl);
      setDescription(teamData.description);
    },
  }));

  return (
    <div className="flex gap-2">
      <div>
        <span>Logo druzyny:</span>
        <ImageUpload teamName={nameState} setImage={setImage} image={image} />
      </div>
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
      <div>
        <span>Opis druzyny:</span>
        <Input
          value={descriptionState.title}
          placeholder="Tytuł opisu"
          onChange={(e) =>
            setDescription({
              title: e.target.value,
              subTitle: descriptionState.subTitle,
            })
          }
        />
        <Input
          value={descriptionState.subTitle}
          placeholder="Pod-tytuł opisu"
          onChange={(e) =>
            setDescription({
              subTitle: e.target.value,
              title: descriptionState.title,
            })
          }
        />
      </div>
    </div>
  );
};

export default forwardRef(TeamSettings);
