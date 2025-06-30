import { Controller, useFormContext } from "react-hook-form";
type TSportsInputProps = {
  placeholder?: string;
  rows?: number;
  name: string;
  required?: boolean;
  style?: string;
  errors?: { [key: string]: string };
};

const SportsTextArea = ({
  placeholder,
  rows = 3,
  name,
  errors,
  required = false,
  style = "",
}: TSportsInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <textarea
            {...field}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={error || errors?.[name] ? `${style} border-red` : style}
          ></textarea>

          {(errors?.[name] || error) && (
            <span className="text-red">
              {error?.message ||
                JSON.parse(JSON.stringify(errors?.[name] as string))}
            </span>
          )}
        </>
      )}
    ></Controller>
  );
};

export default SportsTextArea;
