import { FC } from 'react';

interface ITeam {
  name: string;
}
const Team: FC<ITeam> = ({ name }) => {
  return (
    <div>
      <span>{name}</span>
    </div>
  );
};

export default Team;
