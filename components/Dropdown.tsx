import React from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps<T extends string> {
  label: string;
  options: DropdownOption[];
  selectedValue: T;
  onChange: (value: T) => void;
  id: string;
  disabled?: boolean;
}

const Dropdown = <T extends string,>({
  label,
  options,
  selectedValue,
  onChange,
  id,
  disabled = false,
}: DropdownProps<T>): React.JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        id={id}
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500 focus:border-purple-500'} transition duration-200`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
