import { FC } from 'react';

interface InputProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}
const Input: FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      className="block px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
  );
};
export default Input;
