// components/CheckboxGroup.tsx

import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type CheckboxOption = {
  label: string;
  value: string;
};

type CheckboxGroupProps = {
  name: string; // The name of the form field (this is like "beak[]")
  options: CheckboxOption[]; // Array of checkbox options
  required?: boolean;
  style?: string;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, options, required = false, style = "" }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Make sure field.value is always an array
        const selectedValues = Array.isArray(field.value) ? field.value : [];

        return (
          <>
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  {...field}
                  type="checkbox"
                  value={option.value}
                  checked={selectedValues.includes(option.value)} // Check if value is in the array
                  onChange={(e) => {
                    if (e.target.checked) {
                      field.onChange([...selectedValues, option.value]); // Add value when checked
                    } else {
                      field.onChange(selectedValues.filter((val) => val !== option.value)); // Remove value when unchecked
                    }
                  }}
                  className={`${style} checkbox checkbox-success checkbox-sm`}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </>
        );
      }}
    />
  );
};

export default CheckboxGroup;
