import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type CheckboxOption = {
  label: string;
  value: string;
};

type CheckboxGroupProps = {
  name: string; // The name of the form field (this is like "beak[]")
  options: CheckboxOption[]; // Array of checkbox options
  style?: string;
};

const CheckBoxDataShow: React.FC<CheckboxGroupProps> = ({ name, options, style = "" }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Make sure field.value is always an array
        const selectedValues = Array.isArray(field.value) ? field.value : [];

        return (
          <div className={style}>
            {options
              .filter(option => selectedValues.includes(option.value)) // Only show the selected options
              .map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <span>{option.label}</span> {/* Only display the label */}
                </div>
              ))}
          </div>
        );
      }}
    />
  );
};

export default CheckBoxDataShow;
