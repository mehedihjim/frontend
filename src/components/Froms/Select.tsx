import { Controller, useFormContext } from "react-hook-form";

type changeFunc = (id: string) => void;

type TSportsInputProps = {
  name: string;
  children: any;
  onChangeSelect?: changeFunc;
  required?: boolean;
  style?: string;
  disabled?: boolean;
};

const Select = ({
  children,
  onChangeSelect,
  name,
  required = false,
  style = "",
  disabled = false,
}: TSportsInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <select
            {...field}
            required={required}
            name={name}
            className={error ? `${style} border-red` : style}
            disabled={disabled}
            onChange={(e) => {
              field.onChange(e); // update form state
              onChangeSelect && onChangeSelect(e.target.value); // call custom handler
            }}
          >
            {children}
          </select>
          {error && (
            <div>
              <span className="text-red">{error.message}</span>
            </div>
          )}
        </>
      )}
    ></Controller>
  );
};

export default Select;
