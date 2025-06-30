import { Controller, useFormContext } from "react-hook-form";
type TSportsInputProps = {
  placeholder?: string;
  type?: string;
  name: string;
  required?: boolean;
  style?: string;
  errors?: { [key: string]: string };
  value?: string | number | undefined;
  disabled?: boolean;
};

const SportsInput = ({
  placeholder,
  type = "text",
  name,
  errors,
  required = false,
  style = "",
  value,
  disabled = false,
}: TSportsInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <input
            {...field}
            placeholder={placeholder}
            required={required}
            type={type}
            className={error || errors?.[name] ? `${style} border-red` : style}
            disabled={disabled}
            value={type === "radio" ? value : field.value}
            checked={type === "radio" ? field.value === value : undefined}
            onChange={(e) =>
              type === "radio"
                ? field.onChange(value)
                : field.onChange(e.target.value)
            }
          ></input>
          {(errors?.[name] || error) && (
            <div>
              <span className="text-red">
                {error?.message ||
                  JSON.parse(JSON.stringify(errors?.[name] as string))}
              </span>
            </div>
          )}
        </>
      )}
    ></Controller>
  );
};

export default SportsInput;
