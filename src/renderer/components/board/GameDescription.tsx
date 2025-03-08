import { GeneralSettingsProperties } from '../../../shared/types';

const GameDescription = ({
  gameDescription,
}: Pick<GeneralSettingsProperties, 'gameDescription'>) => (
  <div
    className="text-white px-4 py-1  flex-1 text-center"
    style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
  >
    <span className="font-semibold block">{gameDescription.title}</span>
    <span className="text-sm block">{gameDescription.subTitle}</span>
  </div>
);

export default GameDescription;
