/* eslint-disable react/require-default-props */
import { FC } from 'react';

interface IDivider {
  height?: '100%' | '50%';
}
const Divider: FC<IDivider> = ({ height = '100%' }) => {
  return <div className="border-r " style={{ height }} />;
};

export default Divider;
