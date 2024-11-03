import React from "react";
import "./dropDownStyle.css";

interface Option {
  value: string;
  label: string;
}

interface DropDownProps {
  title: string;
  options?: Option[];
  onChange: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  title,
  options = [],
  onChange,
}) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="All">{title}</option>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default DropDown;
