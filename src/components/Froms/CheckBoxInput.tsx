import { Controller, useFormContext } from "react-hook-form";

type TCheckboxInputProps = {
  name: string;
  label: string;
  required?: boolean;
  style?: string;
  errors?: { [key: string]: string };
  disabled?: boolean;
  value?: string | number | undefined; // This can be the checkbox value
};

const CheckboxInput = ({
  label,
  name,
  errors,
  required = false,
  style = "",
  value,
  disabled = false,
}: TCheckboxInputProps) => {
  const { control } = useFormContext();
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex items-center space-x-2">
          <input
            {...field}
            type="checkbox"
            required={required}
            className={error || errors?.[name] ? `${style} border-red` : style}
            disabled={disabled}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)} // This handles the checkbox change
            value={value}
          />
          <span>{label}</span>
          {(errors?.[name] || error) && (
            <div>
              <span className="text-red">
                {error?.message ||
                  JSON.parse(JSON.stringify(errors?.[name] as string))}
              </span>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default CheckboxInput;
