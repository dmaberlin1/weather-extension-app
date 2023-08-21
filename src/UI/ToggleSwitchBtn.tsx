import React, { ChangeEvent, FC, ReactNode } from "react";

interface IToggleBtn {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  disabled:boolean
}

const ToggleSwitchBtn: FC<IToggleBtn> = ({ checked, children, onChange ,disabled}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  return (
    <label className="relative inline-flex items-center mb-4 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        value="" className="sr-only peer" />
      <div
        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
      >
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</span>
    </label>
  );
};

export default ToggleSwitchBtn;
