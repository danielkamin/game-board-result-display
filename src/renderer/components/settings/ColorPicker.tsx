/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useCallback, useRef, useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import useClickOutside from '../../hooks/useClickOutside';

interface ColorPickerProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}
const PopoverPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(popover, close);
  return (
    <div className="relative">
      <div
        className="w-12 h-12 rounded border-4 border-white shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: color }}
      />
      {isOpen && (
        <div
          className="absolute top-full left-0 rounded shadow-md"
          ref={popover}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <PopoverPicker color={color} onChange={onChange} />
      <HexColorInput
        color={color}
        onChange={onChange}
        className="block w-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 uppercase"
      />
    </div>
  );
};

export default ColorPicker;
